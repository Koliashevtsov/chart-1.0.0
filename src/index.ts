import Chart from './chart/chart'
import { InputOptions } from './types';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d');

type Dataset = {
    data: Array<string> | [];
}

type Data = {
    datasets: Array<Dataset>;
    labels: Array<string> | [];
}

const data: Data = {
    datasets: [
        {data: ['20', '13', '18', '26', '20', '25', '92', '30', '45', '55', '60', '20']},
        {data: ['22', '15', '20', '28', '22', '27', '94', '32', '47', '60', '44', '30']},
        {data: ['5', '5', '5', '5', '5', '10', '15', '20', '30', '40', '44', '30']},
        {data: ['47', '55', '55', '45', '63', '24', '75', '22', '14', '55', '66', '70']}
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
    options: options
});
