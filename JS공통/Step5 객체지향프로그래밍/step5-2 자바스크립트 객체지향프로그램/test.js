function show() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log('showall');
            resolve("show resolve");
        }, 3000)
    })
}

function update() {
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            console.log('update');
            resolve("update resolve");
        }, 5000);
    })
}

function run() {
    console.log('run');
}

async function test() {
    await update();
    await show();
    await run();

}

test();