# owners

> Social profiles and package lists for every npm package author

## Installation

```sh
yarn add owners
```

## Usage

```js
const owners = require('owners')

// Array is sorted by package count
owners[0]

// Find a specific user
const zeke = owners.find(owner => owner.username === 'zeke')
```

## Dependencies

None

## Dev Dependencies

- [chai](https://github.com/chaijs/chai): BDD/TDD assertion library for node.js and the browser. Test framework agnostic.
- [clean-deep](https://github.com/seegno/clean-deep): Remove falsy, empty or nullable values from objects
- [limiter](https://github.com/jhurliman/node-rate-limiter): A generic rate limiter for node.js. Useful for API clients, web crawling, or other tasks that need to be throttled
- [lodash](https://github.com/lodash/lodash): Lodash modular utilities.
- [mocha](https://github.com/mochajs/mocha): simple, flexible, fun test framework
- [npm-user](https://github.com/sindresorhus/npm-user): Get user info of a npm user
- [package-stream](https://github.com/zeke/package-stream): An endless stream of clean package data from the npm registry.
- [standard](https://github.com/feross/standard): JavaScript Standard Style
- [standard-markdown](https://github.com/zeke/standard-markdown): Test your Markdown files for Standard JavaScript Style™


## License

MIT
