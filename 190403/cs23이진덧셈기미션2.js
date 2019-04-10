// 미션 1
function sum(bitA, bitB) {
    let res = Boolean(bitA ^ bitB);
    return res;
}

function carry(bitA, bitB) {
    let res = bitA && bitB;
    return res;
}

function halfadder(bitA, bitB){
    let first = sum(bitA, bitB);
    let second = carry(bitA, bitB);
    let answer = [second, first];
    return answer;
}

function fulladder(bitA, bitB, carry = 0) {
    let a = halfadder(bitA, bitB);
    let b = halfadder(a[1], carry);
    let second = Boolean(a[0] || b[0]);
    let answer = [second, b[1]];
    return answer;
}

// 미션 2
function byteadder(byteA, byteB){
    let carry;
    let answer = [];
    let leng = Math.max(byteA.length, byteB.length);
    for (let i = 0;i < leng;i++) {
        var a = fulladder(byteA[i], byteB[i], carry);
        carry = a[0];
        answer.push(a[1]);
        if (i === leng - 1 && carry === true) answer.push(carry);
    }
    return answer;
}

var byteA  = [ 1, 1, 0, 1, 1, 0, 1, 0 ];
var byteB  = [ 1, 0, 1, 1, 0, 0, 1, 1 ];
var x = byteadder(byteA, byteB);
console.log(x);