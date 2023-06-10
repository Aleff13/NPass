const sqlite3 = require('sqlite3').verbose();

class PasswordRepository {
    constructor(){
        this.db = new sqlite3.Database('user.db')
    }

    init() {
        this.db.serialize(() => {
            this.db.run("CREATE TABLE if not exists password (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT type UNIQUE, username TEXT, password TEXT)");
        });
    }

    createOne(title, username, password) {
        this.db.run("INSERT INTO password(title, username, password) values(?, ?, ?)", [title, username, password], (err) => {
            if(err) {
                console.error(err)
            }
        });
    }

    getOne(title) {
        this.db.get(`SELECT * FROM password WHERE title = '${title}'`, (err, row) => {
            if(err) {
                console.error(err)
            }
            console.log(row)
        });
    }

    getAll() {
        this.db.get(`SELECT * FROM password`, (err, rows) => {
            if(err) {
                console.error(err)
            }
            console.log(rows)
        });
    }
}

exports.PasswordRepository = PasswordRepository
