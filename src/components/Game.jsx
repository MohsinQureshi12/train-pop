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

    const incrementCounters = () => {
        setCount(prevCount => prevCount + 1); // Increment count
        setClicks(prevClicks => prevClicks + 1); // Increment clicks count
    };

    const handleMouseDown = () => {
        setIsOpen(true); // Set isOpen to true when mouse is pressed down
    };

    const handleMouseUp = () => {
        setIsOpen(false); // Set isOpen to false when mouse button is released
        incrementCounters();
    };

    const handleTouchStart = () => {
        setIsOpen(true); // Set isOpen to true when touch starts
    };

    const handleTouchEnd = () => {
        setIsOpen(false); // Set isOpen to false when touch ends
        incrementCounters();
    };

    useEffect(() => {
        localStorage.setItem('totalClicks', clicks);
    }, [clicks]);

    useEffect(() => {
        // Reset count when component mounts
        setCount(0);
    }, []);

    useEffect(() => {
        const handleGlobalMouseDown = (event) => {
            setIsOpen(true); // Set isOpen to true when mouse is pressed down
        };

        const handleGlobalMouseUp = (event) => {
            setIsOpen(false); // Set isOpen to false when mouse button is released
            incrementCounters(); // Increment counters
        };

        const handleGlobalTouchStart = (event) => {
            setIsOpen(true); // Set isOpen to true when touch starts
        };

        const handleGlobalTouchEnd = (event) => {
            setIsOpen(false); // Set isOpen to false when touch ends
            incrementCounters(); // Increment counters
        };

        document.addEventListener('mousedown', handleGlobalMouseDown);
        document.addEventListener('mouseup', handleGlobalMouseUp);
        document.addEventListener('touchstart', handleGlobalTouchStart);
        document.addEventListener('touchend', handleGlobalTouchEnd);

        return () => {
            document.removeEventListener('mousedown', handleGlobalMouseDown);
            document.removeEventListener('mouseup', handleGlobalMouseUp);
            document.removeEventListener('touchstart', handleGlobalTouchStart);
            document.removeEventListener('touchend', handleGlobalTouchEnd);
        };
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
                onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(); }}
                onMouseUp={(e) => { e.stopPropagation(); handleMouseUp(); }}
                onTouchStart={(e) => { e.stopPropagation(); handleTouchStart(); }}
                onTouchEnd={(e) => { e.stopPropagation(); handleTouchEnd(); }}
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
