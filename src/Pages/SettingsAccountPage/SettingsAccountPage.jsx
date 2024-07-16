import React, { useState } from "react";
import { getImageUrl } from "../../../utils";
import styles from "./SettingsAccountPage.module.css";

export const SettingsAccountPage = () => {

    function securityPage() {
        var greyS = document.getElementById('greySecurity');
        greyS.classList.add(`${styles.hide}`);
        var redS = document.getElementById('redSecurity');
        redS.classList.remove(`${styles.hide}`);

        var greyA = document.getElementById('greyAlerts');
        greyA.classList.remove(`${styles.hide}`);
        var redA = document.getElementById('redAlerts');
        redA.classList.add(`${styles.hide}`);

        var greyD = document.getElementById('greyDisplay');
        greyD.classList.remove(`${styles.hide}`);
        var redD = document.getElementById('redDisplay');
        redD.classList.add(`${styles.hide}`);

        var navS = document.getElementById('securityNav');
        navS.classList.add(`${styles.red}`);
        var navA = document.getElementById('alertsNav');
        navA.classList.remove(`${styles.red}`);
        var navD = document.getElementById('displayNav');
        navD.classList.remove(`${styles.red}`);

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
        var redS = document.getElementById('redSecurity');
        redS.classList.add(`${styles.hide}`);

        var greyA = document.getElementById('greyAlerts');
        greyA.classList.add(`${styles.hide}`);
        var redA = document.getElementById('redAlerts');
        redA.classList.remove(`${styles.hide}`);

        var greyD = document.getElementById('greyDisplay');
        greyD.classList.remove(`${styles.hide}`);
        var redD = document.getElementById('redDisplay');
        redD.classList.add(`${styles.hide}`);

        var navS = document.getElementById('securityNav');
        navS.classList.remove(`${styles.red}`);
        var navA = document.getElementById('alertsNav');
        navA.classList.add(`${styles.red}`);
        var navD = document.getElementById('displayNav');
        navD.classList.remove(`${styles.red}`);

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
        var redS = document.getElementById('redSecurity');
        redS.classList.add(`${styles.hide}`);

        var greyA = document.getElementById('greyAlerts');
        greyA.classList.remove(`${styles.hide}`);
        var redA = document.getElementById('redAlerts');
        redA.classList.add(`${styles.hide}`);

        var navS = document.getElementById('securityNav');
        navS.classList.remove(`${styles.red}`);
        var navA = document.getElementById('alertsNav');
        navA.classList.remove(`${styles.red}`);
        var navD = document.getElementById('displayNav');
        navD.classList.add(`${styles.red}`);

        var pageS = document.getElementById('security');
        pageS.classList.add(`${styles.hideDiv}`);
        var pageA = document.getElementById('alerts');
        pageA.classList.add(`${styles.hideDiv}`);
        var pageD = document.getElementById('display');
        pageD.classList.remove(`${styles.hideDiv}`);
    }


    const [sliders, setSliders] = useState([true, true, true, true, true, true, true, true, true, true, true, true, true]);


    const handleToggle = (index) => {
        setSliders((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };


    return (
        <div className={styles.theWhole}>

            <div className={styles.navBar}>
                <a className={styles.red} onClick={() => securityPage()} id="securityNav">
                    <img className={styles.hide} src={getImageUrl("icons/greySecurity.png")} id="greySecurity"/>
                    <img src={getImageUrl("icons/redSecurity.png")} id="redSecurity" />
                    SECURITY
                </a>

                <a onClick={() => alertsPage()} id="alertsNav">
                    <img src={getImageUrl("icons/greyAlerts.png")} id="greyAlerts" />
                    <img className={styles.hide} src={getImageUrl("icons/redAlerts.png")} id="redAlerts" />
                    ALERTS
                </a>

                <a onClick={() => displayPage()} id="displayNav">
                    <img src={getImageUrl("icons/greyDisplay.png")} id="greyDisplay" />
                    <img className={styles.hide} src={getImageUrl("icons/redDisplay.png")} id="redDisplay" />
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
                                        <input type="checkbox" checked={sliders[0]} onChange={() => handleToggle(0)} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{sliders[0] ? 'Enabled' : 'Disabled'}</p>
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
                                        <input type="checkbox" checked={sliders[1]} onChange={() => handleToggle(1)} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{sliders[1] ? 'Enabled' : 'Disabled'}</p>
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
                                        <input type="checkbox" checked={sliders[2]} onChange={() => handleToggle(2)} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{sliders[2] ? 'Enabled' : 'Disabled'}</p>
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
                                        <input type="checkbox" checked={sliders[3]} onChange={() => handleToggle(3)} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{sliders[3] ? 'Enabled' : 'Disabled'}</p>
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
                                        <input type="checkbox" checked={sliders[4]} onChange={() => handleToggle(4)} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{sliders[4] ? 'Enabled' : 'Disabled'}</p>
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
                                        <input type="checkbox" checked={sliders[5]} onChange={() => handleToggle(5)} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{sliders[5] ? 'Enabled' : 'Disabled'}</p>
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
                                        <input type="checkbox" checked={sliders[6]} onChange={() => handleToggle(6)} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{sliders[6] ? 'Enabled' : 'Disabled'}</p>
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
                                        <input type="checkbox" checked={sliders[7]} onChange={() => handleToggle(7)} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{sliders[7] ? 'Enabled' : 'Disabled'}</p>
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
                                        <input type="checkbox" checked={sliders[8]} onChange={() => handleToggle(8)} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{sliders[8] ? 'Enabled' : 'Disabled'}</p>
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
                                        <input type="checkbox" checked={sliders[9]} onChange={() => handleToggle(9)} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{sliders[9] ? 'Enabled' : 'Disabled'}</p>
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
                                        <input type="checkbox" checked={sliders[10]} onChange={() => handleToggle(10)} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{sliders[10] ? 'Enabled' : 'Disabled'}</p>
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
                                        <input type="checkbox" checked={sliders[11]} onChange={() => handleToggle(11)} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{sliders[11] ? 'Enabled' : 'Disabled'}</p>
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
                                        <input type="checkbox" checked={sliders[12]} onChange={() => handleToggle(12)} />
                                        <span className={`${styles.slider} ${styles.round}`}></span>
                                    </label>
                                    <p>{sliders[12] ? 'Enabled' : 'Disabled'}</p>
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