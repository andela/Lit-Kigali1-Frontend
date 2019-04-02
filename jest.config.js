module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testRegex: '(src/components/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.(js|jsx)'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/src/__mocks__/styleMock.js',
  },
  coveragePathIgnorePatterns: ['coverage', 'node_modules', 'src/index.js'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFiles: ['./enzyme.config.js'],
};
