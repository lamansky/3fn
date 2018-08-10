# Three-Way Comparison Function (3fn)

Creates a callback that compares two objects by one or more keys.

## Installation

Requires [Node.js](https://nodejs.org/) 8.3.0 or above.

```bash
npm i 3fn
```

## API

The module exports a single function.

### Parameters

1. Variadic/Optional: `sortBy` (function, array, or any): A Map/object key. An array will be interpreted as a chain of nested keys. A function will be interpreted as a three-way comparison callback that accepts two arguments and returns a number. If the key is user-provided, you should wrap it in an array; otherwise you’ll have problems if the key is a function, array, or plain object.
2. Optional: `options` (plain object): An argument passed to the [3](https://github.com/lamansky/3) and [kget](https://github.com/lamansky/kget) modules, allowing you to set their options. The most commonly-needed option is `inObj`, which must be set to `true` if `sortBy` is a key which points to an _inherited_ object property.

### Return Value

A callback function that accepts a Map, Object, or other collection as its argument and returns `-1`, `0`, or `1`. This callback then can be passed to the `sort` function of an Array, for example.

## Examples

### Compare By Key

```javascript
const threeFn = require('3fn')

const personA = {name: 'John'}
const personB = {name: 'Andrew'}

const compare = threeFn('name')

compare(personA, personB) // 1
compare(personB, personA) // -1

[personA, personB].sort(compare) // [personB, personA]
```

### Compare By Inherited Key

```javascript
const threeFn = require('3fn')

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

const compare = threeFn('name', {inObj: true})

compare(personA, personB) // 1
compare(personB, personA) // -1

[personA, personB].sort(compare) // [personB, personA]
```

### Compare By Multiple Keys

```javascript
const threeFn = require('3fn')

const personA = {name: 'John', age: 46}
const personB = {name: 'John', age: 27}

const compare = threeFn('name', 'age') // Sort by name first, and by age second

compare(personA, personB) // 1
compare(personB, personA) // -1

[personA, personB].sort(compare) // [personB, personA]
```

### Compare By Nested Keys

```javascript
const threeFn = require('3fn')

const personA = {name: {first: 'John'}}
const personB = {name: {first: 'Andrew'}}

const compare = threeFn(['name', 'first'])

compare(personA, personB) // 1
compare(personB, personA) // -1

[personA, personB].sort(compare) // [personB, personA]
```

## Related

This module is based on [3](https://github.com/lamansky/3), the three-way comparison module.

It is also part of the `fn` family of modules:

* [efn](https://github.com/lamansky/efn): Extracted Function
* [ffn](https://github.com/lamansky/ffn): Filtering Function
* [jfn](https://github.com/lamansky/jfn): Joined Function
* [mfn](https://github.com/lamansky/mfn): Memoized Function
* [ofn](https://github.com/lamansky/ofn): Overloaded Function
* [pfn](https://github.com/lamansky/pfn): Possible Function
* [qfn](https://github.com/lamansky/qfn): Qualified Function
* [vfn](https://github.com/lamansky/vfn): Variadic Function
* [wfn](https://github.com/lamansky/wfn): Wrapper Function
* [xfn](https://github.com/lamansky/xfn): Extended Function
