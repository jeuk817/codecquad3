const fs = require('fs');

const session = JSON.parse(fs.readFileSync('./session.json').toString());

class Model {
    constructor() {

    }

    isUserExist(userID) {
        return fs.existsSync(`users/${userID}.json`);
    }
    isExist({ folder, file, type }) {
        return fs.existsSync(`${folder}/${file}.${type}`);
    }

    takeUserInfo(userID) {
        return JSON.parse(fs.readFileSync(`users/${userID}.json`).toString());
    }

    makeSession(userID) {
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 15);
        const randomInt = +new Date();

        Object.entries(session).filter(session => session[1].id === userID).map(session => session[0]).forEach(key => {
            delete session[key];
        });
        session[randomInt] = {
            id: userID,
            expires,
            rounds: 0,
            waitList: [],
            selectedList: []
        };
        let jsonFile = JSON.stringify(session);
        fs.writeFileSync('session.json', jsonFile);
        // fs.writeFile('session.json', jsonFile, (err) => {
        //     if (err) throw err;
        // });

        return { randomInt, expires };
    }

    createID({ id, pwd }) {
        fs.writeFile(`users/${id}.json`, `{ "id": "${id}", "pwd": "${pwd}" }`, (err, fd) => {
            if (err) throw err;
        });
    }

    createWorldCup({ userID, userInfo, worldcupName, mainImg }) {
        userInfo[worldcupName] = { "title": worldcupName, "mainImg": mainImg, "players": [] };
        let jsonFile = JSON.stringify(userInfo);
        fs.writeFileSync(`users/${userID}.json`, jsonFile, (err) => {
            if (err) throw err;
        })
        return userInfo;
    }

    registerPlayer({ userID, userInfo, title, name, imgURL }) {
        userInfo[title].players.push({ "name": name, "img": imgURL });
        let jsonFile = JSON.stringify(userInfo);

        fs.writeFile(`users/${userID}.json`, jsonFile, (err) => {
            if (err) throw err;
        })
        return userInfo;
    }

    exitPlayer({ userID, userInfo, title, name }) {
        userInfo[title].players = userInfo[title].players.filter(x => x.name !== name);
        let jsonFile = JSON.stringify(userInfo);

        fs.writeFile(`users/${userID}.json`, jsonFile, (err) => {
            if (err) throw err;
        })
        return userInfo;
    }

    heldWorldCup({ userInfo, title }) {
        let jsonFile = JSON.stringify(userInfo[title]);
        fs.writeFile(`worldcup/${title}.json`, jsonFile, (err, fd) => {
            if (err) throw err;
        });
    }

    getAllPlayers(title) {
        const { players } = JSON.parse(fs.readFileSync(`worldcup/${title}.json`).toString())
        return players;
    }

    selectPlayers({ session, sessionNum, selectedPlayers }) {
        session[sessionNum].rounds = 16;
        session[sessionNum].waitList = [...selectedPlayers];
        const [player1, player2] = session[sessionNum].waitList.splice(0, 2);
        let jsonFile = JSON.stringify(session);
        fs.writeFileSync('session.json', jsonFile);
        return [player1, player2];
    }
}

module.exports = Model;