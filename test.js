
const {test} = require('testpass')

const SortedArray = require('.')

function compare(a, b) {
  if (a.value === b.value) return 0
  return a.value < b.value ? -1 : 1
}

// TODO: This test should prove === is used and not ==
test('strict equality by default', (t) => {
  const input = [5, 2, 1, 4, 3]
  const expected = [1, 2, 3, 4, 5]
  const sorted = new SortedArray(input)
  t.eq(sorted.array, expected)
})

// This also tests duplicate values (which breaks `search` and `remove`).
test('custom comparison', (t) => {
  const sorted = new SortedArray(compare)
  sorted.insert({key: 'a', value: 4})
  sorted.insert({key: 'b', value: 2})
  sorted.insert({key: 'c', value: 1})
  sorted.insert({key: 'd', value: 3})
  sorted.insert({key: 'e', value: 2})
  const keys = sorted.array.map(obj => obj.key)
  const expected = ['c', 'b', 'e', 'd', 'a']
  t.eq(keys, expected)
})

test('remove() stops at first match', (t) => {
  const input = [1, 3, 2, 4, 3]
  const sorted = new SortedArray(input)
  sorted.remove(3)
  t.ne(sorted.array.indexOf(3), -1)
})

// NOTE: It's *NOT* guaranteed that the "first match"
//    will be before all other occurrences in the array.
test('search() returns index of the first match', (t) => {
  const input = [4, 3, 2, 2, 1, 0]
  const sorted = new SortedArray(input)
  t.eq(sorted.search(2), 3)
})

test('search() returns -1 when no match is found', (t) => {
  const input = [1, 2, 3]
  const sorted = new SortedArray(input)
  t.eq(sorted.search(4), -1)
})

test('search() works with custom comparison', (t) => {
  const sorted = new SortedArray(compare)
  sorted.insert({key: 'a', value: 6})
  sorted.insert({key: 'b', value: 2})
  sorted.insert({key: 'c', value: 4})
  t.eq(sorted.search({value: 2}), 0)
  t.eq(sorted.search({value: 3}), -1)
})
