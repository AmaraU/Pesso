import React, { useState, useEffect, useRef } from 'react';
import styles from "./ReportsPage.module.css";
import { getImageUrl } from '../../../utils';

export const ReportsPage = () => {
    
    const [ search, setSearch] = useState("");
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };


    // const filteredBudgets = budgets.filter(budget => {
    //     const searchLower = search.toLowerCase();
    //     return (
    //         budget.title.toLowerCase().includes(searchLower) ||
    //         budget.total.toLowerCase().includes(searchLower) ||
    //         budget.assignee.toLowerCase().includes(searchLower) ||
    //         budget.categories.some(category => category.toLowerCase().includes(searchLower))
    //     );
    // });



    return (
        <>
        <div className={styles.whole}>
            <div className={styles.searchButtons}>
                <div className={styles.searchBar}>
                    <img src={getImageUrl("icons/search.png")} />
                    <input id="search" type="text" onChange={handleSearch} placeholder='Search for budget' />
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

                <div className={styles.twoGraphs}>

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
                                <h3>Financial Health</h3>
                            </div>
                            <select name="" id="">
                                <option value="">Weekly</option>
                                <option value="">Daily</option>
                                <option value="">Monthly</option>
                                <option value="">Yearly</option>
                            </select>
                        </div>
                        <div className={styles.line}></div>
                        <img src={getImageUrl("barChart.PNG")} alt="" />
                    </div>

                </div>

                <div className={styles.graphThree}>
                    <div className={styles.graphHeader}>
                        <div className={styles.graphHeaderText}>
                            <h5>Activity</h5>
                            <h3>Burn Rate</h3>
                        </div>
                        <select name="" id="">
                            <option value="">Weekly</option>
                            <option value="">Daily</option>
                            <option value="">Monthly</option>
                            <option value="">Yearly</option>
                        </select>
                    </div>
                    <div className={styles.line}></div>
                    <img src={getImageUrl("barChart.PNG")} alt="" />
                </div>
                

            </div>

            

  
            </div>
        </>
    )
}