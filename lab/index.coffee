
SortedArray = require ".."

array = []

for i in [ 2, 10, 1, 4, 3 ]
  array.push { index: i }

array = SortedArray.comparing "index", array

log.format array
