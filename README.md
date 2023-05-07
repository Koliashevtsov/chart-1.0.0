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
    styles: {
        chart: {
            backgroundColor: 'green',
            color: 'blue'
        }
    }
}

chart.init({
    data,
    options
})
```
## Extended Dataset
You can use ExtendedDataset type to define specific name and color to each dataset. Name will be 
show on tooltip
```sh
type ExtendedDataset =  {
    data: string[];
    color: string;
    name: string;
}
const data: Data = {
    datasets: [
        {
            data: ['20', '13', '18', '26', '20', '25', '92', '30', '45', '55', '60', '20'],
            color: '#ffffff',
            name: 'chart-1'
        },
        {
            data: ['5', '5', '5', '5', '5', '10', '15', '20', '30', '40', '44', '30'],
            color: 'red',
            name: 'chart-2'
        }
    ],
    labels: ['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};
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

## Plugins

There are two plugins in current version you can use (horizontal-scrolling and date-time-labels).

```sh
chart.init({
    data: data,
    options: options,
    plugins: [
        {id: 'horizontal-scrolling', prop: {scrolling: 100}},
        {id: 'date-time-labels', prop: {
            startDate: '2023-01-12T18:50:28',
            finishDate: '2023-12-12T18:50:28',
            step: '1M'
        }}
    ]
});
```

## License

MIT