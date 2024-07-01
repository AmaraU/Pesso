import React, { useState, useEffect, useRef } from 'react';
import styles from "./ReportsPage.module.css";
import { getImageUrl } from '../../../utils';
import BarChart from '../../Components/BarChart';
import { Button, useToast } from "@chakra-ui/react";
import { SlRefresh } from "react-icons/sl";
import { CashflowChart } from "../../Components/CashflowChart";
import axios from 'axios';
import { logger } from '../../models/logging';
import { DEFAULT_CASHFLOW_SUMMARY_ERR_MSG, getAPIEndpoint } from '../../../config';
import ReactSpeedometer from "react-d3-speedometer";


export const ReportsPage = () => {

    const [cashflowSummary, setCashflowSummary] = useState([]);
    const [isCashflowLoading, setIsCashflowloading] = useState(false);
    const toast = useToast();


    useEffect(() => {
        if (!sessionStorage.getItem("id")) {
            navigate("/signin");
        }
        // log();
        getCashflowSummary();
    }, []);

    
    const [ search, setSearch] = useState("");
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const [ openDownload, setOpenDownload ] = useState(false);
    const handleDownloadToggle = () => {
        setOpenDownload(!openDownload);
    };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setOpenDownload(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);


    const getCashflowSummary = async () => {
        setIsCashflowloading(true);
        try {

            const response = await axios.post(getAPIEndpoint('cashflow-summary'), null, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsCashflowloading(false);

                    if (data.length > 0) {
                        const d = data.map(e => ({ ...e, expense: parseFloat(e.expense), income: parseFloat(e.income) }));
                        setCashflowSummary(d);
                    }
                    else {
                        setCashflowSummary([]);
                    }

                    return;
                }
                else {
                    setIsCashflowloading(false);
                    let err = "";

                    if (data.length > 0) {
                        err = data[0].error;
                    }

                    if (err) {
                        toast({
                            description: `${DEFAULT_CASHFLOW_SUMMARY_ERR_MSG}. ${err ? "[Details: " + err + "]" : ""} `,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_CASHFLOW_SUMMARY_ERR_MSG,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    return;
                }
            }
        } catch (error) {
            console.log(error)
            await logger({ task: "Get Cashflow Summary", error: error.toString() });
        }
        toast({
            description: DEFAULT_CASHFLOW_SUMMARY_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsCashflowloading(false);
    }



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
                    <a href="" className={styles.buttonTwo} onClick={(e) => {e.preventDefault(); handleDownloadToggle()}}>
                        <img src={getImageUrl("icons/whiteDownArrow.png")} alt="" />
                        Download
                    </a>
                    <div className={`${styles.downloadClosed} ${openDownload && styles.download}`} >
                        <p>DOWNLOAD</p>
                        <a href="">
                            <img src={getImageUrl("icons/pdf.png")} />
                            PDF Format
                        </a>
                        <br />
                        <a className={styles.csv} href="">
                            <img src={getImageUrl("icons/csv.png")} />
                            CSV Format
                        </a>
                    </div>
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
                        {/* <img src={getImageUrl("chart.png")} alt="" /> */}
                        {/* <Speedometer value={75} min={0} max={100} /> */}
                        {/* <Meter className={styles.speedometer} initialValue={15} min={0} max={100} /> */}
                        <div className={styles.meter}>
                            <ReactSpeedometer
                                // fluidWidth={true}
                                // width={"100%"}
                                position={"center"}
                                height={200}
                                _hover={{}}
                                maxValue={3000}
                                value={2313}
                                needleColor="black"
                                segments={3}
                                segmentColors={[
                                    "#BAE6FD",
                                    "#60A5FA",
                                    "#1D4ED8",
                                ]}
                                maxSegmentLabels={0}
                                needleHeightRatio={0.6}
                                needleTransition='easeElastic'
                                needleTransitionDuration={4000}
                                labelFontSize='0'
                                valueTextFontSize='0'
                                // ringWidth={100}
                            />
                            <div className={styles.valuePop}>2313</div>
                        </div>
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
                    {/* <BarChart className={styles.barchart} data={burnRate} options={options} /> */}
                    <CashflowChart data={cashflowSummary} />
                </div>
                

            </div>

            

  
            </div>
        </>
    )
}