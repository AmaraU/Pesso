import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './ReportsPage.module.css';

const cx = classNames.bind(styles);


const Meter = ({ initialValue, min, max, className }) => {
    const [value, setValue] = useState(initialValue); // State to hold current value
    const [showValue, setShowValue] = useState(false); // State to toggle displaying value

    useEffect(() => {
        // Optionally, you can fetch initialValue from an API or perform any asynchronous operation here
        setValue(0);
        
        setValue(initialValue);
    }, [initialValue]); // Run this effect whenever initialValue changes

    const calculateAngle = () => {
        const range = max - min;
        const angle = ((value - min) / range) * 180; // Calculate angle for the needle
        return angle;
    };

    const handleMouseEnter = () => {
        setShowValue(true);
    };

    const handleMouseLeave = () => {
        setShowValue(false);
    };

    return (
        <div className={cx('speedometer', className)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className={cx('meter')}>
                <div className={cx('semiCircle')}></div>
                <div className={cx('needle')} style={{ transform: `rotate(${calculateAngle()}deg)` }}></div>
                {showValue && <div className={cx('valueDisplay')}>{value}</div>}
            </div>
            <div className={cx('labels')}>
                <span>{min}</span>
                <span>{Math.round((min + max) / 2)}</span>
                <span>{max}</span>
            </div>
        </div>
    );
};

export default Meter;
