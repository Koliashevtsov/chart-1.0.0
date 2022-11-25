// import { baseCanvasPoint } from './common';

// import { renderChartArea, renderViewport } from './shapes/shapes';
// import { mouseDown, mouseUp, mouseMove } from './handlers/handlers';

// const canvas = document.getElementById('canvas') as HTMLCanvasElement;
// const context = canvas.getContext('2d')







// const loop = () => {
//     renderChartArea(baseCanvasPoint, context);
//     renderViewport(baseCanvasPoint, context);
//     console.log('hello');
//     if(doUpdate){
//         window.requestAnimationFrame(loop)
//     }
// }

// window.requestAnimationFrame(loop)


// canvas.addEventListener('mouseup', mouseUp);
// canvas.addEventListener('mousedown', mouseDown);
// canvas.addEventListener('mousemove', (e) => mouseMove(e, context));

import Chart from './chart/chart'

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

const chart = new Chart({context});
chart.init();