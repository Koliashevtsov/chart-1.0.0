import { backgroundColorFromCss } from '../../src/helpers';

describe('Background color from css', () => {
    const body = document.createElement('body');
    const oldestParent = document.createElement('div');
    const container = document.createElement('div');
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    oldestParent.appendChild(container);
    body.appendChild(oldestParent);
    const oldestParentColor = 'yellow';
    const containerColor = 'red';
    const canvasColor = 'green';

    it('Should return background color from canvas', () => {
        oldestParent.style.backgroundColor = oldestParentColor
        container.style.backgroundColor = containerColor;
        canvas.style.backgroundColor = canvasColor;
        expect(backgroundColorFromCss(canvas)).toBe(canvasColor)
    })

    it('Should return background color from container', () => {
        canvas.style.backgroundColor = '';
        expect(backgroundColorFromCss(canvas)).toBe(containerColor)
    })

    it('Should return background color from oldestParent container', () => {
        container.style.backgroundColor = '';
        
        expect(backgroundColorFromCss(canvas)).toBe(oldestParentColor)
    })

    it('Should return null', () => {
        oldestParent.style.backgroundColor = '';

        expect(backgroundColorFromCss(canvas)).toBeNull();
    })
})