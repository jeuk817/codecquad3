// 10진수를 2진수로
function dec2bin(decimal) {
    var answer = [];
    while(decimal != 0){
        var n = decimal%2;
        answer.push(n);
        decimal = (decimal - n)/2;
    }
    return answer;
}

// 2진수를 10진수로
function bin2dec(bin) {
    var answer = 0;
    for (let i = 0; i < bin.length; i++){
        if (bin[i] === 1){
            answer += _square(2, i);
        }
    }
    return answer;
}

// 2진수를 16진수로
function bin2hex(bin){
    var result = [];
    while(bin.length > 0){
        var _hex = [0, 0, 0, 0];
        for(let i = 0; i < 4; i++){
            _hex[i] = bin.shift();
        }
        var _dec = bin2dec(_hex);
        var hex = _dec2hex(_dec);
        result.unshift(hex);
    }
    var answer = result.join('');
    return answer;
}

// 16진수를 2진수로
function hex2bin(hex){
    var decimal = hex2dec(hex);
    var binary = dec2bin(decimal);
    return binary;
}

/////////////////////////////////////////////////////////

//제곱하는 함수
function _square(num, repeat){
    result = 1;
    while(repeat >= 1){
        result *= num;
        repeat -= 1;
    }
    return result;
}

// 10진수 0~15까지를 16진수로
function _dec2hex(decimal){
    var hex = "";
    var arrHex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    hex = arrHex[decimal];
    return hex;
}

// 16진수 한 자리를 10진수로
function _hex2dec(hex){
    var arrHex = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    for (let i = 0; i < arrHex.length; i++){
        if(arrHex[i] == hex){
            return i;
        }
    }    
}

// 16진수를 10진수로
function hex2dec(hex){
    var strHex = String(hex);
    var answer = 0;
    var _hex = strHex.split('');
    _hex.reverse();
    for (let i = 0; i < _hex.length; i++){
        var _dec = _hex2dec(_hex[i]);
        answer += _square(16, i) * _dec;
    }
    return answer;
}