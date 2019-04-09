(function callModuleChecker(){
    result = new Date();
    console.log("WELCOME UTIL MODULE : " + result);
})();

module.exports.sum = (arr) => {
    let result = 0;

    for (let i = 0; i < arr.length; i++) {
        if (typeof arr[i] == undefined) continue;
        result += arr[i]
    }

    return result;
}