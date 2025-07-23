module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  moduleFileExtensions: ['js', 'ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  collectCoverageFrom: ['<rootDir>/src/services/**/*.{ts,js}'],
  collectCoverage: process.env.COVERAGE === 'true',
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
}
