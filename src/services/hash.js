const bcrypt = require('bcrypt');

class Hash {

    constructor() {
        this._salt = 14
    }

    async hash (text) {

        const hashed = await bcrypt.hash(text, this._salt)
        return hashed
    }

    async checkHash (someHash, someText){
        const result = await bcrypt.compare(someText, someHash)
        return result
    }
}

exports.Hash = Hash