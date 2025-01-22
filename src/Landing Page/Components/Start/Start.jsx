import React from "react";


import styles from "./Start.module.css";

export const Start = () => {
    return(
        <div className={styles.start}>
            <div className={styles.text}>
                <h1>Ready to Get Started?</h1>
                <p>Data analysis software is a type of software tool used for data analysis
                    and reporting.It is designed to help business, organizations.
                </p>
                <button>Contact us</button>
            </div>

        </div>
    )
}