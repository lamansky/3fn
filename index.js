'use strict'

const compare = require('3')
const get = require('kget')
const vfn = require('vfn')

module.exports = vfn({oo: true}, (sortBy, options = {}) => sortBy.length
  ? (a, b) => compare(...sortBy.reduce((args, sort) => args.concat(
      typeof sort === 'function' ? [sort(a, b), 0] : [get(a, sort, options), get(b, sort, options)]
    ), []), options)
  : (a, b) => compare(a, b, options)
)
