// class 없이 동일한 효과를 만들기
const animals = {
    run() {
        console.log('열심히 달린다');
    },

    jump() {
        console.log('팔짝팔짝 뛴다');
    },

    bike() {
        console.log('')
    },

    info() {
        console.log(`name is ${this.name}, age is ${this.age}`);
    }
}


const animalFactory = (name, age) => {
    return animalFactory
    //Object.create, Obect.assign
}

animalFactory.prototype = Object.create(animals.prototype);

const man = animalFactory('crong', 13);
console.log(man);