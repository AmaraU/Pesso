import React from "react";

import { getImageUrl} from '../../../../utils'
import styles from "./Link.module.css";

export const Link = () => {
    return(
        <div className={styles.link}>
            <div className={styles.bread}>
                <div className={styles.crumb}>
                    <img src= {getImageUrl("frame22.png")}alt="fr" />
                </div>
                <div className={styles.words}>
                    <h1>Real Time Transaction Report</h1>
                    <p>With real time transactions,it will make it easier for you to monitor expenses and income in only one application and you
                        can also share accounts with other families
                    </p>

                    <ul>
                        <li className={styles.icon}>
                            <img src={getImageUrl("Icon1.png")} alt="" />
                            <h5> All in Essential & plus</h5>
                        </li>
                    </ul>
                    <ul>
                        <li className={styles.icon}>
                            <img src={getImageUrl("Icon1.png")} alt="" />
                            <h5> All in Essential & plus</h5>
                        </li>
                    </ul>
                    <ul>
                        <li className={styles.icon}>
                            <img src={getImageUrl("Icon1.png")} alt="" />
                            <h5>100% security. Guaranteed</h5>
                        </li>
                    </ul>
                <button className={styles.button}>Read More</button>

                </div>
        
        </div>
    
       
            </div>
        )
}