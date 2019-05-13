class Stack {
    constructor() {
        this.stack = [];
    }
    psuh(item) {
        this.stack.push(item);
    }
    pop() {
        this.stack.pop();
    }
    size() {
        return this.stack.length;
    }
    peek() {
        return this.stack[this.size() - 1];
    }
    isEmpty() {
        return this.size === 0 ? "true" : "false";
    }
}

class Stack2 {
    constructor(size) {
        this.stack = [];
        this.stack.length = size;
    }
    findEmptyIndex() {
        return this.stack.findIndex(undefined);
    }
    psuh(item) {
        const emptyIndex = this.findEmptyIndex();
        emptyIndex !== -1 ? this.stack[emptyIndex] = item : console.log('stack overflow');
    }
    pop() {
        const emptyIndex = this.findEmptyIndex();
        emptyIndex !== -1 ? this.stack[this.size() - 1] = undefined : this.stack[emptyIndex - 1] = undefined;
    }
    size() {
        return this.findEmptyIndex() + 1;
    }
    peek() {
        return this.stack[this.findEmptyIndex() - 1];
    }
    isEmpty() {
        return this.findEmptyIndex() === -1 ? "true" : "false";
    }
}

const goStack = new Stack2(10);
console.log(goStack.isEmpty());