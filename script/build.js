const fs = require('fs')
const path = require('path')
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
    if (!username || username.match(' ')) return
    const cacheFile = path.join(__dirname, `../cache/${username}.json`)

    if (fs.existsSync(cacheFile)) {
      owners[username] = require(cacheFile)
      console.error(username, '(cached)')
      return
    }

    if (!owners[username]) {
      owners[username] = Object.assign({
        username: owner.name,
        email: owner.email
      })
    }

    limiter.removeTokens(1, () => {
      console.error(username)

      npmUser(username)
        .then(profile => {
          Object.assign(owners[username], cleanDeep(profile))
          fs.writeFileSync(cacheFile, JSON.stringify(owners[username], null, 2))
        })
        .catch(error => {
          console.error(`\nerror: ${username}`)
          console.error(error)
        })
    })
  })

  // dev shortcut for finishing early
  // if (Object.keys(owners).length > 1000) return finish()
}

function finish () {
  process.stdout.write(JSON.stringify(owners, null, 2))
  process.exit()
}
