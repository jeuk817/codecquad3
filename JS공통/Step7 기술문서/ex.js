class Farden {
    constructor(flower) {
        this.flower = flower;
    }

    // grow() {
    //     setTimeout(function () {
    //         console.log('식물이 쑥쑥 자라는 중입니다...');
    //         this.grow();
    //     }.bind(this), 1000);
    // }

    // grow() {
    //     const that = this;
    //     setTimeout(function () {
    //         console.log('식물이 쑥쑥 자라는 중입니다...');
    //         that.grow();
    //     }, 1000);
    // }

    grow() {
        setTimeout(() => {
            console.log('식물이 쑥쑥 자라는 중입니다...');
            this.grow();
        }, 1000);
    }

}

const otherObject = {
    grow() {
        setTimeout(function () {
            console.log('식물이 지맘대로 자라요');
            this.grow();
        }, Math.random() * 2000);
    }

}

const myflower = new Farden("Lily");
myflower.grow.call(otherObject);
