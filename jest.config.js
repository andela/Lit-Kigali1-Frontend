module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$",
  coverageDirectory: "coverage",
  collectCoverageFrom: ["src/**/*.js"],
  coveragePathIgnorePatterns: ["coverage", "node_modules"]
};
