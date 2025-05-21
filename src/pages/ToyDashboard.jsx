import { useEffect, useState } from 'react'
import { GoogleMapCmp } from '../cmps/GoogleMap'
import { LabelsBarChart } from '../cmps/LabelsBarChart'
import { LabelsDoughnut } from '../cmps/LabelsDoughnut'
import { LabelsLineChart } from '../cmps/LabelsLineChart'
import { toyService } from '../services/toy.service.js'
import { Loader } from '../cmps/Loader.jsx'

export function ToyDashboard() {

    const [labelCounts, setLabelCounts] = useState(null)

    useEffect(() => {
        loadLabels()
    }, [])

    function loadLabels() {
        toyService.getToyLabelCounts()
            .then(labelCounts => {
                console.log('labelCounts:', labelCounts)
                setLabelCounts(labelCounts)
            })
    }

    if (!labelCounts) return <Loader />
    return (
        <section className="toy-dashboard">
            <LabelsDoughnut labelCounts={labelCounts} />
            <LabelsBarChart labelCounts={labelCounts} />
            <LabelsLineChart />
        </section>
    )
}
