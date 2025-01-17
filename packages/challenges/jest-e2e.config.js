/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testEnvironment: 'node',
  testRegex: '.e2e-spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  moduleDirectories: ['<rootDir>/../', 'node_modules'],
};
