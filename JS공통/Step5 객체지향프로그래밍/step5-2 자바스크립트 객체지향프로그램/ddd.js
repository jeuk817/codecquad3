const rl = require('readline');

const inputReadline = rl.createInterface({
    input: process.stdin,
    output: process.stdout,
});

class testApp {
    register() {
        return new Promise(resolve => {
            inputReadline.question('회원인가요?', answer => {
                if (answer == 'no') {
                    resolve(this.answerNo());
                }

            });
        });
    }

    answerNo() {
        return new Promise(resolve => {
            inputReadline.question('아이디를 입력하세요', (answer) => {
                if (answer === 'no') {
                    return this.answerNo();
                    console.log('재귀');
                } else if (answer === 'yes') {
                    resolve(answer);
                }

            })
        })
    }
}

const test = new testApp();

async function asyncTest() {
    const getID = await test.register();
    console.log(getID);
}

asyncTest();