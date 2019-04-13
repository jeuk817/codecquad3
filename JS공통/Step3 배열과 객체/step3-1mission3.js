// const myReduce = (arr, callback, initialValue) => {
//     var reducer = callback;
// }

// const result = myReduce(arr, (next,prev) => {...}, []);

// const myReduce = (arr, callback, initialValue) => {
//     var result = arr.forEach(callback);
//     console.log(result);
// }

// const result = myReduce(arr, (next,prev) => {...}, []);

const myReduce = (arr, callback, initialValue) => {
    var result = arr.forEach(callback(initialValue, prev));
    console.log(result);
}

const result = myReduce([1,2,3,4,5], (next,prev) => {return next +prev}, [10]);