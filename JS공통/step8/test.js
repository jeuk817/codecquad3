
// function ss(){
//     const a = setTimeout(() => {
//         console.log("3초후 실행");
//     }, 3000);

// }
// const b = setInterval(() => {
//     console.log('1초마다 실행')
// }, 1000);

// // const c = setInterval(() => {
// //     console.log('2초마다 실행')
// // }, 2000);


// setTimeout(() => {
//     b.unref();
// }, 6000);

// setTimeout(() => {
//     b.ref();
// }, 10000);

// console.log('Before');

// getUser(1, (user) => {
//    console.log('User', user);
// });

// console.log('After');

// function getUser(id, callback) {
//     setTimeout(() => {
//        console.log('Reading a user from a database...');
//        callback({id: id, gitHubUserName: 'su'});
//     }, 2000);
// }

console.log(process.argv.length);

console.log(process.argv);