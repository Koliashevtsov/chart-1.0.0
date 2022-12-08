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
    datasets: [{data: ['20', '13', '18', '26', '20', '25', '92', '30', '45']}],
    labels: ['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September']
};

const options = {
    
}


const chart = new Chart({context});
chart.init({
    data: data,
    options: options
});