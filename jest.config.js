module.exports = {
    globals: {
        "ts-jest": {
          isolatedModules: true,
        },
      },
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
  };
  