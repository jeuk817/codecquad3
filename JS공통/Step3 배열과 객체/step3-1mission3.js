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
    var result = callback(initialValue, arr.shift());
    if(arr.length === 0){
        console.log(result,'=======');
        return result;
    }
    myReduce(arr, callback, result);
}

const result = myReduce([1,2,3,4,5], (next,prev) => {return next +prev}, [10]);