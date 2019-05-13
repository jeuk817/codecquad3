function binarySearch(arr, x, first, last){
    if(first > last) return "없습니다.";
    let mid = Math.floor((first + last) / 2);
    if(arr[mid] === x) return "찾았습니다.";
    if(arr[mid] > x) return binarySearch(arr, x, first, mid - 1);
    if(arr[mid] < x) return binarySearch(arr, x , mid + 1, last);
}

var arr = [1,2,3,4,5,6,7,8,9,10];
var x = 2;
console.log(binarySearch(arr, x, 0, arr.length -1));
x = 4.5
console.log(binarySearch(arr, x, 0, arr.length -1));
x = 11;
console.log(binarySearch(arr, x, 0, arr.length -1));