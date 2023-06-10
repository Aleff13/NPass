const bcrypt = require('bcrypt');

class Hash {

    constructor() {
        this._salt = 14
    }

    encodeString (value) {
        return Buffer(value)
    }

    hash (text) {

        const encodedText = Hash.encodeString(text)

        const hashed = bcrypt.hash(encodedText, this._salt)
        return hashed
    }

    checkHash (someHash, someText){
        bcrypt.compare(someText, someHash, function(err, result) {
            if (err) {
                console.log(err)
            }
            return result
        });
    }
}