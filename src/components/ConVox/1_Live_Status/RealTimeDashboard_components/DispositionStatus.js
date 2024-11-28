import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const DispositionStatus = () => {
    const [data, setData] = useState({
        labels: ['Disposition 1', 'Disposition 2', 'Disposition 3', 'Disposition 4', 'Disposition 5'],
        datasets: [
            {
                label: 'Calls',
                backgroundColor: ['#1ABCE2', '#BE1E2D', '#6B4089', '#2D93ED', '#ED15A5'],
                data: [12, 19, 3, 5, 2],
            },
        ],
    });

    useEffect(() => {
        // Use random placeholder data
        const randomData = Array.from({ length: 5 }, () => Math.floor(Math.random() * 20));
        setData({
            labels: ['Disposition 1', 'Disposition 2', 'Disposition 3', 'Disposition 4', 'Disposition 5'],
            datasets: [
                {
                    label: 'Calls',
                    backgroundColor: ['#1ABCE2', '#BE1E2D', '#6B4089', '#2D93ED', '#ED15A5'],
                    data: randomData,
                },
            ],
        });
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Disposition Status',
            },
        },
    };

    return (
        <div className="mb-6">
            <h3 className="text-xl text-center font-bold" style={{ backgroundColor: '#04aa6d', color: '#fff' }}>Disposition Status</h3>
            <div className='flex shadow-sm justify-center items-center h-48'>
                <Pie data={data} options={options} />
            </div>
        </div>
    );
};

export default DispositionStatus;