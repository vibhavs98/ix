/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useRef } from 'react';
import * as PLMVisWeb from '@pvw/plmvisweb';
import { PlmVisLoader as JTLoader } from '@pvw/jtreader';

export interface Ix3DViewerProps {
  licenseKey: string;
  modelPath?: string;
}

export const Ix3DViewer: React.FC<Ix3DViewerProps> = ({
  licenseKey,
  modelPath,
}: Ix3DViewerProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const controlRef = useRef<any>(null);
    const viewerRef = useRef<any>(null);

    const showPlaceholder = (container: HTMLElement, message: string) => {
      container.innerHTML = `
        <div style="
          display: flex; 
          align-items: center; 
          justify-content: center; 
          height: 100%; 
          background: #f5f5f5; 
          color: #666;
          font-family: Arial, sans-serif;
        ">
          <div style="text-align: center;">
            <h3>3D Viewer</h3>
            <p>${message}</p>
          </div>
        </div>
      `;
    };

    const loadModel = (modelPathToLoad: string) => {
      if (!viewerRef.current || !modelPathToLoad) return;
      
      viewerRef.current.open(modelPathToLoad, (success: boolean, rootId: string) => {
        if (success) {
          viewerRef.current.setVisibilityByPsId(rootId, true, () => {
            viewerRef.current.fitToModel();
          });
        } else {
          console.error('failed to load model:', modelPathToLoad);
        }
      });
    };

    const initializePlmVisWeb = async () => {
      if (!containerRef.current) return;

      try {
        PLMVisWeb.setLicenseKey(licenseKey);

        controlRef.current = new PLMVisWeb.Control({ host: containerRef.current });
        viewerRef.current = controlRef.current.viewer;
        const jtLoader = new JTLoader();

        viewerRef.current.setLoader(jtLoader);

        if (modelPath) {
          loadModel(modelPath);
        } else {
          showPlaceholder(containerRef.current, 'no model path provided');
        }
      } catch (error) {
        console.error('error initializing PLMVisWeb:', error);
        if (containerRef.current) {
          showPlaceholder(containerRef.current, 'failed to initialize viewer');
        }
      }
    };

    const cleanup = () => {
      if (controlRef.current) {
        controlRef.current = null;
        viewerRef.current = null;
      }
    };

    useEffect(() => {
      initializePlmVisWeb();
      
      return () => {
        cleanup();
      };
    }, [licenseKey, modelPath]);

    return (
      <div 
        ref={containerRef} 
        style={{
          height: '100%',
          width: '100%',
          border: '1px solid #ccc',
          borderRadius: '4px',
          position: 'relative' as const
        }}
      />
    );
};

Ix3DViewer.displayName = 'Ix3DViewer';
