import React, { useEffect, useState } from 'react';

const TotalCallsInQueue = () => {
    const [callsInQueue, setCallsInQueue] = useState(0);

    useEffect(() => {
        const updateCallsInQueue = () => {
            // Use random placeholder data
            const randomCallsInQueue = Math.floor(Math.random() * 100) + 1;
            setCallsInQueue(randomCallsInQueue);
        };

        // Initial update
        updateCallsInQueue();

        // Update every 5 seconds
        const interval = setInterval(updateCallsInQueue, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mb-8">
            <h3 className="text-xl text-center font-bold" style={{ backgroundColor: '#04aa6d', color: '#fff' }}>Total Calls in Queue</h3>
            <div className="text-center">
                <h2 className="text-2xl bg-red-500 rounded-full w-24 h-24 flex items-center justify-center mx-auto mt-10">{callsInQueue}</h2>
                <p className="text-lg">Calls Waiting</p>
            </div>
        </div>
    );
};

export default TotalCallsInQueue;