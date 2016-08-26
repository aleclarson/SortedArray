
SortedArray = require ".."

customCompare = (a, b) ->
  return -1 if a.value < b.value
  return 1 if a.value > b.value
  return 0

describe "SortedArray", ->

  it "defaults to sorting by value", ->
    sorted = SortedArray [ 2, 1, 4, 3 ]
    expect sorted.array
      .toEqual [ 1, 2, 3, 4 ]

  it "supports a custom 'compare' function", ->
    sorted = SortedArray [], customCompare
    sorted.insert { key: "a", value: 6 }
    sorted.insert { key: "b", value: 2 }
    sorted.insert { key: "c", value: 4 }
    sorted.insert { key: "d", value: 2 }
    expect sorted.array.map (o) -> o.key
      .toEqual [ "b", "d", "c", "a" ]

describe "SortedArray::remove", ->

  it "removes the first occurence of the given value", ->
    sorted = SortedArray [ 1, 3, 2, 3, 4 ]
    sorted.remove 3
    expect sorted.array
      .toEqual [ 1, 2, 3, 4 ]

describe "SortedArray::search", ->

  it "uses 'this.compare' to find any match", ->
    sorted = SortedArray [ 1, 2, 3, 4 ]
    expect sorted.search 4
      .toBe 3

  it "returns -1 when no match is found", ->
    sorted = SortedArray [ 1, 2, 3 ]
    expect sorted.search 4
      .toBe -1

  it "works with a custom 'compare' function", ->
    sorted = SortedArray [], customCompare
    sorted.insert { key: "a", value: 6 }
    sorted.insert { key: "b", value: 2 }
    sorted.insert { key: "c", value: 4 }
    expect sorted.search sorted.array[0]
      .toBe 0
    expect sorted.search {value: 3}
      .toBe -1
