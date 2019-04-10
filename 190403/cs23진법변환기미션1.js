function dec2bin(decimal) {
    var answer = [];
    while(decimal != 0){
        var n = decimal%2;
        answer.push(n);
        decimal = (decimal - n)/2;
    }
    return answer;
}

