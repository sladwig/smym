// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    clearMocks: true,
    coverageDirectory: 'coverage',
    globals: {
        'ts-jest': {
            tsConfigFile: 'tsconfig.json',
        },
    },
    setupFiles: ['<rootDir>/tests-setup.ts'],
    setupTestFrameworkScriptFile: 'jest-extended',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    testMatch: ['**/__tests__/*.+(ts|tsx|js)'],
    testURL: 'http://show-me-your-money.io',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    roots: ['<rootDir>/src'],
};
