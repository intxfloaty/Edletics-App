module.exports = {
    // Other Jest configurations...
    extensionsToTreatAsEsm: ['.js'], // Replace with the file extension of your test files
    testMatch: [
      '**/__tests__/**/*.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    transform: {},
    globals: {
      'ts-jest': {
        useESM: true,
      },
    },
  };