const config = {
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '^~(.*)$': '<rootDir>/src/$1',
    'test-utils': '<rootDir>/test-utils',
  },
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/**/*.test.(ts|tsx)'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '@swc/jest',
  },
}

module.exports = {
  ...config,
}
