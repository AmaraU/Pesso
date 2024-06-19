import React, { useState, useEffect, useRef } from 'react';
import styles from "./ReportsPage.module.css";
import { getImageUrl } from '../../../utils';
import BarChart from '../../Components/BarChart';
import { Button } from "@chakra-ui/react";
import { SlRefresh } from "react-icons/sl";

export const ReportsPage = () => {
    
    const [ search, setSearch] = useState("");
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const financialHealth = {
        labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        datasets: [
            {
            data: [1803, 866, 1876, 1023, 2313, 550, 1500],
            backgroundColor: [
                '#F99BAB',
                '#FFB44F',
                '#9BDFC4',
                '#62B2FD',
                '#1C6BFF',
                '#9F97F7',
                '#0D7FE9'
            ],
            borderRadius: 10,
            },
        ],
    };

    const burnRate = {
        labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
        datasets: [
            {
            data: [1803, 866, 1876, 1023, 2313, 550, 1500],
            backgroundColor: [
                '#F99BAB',
                '#FFB44F',
                '#9BDFC4',
                '#62B2FD',
                '#1C6BFF',
                '#9F97F7',
                '#0D7FE9'
            ],
            borderRadius: 20,
            },
        ],
    };
    
    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },

        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    borderDash: [5, 5],
                },
            },
        }
    };



    return (
        <>
        <div className={styles.whole}>
            <div className={styles.searchButtons}>
                <div className={styles.searchBar}>
                    <img src={getImageUrl("icons/search.png")} />
                    <input id="search" type="text" onChange={handleSearch} placeholder='Search for budget' />
                </div>

                <div className={styles.buttons}>
                    <Button p={"0"} bg={"transparent"} border={"none"} _hover={{bg: "transaprent"}}>
                        <SlRefresh size={"24px"}/>
                    </Button>
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
                        <BarChart className={styles.barchart} data={financialHealth} options={options} />
                        {/* <img src={getImageUrl("barChart.PNG")} alt="" /> */}
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
                    <BarChart className={styles.barchart} data={burnRate} options={options} />
                    {/* <img src={getImageUrl("barChart.PNG")} alt="" /> */}
                </div>
                

            </div>

            

  
            </div>
        </>
    )
}