function flattenAndSortArray(arr) {
  var flattenedArray = [];

  function flatten(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        flatten(arr[i]); // Chamada recursiva se o elemento for um array
      } else {
        flattenedArray.push(arr[i]); // Adiciona o elemento ao array
      }
    }
  }

  flatten(arr);
  return flattenedArray.sort(function (a, b) {
    return a - b;
  });
}

var nestedArray = [1, 2, 4, 5, 6, 7, 8, [3, 9, 11, 12, 13, 14, 15]];
var flattenedAndSortedArray = flattenAndSortArray(nestedArray);

console.log(flattenedAndSortedArray);
