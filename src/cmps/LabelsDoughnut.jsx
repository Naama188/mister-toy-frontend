import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js'

import { Doughnut } from 'react-chartjs-2'

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export function LabelsDoughnut({ labelCounts = {} }) {

    function getData(labelCounts) {
        const data = {
            labels: Object.keys(labelCounts),
            datasets: [
                {
                    label: '# of Toys',
                    data: Object.values(labelCounts).map(labelData => labelData.total),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(128, 128, 128, 0.2)',
                        'rgba(0, 255, 128, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(128, 128, 128, 1)',
                        'rgba(0, 128, 0, 1)',
                    ],
                    borderWidth: 1,
                    hoverOffset: 30
                },
            ],
        }
        return data
    }

    const data = getData(labelCounts)
    return (
        <Doughnut data={data} />
    )
}
