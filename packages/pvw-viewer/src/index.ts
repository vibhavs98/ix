/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export { Ix3DViewer as Ix3DViewerWebComponent } from './ix-3d-viewer';
export { Ix3DViewer, type Ix3DViewerProps } from './ix-3d-viewer-react';
export { Ix3DViewerOptions } from './types';

export function createPvwViewer(container: HTMLElement, options: any) {
  const viewer = new (customElements.get('ix-3d-viewer') as any)();
  viewer.initialize(container, options);
  return viewer;
}
