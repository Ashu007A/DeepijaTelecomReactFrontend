import React, { useEffect, useState } from 'react';
import Agent from '../../../../assets/images/ConVox/agent.png';

const TopFiveAgents = () => {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        // Use random placeholder data instead of fetching from backend
        const placeholderData = [
            { name: 'Agent1', callsHandled: Math.floor(Math.random() * 100) + 1 },
            { name: 'Agent2', callsHandled: Math.floor(Math.random() * 100) + 1 },
            { name: 'Agent3', callsHandled: Math.floor(Math.random() * 100) + 1 },
            { name: 'Agent4', callsHandled: Math.floor(Math.random() * 100) + 1 },
            { name: 'Agent5', callsHandled: Math.floor(Math.random() * 100) + 1 },
        ];
        setAgents(placeholderData);
    }, []);

    return (
        <section className="mb-8">
            <h3 className="text-xl text-center font-bold" style={{ backgroundColor: '#04aa6d', color: '#fff' }}>Top Five Agents</h3>
            <div className="top_agents">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden justify-between items-center text-center">
                    <thead>
                        <tr className='bg-gray-200'>
                            <th className="py-2">Image</th>
                            <th className="py-2">Agent Name</th>
                            <th className="py-2">Calls Handled</th>
                        </tr>
                    </thead>
                    <tbody>
                        {agents.map((agent, index) => (
                            <tr key={index}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d1e7dd'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                                className="border-b"
                            >
                                <td className="py-2 text-center">
                                    <img src={Agent} className="h-10 w-10 rounded-full mx-auto" alt="Agent" />
                                </td>
                                <td className="py-2 text-center">{agent.name}</td>
                                <td className="py-2 text-center">{agent.callsHandled}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default TopFiveAgents;