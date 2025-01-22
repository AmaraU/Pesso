import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./Compare.module.css";

export const Compare = () => {
  return (
    <div className={styles.flex}>
            <div className={styles.word}>
                <h1>Compare Pricing</h1>
                <p>Choose a plan that fits your even integration needs.Pricing is per connection,there is no limit of how many onnections you can have.
                    Questions? <span className={styles.span}>Contact us.</span>
                </p>
            </div>
            <div className={styles.moth}>
                <button>Monthly</button>
                <button className={styles.button2}>Yearly</button>
            </div>
            <div className={styles.gridtable}>
                    <div className={styles.gridheader}>
                        <div>
                            <h3> Compare Plans </h3>
                            <p> Choose your workspace plan according to your organisational plan</p>
                        </div>
                        <div className={styles.header}>
                            <h1>Free<span>/Lifetime</span></h1>
                            <button> Choose This Plan</button>
                        </div>
                        <div className={styles.header}>
                            <h1>N0 <span>/Month</span></h1>
                            <button> Choose This Plan</button>
                        </div>
                        <div className={styles.header}>
                            <h1>N0 <span>/Month</span></h1>
                            <button> Choose This Plan</button>
                        </div>
                        <div className={styles.header}>
                            <h1>Custom <span>/Month</span></h1>
                            <button> Choose This Plan</button>
                        </div>
                    </div>
                    <div className={styles.gridrow}>
                        <div>
                            <h2>Number of Users</h2>
                        </div>
                        <div><p> 20 Users</p></div>
                        <div>
                             <p>600 Users</p>
                             <p className={styles.page}>Pages Add-ons on Demand</p>
                        </div>
                        <div>
                            <p>600 Users</p>
                            <p className={styles.page}>Pages Add-ons on Demand</p>
                        </div>
                        <div>
                            <p>Unlimited </p>
                            <p className={styles.page}>Pages Add-ons on Demand</p>
                        </div>
                    </div>
                    <div className={styles.gridrow}>
                        <div>
                            <h2>Users Per Page</h2>
                        </div>
                        <div><p> 5 Pages</p></div>
                        <div><p> 20 Pages</p></div>
                        <div><p> 50 Pages</p></div>
                        <div>
                            <p>Unlimited </p>
                            <p className={styles.page}>Pages Add-ons on Demand</p>
                        </div>
                    </div>
                    <div className={styles.gridrow}>
                        <div>
                            <h2>Includes essential features to get started</h2>
                        </div>
                        <div><FaCheckCircle /></div>
                        <div><FaCheckCircle /></div>
                        <div><FaCheckCircle /></div>
                        <div><FaCheckCircle /></div>
                    </div>
                    <div className={styles.gridrow}>
                        <div>
                            <h2>More advanced features for increased productivity</h2>
                        </div>
                        <div><FaCheckCircle /></div>
                        <div><FaCheckCircle /></div>
                        <div><FaCheckCircle /></div>
                        <div><FaCheckCircle /></div>
                    </div>
                    <div className={styles.gridrow}>
                        <div>
                            <h2>Designing & Development</h2>
                        </div>
                        <div></div>
                        <div><FaCheckCircle /></div>
                        <div><FaCheckCircle /></div>
                        <div><FaCheckCircle /></div>
                    </div>
                    <div className={styles.gridrow}>
                        <div>
                            <h2>Customizable options to meet your specific needs</h2>
                        </div>
                        <div></div>
                        <div><FaCheckCircle /></div>
                        <div><FaCheckCircle /></div>
                        <div><FaCheckCircle /></div>
                    </div>
                    <div className={styles.gridrow}>
                        <div>
                            <h2>Secure data storage</h2>
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div><FaCheckCircle /></div>
                    </div>
                    <div className={styles.gridrow}>
                        <div>
                            <h2>Email Support</h2>
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div><FaCheckCircle /></div>
                    </div>
                    <div className={styles.gridrow}>
                        <div>
                            <h2>24/7 customer support</h2>
                        </div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div><FaCheckCircle /></div>
                    </div>
                    <div className={styles.gridrow}>
                        <div>
                            <h2>Analytics and reporting</h2>
                        </div>
                        <div></div>
                        <div><FaCheckCircle /></div>
                        <div><FaCheckCircle /></div>
                        <div><FaCheckCircle /></div>
                    </div>
                    <div className={styles.gridrow}>
                        <div>
                            <h2>Account Management</h2>
                        </div>
                        <div><FaCheckCircle /></div>
                        <div><FaCheckCircle /></div>
                        <div><FaCheckCircle /></div>
                        <div><FaCheckCircle /></div>
                    </div>
            </div>
    </div>
    
  );
};
