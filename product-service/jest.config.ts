import { Config } from "jest";


const config: Config = {
  preset: "ts-jest",
  rootDir: "./src",
  testRegex: [".test.ts$"],
  transform: {
    "^.+\\.(tsx|ts)?$": ["ts-jest", {
      isolatedModules: true // loosing type-checking ability but speed up tests
    }],
  },
  moduleDirectories: ["node_modules", __dirname],

};

export default config;
