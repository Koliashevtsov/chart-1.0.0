import Chart from './chart/chart'
import { InputOptions, Data } from './types';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

// type Dataset = {
//     data: Array<string>;
// }

// type Data = {
//     datasets: Array<Dataset>;
//     labels: Array<string> ;
// }

const data: Data = {
    datasets: [
        // {data: ['20', '10', '18', '0', '20', '25', '92', '30', '45', '55', '60', '20']},
        // {data: ['22', '15', '20', '28', '22', '27', '110', '32', '47', '60', '44', '30']},
        // {data: ['5', '5', '5', '5', '5', '10', '15', '20', '30', '40', '44', '30']},
        // {data: ['47', '55', '55', '45', '63', '24', '75', '22', '14', '55', '66', '70']},
        // {data: ['2.24', '5.24', '3.43', '2.73', '4.32', '4.45', '4.22', '5.45', '2.24', '3.44', '3.41', '5.47']},
        // {data: ['5.34', '5.44', '5.42', '5.3', '5.22', '6.45', '6.22', '3.45', '7.44', '5.44', '2.4', '3.47']},
        {data: ['2', '3', '4', '4', '6', '7', '4', '5', '4', '3', '2', '5'], color: '#a8329c', name: 'USDT'}
    ],
    labels: ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

const options: InputOptions = {
    horizontalScrolling: { labelsStep: 80 },
    styles: {
        chart: {
            colors: ['#176ba0', '#7d3a71', '#de542c']
        }
    }
}


const chart = new Chart({context});
chart.init({
    data: data,
    options: options,
    plugins: [{id: 'horizontal-scrolling', prop: {scrolling: 100}}]
});
