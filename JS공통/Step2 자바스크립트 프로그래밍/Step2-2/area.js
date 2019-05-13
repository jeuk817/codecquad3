const PIE = Math.PI;
var _circleSum = 0;
var history = [];

function circle(r = -1){
    checkParameter(r);
    var result = Math.pow(r, 2) * PIE;
    history.push("circle = " + result);
    return result;
}

function circleSum(r){
    checkParameter(r);
    if(r === 0){
        history.push("circle = " + _circleSum);
        return _circleSum;
    }
    _circleSum += Math.pow(r, 2) * PIE;
    return circleSum(r-1);
}

function rect(a = -1, b = -1){
    checkParameter(a, b);
    history.push("rect = " + (a * b));
    return a * b;
}

function trapezoid(a = -1, b = -1, h = -1){
    checkParameter(a, b, h);
    var result = (a + b) * h / 2;
    history.push("trapezoid = " + result);
    return result;
}

// module.exports.cylindrical = function(r = -1, h = -1){
//     checkParameter(r, h);
//     return (this.circle(r) * 2) + (r * 2 * PIE * h);
// }

function checkParamCount(rest){
    for (let i=0; i<rest.length; i++){
        if(rest[i] === -1){
            throw Error("모든 인자를 입력하세요.");
        }
    }
}

function checkParamType(rest){
    for (let i=0; i<rest.length; i++) {
        if(typeof rest[i] !== "number") {
            throw Error("숫자를 입력하세요.");
        }
    }
}

function checkParameter(...rest){
    checkParamCount(rest);
    checkParamType(rest);
}

module.exports.getArea = function(... param){
    if(param[0] === 'circle'){
        if(param.length >= 3){
            return circleSum(param[2]);
        }
        return circle(param[1]);
    } else if(param[0] === 'rect'){
        return rect(param[1], param[2]);
    } else if(param[0] === 'trapezoid'){
        return trapezoid(param[1], param[2], param[3]);
    } else {
        throw Error('도형의 이름을 정확히 입력해주세요.');
    }
}

module.exports.printExecutionSequence = function(){
    console.log(history.join(', '));
    return;
}