import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import TopFiveAgents from './RealTimeDashboard_components/TopFiveAgents';
import InboundCallsStatus from './RealTimeDashboard_components/InboundCallsStatus';
import OutboundCallsStatus from './RealTimeDashboard_components/OutboundCallsStatus';
import AgentStatus from './RealTimeDashboard_components/AgentStatus';
import TotalCallsInQueue from './RealTimeDashboard_components/TotalCallsInQueue';
import InboundAbandonedRate from './RealTimeDashboard_components/InboundAbandonedRate';
import DispositionStatus from './RealTimeDashboard_components/DispositionStatus';
import LeadsStatus from './RealTimeDashboard_components/LeadsStatus';
import logo from '../../../assets/images/ConVox/logo_convox_realtime_dashboard.png';

const RealTimeDashboard = () => {
    useEffect(() => {
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const updateTime = () => {
        const now = new Date();
        const formattedTime = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }) + ' ' + now.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const serverTimeElement = document.getElementById('server-time-text');
        if (serverTimeElement) {
            serverTimeElement.textContent = 'Server time - ' + formattedTime;
        }
    };

    return (
        <div className="mx-auto p-4 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
            <Helmet>
                <title>Real Time Dashboard - ConVox</title>
            </Helmet>
            <header className="flex justify-between items-center mb-4">
                <div>
                    {/* <h3><span className="text-2xl font-bold text-red-500 my-0">Con</span><span className="text-2xl font-bold text-blue-800 my-0">Vox</span></h3>
                    <p className="text-right font-bold text-base px-12 my-0">Real Time Dashboard</p> */}
                    <img src={logo} alt="ConVox Logo Dashboard" className="h-16 w-auto object-contain ml-8" />
                </div>
                <div className="server-time flex items-center">
                    <i className="fa-solid fa-server mr-2"></i>
                    <i className="fa-regular fa-clock mr-2"></i>
                    <span id="server-time-text"></span>
                </div>
                <div>
                    <form>
                        <label htmlFor="process">Process: </label>
                        <select name="process" id="process">
                            <option disabled value="">Select a process</option>
                            <option value="CCS_3_3">CCS_5_0_1</option>
                            <option value="ConVoxProcess">ConVoxProcess</option>
                        </select>
                    </form>
                </div>
            </header>
            <main className="grid grid-cols-1 md:grid-cols-3 gap-1">
                <div className="col-span-1">
                    <TopFiveAgents />
                    <AgentStatus />
                </div>
                <div className="col-span-1">
                    <InboundCallsStatus />
                    <InboundAbandonedRate />
                    <LeadsStatus />
                </div>
                <div className="col-span-1">
                    <OutboundCallsStatus />
                    <DispositionStatus />
                    <TotalCallsInQueue />
                </div>
            </main>
        </div>
    );
};

export default RealTimeDashboard;