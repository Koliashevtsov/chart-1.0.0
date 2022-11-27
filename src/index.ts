import Chart from './chart/chart'

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
    datasets: [],
    labels: []
};

const options = {
    
}


const chart = new Chart({context});
chart.init({
    data: data,
    options: options
});