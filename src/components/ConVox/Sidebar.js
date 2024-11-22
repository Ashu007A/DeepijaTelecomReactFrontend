import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Sidebar = () => {
    const location = useLocation();

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
            <a href="#" className="toggle-btn text-gray-700 hover:bg-gray-700 hover:text-white hover:text-lg block px-4 py-2 rounded-md text-base font-medium" onClick={toggleSidebar}>
                <i className="fas fa-bars"></i>
            </a>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection}>
                    <i className="fas fa-chart-line font-icon pr-1"></i>
                    <span> Live Status</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <a href="/convox/process-status" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-cogs pr-2"></i>
                        <span>Process Status</span>
                    </a>
                    <a href="/convox/trunk-status" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-network-wired pr-2"></i>
                        <span>Trunk Status</span>
                    </a>
                    <a href="/convox/queues-status" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-stream pr-2"></i>
                        <span>Queues Status</span>
                    </a>
                    <a href="/convox/real-time-dashboard" target="_blank" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-chart-line pr-2"></i>
                        <span>Dash Board</span>
                    </a>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection}>
                    <i className="fas fa-tools font-icon pr-2"></i>
                    <span>Debug Tools</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <a href="/convox/web-panel" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-tools pr-2"></i>
                        <span>ConVox Web Panel</span>
                    </a>
                    <a href="/convox/database-status" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-database pr-2"></i>
                        <span>Database Status</span>
                    </a>
                    <a href="/convox/screens" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-tv pr-2"></i>
                        <span>ConVox Screens</span>
                    </a>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection}>
                    <i className="fas fa-cogs font-icon pr-2"></i>
                    <span>System Config</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <a href="/convox/servers" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-server pr-2"></i>
                        <span>Servers</span>
                    </a>
                    <a href="/convox/web-servers" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-globe pr-2"></i>
                        <span>Web Servers</span>
                    </a>
                    <a href="/convox/stations" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-network-wired pr-2"></i>
                        <span>Stations</span>
                    </a>
                    <a href="/convox/internal-stations" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-sitemap pr-2"></i>
                        <span>Internal Stations</span>
                    </a>
                    <a href="/convox/lock-out-release" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-unlock-alt pr-2"></i>
                        <span>Lock Out Release</span>
                    </a>
                    <a href="/convox/lockout-settings" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-cog pr-2"></i>
                        <span>Lockout Settings</span>
                    </a>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection}>
                    <i className="fas fa-route font-icon pr-2"></i>
                    <span>Call Routing</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <a href="/convox/inbound-routes" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-sign-in-alt pr-2"></i>
                        <span>Inbound Routes</span>
                    </a>
                    <a href="/convox/outbound-trunks" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-sign-out-alt pr-2"></i>
                        <span>Outbound Trunks</span>
                    </a>
                    <a href="/convox/outbound-routes" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-route pr-2"></i>
                        <span>Outbound Routes</span>
                    </a>
                    <a href="/convox/call-forward-routes" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-forward pr-2"></i>
                        <span>Call Forward Routes</span>
                    </a>
                    <a href="/convox/hot-transfer-routes" className="blockpx-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-random pr-2"></i>
                        <span>Hot Transfer Routes</span>
                    </a>
                    <a href="/convox/service-providers" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-concierge-bell pr-2"></i>
                        <span>Service Providers</span>
                    </a>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection}>
                    <i className="fas fa-stream font-icon pr-2"></i>
                    <span>ACD and Queue</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <a href="/convox/users" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-users pr-2"></i>
                        <span>Users</span>
                    </a>
                    <a href="/convox/process" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-tasks pr-2"></i>
                        <span>Process</span>
                    </a>
                    <a href="/convox/queues" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-stream pr-2"></i>
                        <span>Queues</span>
                    </a>
                    <a href="/convox/breaks" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-coffee pr-2"></i>
                        <span>Breaks</span>
                    </a>
                    <a href="/convox/dispositions" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-clipboard-list pr-2"></i>
                        <span>Dispositions</span>
                    </a>
                    <a href="/convox/sub-disposition" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-clipboard-check pr-2"></i>
                        <span>Sub Disposition</span>
                    </a>
                    <a href="/convox/sub-sub-disposition" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-clipboard pr-2"></i>
                        <span>Sub-Sub Disposition</span>
                    </a>
                    <a href="/convox/lead-re-attempts" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-redo-alt pr-2"></i>
                        <span>Lead Re-Attempts</span>
                    </a>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection}>
                    <i className="fas fa-address-book font-icon pr-2"></i>
                    <span>CRM</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <a href="/convox/crm" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-address-book pr-2"></i>
                        <span>CRM</span>
                    </a>
                    <a href="/convox/lists" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-list pr-2"></i>
                        <span>Lists</span>
                    </a>
                    <a href="/convox/callback-assignments" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-phone-alt pr-2"></i>
                        <span>Callback Assignments</span>
                    </a>
                    <a href="/convox/scripts" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-file-alt pr-2"></i>
                        <span>Scripts</span>
                    </a>
                    <a href="/convox/block-caller" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-ban pr-2"></i>
                        <span>Block Caller</span>
                    </a>
                    <a href="/convox/custom-missed-settings" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-cogs pr-2"></i>
                        <span>Custom Missed Settings</span>
                    </a>
                    <a href="/convox/auto-email-settings" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-envelope pr-2"></i>
                        <span>Auto Email Settings</span>
                    </a>
                    <a href="/convox/ivr-callback-lead-settings" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-headset pr-2"></i>
                        <span>IVR-Callback Lead Settings</span>
                    </a>
                    <a href="/convox/add-agent" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-user-plus pr-2"></i>
                        <span>Add Agent</span>
                    </a>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection}>
                    <i className="fas fa-voicemail font-icon pr-2"></i>
                    <span>IVR</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <a href="/convox/audio-files" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-music pr-2"></i>
                        <span>Audio Files</span>
                    </a>
                    <a href="/convox/recoding-studio" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-microphone pr-2"></i>
                        <span>Recording Studio</span>
                    </a>
                    <a href="/convox/ivrs" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-voicemail pr-2"></i>
                        <span>IVRS</span>
                    </a>
                    <a href="/convox/customer-feedback" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-comments pr-2"></i>
                        <span>Customer Feedback</span>
                    </a>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection}>
                    <i className="fas fa-comments font-icon pr-2"></i>
                    <span>WhatsApp</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <a href="https://h248.deepijatel.in/ConVoxCMC/Internal/login_sso?agent_id=admin&password=admin" target="_blank" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-comments pr-2"></i>
                        <span>WhatsApp Admin</span>
                    </a>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection}>
                    <i className="fas fa-envelope font-icon pr-2"></i>
                    <span>ConVox Email</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <a href="https://h248.deepijatel.in/ConVoxCMC/Internal/login_sso?agent_id=admin&password=admin" target="_blank" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-envelope pr-2"></i>
                        <span>ConVox Email</span>
                    </a>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection}>
                    <i className="fas fa-star font-icon pr-2"></i>
                    <span>Quality Module</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <a href="/convox/quality-module" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-star pr-2"></i>
                        <span>Quality Module</span>
                    </a>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection}>
                    <i className="fas fa-user-check font-icon pr-2"></i>
                    <span>Agent Analysis</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <a href="/convox/agent-login-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-sign-in-alt pr-2"></i>
                        <span>Agent Login Report</span>
                    </a>
                    <a href="/convox/agent-performance-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-chart-line pr-2"></i>
                        <span>Agent Performance Report</span>
                    </a>
                    <a href="/convox/agent-disposition-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-user-tag pr-2"></i>
                        <span>Agent Disposition Report</span>
                    </a>
                    <a href="/convox/queue-performance-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-tasks pr-2"></i>
                        <span>Queue Performance Report</span>
                    </a>
                    <a href="/convox/leads-summary-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-list-ul pr-2"></i>
                        <span>Leads Summary Report</span>
                    </a>
                    <a href="/convox/agent-lockout-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-lock pr-2"></i>
                        <span>Agent Lockout Report</span>
                    </a>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection}>
                    <i className="fas fa-chart-pie font-icon pr-2"></i>
                    <span>Process Analysis</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <a href="/convox/process-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-chart-pie pr-2"></i>
                        <span>Process Report</span>
                    </a>
                    <a href="/convox/predictive-outbound-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-chart-bar pr-2"></i>
                        <span>Predictive Outbound Report</span>
                    </a>
                    <a href="/convox/preview-outbound-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-chart-area pr-2"></i>
                        <span>Preview Outbound Report</span>
                    </a>
                    <a href="/convox/progressive-outbound-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-chart-line pr-2"></i>
                        <span>Progressive Outbound Report</span>
                    </a>
                    <a href="/convox/call-recording-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-microphone-alt pr-2"></i>
                        <span>Call Recording Report</span>
                    </a>
                    <a href="/convox/dnc-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-ban pr-2"></i>
                        <span>DNC Report</span>
                    </a>
                    <a href="/convox/cdr-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-file-alt pr-2"></i>
                        <span>CDR Report</span>
                    </a>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection}>
                    <i className="fas fa-phone font-icon pr-2"></i>
                    <span>Call Traffic Analysis</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <a href="/convox/call-hits" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-phone pr-2"></i>
                        <span>Call Hits</span>
                    </a>
                    <a href="/convox/follow-up-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-file-alt pr-2"></i>
                        <span>Follow-Up Report</span>
                    </a>
                </div>
            </div>
            <div className="menu-section">
                <h3 className="flex items-center cursor-pointer px-1 py-2" onClick={toggleSection}>
                    <i className="fas fa-users font-icon pr-2"></i>
                    <span>Conference Analysis</span>
                    <i className="fa-solid fa-caret-right toggle-icon ml-auto"></i>
                </h3>
                <div className="menu-links">
                    <a href="/convox/conference-report" className="block px-3 py-1 text-base hover:bg-gray-700 hover:text-white">
                        <i className="fas fa-users pr-2"></i>
                        <span>Conference Report</span>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;