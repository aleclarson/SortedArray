
Type = require "Type"

type = Type "SortedArray"

type.defineArgs
  array: Array
  compare: Function.withDefault (a, b) ->
    if a is b then 0
    else if a < b then -1
    else 1

type.defineValues (_, compare) ->

  array: []

  compare: compare

type.initInstance (array) ->
  return unless array
  for element in array
    @insert element
  return

type.defineMethods

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
    return this

  search: (element) ->
    {array, compare} = this
    high = array.length
    low = 0
    while high > low
      index = (high + low) / 2 >>> 0
      order = compare array[index], element
      if order < 0 then low = index + 1
      else if order > 0 then high = index
      else return index
    return -1

  remove: (element) ->
    index = @search element
    if index isnt -1
      @array.splice index, 1
    return this

type.defineStatics

  comparing: (key, array) ->
    compare = SortedArray.argDefaults.compare
    return SortedArray array, (a, b) ->
      compare a[key], b[key]

module.exports = SortedArray = type.build()
