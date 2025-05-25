import { Bar } from 'react-chartjs-2';


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: (context) => `%${context.formattedValue}`,
            },
        },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: value => `%${value}`,
            },
        },
    },
}

export function LabelsBarChart({ labelCounts = {} }) {

    function getData(labelCounts) {
        const data = {
            labels: [],
            datasets: [
                {
                    label: 'In Stock',
                    data: [],
                    backgroundColor: 'rgb(255, 99, 132)',
                    stack: 'Stack 0',
                },
                {
                    label: 'Total',
                    data: [],
                    backgroundColor: 'rgb(75, 192, 192)',
                    stack: 'Stack 0',
                },

            ],
        }
        const labels = Object.keys(labelCounts)
        const dataInStock = []
        const dataTotal = []
        labels.forEach(label => {
            const labelData = labelCounts[label]
            const labelInStockPercent = labelData.inStock / labelData.total * 100
            dataInStock.push(labelInStockPercent)
            dataTotal.push(100 - labelInStockPercent)
        })
        data.labels= labelCounts.map(item => item.label),
        data.datasets[0].data = dataInStock
        data.datasets[1].data = dataTotal
        return data
    }

    const data = getData(labelCounts)
    return (
        <Bar options={options} data={data} />
    )
}
