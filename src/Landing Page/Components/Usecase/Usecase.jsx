/* eslint-disable no-unused-vars */
import React from "react";

import styles from "./Usecase.module.css";

export const UseCase = () => {
    return(
        <div className={styles.biggerDiv}>
        <div className={styles.About}>
        <div className={styles.bread}>
            <h1>Master Your <span className={styles.red}>Finances</span>,Propel your business</h1>
            <p>The ultimate AI Driven financial management solution.Seize control,gain insightful data,
                and propel your success to new heights.
            </p>
            <button className={styles}>
               Schedule a Demo
            </button>  
        </div>
        </div>
        </div>    
    )
}