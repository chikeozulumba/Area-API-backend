module.exports = {
  verbose: true,
  bail: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/build/',
    '/coverage/',
    '<rootDir>/src/database/migrations',
    '<rootDir>/src/database/seeders',
    '<rootDir>/jest.config.js',
    '/__mocks__/',
  ],
  coverageReporters: [
    'json', 'lcov', 'text', 'clover',
  ],
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 50,
      lines: 50,
      statements: -50,
    },
  },
  moduleNameMapper: {},
  transform: {
    '^.+\\.[t|j]s?$': 'babel-jest',
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__mocks__/',
    '/build/',
  ],
  transformIgnorePatterns: [
    '/node_modules/',
  ],
  setupFiles: [
    '<rootDir>/src/config/test.setup.js',
  ],
};
