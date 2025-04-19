import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus, faMoon, faSun, faMessage, faQuestion, faClockRotateLeft, faGear } from '@fortawesome/free-solid-svg-icons';
import "./sidebar.css";
import { Context } from '../../context/context';

const Sidebar = () => {
    const [extend, setextend] = useState(false);
    const { previousPrompt } = useContext(Context);
    const [showMoonIcon, setShowMoonIcon] = useState(true);

    useEffect(() => {
        document.documentElement.style.setProperty('--fontcolour_lt', 'black');
    }, []);

    return (
        <div className='sidebar'>
            <div className='top'>
                <FontAwesomeIcon icon={faBars} className="menu-icon" onClick={() => setextend(prev => !prev)} />
                <div className="newchat" onClick={() => window.location.reload()}>
                    <FontAwesomeIcon icon={faPlus} className="plus-icon" />
                    {extend ? <p>New Chat</p> : null}
                </div>
                <div className="dark-mode" onClick={() => {
                    setShowMoonIcon(prev => {
                        const root = document.documentElement;
                        if (prev) {
                            root.style.setProperty('--sidebar_bg_lt', 'rgb(30,32,33)');
                            root.style.setProperty('--fontcolour_lt','white');
                            root.style.setProperty('--lt_hover','rgb(45, 45, 45)');
                        } else {
                            root.style.setProperty('--sidebar_bg_lt', '#f0f4f9');
                            root.style.setProperty('--fontcolour_lt','black');
                            root.style.setProperty('--lt_hover','#e2e6eb');
                        }

                        window.dispatchEvent(new CustomEvent("toggle-dark-mode", { detail: prev ? "dark" : "light" }));

                        return !prev;
                    });
                }}>
{showMoonIcon ? (
    <>
        <FontAwesomeIcon icon={faMoon} className="moon-icon" />
        {extend ? <p>Dark Mode</p> : null}
    </>
) : (
    <>
        <FontAwesomeIcon icon={faSun} className="sun-icon" />
        {extend ? <p>Light Mode</p> : null}
    </>
)}
                </div>
                {extend ?
                    <div className="recent">
                        <p className='recenttitle'>Recent</p>
                        {previousPrompt.map((prompt, index) => (
                            <div className="recent-entry" key={index}>
                                <FontAwesomeIcon icon={faMessage} className="message-icon" />
                                <p id="prompt">{prompt.length > 7 ? prompt.slice(0, 7) + "..." : prompt}</p>
                            </div>
                        ))}
                    </div>
                    : null}
            </div>
            <div className="bottom">
                <div className="bottom-item question" id='hover_bt'>
                    <FontAwesomeIcon icon={faQuestion} className="question-icon" />
                    {extend ? <p>Help</p> : null}
                </div>
                <div className="bottom-item history" id='hover_bt'>
                    <FontAwesomeIcon icon={faClockRotateLeft} className="history-icon" />
                    {extend ? <p>History</p> : null}
                </div>
                <div className="bottom-item setting" id='hover_bt'>
                    <FontAwesomeIcon icon={faGear} className="setting-icon" />
                    {extend ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;