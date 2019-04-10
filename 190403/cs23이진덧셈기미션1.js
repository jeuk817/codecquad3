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

function fulladder(bitA, bitB, carry) {
    let a = halfadder(bitA, bitB);
    let b = halfadder(a[1], carry);
    let second = a[0] || b[0];
    let answer = [second, b[1]];
    return answer;
}

