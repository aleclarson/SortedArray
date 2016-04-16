
require "lotus-require"

{ assertType, Void } = require "type-utils"

Factory = require "factory"

module.exports =
SortedArray = Factory "SortedArray",

  statics:

    comparing: (key, array) ->
      compare = SortedArray::_defaultCompare
      SortedArray array, (a, b) -> compare a[key], b[key]

  initArguments: (array, compare) ->
    assertType array, Array
    assertType compare, [ Function, Void ]
    arguments

  initValues: (_, compare) ->
    array: []
    compare: compare or @_defaultCompare

  init: (array) ->
    @insert element for element in array

  insert: (element) ->
    { compare, array } = this
    index = array.length
    array.push element
    while index > 0
      i = index
      j = --index
      a = array[i]
      b = array[j]
      continue if 0 <= compare a, b
      array[i] = b
      array[j] = a
    this

  search: (element) ->
    { array, compare } = this
    high = array.length
    low = 0
    while high > low
      index = (high + low) / 2 >>> 0
      order = compare array[index], element
      if order < 0 then low = index + 1
      else if order > 0 then high = index
      else return index
    -1

  remove: (element) ->
    index = @search element
    @array.splice index, 1 if index >= 0
    this

  _defaultCompare: (a, b) ->
    if a is b then 0
    else if a < b then -1
    else 1
