import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const OutboundCallsStatus = () => {
    const [data, setData] = useState({
        labels: ['Answered', 'Unanswered'],
        datasets: [
            {
                label: 'Outbound Calls Status',
                backgroundColor: ['#1ABCE2', '#BE1E2D'],
                data: [0, 0],
            },
        ],
    });

    useEffect(() => {
        // Use random placeholder data
        const randomData = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
        setData({
            labels: ['Answered', 'Unanswered'],
            datasets: [
                {
                    label: 'Outbound Calls Status',
                    backgroundColor: ['#1ABCE2', '#BE1E2D'],
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
                text: 'Outbound Calls Status',
            },
        },
    };

    return (
        <div className="mb-6">
            <h3 className="text-xl text-center font-bold" style={{ backgroundColor: '#04aa6d', color: '#fff' }}>Outbound Calls Status</h3>
            <div className='flex justify-center items-center h-48'>
                <Doughnut data={data} options={options} />
            </div>
        </div>
    );
};

export default OutboundCallsStatus;