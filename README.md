
# sorted-array 2.0.0 ![stable](https://img.shields.io/badge/stability-stable-4EBA0F.svg?style=flat)

- Uses binary search

- Supports custom `compare(a, b)`

- For exact matches, you must return `0` in your custom `compare(a, b)`

```coffee
SortedArray = require "sorted-array"

sorted = SortedArray array, compare

sorted.array # => The sorted items.

sorted.insert item # => Inserts the item at its sorted index (using 'this.compare')

sorted.remove item # => Removes the item (using 'this.compare')

sorted.search item # => Returns the item's sorted index (using 'this.compare')
```

### Unique comparison

When using a custom `compare(a, b)`, it's important to compare
with values that are **guaranteed** to be unique.

Otherwise, `this.remove()` and `this.search()` can yield "false positives".
For example, let's say every item in `this.array` is unique. But our custom
`compare` function uses a property of each item that is **not** guaranteed
to be unique. Now, you run the risk of `this.remove()` or `this.search()`
finding the "wrong item".
