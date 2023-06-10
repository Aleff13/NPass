const rsa = require('node-rsa');
const fs = require('fs');

class Crypt {

    constructor(){
        this._publicPath = 'keys/public.pem'
        this._privatePath = 'keys/private.pem'
        this._rsa = new rsa()
    }
    
    generateKeys() {
        if (this.hasKeys()) {
            return true
        }
        
        const key = new rsa();
        key.generateKeyPair()

        const pub = key.exportKey('pkcs1-public-pem')
        const priv = key.exportKey('pkcs1-private-pem')

        fs.writeFileSync(this._publicPath, pub)
        fs.writeFileSync(this._privatePath, priv)

        return this.hasKeys()
    }

    loadKeys() {
        if (!this.hasKeys()) {
            return false
        }

        this._rsa.importKey(fs.readFileSync(this._publicPath))
        this._rsa.importKey(fs.readFileSync(this._privatePath))

        return !this._rsa.isEmpty()
    }

    hasKeys() {
        const hasPublicKey = fs.existsSync(this._publicPath)
        const hasPrivateKey = fs.existsSync(this._privatePath)

        if (!hasPrivateKey || !hasPublicKey) {
            return false
        }

        return true
    }

    encrypt(message) {

        const result = this._rsa.encrypt(Buffer(message), 'buffer', 'utf8')
        return result
    }

    decrypt(encryptedMessage) {
        const result = this._rsa.decrypt(encryptedMessage, 'utf8')
        return result
    }
}

exports.Crypt = Crypt