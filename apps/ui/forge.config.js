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
    // macOS: Only DMG files
    {
      name: '@electron-forge/maker-dmg',
      config: {
        format: 'ULFO',
        overwrite: true
      },
      platforms: ['darwin']
    },
    // Windows: Squirrel installer (conditionally enabled based on platform)
    ...(process.platform === 'win32'
      ? [
          {
            name: '@electron-forge/maker-squirrel',
            config: {
              name: 'Snapshot'
            },
            platforms: ['win32']
          }
        ]
      : [
          // Cross-platform: ZIP files for Windows when building on non-Windows
          {
            name: '@electron-forge/maker-zip',
            platforms: ['win32']
          }
        ]),
    // Linux: .deb packages (only when tools available)
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          maintainer: 'Snapshot Labs',
          homepage: 'https://snapshot.org'
        }
      },
      platforms: ['linux']
    },
    // Linux: .rpm packages (only when tools available)
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          maintainer: 'Snapshot Labs',
          homepage: 'https://snapshot.org'
        }
      },
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
