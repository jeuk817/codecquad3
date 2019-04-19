const todos = [
    {
        'name': '자바스크립트 공부하기',
        'tags': ['programming', 'javascript'],
        'status': 'todo',
        'id': 12123123
    },
    {
        'name': '그림 그리기',
        'tags': ['picture', 'favorite'],
        'status': 'doing',
        'id': 35435345
    },
    {
        'name': '꽃구경하기',
        'tags': ['flower', 'favorite'],
        'status': 'done',
        'id': 7
    },
    {
        'name': '저녁식사',
        'tags': ['dinner', 'food'],
        'status': 'todo',
        'id': 097989
    },
    {
        'name': '커피마시기',
        'tags': ['coffee', 'favorite'],
        'status': 'doing',
        'id': 65464
    }
];

let newTodoObject;

const makeNewTodoList = () => {
    todos.forEach(todo => {
        let key = todo.status;
        let value = todo.name;
        newTodoObject[key].push(value);
    })
};

const printAll = () => {
    let result = [];
    for (key in newTodoObject) {
        result.push(key + ": " + newTodoObject[key].length + "개");
    }
    console.log("현재상태 : ", result.join(', '));
}

const printStatus = (args) => {
    let result = [];

    for (key in newTodoObject[args]) {
        result.push(newTodoObject[args][key]);
    }
    console.log(`${args}리스트 : 총 : ` + newTodoObject[args].length + "건 : " + result.join(', '));
}

const checkTags = (tag) => {
    let result = [];
    result = todos.filter((todo) => {
        return todo.tags.includes(tag);
    }).map((obj) => { return obj.name });

    console.log(`${tag} 키워드 검색 결과 :` + result.join(', '));
};

let printStatusAfterCheckKwd = (searchKeyWord) => {
    if (searchKeyWord === 'all') {
        printAll();
    } else {
        printStatus(searchKeyWord);
    }
}

const show = (keyWord, searchKeyWord) => {
    newTodoObject = { 'todo': [], 'doing': [], 'done': [] };
    makeNewTodoList();

    if (keyWord == 'status') {
        printStatusAfterCheckKwd(searchKeyWord);
    } else {
        checkTags(searchKeyWord);
    }
}

const makeUI = () => {
    function s4() {
        return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const inputOrder = () => {
    var readline = require('readline');

    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("What do you think of node.js? ", function (answer) {
        // let splitedOrder = answer.split('$');
        checkOrder(answer);
        rl.close();
    });
}

const checkOrder = (order) => {
    let splitedOrder = order.split('$');
    switch (splitedOrder[0]) {
        case "add": addTodo(splitedOrder); break;
        case "update": updateTodo(splitedOrder); break;
        case "delete": deleteTodo(splitedOrder); break;
    }
}

const addTodo = (args) => {
    // add$CS 공부하기$코드스쿼드,CS

    todo = {
        'name': args[1],
        'tags': args[2].split(","),
        'status': 'todo',
        'id': makeUI()
    };

    todos.push(todo);
}

const updateToDo = (args) => {
    return null;
}

const deleteTodo = (args) => {
    for(key in todos){
        if(todos[key].id === Number(args[1])){
            todos.splice(key, 1);
        }
    }
}


const runTodoProgram = () => {
        inputOrder();
}

// deleteTodo();

runTodoProgram();
setTimeout(() => {
    console.log(todos);
}, 5000);