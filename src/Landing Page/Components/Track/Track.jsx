import React from "react";

import { getImageUrl} from '../../../../utils'
import styles from "./Track.module.css";

export const Track= () => {
    return( 
            <div className={styles.track}>
                <div className={styles.bread}>
                <div className={styles.words}>
                    <h1>Effectively track real-time and updates from Pesso Finance management</h1>
                    <p>Designed with a simple, user- friendly interface, nTask is a 7-in-1 project management tool that is ideal for both small and large teams.
                        You can create multiple workspaces.
                    </p>
                    <img src={getImageUrl("Facts.png")} alt="" />
            </div>
            <div className={styles.crumb}>
                    <img src= {getImageUrl("frame22.png")}alt="fr" />
                </div>
            </div>
            <div className={styles.cross}>
            <div className={styles.crumb}>
                    <img src= {getImageUrl("frame22.png")}alt="fr" />
                </div>
                <div className={styles.words}>
                    <h1>Modern and Easy To Use</h1>
                    <p>With real time transactions, it will make it easier for you to monitor expenses and income in only one application and you can also share accounts
                        with other families
                    </p>
                    <button className={styles.button}>Read More</button>
            </div>
            </div>  
            
            </div>
            

            
            
    )
}