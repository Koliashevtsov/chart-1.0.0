# canvas-fin-chart


## Install


Install the dependency

```sh
npm i canvas-fin-chart
```
## How to usage
```sh
import Chart from 'canvas-fin-chart';
import { Data, InputOptions } from 'canvas-fin-chart/dist/types';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const context = canvas.getContext('2d') as CanvasRenderingContext2D;

const chart = new Chart({ context });

const data: Data = {
    datasets: [
        {data: ['20', '13', '18', '26', '20', '25', '92', '30', '45', '55', '60', '20']},
        {data: ['5', '5', '5', '5', '5', '10', '15', '20', '30', '40', '44', '30']}
    ],
    labels: ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

// you can ommit options, see below how to customize chart
const options: InputOptions = {
    horizontalScrolling: { labelsStep: 150 }
}

chart.init({
    data,
    options
})
```
## Customization

It is default options which used in chart config.
You can change it in options property
```sh
const defaultChartOptions: DefOptions = {
    horizontalScrolling: false,
    styles: {
        chart: {
            backgroundColor: Color.White,
            color: 'blue',
            lineWidth: 1.2,
            colors: randomColors(data.datasets.length)
        },
        grid: {
            color: Color.Grey,
            lineWidth: 0.2
        },
        labels: {
            color: Color.Grey,
            lineWidth: 0.2,
            font: '14px Arial'
        },
        values: {
            color: Color.Grey,
            lineWidth: 0.2,
            font: '14px Arial'
        },
        boundary: {
            color: Color.Grey,
            lineWidth: 0.2
        },
        cursor: {
            backgroundColor: Color.Blue,
            color: Color.Purple,
            lineWidth: 1,
            font: '14px Arial'
        }
    }
}

const updatedOptions = {
    styles: {
        chart: {
            colors: ['red', 'blue']
        }
    }
}

chart.init({
    data,
    options
})
```

## License

MIT