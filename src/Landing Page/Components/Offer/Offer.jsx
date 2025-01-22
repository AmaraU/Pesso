import React from "react";

import { getImageUrl} from '../../../../utils'
import styles from "./Offer.module.css";

export const Offer = () => {
    return(
        <div className={styles.Benefit}>
            <div className={styles.bread}>
                <h1>What do We offer?</h1>
                <p>Peso Finance provides a unified platform for seamless bank integration,
                    expense tracking,investment management, and more to elevate your business finances.
                </p>
            </div>
            
            <div className={styles.offer}>
    
                <div className={styles.crumb}>

                    <div className={styles.text}>
                        <div className={styles.header}>
                            <img src= {getImageUrl("Loan.png")}alt="fr" />
                        </div>
                        <div className={styles.words}>
                            <h2>Loan Management</h2>
                            <p>Effortlessly track your 5-year loan history,repayment periods,and loan amounts
                                with our Mono-powered loan management feature.
                            </p>
                        </div>
                    </div>

                    <div className={styles.text}>
                        <div className={styles.header}>
                            <img className={styles.img} src= {getImageUrl("Site.png")}alt="fr" />
                        </div>
                        <div className={styles.words} >
                            <h2>Expense Tracking</h2>
                            <p>Streamline your ability to effortlessly track all business expenses for wise
                                decision-making insights.
                            </p>
                        </div>
                        
                    </div>

                    <div className={styles.text}>
                        <div className={styles.header}>
                            <img src= {getImageUrl("pig.png")}alt="fr" />
                        </div>
                        <div className={styles.words}>
                            <h2>Budgeting</h2>
                            <p>Ensure precisionnin achieving financial goals through intuitive budgeting 
                                and informed decision-making.
                            </p>
                        </div>
                        
                    </div>
                </div>


            
                <div className={styles.worde}>
                    <div className={styles.text}>
                        <div className={styles.header}>
                            <img src= {getImageUrl("Frame 16.png")}alt="fr" />
                        </div>
                        <div className={styles.words}>
                            <h2>Link Bank Accounts</h2>
                            <p>Connect and manage all business accounts seamlessly gaining real-time insights 
                                and make transfers conveniently.
                            </p>
                        </div>
                    </div>


                    <div className={styles.text}>
                        <div className={styles.header}>
                            <img src= {getImageUrl("rotate.png")}alt="fr" />
                        </div>
                        <div className={styles.words}>
                            <h2>Categorize Cash Flow</h2>
                            <p>Ensure accuracy with account reconcilation,effortlessly matching transactions for
                            error-free records.It is AI driven.
                            </p>
                        </div>
                
                    </div>
                </div>
            </div> 

        </div>

    )
}