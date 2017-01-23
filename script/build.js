const registry = require('package-stream')()
const count = require('count-array-values')
const usernames = []

registry
  .on('package', getPackageUsernames)
  .on('up-to-date', finish)

function getPackageUsernames (pkg) {
  if (!pkg || !Array.isArray(pkg.owners)) return
  pkg.owners.forEach(owner => {
    if (owner.name && owner.name.match(' ')) return
    usernames.push(owner.name)
    process.stderr.write('.')
  })
}

function finish () {
  const counts = count(usernames, 'username', 'packageCount')
  process.stdout.write(JSON.stringify(counts, null, 2))
  process.exit()
}
