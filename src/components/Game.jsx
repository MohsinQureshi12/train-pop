import React, { useState, useEffect } from 'react';
import './Game.css';
import '../App.css';
import OpenImage from '../assets/OpenImage.png';
import CloseImage from '../assets/CloseImage.png';
// import BackGroundImage from '../assets/bg.png';
import Logo from '../assets/Logo.png';

const Game = () => {
    const [count, setCount] = useState(0);
    const [clicks, setClicks] = useState(() => {
        const storedClicks = localStorage.getItem('totalClicks');
        return storedClicks ? parseInt(storedClicks, 10) : 0;
    });
    const [isOpen, setIsOpen] = useState(false);
    const [clicked, setClicked] = useState(false);

    const incrementCounters = () => {
        setCount(prevCount => prevCount + 1);
        setClicks(prevClicks => prevClicks + 1);
    };

    const handleMouseDown = () => {
        setIsOpen(true);
        if (!clicked) {
            incrementCounters();
            setClicked(true);
        }
    };

    const handleMouseUp = () => {
        setIsOpen(false);
        setClicked(false);
    };

    const handleTouchStart = () => {
        setIsOpen(true);
        if (!clicked) {
            incrementCounters();
            setClicked(true);
        }
    };

    const handleTouchEnd = () => {
        setIsOpen(false);
        setClicked(false);
    };

    useEffect(() => {
        localStorage.setItem('totalClicks', clicks);
    }, [clicks]);

    useEffect(() => {
        setCount(0);
    }, []);

    return (
        <div className="container">
            <div className="custom-bar" title="7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr">
                <span>
                    <img className="logo" src="https://avatars.githubusercontent.com/u/92743431?s=280&amp;v=4" alt="Avatar" />
                    <span className="tab-text">CA: 7GCihgDB8fe6KNjn2MYtkzZcRjQy3t9GHdC8uHYmW2hr</span>
                </span>
            </div>

            <div className="logo-container">
                <img src={Logo} alt="logo" className="logo-img" />
            </div>

            <div className="counter">
                <div className="heading">TrainPop</div>
                <div className="count">{count}</div>
            </div>

            <div
                className={`popcat-image ${isOpen ? 'open' : 'close'}`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <img src={isOpen ? OpenImage : CloseImage} alt="Popcat" />
            </div>

            <div className="counter-bar">
                <span className="total-pops">TOTAL POPS</span>
                <span className="clicks">{clicks}</span>
            </div>
        </div>
    );
};

export default Game;
