const { Hash } = require('../src/services/hash')
const hash = new Hash()

test('should hash a message', async () => {
    const msg = '123123'
    const hashedMsg = await hash.hash(msg)
    expect(hashedMsg).toBeDefined();
});

test('check a valid hash', async () => {
    const msg = '123123'
    const hashedMsg = await hash.hash(msg)
    const isValidHash = await hash.checkHash(hashedMsg, msg)

    expect(isValidHash).toBe(true);
});

test('check a invalid hash', async () => {
    const msg = '123123'
    const hashedMsg = await hash.hash(msg)
    const isValidHash = await hash.checkHash('blofHash123', msg)

    expect(isValidHash).toBe(false);
});