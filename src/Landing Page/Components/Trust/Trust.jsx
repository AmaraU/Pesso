import React from "react";

import { getImageUrl} from '../../../../utils'
import styles from "./Trust.module.css";

export const Trust = () => {
    return(
        // <div>
        //     <div>
        //  <img className={styles.dash} src={getImageUrl("Dashboard.png")}alt="" />

        //  </div> 
        <div className={styles.bread}>
         <div className={styles.crumb}>
            <h3>Trusted by teams at the world's leading organizations</h3>
            <img className={styles.img} src={getImageUrl("Frame1.png")}alt="" />
         </div>
            </div>
    
    )
}