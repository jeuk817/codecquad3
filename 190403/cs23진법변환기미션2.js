function square(repeat){
    result = 1;
    while(repeat >= 1){
        result *= 2;
        repeat -= 1;
    }
    return result;
}

function bin2dec(bin) {
    var answer = 0;
    for (let i = 0; i < bin.length; i++){
        if (bin[i] === 1){
            answer += square(i);
        }
    }
    return answer;
}
