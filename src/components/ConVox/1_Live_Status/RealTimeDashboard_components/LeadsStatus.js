import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register the required components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const LeadsStatus = () => {
    const [data, setData] = useState({
        labels: ['Lead 1', 'Lead 2', 'Lead 3', 'Lead 4', 'Lead 5'],
        datasets: [
            {
                label: 'Leads Status',
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                data: [12, 19, 3, 5, 2],
            },
        ],
    });

    useEffect(() => {
        // Use random placeholder data
        const randomData = Array.from({ length: 5 }, () => Math.floor(Math.random() * 20));
        setData({
            labels: ['Lead 1', 'Lead 2', 'Lead 3', 'Lead 4', 'Lead 5'],
            datasets: [
                {
                    label: 'Leads Status',
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                    data: randomData,
                },
            ],
        });
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Leads Status',
            },
        },
    };

    return (
        <div className="mb-8">
            <h3 className="text-xl text-center font-bold" style={{ backgroundColor: '#04aa6d', color: '#fff' }}>Leads Status</h3>
            <div className='flex justify-center items-center h-48'>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default LeadsStatus;