module.exports = {
    testEnvironment: 'jest-environment-jsdom',

    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
    testMatch: [
      '<rootDir>/src/**/*.test.{js,jsx,ts,tsx}',
      '<rootDir>/tests/**/*.test.{js,jsx,ts,tsx}'
    ],
  
    transform: {
      '^.+\\.[jt]sx?$': 'babel-jest'
    },
  
    modulePathIgnorePatterns: [
      '<rootDir>/dist/',
      '<rootDir>/node_modules/'
    ],
  
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    }
  };
  