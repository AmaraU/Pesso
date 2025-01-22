import React from "react";

import { getImageUrl} from '../../../../utils'
import styles from "./Footer.module.css";

export const Footer = () => {
    return(
        <div>
        <div className={styles.footer}>
            <div className={styles.text}>
          <div className={styles.breed}>
            <img src={getImageUrl("Logo22.png")} alt="" />
           </div>
             <div className={styles.bread}>
                <img src={getImageUrl("Call.png")} alt="l" />
                <div>
                    <h5>Phone</h5>
                    <p>+234 (0) 806 857 4297</p>
                </div>
             </div>
             <div className={styles.bread}>
                <img src={getImageUrl("Message.png")} alt="l" />
                <div>
                    <h5>Email</h5>
                    <p>Support@pessofinance.com</p>
                </div>
             </div>
             <div className={styles.bread}>
                <img src={getImageUrl("location.png")} alt="l" />
                <div>
                    <h5>Address</h5>
                    <p>Plot 4, fifthlab avenue,off cwg-plc,</p>
                    <p>Lagos,Nigeria</p>
                </div>
                
             </div>
            </div>
            <div className={styles.line}></div>
            
            <div className={styles.links}>
                <div className={styles.link}>
                    <h5>Company</h5>
                    <p><a href="">Home</a></p>
                    <p><a href="">About</a></p>
                    <p><a href="">Features</a></p>
                    <p><a href="">Pages</a></p>
                    <p><a href="">Contact</a></p>
                </div>
                <div className={styles.link}>
                    <h5>Help</h5>
                    <p><a href="">Customer Support</a></p>
                    <p><a href="">Terms & Conditions</a></p>
                    <p><a href="">Privacy policy</a></p>
                </div>
            </div>
            <div className={styles.crumb}>
                <div className={styles.crumbs}>
                    <h1>Subscribe to our newsletter</h1>
                    <p>The latest insights, resources, expert opinions and company news</p>
                    <button>Subscribe</button>
                </div>
            </div>
        </div>
        
        
        <div className={styles.pad}>
        <hr className={styles.line}></hr>
        <p>© Fifthlab 2022. • All rights reserved</p>
        </div>
        </div>
    )
}
