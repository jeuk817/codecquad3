const schedule_list = require('./data');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function App() {
    this.errorChecker = new ErrorChecker();
    this.editor = new Editor(this.errorChecker);
    this.viewer = new Viewer(this.editor);
}



App.prototype = {

    run() {
        const self = this;
        rl.question('명령을 입력하세요: ', async (input) => {
            if (input === 'q') return rl.close();
            try {
                [key, ...message] = self.parseCommand(input);
                this.errorChecker.$check(message);
                const index = self.editor['findObjectIndex'](message[0]);
                let result;

                switch (key) {
                    case "show":
                        [status] = message;
                        status === "all" ? self.viewer.showAll() : self.viewer.showFiltered(status);
                        return self.run();

                    case "add":
                        result = self.editor[key + 'Todo'](...message);
                        // self.editor[key + 'Todo'](...message);
                        break;

                    case "update":
                        this.errorChecker.foundIdError(index);
                        this.errorChecker.statusCheck(index, message[1]);
                        self.editor[key + 'Todo'](index, message[1])
                        result = self.editor['nameAndStatus'](index);
                        break;

                    case "delete":
                        result = index !== -1 ? self.editor['nameAndStatus'](index) : this.errorChecker.foundIdError();
                        self.editor[key + 'Todo'](index, message[1]);
                        break;
                }

                await self.viewer[key + 'Message'](result);
                await this.delayShow(1000);
            }
            catch (e) {
                console.log(e.message);
                this.run();
            }
        });
    },

    parseCommand(input) {
        return input.split('$');
    },

    delayShow(time) {
        const self = this;
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                self.viewer.showAll();
                self.run();
            }, time);
        })
    }
}


function Editor() {
}

Editor.prototype = {
    TodoObject: function (_name, _tag, _newId) {
        this.name = _name
        this.tag = _tag
        this.status = 'todo'
        this.id = _newId
    },

    addTodo(_name, _tag) {
        const _newId = this.getUniqueId()
        const newTodoObject = new this.TodoObject(_name, _tag, _newId);
        schedule_list.push(newTodoObject);
        return [newTodoObject.name, newTodoObject.id];
        // this.TodoObject(_name, _tag, _newId);
        // schedule_list.push(this.TodoObject);
    },

    updateTodo(_index, _status) {
        schedule_list[_index].status = _status;
    },

    deleteTodo(_index) {
        schedule_list.splice(_index, 1);
    },

    findObjectIndex(_id) {
        return schedule_list.findIndex(todo => todo.id === parseInt(_id));
    },

    nameAndStatus(_index) {
        return [schedule_list[_index].name, schedule_list[_index].status];
    },

    getUniqueId() {
        return Date.now()
    }
}


// 만약 에디터를 인자로받아 add, update, delete의 변화를 TodoObject에 기록한다면 App에서 Viewer를 실행만 시키더라도 스스로 정보를 받아와 보여줄 수 있다.
function Viewer(Editor) {
    this.editor = Editor;
}

Viewer.prototype = {
    showAll() {
        const statusBox = schedule_list.reduce((accum, curr) => {
            accum[curr.status] = ++accum[curr.status] || 1;
            return accum;
        }, {});

        const showAllResult = Object.entries(statusBox).map(([key, value]) => `${key}는 ${value}개`).join(", ");
        console.log(`현재상태 : ${showAllResult}`);
    },

    showFiltered(_status) {
        const showFilteredResult = schedule_list.filter(todo => todo.status === _status)
            .map(todo => `'${todo.name}, ${todo.id}번'`);
        console.log(`${_status}리스트 : 총${showFilteredResult.length}건 : ${showFilteredResult.join(', ')}`);

    },

    addMessage(result) {
        console.log(`${result[0]}가 추가되었습니다. (id :${result[1]})`);
    },

    updateMessage(result) {
        return new Promise(function (resolve, reject) {
            setTimeout(() => {
                console.log(`${result[0]}의 상태가 ${result[1]}로 변경되었습니다.`);
                resolve();
            }, 3000)
        })
    },

    deleteMessage(result) {
        console.log(`${result[0]} ${result[1]}가 목록에서 삭제 되었습니다.`);
    }
}

function ErrorChecker() { }

ErrorChecker.prototype = {
    $check(_message) {
        if (_message.length === 0) throw new Error('InputError : $ is not exist ')
    },

    statusCheck(_index, _status) {
        if (schedule_list[_index].status === _status) throw new Error('StatusError : status is same');
    },

    foundIdError(_index) {
        if (_index === -1) throw new Error('IdError : id is not exist')
    }
}

const schedule_manager = new App();
schedule_manager.run();
// console.log(schedule_list);
// schedule_manager.run('show$todo');
// schedule_manager.run('add$운동하기$exercise');
// schedule_manager.run('update$9$doing');
// schedule_manager.run('delete$7');
// show$todo
// add$운동하기$exercise
// update$7$doing
// delete$7 