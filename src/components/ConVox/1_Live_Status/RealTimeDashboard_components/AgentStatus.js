import React, { useEffect, useState } from 'react';

const AgentStatus = () => {
    const [agentStatus, setAgentStatus] = useState({
        total: 0,
        onCall: 0,
        idle: 0,
        others: 0,
    });

    useEffect(() => {
        // Use random placeholder data
        const placeholderStatus = {
            total: Math.floor(Math.random() * 100) + 1,
            onCall: Math.floor(Math.random() * 50),
            idle: Math.floor(Math.random() * 30),
            others: Math.floor(Math.random() * 20),
        };
        setAgentStatus(placeholderStatus);
    }, []);

    const getBackgroundColor = (status) => {
        switch (status) {
            case 'total':
                return '#FF6384';
            case 'onCall':
                return '#4BC0C0';
            case 'idle':
                return '#36A2EB';
            case 'others':
                
                return '#FFCE56';
            default:
                return '#E0E0E0';
        }
    };

    return (
        <section className="mb-8">
            <h3 className="text-xl text-center font-bold" style={{ backgroundColor: '#04aa6d', color: '#fff' }}>Agent Status</h3>
            <div className="grid grid-cols-2 gap-2">
                <div className="p-4 rounded-lg shadow-sm text-center">
                    <h4 className="text-lg font-bold">Total Agents</h4>
                    <p className="text-2xl bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto" style={{ backgroundColor: getBackgroundColor('total') }}>{agentStatus.total}</p>
                </div>
                <div className="p-4 rounded-lg shadow-sm text-center">
                    <h4 className="text-lg font-bold">On Call</h4>
                    <p className="text-2xl bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto" style={{ backgroundColor: getBackgroundColor('onCall') }}>{agentStatus.onCall}</p>
                </div>
                <div className="p-4 rounded-lg shadow-md text-center">
                    <h4 className="text-lg font-bold">Idle</h4>
                    <p className="text-2xl bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto" style={{ backgroundColor: getBackgroundColor('idle') }}>{agentStatus.idle}</p>
                </div>
                <div className="p-4 rounded-lg shadow-md text-center">
                    <h4 className="text-lg font-bold">Others</h4>
                    <p className="text-2xl bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto" style={{ backgroundColor: getBackgroundColor('others') }}>{agentStatus.others}</p>
                </div>
            </div>
        </section>
    );
};

export default AgentStatus;