module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', 
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', 
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], 
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
      },
    transformIgnorePatterns: [
        '/node_modules/' 
      ],
  };