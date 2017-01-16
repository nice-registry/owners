const registry = require('package-stream')()
const npmUser = require('npm-user')
const lodash = require('lodash')
const cleanDeep = require('clean-deep')
const RateLimiter = require('limiter').RateLimiter
const limiter = new RateLimiter(2, 'second')
const owners = {}

registry
  .on('package', getProfiles)
  .on('up-to-date', finish)

function getProfiles (pkg) {
  if (!pkg || !pkg.name) return
  if (!Array.isArray(pkg.owners)) return


  pkg.owners.forEach(owner => {
    const {name, email} = owner

    if (!owners[name]) {
      owners[name] = Object.assign({username: owner.name, email: owner.email}, {packages: []})
    }

    owners[name].packages.push(pkg.name)

    limiter.removeTokens(1, () => {
      console.error(name, owners[name].packages.length)

      npmUser(name)
        .then(profile => {
          Object.assign(owners[name], cleanDeep(profile))
        })
        .catch(error => {
          console.error('User not found')
          console.error(error)
        })
    })
  })

  // dev shortcut for finishing early
  // if (Object.keys(owners).length > 1000) return finish()
}

function finish () {
  const ownersArray = Object.values(owners)
    .sort((a, b) => b.packages.length - a.packages.length)

  process.stdout.write(JSON.stringify(ownersArray, null, 2))
  process.exit()
}
