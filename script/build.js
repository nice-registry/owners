const registry = require('package-stream')()
const count = require('count-array-values')
var usernames = []

registry
  .on('package', getPackageUsernames)
  .on('up-to-date', finish)

function getPackageUsernames (pkg) {
  if (!pkg || !Array.isArray(pkg.owners)) return
  usernames = usernames.concat(pkg.owners.map(owner => owner.name))
  process.stderr.write('.')
}

function finish () {
  const counts = count(usernames, 'username', 'packageCount')
  process.stdout.write(JSON.stringify(counts, null, 2))
  process.exit()
}
