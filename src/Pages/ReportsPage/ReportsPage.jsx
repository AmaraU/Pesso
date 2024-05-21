import React, { useState, useEffect } from 'react';
import styles from "./ReportsPage.module.css";
import { getImageUrl } from '../../../utils';

export const ReportsPage = () => {

    const reports = [
        {
            date: "July 22, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 22, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 22, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 21, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 21, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 21, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 20, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 20, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 20, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 20, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 19, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
    ]

    const [searchedVal, setSearchedVal] = useState("");
    const [ actionsOpen, setActionsOpen ] = useState(false);

    // $('tbody .action').onClick(function () {
    //     $(this).find('.theActions').setActionsOpen(!actionsOpen);
    // });

    // function handleClick(e) {
    //     if (!e.target.closest(".theActions") && actionsOpen) {
    //         setActionsOpen(false);
    //     }
    // }
    // React.useEffect(() => {
    //     document.addEventListener("click", handleClick);
    //     return () => {
    //         document.removeEventListener("click", handleClick);
    //     };
    // });



    return (
        <div className={styles.whole}>
            <div className={styles.searchButtons}>
                <div className={styles.searchBar}>
                    <img src={getImageUrl("icons/search.png")} />
                    <input type="text" onChange={(e) => setSearchedVal(e.target.value)} placeholder='Search reports' />
                </div>

                <div className={styles.buttons}>
                    <div className={styles.buttonOne}>
                        <img src={getImageUrl("icons/slides.png")} alt="" />
                        <select name="accounts" >
                            <option value="">All Accounts</option>
                        </select>
                    </div>
                    <a href="" className={styles.buttonTwo}>
                        <img src={getImageUrl("icons/whiteDownArrow.png")} alt="" />
                        Download
                    </a>

                </div>
            </div>

            <div className={styles.graphs}>

                <div className={styles.graphOne}>
                    <div className={styles.graphHeader}>
                        <div className={styles.graphHeaderText}>
                            <h5>Activity</h5>
                            <h3>Financial Health Index</h3>
                        </div>
                        <select name="" id="">
                            <option value="">Weekly</option>
                            <option value="">Daily</option>
                            <option value="">Monthly</option>
                            <option value="">Yearly</option>
                        </select>
                    </div>

                    <div className={styles.line}></div>

                    <img src={getImageUrl("chart.png")} alt="" />
                </div>


                <div className={styles.graphTwo}>
                    <div className={styles.graphHeader}>
                        <div className={styles.graphHeaderText}>
                            <h5>Activity</h5>
                            <h3>Financial Health Index</h3>
                        </div>
                        <select name="" id="">
                            <option value="">Weekly</option>
                        </select>
                    </div>

                    <div className={styles.line}></div>

                    <img src={getImageUrl("barChart.PNG")} alt="" />

                </div>

            </div>

            <table className={styles.reportTable}>
                <thead>
                    <th><input type="checkbox" id="selectAll" /></th>
                    <th>Date</th>
                    <th>Account Number</th>
                    <th>Account Name</th>
                    <th>Account Balance</th>
                    <th>Current Balance</th>
                    <th className={styles.action}>Action</th>
                </thead>

                <tbody>
                    {reports
                        .filter((row) =>
                            !searchedVal.length || row.name
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase()) 
                        )
                        
                        .map((report, index) => (
                            <tr>
                                <td className={styles.checkbox}><input type="checkbox"id="" /></td>
                                <td className={styles.date}>{report.date}</td>
                                <td className={styles.acctNumber}>{report.acctNumber}</td>
                                <td className={styles.acctName}>{report.acctName}</td>
                                <td className={styles.acctBal}>{report.acctBal}</td>
                                <td className={styles.currBal}>{report.currBal}</td>
                                <td className={styles.action}>
                                    <button onClick={() => setActionsOpen(!actionsOpen)}><img src={getImageUrl("icons/action.png")} /></button>
                                    <div className={`${styles.actionsClosed} ${actionsOpen && styles.theActions}`} >
                                        <p>ACTION</p>
                                        <ul>
                                            <li className={styles.view} ><a href="">View</a></li>
                                            <li><a href="">Download pdf</a></li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}

                </tbody>

                
            </table>
        </div>
    )
}