import React, { useState } from "react";
import { getImageUrl } from "../../../utils";
import styles from "./SettingsAccountPage.module.css";

export const SettingsAccountPage = () => {

    function securityPage() {
        var greyS = document.getElementById('greySecurity');
        greyS.classList.add(`${styles.hide}`);
        var blueS = document.getElementById('blueSecurity');
        blueS.classList.remove(`${styles.hide}`);

        var greyA = document.getElementById('greyAlerts');
        greyA.classList.remove(`${styles.hide}`);
        var blueA = document.getElementById('blueAlerts');
        blueA.classList.add(`${styles.hide}`);

        var greyD = document.getElementById('greyDisplay');
        greyD.classList.remove(`${styles.hide}`);
        var blueD = document.getElementById('blueDisplay');
        blueD.classList.add(`${styles.hide}`);

        var navS = document.getElementById('securityNav');
        navS.classList.add(`${styles.blue}`);
        var navA = document.getElementById('alertsNav');
        navA.classList.remove(`${styles.blue}`);
        var navD = document.getElementById('displayNav');
        navD.classList.remove(`${styles.blue}`);

        var pageS = document.getElementById('security');
        pageS.classList.remove(`${styles.hideDiv}`);
        var pageA = document.getElementById('alerts');
        pageA.classList.add(`${styles.hideDiv}`);
        var pageD = document.getElementById('display');
        pageD.classList.add(`${styles.hideDiv}`);
    }

    function alertsPage() {
        var greyS = document.getElementById('greySecurity');
        greyS.classList.remove(`${styles.hide}`);
        var blueS = document.getElementById('blueSecurity');
        blueS.classList.add(`${styles.hide}`);

        var greyA = document.getElementById('greyAlerts');
        greyA.classList.add(`${styles.hide}`);
        var blueA = document.getElementById('blueAlerts');
        blueA.classList.remove(`${styles.hide}`);

        var greyD = document.getElementById('greyDisplay');
        greyD.classList.remove(`${styles.hide}`);
        var blueD = document.getElementById('blueDisplay');
        blueD.classList.add(`${styles.hide}`);

        var navS = document.getElementById('securityNav');
        navS.classList.remove(`${styles.blue}`);
        var navA = document.getElementById('alertsNav');
        navA.classList.add(`${styles.blue}`);
        var navD = document.getElementById('displayNav');
        navD.classList.remove(`${styles.blue}`);

        var pageS = document.getElementById('security');
        pageS.classList.add(`${styles.hideDiv}`);
        var pageA = document.getElementById('alerts');
        pageA.classList.remove(`${styles.hideDiv}`);
        var pageD = document.getElementById('display');
        pageD.classList.add(`${styles.hideDiv}`);
    }

    function displayPage() {
        var greyS = document.getElementById('greySecurity');
        greyS.classList.remove(`${styles.hide}`);
        var blueS = document.getElementById('blueSecurity');
        blueS.classList.add(`${styles.hide}`);

        var greyA = document.getElementById('greyAlerts');
        greyA.classList.remove(`${styles.hide}`);
        var blueA = document.getElementById('blueAlerts');
        blueA.classList.add(`${styles.hide}`);

        // var greyD = document.getElementById('greyDisplay');
        // greyD.classList.add(`${styles.hide}`);
        // var blueD = document.getElementById('blueDisplay');
        // blueD.classList.remove(`${styles.hide}`);

        var navS = document.getElementById('securityNav');
        navS.classList.remove(`${styles.blue}`);
        var navA = document.getElementById('alertsNav');
        navA.classList.remove(`${styles.blue}`);
        var navD = document.getElementById('displayNav');
        navD.classList.add(`${styles.blue}`);

        var pageS = document.getElementById('security');
        pageS.classList.add(`${styles.hideDiv}`);
        var pageA = document.getElementById('alerts');
        pageA.classList.add(`${styles.hideDiv}`);
        var pageD = document.getElementById('display');
        pageD.classList.remove(`${styles.hideDiv}`);
    }

    const [isEnabled, setIsEnabled] = useState(true);

    const handleToggle = () => {
        setIsEnabled(prevState => !prevState);
    };


    return (
        <div className={styles.theWhole}>

            <div className={styles.navBar}>
                <a className={styles.blue} onClick={() => securityPage()} id="securityNav">
                    <img className={styles.hide} src={getImageUrl("icons/greySecurity.png")} id="greySecurity"/>
                    <img src={getImageUrl("icons/blueSecurity.png")} id="blueSecurity" />
                    SECURITY
                </a>

                <a onClick={() => alertsPage()} id="alertsNav">
                    <img src={getImageUrl("icons/greyAlerts.png")} id="greyAlerts" />
                    <img className={styles.hide} src={getImageUrl("icons/blueAlerts.png")} id="blueAlerts" />
                    ALERTS
                </a>

                <a onClick={() => displayPage()} id="displayNav">
                    <img src={getImageUrl("icons/greyDisplay.png")} id="greyDisplay" />
                    <img className={styles.hide} src={getImageUrl("icons/blueDisplay.png")} id="blueDisplay" />
                    DISPLAY
                </a>
            </div>

            <div className={styles.theDivs}>
                <div className={styles.theDiv} id="security">
                    <h3>PASSWORD</h3>
                    <table className={styles.securityTable}>
                        <tr>
                            <td className={styles.scol1}>Password:</td>
                            <td className={styles.scol2}>*************</td>
                            <td className={styles.scol3}><a href="">Change Password</a></td>
                        </tr>
                    </table>

                    <h3>TRANSACTION PIN</h3>
                    <table>
                        <tr>
                            <td className={styles.scol1}>Transaction  pin:</td>
                            <td className={styles.scol2}></td>
                            <td className={styles.scol3}><a href="">Set Pin</a></td>
                        </tr>
                    </table>

                    <h3>SECURTY QUESTIONS</h3>
                    <table>
                        <tr>
                            <td className={styles.scol1}>Security Question 1:</td>
                            <td className={styles.scol2}>What is the name of your favourite pet?</td>
                            <td className={styles.scol3}><a href="">Reset</a></td>
                        </tr>

                        <tr>
                            <td className={styles.scol1}>Security Question 2:</td>
                            <td className={styles.scol2}>What is your childhood drink?</td>
                            <td className={styles.scol3}><a href="">Reset</a></td>
                        </tr>
                    </table>
                </div>


                <div className={`${styles.theDiv} ${styles.hideDiv}`} id="alerts">
                    <div className={styles.divHeader}>
                        <h3>CURRENT EVENT ALERT</h3>
                        <button><img src={getImageUrl("icons/whitePlus.png")} alt="+" />Create Alert</button>
                    </div>
                    <table>
                        <tr>
                            <td className={styles.col1}>
                                <h5>Payment Initiated</h5>
                                <p>Notifies you when a payment is initiated</p>
                            </td>
                            <td className={styles.col2}>
                                <div className={styles.sliderContainer}>
                                    <label className={styles.switch}>
                                        <input type="checkbox" checked={isEnabled} onChange={handleToggle} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{isEnabled ? 'Enabled' : 'Disabled'}</p>
                                </div>
                            </td>
                            <td className={styles.col3}><button><img src={getImageUrl("icons/actionsTwo.png")} alt="" /></button></td>
                        </tr>

                        <tr>
                            <td className={styles.col1}>
                                <h5>Alerts</h5>
                                <p>Notifies you of an option to add, edit or delete current event alert</p>
                            </td>
                            <td className={styles.col2}>
                                <div className={styles.sliderContainer}>
                                    <label className={styles.switch}>
                                        <input type="checkbox" checked={isEnabled} onChange={handleToggle} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{isEnabled ? 'Enabled' : 'Disabled'}</p>
                                </div>
                            </td>
                            <td className={styles.col3}><button><img src={getImageUrl("icons/actionsTwo.png")} alt="" /></button></td>
                        </tr>
                    </table>


                    <h3>CURRENT BALANCE ALERT</h3>
                    <table>
                        <tr>
                            <td className={styles.col1}>
                                <h5>Account Balance</h5>
                                <p>Notify me when amount in account<span> {">"} N120,000</span></p>
                            </td>
                            <td className={styles.col2}>
                                <div className={styles.sliderContainer}>
                                    <label className={styles.switch}>
                                        <input type="checkbox" checked={isEnabled} onChange={handleToggle} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{isEnabled ? 'Enabled' : 'Disabled'}</p>
                                </div>
                            </td>
                            <td className={styles.col3}><button><img src={getImageUrl("icons/actionsTwo.png")} alt="" /></button></td>
                        </tr>

                        <tr>
                            <td className={styles.col1}>
                                <h5>Alerts</h5>
                                <p>Notifies you of an option to add, edit or delete current balance alert</p>
                            </td>
                            <td className={styles.col2}>
                                <div className={styles.sliderContainer}>
                                    <label className={styles.switch}>
                                        <input type="checkbox" checked={isEnabled} onChange={handleToggle} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{isEnabled ? 'Enabled' : 'Disabled'}</p>
                                </div>
                            </td>
                            <td className={styles.col3}><button><img src={getImageUrl("icons/actionsTwo.png")} alt="" /></button></td>
                        </tr>
                    </table>
                </div>


                <div className={`${styles.theDiv} ${styles.hideDiv}`} id="display">
                    <h3>DASHBOARD DISPLAY</h3>
                    <table>
                        <tr>
                            <td className={styles.col1}>
                                <h5>Balance</h5>
                                <p>Notifies you of an option to add, edit or delete current event alert</p>
                            </td>
                            <td className={styles.col2}>
                                <div className={styles.sliderContainer}>
                                    <label className={styles.switch}>
                                        <input type="checkbox" checked={isEnabled} onChange={handleToggle} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{isEnabled ? 'Enabled' : 'Disabled'}</p>
                                </div>
                            </td>
                            <td className={styles.col3}></td>
                        </tr>

                        <tr>
                            <td className={styles.col1}>
                                <h5>Cashflow</h5>
                                <p>Notifies you of an option to add, edit or delete current event alert</p>
                            </td>
                            <td className={styles.col2}>
                                <div className={styles.sliderContainer}>
                                    <label className={styles.switch}>
                                        <input type="checkbox" checked={isEnabled} onChange={handleToggle} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{isEnabled ? 'Enabled' : 'Disabled'}</p>
                                </div>
                            </td>
                            <td className={styles.col3}></td>
                        </tr>

                        <tr>
                            <td className={styles.col1}>
                                <h5>Exchange Rate</h5>
                                <p>Notifies you of an option to add, edit or delete current event alert</p>
                            </td>
                            <td className={styles.col2}>
                                <div className={styles.sliderContainer}>
                                    <label className={styles.switch}>
                                        <input type="checkbox" checked={isEnabled} onChange={handleToggle} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{isEnabled ? 'Enabled' : 'Disabled'}</p>
                                </div>
                            </td>
                            <td className={styles.col3}></td>
                        </tr>

                        <tr>
                            <td className={styles.col1}>
                                <h5>Calender</h5>
                                <p>Notifies you of an option to add, edit or delete current event alert</p>
                            </td>
                            <td className={styles.col2}>
                                <div className={styles.sliderContainer}>
                                    <label className={styles.switch}>
                                        <input type="checkbox" checked={isEnabled} onChange={handleToggle} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{isEnabled ? 'Enabled' : 'Disabled'}</p>
                                </div>
                            </td>
                            <td className={styles.col3}></td>
                        </tr>

                        <tr>
                            <td className={styles.col1}>
                                <h5>Updates</h5>
                                <p>Notifies you of an option to add, edit or delete current event alert</p>
                            </td>
                            <td className={styles.col2}>
                                <div className={styles.sliderContainer}>
                                    <label className={styles.switch}>
                                        <input type="checkbox" checked={isEnabled} onChange={handleToggle} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{isEnabled ? 'Enabled' : 'Disabled'}</p>
                                </div>
                            </td>
                            <td className={styles.col3}></td>
                        </tr>
                    </table>


                    <h3>ACCOUNT DISPLAY</h3>
                    <table>
                        <tr>
                            <td className={styles.col1}>
                                <h5>Balance</h5>
                                <p>Notifies you of an option to add, edit or delete current event alert</p>
                            </td>
                            <td className={styles.col2}>
                                <div className={styles.sliderContainer}>
                                    <label className={styles.switch}>
                                        <input type="checkbox" checked={isEnabled} onChange={handleToggle} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{isEnabled ? 'Enabled' : 'Disabled'}</p>
                                </div>
                            </td>
                            <td className={styles.col3}></td>
                        </tr>

                        <tr>
                            <td className={styles.col1}>
                                <h5>Cashflow</h5>
                                <p>Notifies you of an option to add, edit or delete current event alert</p>
                            </td>
                            <td className={styles.col2}>
                                <div className={styles.sliderContainer}>
                                    <label className={styles.switch}>
                                        <input type="checkbox" checked={isEnabled} onChange={handleToggle} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{isEnabled ? 'Enabled' : 'Disabled'}</p>
                                </div>
                            </td>
                            <td className={styles.col3}></td>
                        </tr>

                        <tr>
                            <td className={styles.col1}>
                                <h5>Exchange Rate</h5>
                                <p>Notifies you of an option to add, edit or delete current event alert</p>
                            </td>
                            <td className={styles.col2}>
                                <div className={styles.sliderContainer}>
                                    <label className={styles.switch}>
                                        <input type="checkbox" checked={isEnabled} onChange={handleToggle} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{isEnabled ? 'Enabled' : 'Disabled'}</p>
                                </div>
                            </td>
                            <td className={styles.col3}></td>
                        </tr>

                        <tr>
                            <td className={styles.col1}>
                                <h5>Alerts</h5>
                                <p>Notifies you of an option to add, edit or delete current event alert</p>
                            </td>
                            <td className={styles.col2}>
                                <div className={styles.sliderContainer}>
                                    <label className={styles.switch}>
                                        <input type="checkbox" checked={isEnabled} onChange={handleToggle} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{isEnabled ? 'Enabled' : 'Disabled'}</p>
                                </div>
                            </td>
                            <td className={styles.col3}></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}