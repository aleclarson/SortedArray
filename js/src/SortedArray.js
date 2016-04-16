var Factory, SortedArray, Void, assertType, ref;

require("lotus-require");

ref = require("type-utils"), assertType = ref.assertType, Void = ref.Void;

Factory = require("factory");

module.exports = SortedArray = Factory("SortedArray", {
  statics: {
    comparing: function(key, array) {
      var compare;
      compare = SortedArray.prototype._defaultCompare;
      return SortedArray(array, function(a, b) {
        return compare(a[key], b[key]);
      });
    }
  },
  initArguments: function(array, compare) {
    assertType(array, Array);
    assertType(compare, [Function, Void]);
    return arguments;
  },
  initValues: function(_, compare) {
    return {
      array: [],
      compare: compare || this._defaultCompare
    };
  },
  init: function(array) {
    var element, k, len, results;
    results = [];
    for (k = 0, len = array.length; k < len; k++) {
      element = array[k];
      results.push(this.insert(element));
    }
    return results;
  },
  insert: function(element) {
    var a, array, b, compare, i, index, j;
    compare = this.compare, array = this.array;
    index = array.length;
    array.push(element);
    while (index > 0) {
      i = index;
      j = --index;
      a = array[i];
      b = array[j];
      if (0 <= compare(a, b)) {
        continue;
      }
      array[i] = b;
      array[j] = a;
    }
    return this;
  },
  search: function(element) {
    var array, compare, high, index, low, order;
    array = this.array, compare = this.compare;
    high = array.length;
    low = 0;
    while (high > low) {
      index = (high + low) / 2 >>> 0;
      order = compare(array[index], element);
      if (order < 0) {
        low = index + 1;
      } else if (order > 0) {
        high = index;
      } else {
        return index;
      }
    }
    return -1;
  },
  remove: function(element) {
    var index;
    index = this.search(element);
    if (index >= 0) {
      this.array.splice(index, 1);
    }
    return this;
  },
  _defaultCompare: function(a, b) {
    if (a === b) {
      return 0;
    } else if (a < b) {
      return -1;
    } else {
      return 1;
    }
  }
});

//# sourceMappingURL=../../map/src/SortedArray.map
