// [1,2,4,3,3]	4
// [2,3,4,4,2,1,3,1]	5

function solution(s) {
    var four = s.filter(x => { return x === 4 }).length;
    var three = s.filter(x => { return x === 3 });
    var two = s.filter(x => { return x === 2 }).length;
    var one = s.filter(x => { return x === 1 });
    var t = Math.floor(two / 2);
    var ts = two % 2
    var r = three.length - one.length;
    if (r === 0) {
        return four + t + three.length + ts;
    }
    if (r > 0) {
        return four + t + one.length + r + ts;
    }
    if (r < 0) {
        var s = Math.floor(((ts * 2) + (r * -1)) / 4);
        return (((ts * 2) + (r * -1)) % 4) === 0 ? four + t + three.length + s : four + t + three.length + s + 1;
    }


}