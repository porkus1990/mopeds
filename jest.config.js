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
  "testMatch": [
    "<rootDir>/__tests__/**/*.test.ts"
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
  