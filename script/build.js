const registry = require('package-stream')()
const npmUser = require('npm-user')
const cleanDeep = require('clean-deep')
const RateLimiter = require('limiter').RateLimiter
const limiter = new RateLimiter(5, 'second')
const owners = {}

registry
  .on('package', getProfiles)
  .on('up-to-date', finish)

function getProfiles (pkg) {
  if (!pkg || !pkg.name) return
  if (!Array.isArray(pkg.owners)) return

  pkg.owners.forEach(owner => {
    const username = owner.name

    if (!owners[username]) {
      owners[username] = Object.assign({
        username: owner.name,
        email: owner.email,
        packageCount: 0
      })
    }

    owners[username].packageCount++

    limiter.removeTokens(1, () => {
      console.error(username, owners[username].packageCount)

      npmUser(username)
        .then(profile => {
          Object.assign(owners[username], cleanDeep(profile))
        })
        .catch(error => {
          console.error(`error:              ${username} ${error.statusCode}`)
          // console.error(error)
        })
    })
  })

  // dev shortcut for finishing early
  // if (Object.keys(owners).length > 1000) return finish()
}

function finish () {
  const ownersArray = Object.values(owners)
    .sort((a, b) => b.packageCount - a.packageCount)

  process.stdout.write(JSON.stringify(ownersArray, null, 2))
  process.exit()
}
