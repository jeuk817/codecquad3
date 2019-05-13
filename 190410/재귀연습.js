// 재귀로 팩토리얼 함수 구현하기

var fact = function(a) {
    if (a === 0 || a === 1){
        return 1;
    }
    return a * fact(a-1);
};

// 함수안에서 피보나치랑 출력이랑 한번에 구현하는법 고민중...
var result = "";
function fibo(n){
    var answer = 0;
    var s = 0;
    if (n <= 1){
        var s = n;
        result += s;
        return n;
    } 
    answer += fibo(n - 1) + fibo(n - 2);
    var s = fibo(n);
    result += s;
    console.log(result);
    return answer;
}

function ff(n){
    var s = fibo(n);
    result += s;
    if(n === 0) {
        console.log(result);
        return;
    }
    ff(n-1);
}

// 그냥 간단한 답.
function f3(n){
    if(n <= 1){
        return n;
    }
    return f3(n-1) + f3(n-2);
}

function a(n){
    for (let i =0; i < n+1; i++){
        console.log("i = ", f3(i));
    }
}

// 다이나믹프로그래밍으로 피보나치 구하기
var arr = [];
function dinamicFibo(n){
    if(n <= 1){
        arr[n] = n;
        return n;
    }

    if(arr[n] !== undefined){
        return arr[n];
    }

    arr[n] = dinamicFibo(n - 1) + dinamicFibo(n - 2);
    return arr[n];
}

function dinamicFiboOut(n){
    for (let i =0; i < n+1; i++){
        console.log("i = ", dinamicFibo(i));
    }
}