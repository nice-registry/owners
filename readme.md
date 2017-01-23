# owners

> Usernames and package counts for every npm package author

Works offline. Updated daily.

## Installation

```sh
npm install owners --save
```

## Usage

```js
const owners = require('owners')

owners.length
// 106792

owners.slice(0, 10)
// [
//   { username: 'ehsalazar', packageCount: 1541 },
//   { username: 'retyped', packageCount: 1541 },
//   { username: 'joshhunt', packageCount: 1342 },
//   { username: 'jonschlinkert', packageCount: 1230 },
//   { username: 'sindresorhus', packageCount: 953 },
//   { username: 'okunishinishi', packageCount: 753 },
//   { username: 'kgryte', packageCount: 707 },
//   { username: 'substack', packageCount: 644 },
//   { username: 'ionicabizau', packageCount: 602 },
//   { username: 'dominictarr', packageCount: 568 }
// ]

owners.find(owner => owner.username === 'zeke').packageCount
// 180

```

## Tests

```sh
npm install
npm test
```

## Dependencies

None

## Dev Dependencies

- [chai](https://github.com/chaijs/chai): BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
- [count-array-values](https://github.com/zeke/count-array-values): Count the instances of each value in an array
- [lodash](https://github.com/lodash/lodash): Lodash modular utilities.
- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework
- [package-stream](https://github.com/zeke/package-stream): An endless stream of clean package data from the npm registry.
- [standard](https://github.com/feross/standard): JavaScript Standard Style
- [standard-markdown](https://github.com/zeke/standard-markdown): Test your Markdown files for Standard JavaScript Style™


## License

MIT
