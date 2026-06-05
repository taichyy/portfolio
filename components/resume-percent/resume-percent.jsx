"use client"

import { useEffect, useState } from "react";

import styles from "./resume-percent.module.css"

const ResumePercent = ({ percent }) => {
    let [width, setWidth] = useState(100);
    let [percentStyle, setPercentStyle] = useState({});

    useEffect(() => {
        setWidth(percent);
        // Create obj, then add % symbol
        (() => {
            setPercentStyle({
                width: width + '%',
            });
        })();
    }, [width]);

    return (
        <div className={styles.ResumePercent}>
            <div className={styles.ResumePercentInner} style={percentStyle}></div>
        </div>
    );
};

export default ResumePercent;
