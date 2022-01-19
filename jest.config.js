module.exports = {
  "bail": true,
  "verbose": true,
  "testRegex": "./test/.*.test.js$",
  "roots": [
    "./"
  ],
  "modulePathIgnorePatterns": [
    "node_modules"
  ],
  "collectCoverage": true,
  "moduleNameMapper": {
    "^.+\\.(css|less|scss)$": "identity-obj-proxy"
  },
  "transform": {
    "^.+\\.(js|jsx)$": "babel-jest"
  },
  "transformIgnorePatterns":[],
  "globals": {
    moment: {
      tz: {
        guess: () => 'utc'
      }
    },
    Higcharts: () => ({})
  }
};
