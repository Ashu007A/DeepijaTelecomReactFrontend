import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Sidebar = () => {
    const location = useLocation();
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        setActiveLink(location.pathname);
        loadSidebarState();
    }, [location]);
    
    const setActiveLink = (path) => {
        const links = document.querySelectorAll('.menu-links a');
        links.forEach(link => {
            const parentSection = link.closest('.menu-section');
            if (link.getAttribute('href') === path) {
                link.classList.add('active');
                if (parentSection) {
                    parentSection.querySelector('h3').classList.add('active-section');
                }
            } else {
                link.classList.remove('active');
                if (parentSection) {
                    const activeLinks = parentSection.querySelectorAll('.menu-links a.active');
                    if (activeLinks.length === 0) {
                        parentSection.querySelector('h3').classList.remove('active-section');
                    }
                }
            }
        });
    };
    
    const toggleSidebar = () => {
        const sidebar = document.getElementById("sidebar");
        const toggleButton = document.querySelector('.toggle-btn');
        if (sidebar) {
            sidebar.classList.toggle("collapsed");
            document.getElementById("main-content").classList.toggle("expanded");
        }
        if (toggleButton) {
            toggleButton.classList.toggle('rotate');
        }
        setIsCollapsed(!isCollapsed);
        saveSidebarState();
    };

    const toggleSection = (e) => {
        const section = e.currentTarget.nextSibling;
        const toggleIcon = e.currentTarget.querySelector('.toggle-icon');
        const allSections = document.querySelectorAll('.menu-links');
        const allIcons = document.querySelectorAll('.menu-section .toggle-icon');

        // Hide all sections and reset all icons
        allSections.forEach(sec => {
            if (sec !== section) {
                sec.classList.remove('show');
            }
        });

        allIcons.forEach(icon => {
            if (icon !== toggleIcon) {
                icon.classList.remove('rotate');
            }
        });

        section.classList.toggle('show');
        toggleIcon.classList.toggle('rotate');

        // Save sidebar state
        saveSidebarState();
    };

    const loadSidebarState = () => {
        const sidebarState = JSON.parse(localStorage.getItem('sidebarState')) || {
            sections: {},
            isCollapsed: false
        };
        const sections = document.querySelectorAll('.menu-section');
        sections.forEach((section, index) => {
            if (sidebarState.sections && sidebarState.sections[index]) {
                section.querySelector('.menu-links').classList.add('show');
                section.querySelector('.toggle-icon').classList.add('rotate');
            }
        }); 
        if (sidebarState.isCollapsed) {
            document.getElementById("sidebar").classList.add('collapsed');
            document.getElementById("main-content").classList.add('expanded');
            setIsCollapsed(true);
        }
    };
    const saveSidebarState = () => {
        const sidebarState = {
            sections: {},
            isCollapsed: false
        };
        const sections = document.querySelectorAll('.menu-section');
        sections.forEach((section, index) => {
            sidebarState.sections[index] = section.querySelector('.menu-links').classList.contains('show');
        });
        sidebarState.isCollapsed = document.getElementById("sidebar").classList.contains('collapsed');
        localStorage.setItem('sidebarState', JSON.stringify(sidebarState));
    };

    return (
        <div id="sidebar" className="sidebar bg-cyan-200 py-7 px-2 h-full overflow-y-auto transition-all duration-300 col-span-1 row-span-3">
            <Link to="#" className="toggle-btn text-gray-700 hover:bg-gray-700 hover:text-white hover:text-lg block px-4 py-2 rounded-md text-base font-medium" onClick={toggleSidebar}>
                <i className="fas fa-bars"></i>
            </Link>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection} title={isCollapsed ? "Live Status" : ""}>
                    <i className="fas fa-chart-line font-icon pr-1"></i>
                    <span> Live Status</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <Link to="/convox/process-status" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Process Status" : ""}>
                        <i className="fas fa-cogs pr-2"></i>
                        <span>Process Status</span>
                    </Link>
                    <Link to="/convox/trunk-status" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Trunk Status" : ""}>
                        <i className="fas fa-network-wired pr-2"></i>
                        <span>Trunk Status</span>
                    </Link>
                    <Link to="/convox/queues-status" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Queue Status" : ""}>
                        <i className="fas fa-stream pr-2"></i>
                        <span>Queues Status</span>
                    </Link>
                    <Link to="/convox/real-time-dashboard" target="_blank" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Dash Board" : ""}>
                        <i className="fas fa-chart-line pr-2"></i>
                        <span>Real Time Dashboard</span>
                    </Link>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection} title={isCollapsed ? "Debug Tools" : ""}>
                    <i className="fas fa-tools font-icon pr-2"></i>
                    <span>Debug Tools</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <Link to="/convox/web-panel" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "ConVox Web Panel" : ""}>
                        <i className="fas fa-tools pr-2"></i>
                        <span>ConVox Web Panel</span>
                    </Link>
                    <Link to="/convox/database-status" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Database Status" : ""}>
                        <i className="fas fa-database pr-2"></i>
                        <span>Database Status</span>
                    </Link>
                    <Link to="/convox/screens" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "ConVox Screens" : ""}>
                        <i className="fas fa-tv pr-2"></i>
                        <span>ConVox Screens</span>
                    </Link>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection} title={isCollapsed ? "System Config" : ""}>
                    <i className="fas fa-cogs font-icon pr-2"></i>
                    <span>System Config</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <Link to="/convox/servers" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Servers" : ""}>
                        <i className="fas fa-server pr-2"></i>
                        <span>Servers</span>
                    </Link>
                    <Link to="/convox/web-servers" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Web Servers" : ""}>
                        <i className="fas fa-globe pr-2"></i>
                        <span>Web Servers</span>
                    </Link>
                    <Link to="/convox/stations" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Stations" : ""}>
                        <i className="fas fa-network-wired pr-2"></i>
                        <span>Stations</span>
                    </Link>
                    <Link to="/convox/internal-stations" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Internal Stations" : ""}>
                        <i className="fas fa-sitemap pr-2"></i>
                        <span>Internal Stations</span>
                    </Link>
                    <Link to="/convox/lock-out-release" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Lock Out Release" : ""}>
                        <i className="fas fa-unlock-alt pr-2"></i>
                        <span>Lock Out Release</span>
                    </Link>
                    <Link to="/convox/lockout-settings" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Lockout Settings" : ""}>
                        <i className="fas fa-cog pr-2"></i>
                        <span>Lockout Settings</span>
                    </Link>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection} title={isCollapsed ? "Call Routing" : ""}>
                    <i className="fas fa-route font-icon pr-2"></i>
                    <span>Call Routing</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <Link to="/convox/inbound-routes" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Inbound Routes" : ""}>
                        <i className="fas fa-sign-in-alt pr-2"></i>
                        <span>Inbound Routes</span>
                    </Link>
                    <Link to="/convox/outbound-trunks" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Outbound Trunks" : ""}>
                        <i className="fas fa-sign-out-alt pr-2"></i>
                        <span>Outbound Trunks</span>
                    </Link>
                    <Link to="/convox/outbound-routes" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Outbound Routes" : ""}>
                        <i className="fas fa-route pr-2"></i>
                        <span>Outbound Routes</span>
                    </Link>
                    <Link to="/convox/call-forward-routes" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Call Forward Routes" : ""}>
                        <i className="fas fa-forward pr-2"></i>
                        <span>Call Forward Routes</span>
                    </Link>
                    <Link to="/convox/hot-transfer-routes" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Hot Transfer Routes" : ""}>
                        <i className="fas fa-random pr-2"></i>
                        <span>Hot Transfer Routes</span>
                    </Link>
                    <Link to="/convox/service-providers" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Service Providers" : ""}>
                        <i className="fas fa-concierge-bell pr-2"></i>
                        <span>Service Providers</span>
                    </Link>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection} title={isCollapsed ? "ACD and Queue" : ""}>
                    <i className="fas fa-stream font-icon pr-2"></i>
                    <span>ACD and Queue</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <Link to="/convox/users" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Users" : ""}>
                        <i className="fas fa-users pr-2"></i>
                        <span>Users</span>
                    </Link>
                    <Link to="/convox/process" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Process" : ""}>
                        <i className="fas fa-tasks pr-2"></i>
                        <span>Process</span>
                    </Link>
                    <Link to="/convox/queues" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Queues" : ""}>
                        <i className="fas fa-stream pr-2"></i>
                        <span>Queues</span>
                    </Link>
                    <Link to="/convox/breaks" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Breaks" : ""}>
                        <i className="fas fa-coffee pr-2"></i>
                        <span>Breaks</span>
                    </Link>
                    <Link to="/convox/dispositions" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Dispositions" : ""}>
                        <i className="fas fa-clipboard-list pr-2"></i>
                        <span>Dispositions</span>
                    </Link>
                    <Link to="/convox/sub-disposition" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Sub Disposition" : ""}>
                        <i className="fas fa-clipboard-check pr-2"></i>
                        <span>Sub Disposition</span>
                    </Link>
                    <Link to="/convox/sub-sub-disposition" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Sub-Sub Disposition" : ""}>
                        <i className="fas fa-clipboard pr-2"></i>
                        <span>Sub-Sub Disposition</span>
                    </Link>
                    <Link to="/convox/lead-re-attempts" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Lead Re-Attempts" : ""}>
                        <i className="fas fa-redo-alt pr-2"></i>
                        <span>Lead Re-Attempts</span>
                    </Link>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection} title={isCollapsed ? "CRM" : ""}>
                    <i className="fas fa-address-book font-icon pr-2"></i>
                    <span>CRM</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <Link to="/convox/crm" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "CRM" : ""}>
                        <i className="fas fa-address-book pr-2"></i>
                        <span>CRM</span>
                    </Link>
                    <Link to="/convox/lists" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Lists" : ""}>
                        <i className="fas fa-list pr-2"></i>
                        <span>Lists</span>
                    </Link>
                    <Link to="/convox/callback-assignments" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Callback Assignments" : ""}>
                        <i className="fas fa-phone-alt pr-2"></i>
                        <span>Callback Assignments</span>
                    </Link>
                    <Link to="/convox/scripts" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Scripts" : ""}>
                        <i className="fas fa-file-alt pr-2"></i>
                        <span>Scripts</span>
                    </Link>
                    <Link to="/convox/block-caller" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Block Caller" : ""}>
                        <i className="fas fa-ban pr-2"></i>
                        <span>Block Caller</span>
                    </Link>
                    <Link to="/convox/custom-missed-settings" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Custom Missed Settings" : ""}>
                        <i className="fas fa-cogs pr-2"></i>
                        <span>Custom Missed Settings</span>
                    </Link>
                    <Link to="/convox/auto-email-settings" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Auto Email Settings" : ""}>
                        <i className="fas fa-envelope pr-2"></i>
                        <span>Auto Email Settings</span>
                    </Link>
                    <Link to="/convox/ivr-callback-lead-settings" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "IVR-Callback Lead Settings" : ""}>
                        <i className="fas fa-headset pr-2"></i>
                        <span>IVR-Callback Lead Settings</span>
                    </Link>
                    <Link to="/convox/add-agent" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Add agent" : ""}>
                        <i className="fas fa-user-plus pr-2"></i>
                        <span>Add Agent</span>
                    </Link>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection} title={isCollapsed ? "IVR" : ""}>
                    <i className="fas fa-voicemail font-icon pr-2"></i>
                    <span>IVR</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <Link to="/convox/audio-files" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Audio Files" : ""}>
                        <i className="fas fa-music pr-2"></i>
                        <span>Audio Files</span>
                    </Link>
                    <Link to="/convox/recoding-studio" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Recording Studio" : ""}>
                        <i className="fas fa-microphone pr-2"></i>
                        <span>Recording Studio</span>
                    </Link>
                    <Link to="/convox/ivrs" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "IVRS" : ""}>
                        <i className="fas fa-voicemail pr-2"></i>
                        <span>IVRS</span>
                    </Link>
                    <Link to="/convox/customer-feedback" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Customer Feedback" : ""}>
                        <i className="fas fa-comments pr-2"></i>
                        <span>Customer Feedback</span>
                    </Link>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection} title={isCollapsed ? "WhatsApp" : ""}>
                    <i className="fas fa-comments font-icon pr-2"></i>
                    <span>WhatsApp</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <Link to="https://h248.deepijatel.in/ConVoxCMC/Internal/login_sso?agent_id=admin&password=admin" target="_blank" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "WhatsApp Admin" : ""}>
                        <i className="fas fa-comments pr-2"></i>
                        <span>WhatsApp Admin</span>
                    </Link>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection} title={isCollapsed ? "ConVox Email" : ""}>
                    <i className="fas fa-envelope font-icon pr-2"></i>
                    <span>ConVox Email</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <Link to="https://h248.deepijatel.in/ConVoxCMC/Internal/login_sso?agent_id=admin&password=admin" target="_blank" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "ConVox Email" : ""}>
                        <i className="fas fa-envelope pr-2"></i>
                        <span>ConVox Email</span>
                    </Link>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection} title={isCollapsed ? "Quality Module" : ""}>
                    <i className="fas fa-star font-icon pr-2"></i>
                    <span>Quality Module</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <Link to="/convox/quality-module" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Quality Module" : ""}>
                        <i className="fas fa-star pr-2"></i>
                        <span>Quality Module</span>
                    </Link>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection} title={isCollapsed ? "Agent Analysis" : ""}>
                    <i className="fas fa-user-check font-icon pr-2"></i>
                    <span>Agent Analysis</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <Link to="/convox/agent-login-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Agent Login Report" : ""}>
                        <i className="fas fa-sign-in-alt pr-2"></i>
                        <span>Agent Login Report</span>
                    </Link>
                    <Link to="/convox/agent-performance-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Agent Performance Report" : ""}>
                        <i className="fas fa-chart-line pr-2"></i>
                        <span>Agent Performance Report</span>
                    </Link>
                    <Link to="/convox/agent-disposition-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Agent Disposition Report" : ""}>
                        <i className="fas fa-user-tag pr-2"></i>
                        <span>Agent Disposition Report</span>
                    </Link>
                    <Link to="/convox/queue-performance-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Queue Performance Report" : ""}>
                        <i className="fas fa-tasks pr-2"></i>
                        <span>Queue Performance Report</span>
                    </Link>
                    <Link to="/convox/leads-summary-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Leads Summary Report" : ""}>
                        <i className="fas fa-list-ul pr-2"></i>
                        <span>Leads Summary Report</span>
                    </Link>
                    <Link to="/convox/agent-lockout-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Agent Lockout Report" : ""}>
                        <i className="fas fa-lock pr-2"></i>
                        <span>Agent Lockout Report</span>
                    </Link>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection} title={isCollapsed ? "Process Analysis" : ""}>
                    <i className="fas fa-chart-pie font-icon pr-2"></i>
                    <span>Process Analysis</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <Link to="/convox/process-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Process Report" : ""}>
                        <i className="fas fa-chart-pie pr-2"></i>
                        <span>Process Report</span>
                    </Link>
                    <Link to="/convox/predictive-outbound-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Predictive Outbound Report" : ""}>
                        <i className="fas fa-chart-bar pr-2"></i>
                        <span>Predictive Outbound Report</span>
                    </Link>
                    <Link to="/convox/preview-outbound-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Preview Outbound Report" : ""}>
                        <i className="fas fa-chart-area pr-2"></i>
                        <span>Preview Outbound Report</span>
                    </Link>
                    <Link to="/convox/progressive-outbound-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Progressive Outbound Report" : ""}>
                        <i className="fas fa-chart-line pr-2"></i>
                        <span>Progressive Outbound Report</span>
                    </Link>
                    <Link to="/convox/call-recording-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Call Recording Report" : ""}>
                        <i className="fas fa-microphone-alt pr-2"></i>
                        <span>Call Recording Report</span>
                    </Link>
                    <Link to="/convox/dnc-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "DNC Report" : ""}>
                        <i className="fas fa-ban pr-2"></i>
                        <span>DNC Report</span>
                    </Link>
                    <Link to="/convox/cdr-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "CDR Report" : ""}>
                        <i className="fas fa-file-alt pr-2"></i>
                        <span>CDR Report</span>
                    </Link>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection} title={isCollapsed ? "Call Traffic Analysis" : ""}>
                    <i className="fas fa-phone font-icon pr-2"></i>
                    <span>Call Traffic Analysis</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <Link to="/convox/call-hits" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Call Hits" : ""}>
                        <i className="fas fa-phone pr-2"></i>
                        <span>Call Hits</span>
                    </Link>
                    <Link to="/convox/follow-up-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Follow-Up Report" : ""}>
                        <i className="fas fa-file-alt pr-2"></i>
                        <span>Follow-Up Report</span>
                    </Link>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection} title={isCollapsed ? "Conference Analysis" : ""}>
                    <i className="fas fa-users font-icon pr-2"></i>
                    <span>Conference Analysis</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <Link to="/convox/conference-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white" title={isCollapsed ? "Conference Report" : ""}>
                        <i className="fas fa-users pr-2"></i>
                        <span>Conference Report</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;