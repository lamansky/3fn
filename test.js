'use strict'

const assert = require('assert')
const threeFn = require('.')

describe('threeFn()', function () {
  it('should return a default comparison function if arguments omitted', function () {
    const fn = threeFn()
    assert.strictEqual(fn(1, 2), -1)
    assert.strictEqual(fn(2, 1), 1)
    assert.strictEqual(fn(0, 0), 0)
  })

  it('should wrap a function with return value range enforcement', function () {
    const fn = threeFn((a, b) => b - a)
    assert.strictEqual(fn(1, 3), 1)
    assert.strictEqual(fn(3, 1), -1)
    assert.strictEqual(fn(0, 0), 0)
  })

  it('should compare objects by given key', function () {
    const fn = threeFn('key')
    assert.strictEqual(fn({key: 1}, {key: 2}), -1)
    assert.strictEqual(fn({key: 2}, {key: 1}), 1)
    assert.strictEqual(fn({key: 0}, {key: 0}), 0)
  })

  it('should compare objects by given inherited key if `inObj` is `true`', function () {
    const _name = Symbol('name')

    class Person {
      constructor (name) {
        this[_name] = name
      }

      get name () {
        return this[_name]
      }
    }

    const personA = new Person('John')
    const personB = new Person('Andrew')

    const fn = threeFn('name', {inObj: true})

    assert.strictEqual(fn(personA, personB), 1)
    assert.strictEqual(fn(personB, personA), -1)
  })

  it('should compare Maps by given key', function () {
    const fn = threeFn('key')
    assert.strictEqual(fn(new Map([['key', 1]]), new Map([['key', 2]])), -1)
    assert.strictEqual(fn(new Map([['key', 2]]), new Map([['key', 1]])), 1)
    assert.strictEqual(fn(new Map([['key', 0]]), new Map([['key', 0]])), 0)
  })

  it('should compare objects by given keys', function () {
    const fn = threeFn('a', 'b')
    assert.strictEqual(fn({a: 1}, {a: 2}), -1)
    assert.strictEqual(fn({a: 2}, {a: 1}), 1)
    assert.strictEqual(fn({a: 0, b: 1}, {a: 0, b: 2}), -1)
    assert.strictEqual(fn({a: 0, b: 2}, {a: 0, b: 1}), 1)
    assert.strictEqual(fn({a: 0, b: 0}, {a: 0, b: 0}), 0)
  })

  it('should compare objects by given nested keys', function () {
    const fn = threeFn(['a1', 'a2'], ['b'])
    assert.strictEqual(fn({a1: {a2: 1}}, {a1: {a2: 2}}), -1)
    assert.strictEqual(fn({a1: {a2: 2}}, {a1: {a2: 1}}), 1)
    assert.strictEqual(fn({a1: {a2: 0}, b: 1}, {a1: {a2: 0}, b: 2}), -1)
    assert.strictEqual(fn({a1: {a2: 0}, b: 2}, {a1: {a2: 0}, b: 1}), 1)
    assert.strictEqual(fn({a1: {a2: 0}, b: 0}, {a1: {a2: 0}, b: 0}), 0)
  })
})
