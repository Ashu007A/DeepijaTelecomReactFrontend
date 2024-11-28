import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const InboundAbandonedRate = () => {
    const [data, setData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Abandoned Rate',
                backgroundColor: '#BE1E2D',
                data: [12, 19, 3, 5, 2, 3],
            },
        ],
    });

    useEffect(() => {
        // Use random placeholder data
        const randomData = Array.from({ length: 6 }, () => Math.floor(Math.random() * 20));
        setData({
            labels: ['January', 'February', 'March', 'April', 'May', 'June'],
            datasets: [
                {
                    label: 'Abandoned Rate',
                    backgroundColor: '#BE1E2D',
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
                text: 'Inbound Abandoned Rate',
            },
        },
    };

    return (
        <div className="mb-6">
            <h3 className="text-xl text-center font-bold" style={{ backgroundColor: '#04aa6d', color: '#fff' }}>Inbound Abandoned Rate</h3>
            <div className='flex shadow-sm justify-center items-center h-48'>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default InboundAbandonedRate;