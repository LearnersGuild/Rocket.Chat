import path from 'path'
import glob from 'glob'
import test from 'tape'

import './meteorGlobalMocks'

function requireAllForCoverage() {
  glob(path.resolve('./packages/rocketchat-lg-*/**/*.js'), (err, files) => {
    if (err) {
      throw err
    }
    files.forEach(f => require(f))
  })
}

requireAllForCoverage()

test('nop', t => {
  t.end()
})
