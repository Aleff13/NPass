const { Crypt } = require('../src/services/crypt')

test('should generate the keys', async () => {
    const crypt = new Crypt()

    const hasCreated = crypt.generateKeys()
    expect(hasCreated).toBe(true);
});

test('should load the keys', async () => {
    const crypt = new Crypt()

    const hasLoaded = crypt.loadKeys()
    expect(hasLoaded).toBe(true);
});

test('should encrypt a text', async () => {
    const crypt = new Crypt()
    crypt.loadKeys()

    const msg = '123123'
    const encryptedMsg = crypt.encrypt(msg)

    expect(encryptedMsg).toBeDefined();
    expect(encryptedMsg).not.toBe(msg);
});

test('should decrypt a text', async () => {
    const crypt = new Crypt()
    crypt.loadKeys()

    const msg = '123123'
    const encryptedMsg = crypt.encrypt(msg)

    const decryptedMsg = crypt.decrypt(encryptedMsg)
    expect(decryptedMsg).toBe(msg);
});

test('should verify if has the keys', async () => {
    const crypt = new Crypt()
    const hasKeys = crypt.hasKeys()

    expect(hasKeys).toBe(true);
});

