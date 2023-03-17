import { getSliceIdxs } from '../../../src/plugins/helpers'

describe('Get first and last indexes of labels which should be rendered from right to left', () => {
    it('Should be equal', () => {
        const allLables = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const visibleAreaWidth = 800;
        const step = 200;
        const expected = [1, 6]
        expect(getSliceIdxs(allLables, visibleAreaWidth, step)).toStrictEqual(expected);
    })
})