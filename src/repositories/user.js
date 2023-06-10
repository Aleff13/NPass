const sqlite3 = require('sqlite3').verbose();

class UserRepository {
    constructor(){
        this.db = new sqlite3.Database('user.db')
    }

    init() {
        this.db.serialize(() => {
            this.db.run("CREATE TABLE if not exists user (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT type UNIQUE, password TEXT)");
        });
    }

    createOne(username, password) {
        this.db.run("INSERT INTO user(username, password) values(?, ?)", [username, password], (err) => {
            if(err) {
                console.error(err)
            }
        });
    }

    getOne(username) {
        this.db.get(`SELECT * FROM password WHERE username = '${username}'`, (err, row) => {
            if(err) {
                console.error(err)
            }
            return row
        });
    }
}

exports.UserRepository = UserRepository
