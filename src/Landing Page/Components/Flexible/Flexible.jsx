import React from "react";

import { getImageUrl} from '../../../../utils'
import styles from "./Flexible.module.css";

export const Flexible = () => {
    return(
        <div className={styles.flex}>
            <div className={styles.word}>
                <h1>Flexible Pricing</h1>
                <p>Choose a plan that fits your even integration needs.Pricing is per connection,there is no limit of how many onnections you can have.
                    Questions? <span className={styles.span}>Contact us.</span>
                </p>
            </div>
            <div className={styles.moth}>
                <button>Monthly</button>
                <button className={styles.button2}>Yearly</button>
            </div>
            <div className={styles.bread}>
                <div className={styles.crumb}>
                <h5>Free plan</h5>
                <h1>N0 <span>/month</span></h1>
                <p>For events without complex structures.</p>
                <div className={styles.line}></div>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>2 Budgets, 3 Non-Corporate Accounts</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>Weekly Cashflow Categorization, Basic Reports.</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>1 User, 3 Custom Categories Basic support</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>1 User, 3 Custom Categories Basic support</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>1 User, 3 Custom Categories Basic support</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>1 User, 3 Custom Categories Basic support</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>1 User, 3 Custom Categories Basic support</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>1 User, 3 Custom Categories Basic support</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>1 User, 3 Custom Categories Basic support</h4>
                    </li>
                </ul>
                <div className={styles.line}></div>
                <button className={styles.title}>Get Started</button>
                </div>
                <div className={styles.crumb}>
                <h5>Start Up Plan</h5>
                <h1>N2499 <span>/month</span></h1>
                <p>For events without complex structures.</p>
                <div className={styles.line}></div>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>All Free plan Features.</h4>
                    </li>
                </ul>
                <ul>
                    <li  className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                           <h4> 10 budgets, 1 corporate, 4 non-corporate accounts</h4>
                    </li>
                </ul>
                <ul>
                    <li  className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>Advanced reports, 5 users, 10 custom categories</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>3 approval levels,24/7 priority support</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>3 approval levels,24/7 priority support</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>3 approval levels,24/7 priority support</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>3 approval levels,24/7 priority support</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>3 approval levels,24/7 priority support</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>3 approval levels,24/7 priority support</h4>
                    </li>
                </ul>
                <div className={styles.line}></div>
                <button className={styles.title}>Claim this price</button>
                </div>
                <div className={styles.crumb3}>
                    <div className={styles.borderText}>Recommended </div>
                    <h5>Start Up Plan</h5>
                    <h1>N24,999 <span>/month</span></h1>
                    <p>For events without complex structures.</p>
                <div className={styles.line}></div>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("whitecheck.png")} alt="" />
                            <h4>All Free Plan features</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("whitecheck.png")} alt="" />
                            <h4>Unlimited budgets, 2 corporate accounts, 5 non-corporate accounts</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("whitecheck.png")} alt="" />
                            <h4>Unlimited categories,1 free bulk transfer/month</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("whitecheck.png")} alt="" />
                            <h4>Dedicated account manager 10 users, custom integrations</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("whitecheck.png")} alt="" />
                            <h4>Dedicated account manager 10 users, custom integrations</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("whitecheck.png")} alt="" />
                            <h4>Dedicated account manager 10 users, custom integrations</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("whitecheck.png")} alt="" />
                            <h4>Dedicated account manager 10 users, custom integrations</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("whitecheck.png")} alt="" />
                            <h4>Dedicated account manager 10 users, custom integrations</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("whitecheck.png")} alt="" />
                            <h4>Dedicated account manager 10 users, custom integrations</h4>
                    </li>
                </ul>
                <div className={styles.line}></div>
                <button className={styles.title}>Get Started</button>
                </div>
                <div className={styles.crumb}>
                <h5>Enterprise plan(Custom)</h5>
                <h1>$7 <span>/month</span></h1>
                <p>For events without complex structures.</p>
                <div className={styles.line}></div>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                           <h4> Personalized manager, custom integrations, white labelling.</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                           <h4> Unlimited users, enhanced security, dedicated support.</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>SLAs, regular reviews, advanced training.</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>SLAs, regular reviews, advanced training.</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>SLAs, regular reviews, advanced training.</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>SLAs, regular reviews, advanced training.</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>SLAs, regular reviews, advanced training.</h4>
                    </li>
                </ul>
                <ul>
                    <li className={styles.icon}>
                    <img src={getImageUrl("Icon1.png")} alt="" />
                            <h4>SLAs, regular reviews, advanced training.</h4>
                    </li>
                </ul>
                <div className={styles.line}></div>
                <button className={styles.title}>Get Started</button>
                </div>
            </div>
        </div>
    )
}