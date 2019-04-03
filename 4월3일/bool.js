var result = document.getElementById('res');
var btnA = false;
var btnB = false;
var ret = true;
var bool1 = function(){
    if (btnA === false){
        btnA = true;
    } else {
        btnA = false;
    }
    ress();
}
var bool2 = function(){
    if (btnB === false){
        btnB = true;
    } else {
        btnB = false;
    };
    ress();
}
var ress = function() {
    if (btnA === true && btnB === true){
        ret = false;
    } else {
        ret = true;
    }
    result.innerHTML = ret;
}