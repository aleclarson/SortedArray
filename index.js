
function SortedArray(array, compare) {
  this.array = []
  if (typeof array == 'function') {
    this.compare = array
  } else {
    this.compare = compare || defaultCompare
    if (Array.isArray(array)) {
      array.forEach(item => this.insert(item))
    }
  }
}

SortedArray.comparing = function(key, array) {
  return new SortedArray(array, function(a, b) {
    return defaultCompare(a[key], b[key])
  })
}

SortedArray.prototype = {
  constructor: SortedArray,
  insert(item) {
    var compare = this.compare
    var array = this.array
    var index = array.length
    array.push(item)
    while (index > 0) {
      var i = index
      var j = --index
      var a = array[i]
      var b = array[j]
      if (0 > compare(a, b)) {
        array[i] = b
        array[j] = a
      }
    }
    return this
  },
  search(item) {
    var compare = this.compare
    var array = this.array
    var high = array.length
    var low = 0
    while (high > low) {
      var index = (high + low) / 2 >>> 0
      var order = compare(array[index], item)
      if (order < 0) {
        low = index + 1
      } else if (order > 0) {
        high = index
      } else {
        return index
      }
    }
    return -1
  },
  remove(item) {
    var index = this.search(item)
    if (index != -1) {
      this.array.splice(index, 1)
    }
    return this
  }
}

module.exports = SortedArray

function defaultCompare(a, b) {
  if (a === b) return 0
  return a < b ? -1 : 1
}
