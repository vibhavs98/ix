# PVW 3D Viewer

## Environment Setup

1. add siemens artifactory path in `.npmrc` file
2. `pnpm install` within the `root` directory
3. add Github Token in `.env`
4. pnpm run build within the `root` directory

## sometimes jt-reader resolve error occurs
1. define `module` as `JTReader.min.js` at `packages\pvw-viewer\node_modules\@pvw\jtreader\package.json`

