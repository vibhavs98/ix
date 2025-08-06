/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as PLMVisWeb from '@pvw/plmvisweb';
import { PlmVisLoader as JTLoader } from '@pvw/jtreader';
import { Ix3DViewerOptions } from './types';

export class Ix3DViewer extends HTMLElement {
  private control: any = null;
  private viewer: any = null;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  private render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: 100%;
        }
        
        .placeholder {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          background: #f5f5f5;
          color: #666;
          font-family: Arial, sans-serif;
        }
        
        .placeholder-content {
          text-align: center;
        }
        
        .placeholder h3 {
          margin: 0 0 10px 0;
          font-size: 18px;
        }
        
        .placeholder p {
          margin: 5px 0;
          font-size: 14px;
        }
      </style>
    `;
  }

  public initialize(container: HTMLElement, options: Ix3DViewerOptions) {
    if (!container) {
      console.error('container is required to initialize the viewer');
      return;
    }

    this.initializePlmVisWeb(container, options);
  }

  private async initializePlmVisWeb(container: HTMLElement, options: Ix3DViewerOptions) {
    try {
      PLMVisWeb.setLicenseKey(options.licenseKey);

      this.control = new PLMVisWeb.Control({ host: container });
      this.viewer = this.control.viewer;
      const jtLoader = new JTLoader();

      this.viewer.setLoader(jtLoader);

      if (options.modelPath) {
        this.viewer.open(options.modelPath, (success: boolean, rootId: string) => {
          if (success) {
            this.viewer.setVisibilityByPsId(rootId, true, () => {
              this.viewer.fitToModel();
            });
          } else {
            this.showPlaceholder(container, 'model file not found or invalid');
          }
        });
      } else {
        this.showPlaceholder(container, 'no model path provided');
      }
    } catch (error) {
      console.error('error initializing PLMVisWeb:', error);
      this.showPlaceholder(container, 'failed to initialize viewer');
    }
  }

  private showPlaceholder(container: HTMLElement, message: string) {
    container.innerHTML = `
      <div class="placeholder">
        <div class="placeholder-content">
          <h3>3D Viewer</h3>
          <p>${message}</p>
        </div>
      </div>
    `;
  }

  disconnectedCallback() {
    if (this.control) {
      this.control = null;
      this.viewer = null;
    }
  }
}

if (!customElements.get('ix-3d-viewer')) {
  customElements.define('ix-3d-viewer', Ix3DViewer);
}
