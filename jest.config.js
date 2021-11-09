module.exports = {
    roots: ['<rootDir>/tasks/tests'],
    preset: 'ts-jest',
    collectCoverage: true,
    collectCoverageFrom: ['./src/**/*.{js,jsx,ts}', '!**/node_modules/**', '!**/vendor/**'],
  }