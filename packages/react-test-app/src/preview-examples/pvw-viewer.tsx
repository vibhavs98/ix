/*
 * SPDX-FileCopyrightText: 2025 Siemens AG
 *
 * SPDX-License-Identifier: MIT
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Ix3DViewer } from '@siemens/ix-pvw-viewer';

const options = {
  licenseKey: "",
  modelPath: "../public/VTSteamEngine.jt",
};

export default () => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Ix3DViewer {...options} />
    </div>
  );
};
