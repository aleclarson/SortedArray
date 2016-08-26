var SortedArray, Type, type;

Type = require("Type");

type = Type("SortedArray");

type.defineArgs({
  array: Array,
  compare: Function.withDefault(function(a, b) {
    if (a === b) {
      return 0;
    } else if (a < b) {
      return -1;
    } else {
      return 1;
    }
  })
});

type.defineValues(function(_, compare) {
  return {
    array: [],
    compare: compare
  };
});

type.initInstance(function(array) {
  var element, k, len;
  if (!array) {
    return;
  }
  for (k = 0, len = array.length; k < len; k++) {
    element = array[k];
    this.insert(element);
  }
});

type.defineMethods({
  insert: function(element) {
    var a, array, b, compare, i, index, j, ref;
    ref = this, compare = ref.compare, array = ref.array;
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
    var array, compare, high, index, low, order, ref;
    ref = this, array = ref.array, compare = ref.compare;
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
    if (index !== -1) {
      this.array.splice(index, 1);
    }
    return this;
  }
});

type.defineStatics({
  comparing: function(key, array) {
    var compare;
    compare = SortedArray.argDefaults.compare;
    return SortedArray(array, function(a, b) {
      return compare(a[key], b[key]);
    });
  }
});

module.exports = SortedArray = type.build();

//# sourceMappingURL=map/SortedArray.map
