/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

declare module '@pvw/plmvisweb' {
  export function setLicenseKey(key: string): void;
  
  export class Control {
    constructor(options: { host: HTMLElement });
    viewer: any;
  }
}

declare module '@pvw/jtreader' {
  export class PlmVisLoader {
    constructor();
  }
}
