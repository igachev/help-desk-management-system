module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    testMatch: [
      "**/src/**/*.(test|spec).(ts|tsx)", // ✅ Now looks for tests inside src/
    ],
    moduleNameMapper: {
      "^@/(.*)$": "<rootDir>/src/$1",
      "\\.css$": "jest-transform-stub", // Ignore CSS files
    },
  };
  
  
  
  
  