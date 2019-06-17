
let aaa = 0;
class NewGame {

    constructor(a) {
        this.players = [];
    }
    mix(array, rounds) {
        var count = 0;
        while (count < rounds) {
            array.sort(function () { return Math.random() - 0.5 });
            count += 1;
        }
        array = array.splice(0, rounds);
        return array;
    }
    add() {
        aaa += 1;
        console.log("aaa :", aaa);
    }
}

module.exports = NewGame;