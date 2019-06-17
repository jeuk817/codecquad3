const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const Template = require('./template')
const NewGame = require('./game');
const Model = require('./model');

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const server = http.createServer((req, res) => {
    const pathname = url.parse(req.url).pathname;
    console.log(url.parse(req.url))
    const cookies = parseCookies(req.headers.cookie);
    const sessionNum = cookies.session;
    const session = JSON.parse(fs.readFileSync('./session.json').toString());
    let userID;
    let userInfo;
    if (cookies.session) {
        userID = session[cookies.session].id;
        userInfo = model.takeUserInfo(userID);
    }
    if (pathname === '/participation') {
        const { query } = url.parse(req.url);
        const { title } = qs.parse(query);

        const players = model.getAllPlayers(title);
        session[cookies.session].rounds = 16;
        const selectedPlayers = newGame.mix(players, session[cookies.session].rounds);
        const [player1, player2] = model.selectPlayers({ session, sessionNum, selectedPlayers });
        const html = template.foodWorldCup(player1, player2, session[cookies.session].rounds);
        res.end(html);
    } else if (pathname === '/foodworldcup') {
        const { query } = url.parse(req.url);
        const { name, img } = qs.parse(query);
        session[cookies.session].selectedList.push({ name, img })

        if (session[cookies.session].waitList.length === 0) {
            if (session[cookies.session].selectedList.length === 1) {
                let jsonFile = JSON.stringify(session);
                fs.writeFileSync('session.json', jsonFile);
                const html = template.champion(session[cookies.session].selectedList.shift());
                res.end(html);
            } else {
                session[cookies.session].rounds = session[cookies.session].rounds / 2;
                session[cookies.session].waitList.push(...session[cookies.session].selectedList);
                session[cookies.session].selectedList = [];
            }
        }
        const [player1, player2] = session[cookies.session].waitList.splice(0, 2);
        let jsonFile = JSON.stringify(session);
        fs.writeFileSync('session.json', jsonFile);
        const html = template.foodWorldCup(player1, player2, session[cookies.session].rounds);
        res.end(html)
    } else if (pathname === '/makeworldcup') {
        const worldcups = Object.entries(userInfo).filter(x => x[0] !== 'id' && x[0] !== 'pwd')
        const html = template.pageToMakeWorldCup({ "id": userID, worldcups });
        res.end(html);
    } else if (pathname === '/createworldcup') {
        const { query } = url.parse(req.url);
        const { worldcupName, mainImg } = qs.parse(query);
        const worldcups = Object.entries(userInfo).filter(x => x[0] !== 'id' && x[0] !== 'pwd')

        if (worldcupName === '') {
            const html = template.pageToMakeWorldCup({ "id": userID, "message": '월드컵 이름을 정해주세요.', worldcups });
            res.end(html);
        }
        else if (mainImg === '') {
            const html = template.pageToMakeWorldCup({ "id": userID, "message": '메인이미지를 넣어주세요.', worldcups });
            res.end(html);
        }
        else {
            if (model.isExist({ folder: 'worldcup', file: worldcupName, type: 'json' })) {
                const html = template.pageToMakeWorldCup({ "id": userID, "message": `${worldcupName}는 이미 개최되었습니다.`, worldcups });
                res.end(html);
            } else {
                userInfo = model.createWorldCup({ userID, userInfo, worldcupName, mainImg })
                const worldcups = Object.entries(userInfo).filter(x => x[0] !== 'id' && x[0] !== 'pwd')
                const html = template.pageToMakeWorldCup({ "id": userID, "message": `${worldcupName}이 만들어졌습니다. 선수들을 등록해보세요!`, worldcups });
                res.end(html);
            }
        }
    } else if (pathname === '/playermanagement') {
        const { query } = url.parse(req.url);
        const { title } = qs.parse(query);

        const html = template.playermanagement({ "id": userID, "worldcup": userInfo[title] });
        res.end(html);
    } else if (pathname === '/registerplayer') {
        const { query } = url.parse(req.url);
        const { title, name, imgURL } = qs.parse(query);

        userInfo = model.registerPlayer({ userID, userInfo, title, name, imgURL });
        const html = template.playermanagement({ "id": userID, "worldcup": userInfo[title], "message": `${name} 등록!` });
        res.end(html);
    } else if (pathname === '/exitplayer') {
        const { query } = url.parse(req.url);
        const { title, name } = qs.parse(query);

        userInfo = model.exitPlayer({ userID, userInfo, title, name });
        const html = template.playermanagement({ "id": userID, "worldcup": userInfo[title], "message": `${name} 퇴장!` });
        res.end(html);
    } else if (pathname === '/heldworldcup') {
        const { query } = url.parse(req.url);
        const { title } = qs.parse(query);

        if (userInfo[title].players.length < 16) {
            const html = template.playermanagement({ "id": userID, "worldcup": userInfo[title], "message": `선수는 최소 16명이상이어야 합니다.` });
            res.end(html);
        } else {
            model.heldWorldCup({ userInfo, title });
            const html = template.playermanagement({ "id": userID, "worldcup": userInfo[title], "message": `${title} 개최!` });
            res.end(html);
        }
    } else if (pathname === '/signup') {
        const { query } = url.parse(req.url);
        const { id, pwd } = qs.parse(query);

        if (id === '') {
            const html = template.loginpage(`아이디를 입력해 주세요.`);
            res.end(html);
        } else if (pwd === '') {
            const html = template.loginpage(`비밀번호를 입력해 주세요.`);
            res.end(html);
        } else {
            if (model.isExist({ folder: 'users', file: id, type: 'json' })) {
                const html = template.loginpage(`${id}는 사용중입니다.`);
                res.end(html);
            } else {
                model.createID({ id, pwd });
                const html = template.loginpage('아이디가 생성되었습니다.');
                res.end(html);
            }
        }
    } else if (pathname === '/clicklogin') {
        const { query } = url.parse(req.url);
        const { id, pwd } = qs.parse(query);

        if (model.isExist({ folder: 'users', file: id, type: 'json' })) {
            const userInfo = model.takeUserInfo(id);
            if (pwd === userInfo.pwd) {
                const { randomInt, expires } = model.makeSession(id);
                res.writeHead(302, {
                    Location: '/home',
                    'Set-Cookie': `session=${randomInt}; Expires=${expires.toUTCString()}; HttpOnly; Path=/`,
                });
                res.end();
            } else {
                const html = template.loginpage('비밀번호가 틀렸습니다.');
                res.end(html);
            }
        } else {
            const html = template.loginpage(`${id}는 없는 아이디입니다.`);
            res.end(html);
        }
    } else if (pathname === '/logout') {
        delete session[cookies.session];
        let jsonFile = JSON.stringify(session);
        fs.writeFile('session.json', jsonFile, (err) => {
            if (err) throw err;
        })
        res.writeHead(302, {
            Location: '/loginpage',
            'Set-Cookie': `session=; Expires=; HttpOnly; Path=/`,
        });
        res.end();
    } else if (pathname === '/loginpage') {
        const html = template.loginpage();
        res.end(html);
    } else if (pathname === '/home') {
        const heldWorldCup = fs.readdirSync('worldcup');
        const worldcups = heldWorldCup.map(worldcup => {
            return JSON.parse(fs.readFileSync(`worldcup/${worldcup}`).toString());
        });
        const html = template.home({ "id": userID, worldcups });
        res.end(html)
    }
});

server.listen(8081);
server.on('listening', () => {
    console.log('8081번 포트');
});
server.on('error', (error) => {
    console.error(error);
});

const template = new Template();
const newGame = new NewGame();
const model = new Model();
