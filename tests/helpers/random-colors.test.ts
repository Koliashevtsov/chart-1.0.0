import { randomColors } from '../../src/helpers';

describe('Generate random hex color codes', () => {
    const regexStr = '^#([A-Fa-f0-9]){6}$';
    const count = 5
    const randColors = randomColors(count);

    it.each(randColors)('Should be match to regex', (color) => {
        expect(color).toMatch(new RegExp(regexStr))
    })
})