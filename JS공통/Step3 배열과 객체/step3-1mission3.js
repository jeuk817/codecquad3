// const myReduce = (arr, callback, initialValue) => {
//     var reducer = callback;
// }

// const result = myReduce(arr, (next,prev) => {...}, []);

const myReduce = (arr, callback, initialValue) => {
    var result = arr.forEach(callback);
    console.log(result);
}

const result = myReduce(arr, (next,prev) => {...}, []);