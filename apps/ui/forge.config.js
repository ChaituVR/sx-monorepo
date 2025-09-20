export default {
  packagerConfig: {
    appBundleId: 'com.snapshot.app',
    name: 'Snapshot',
    icon: './src/assets/icon',
    ignore: [
      /^\/src/,
      /^\/test/,
      /^\/tests/,
      /^\/storybook-static/,
      /^\/screenshots/,
      /\.md$/
    ],
    asar: true,
    asarUnpack: [
      'node_modules/.pnpm',
      '**/*.node',
      '**/keccak/**',
      '**/secp256k1/**',
      '**/0xsequence/**'
    ],
    out: 'out',
    overwrite: true,
    prune: false,
    derefSymlinks: false,
    packageManager: 'yarn'
  },

  rebuildConfig: {},
  plugins: [],
  makers: [
    {
      name: '@electron-forge/maker-dmg',
      platforms: ['darwin']
    },
    // Windows: ZIP files (cross-platform compatible)
    {
      name: '@electron-forge/maker-zip',
      platforms: ['win32']
    },
    // Linux: ZIP packages (universal format)
    {
      name: '@electron-forge/maker-zip',
      platforms: ['linux']
    }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'snapshot-labs',
          name: 'sx-monorepo'
        }
      }
    }
  ]
};
