const owners = require('./')

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
