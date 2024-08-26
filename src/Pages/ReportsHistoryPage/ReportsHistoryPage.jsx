import React, { useState, useEffect, useRef } from 'react';
import styles from "./ReportsHistoryPage.module.css";
import { getImageUrl } from '../../../utils';
import { Button, Center, Spinner } from "@chakra-ui/react";
import { SlRefresh } from "react-icons/sl";
import { auditLog, logger } from '../../models/logging';
import axios from 'axios';
import { DEFAULT_BUDGET_DATA_ERR_MSG, getAPIEndpoint } from "../../../config";
import Pagination from '../../Components/Pagination/Pagination';

export const ReportsHistoryPage = () => {

    const [ openExport, setOpenExport ] = useState(false);
    const [ search, setSearch] = useState("");
    const [ actionsOpen, setActionsOpen ] = useState({});
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ reportsHistory, setReportsHistory ] = useState([]);
    const itemsPerPage = 10;


    useEffect(() => {
        log("Viewed reports history", "Reports");
        getReportsHistory();
    }, [])

    const log = async (activity, module) => {
        await auditLog({
            activity,
            module,
            userId: sessionStorage.getItem("id")
        }, sessionStorage.getItem("tk"));
    }

    const getReportsHistory = async () => {
        setIsLoading(true);
        try {

            const response = await axios.post(getAPIEndpoint('get-budgets'), null, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsLoading(false);
                    setReportsHistory(data);
                    return;
                }
                else {
                    setIsLoading(false);
                    let err = "";

                    if (data.length > 0) {
                        err = data[0].error;
                    }

                    if (err) {
                        toast({
                            description: `${DEFAULT_BUDGET_DATA_ERR_MSG}. ${err ? "[Details: " + err + "]" : ""} `,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_BUDGET_DATA_ERR_MSG,
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
            await logger({ task: "Get Budget Categories", error: error.toString() });
        }
        toast({
            description: DEFAULT_BUDGET_DATA_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsLoading(false);
    }

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
    

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };


    const filteredReports = reports.filter(report => {
        const searchLower = search.toLowerCase();
        return (
            report.date.toLowerCase().includes(searchLower) ||
            report.acctNumber.toLowerCase().includes(searchLower) ||
            report.acctName.toLowerCase().includes(searchLower) ||
            report.acctBal.toLowerCase().includes(searchLower) ||
            report.currBal.toLowerCase().includes(searchLower)
        );
    });


    const toggleAction = (index) => {
        setActionsOpen(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReports = filteredReports.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    const handleExportClick = () => {
        setOpenExport(!openExport)
    };

    function toggleSuccess() {
        setOpenExport(false);
        var success = document.getElementById('successpopup');
        success.classList.toggle(`${styles.successPopped}`);
        var popup = document.getElementById('dimmer');
        popup.classList.toggle(`${styles.dim}`);        
    }

    

    const popupRef = useRef(null);

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setActionsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);



    return (
        <>

        <div className={styles.dimmer} id='dimmer'></div>


        <div className={styles.whole}>
            <div className={styles.searchButtons}>
                <div className={styles.searchBar}>
                    <img src={getImageUrl("icons/search.png")} />
                    <input id="search" type="text" onChange={handleSearch} placeholder='Search reports' />
                </div>

                <div className={styles.buttons}>
                    <Button p={"0"} bg={"transparent"} border={"none"} _hover={{bg: "transaprent"}}>
                        <SlRefresh size={"24px"}/>
                    </Button>
                    <div className={styles.buttonOne}>
                        <img src={getImageUrl("icons/slides.png")} alt="" />
                        <select name="accounts" >
                            <option value="">Current Day</option>
                        </select>
                    </div>

                    <div>
                        <button className={styles.buttonTwo} onClick={handleExportClick}>
                            <img src={getImageUrl("icons/whiteDownload.png")} alt="" />
                            Export
                        </button>

                        <div className={`${styles.exportClosed} ${openExport && styles.export}`}>
                            <div className={styles.exportHeader}>
                                <p>Export</p>
                                <a onClick={() => setOpenExport(false)}><img src={getImageUrl("icons/greyClose.png")} alt="" /></a>
                            </div>
                            
                            <div className={styles.exportForm}>
                                <div className={styles.exportFormGroup}>
                                    <label htmlFor="">Account</label>
                                    <select name="account">
                                        <option value="">Select Account</option>
                                    </select>
                                    <div className={styles.allAccts}>
                                        <input type="checkbox" name="allaccts" />
                                        <label htmlFor="allaccts">All Accounts</label>
                                    </div>
                                </div>

                                <div className={styles.checkboxes}>
                                    <p>Categories</p>
                                    <div className={styles.checkbox}>
                                        <input type="checkbox" name="cashflow" />
                                        <label htmlFor="cashflow">Cashflow</label>
                                    </div>
                                    <div className={styles.checkbox}>
                                        <input type="checkbox" name="finhealth" />
                                        <label htmlFor="finhealth">Financial Health</label>
                                    </div>
                                    <div className={styles.checkbox}>
                                        <input type="checkbox" name="burnrate" />
                                        <label htmlFor="burnrate">Burn Rate</label>
                                    </div>
                                    <div className={styles.checkbox}>
                                        <input type="checkbox" name="loans" />
                                        <label htmlFor="loans">Loans</label>
                                    </div>
                                    <div className={styles.checkbox}>
                                        <input type="checkbox" name="trxns" />
                                        <label htmlFor="trxns">Transactions</label>
                                    </div>
                                </div>
                                <div className={styles.exportButton}>
                                    <button onClick={() => toggleSuccess()}>Export</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.successPopup} id='successpopup'>
                        <img src={getImageUrl("success.png")} />
                        <h4>Successfully Exported</h4>
                        <button onClick={() => toggleSuccess()}>Continue</button>
                    </div>

                </div>
            </div>

            {isLoading ? <Center><Spinner /></Center> :

                <>
                {currentReports.length === 0 ? (
                    <div className={styles.nothingBigDiv}>
                        <div className={styles.nothingFound}>
                            <img src={getImageUrl("nothing.png")} />
                            <h2>No Report Data</h2>
                            <p>We cannot seem to find any report data, your transaction information will appear here.</p>
                        </div>
                    </div>
                    
                ) : (

                    <>

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
                            {currentReports.map((report, index) => (
                                <tr key={index}>
                                    <td className={styles.checkbox}><input type="checkbox" /></td>
                                    <td className={styles.date}>{report.date}</td>
                                    <td className={styles.acctNumber}>{report.acctNumber}</td>
                                    <td className={styles.acctName}>{report.acctName}</td>
                                    <td className={styles.acctBal}>{report.acctBal}</td>
                                    <td className={styles.currBal}>{report.currBal}</td>
                                    <td className={styles.action}>
                                        <button onClick={() => toggleAction(index)}>
                                            <img src={getImageUrl("icons/action.png")} />
                                        </button>
                                        <div className={`${styles.actionsClosed} ${actionsOpen[index] && styles.theActions}`} ref={popupRef} >
                                            <p>ACTION</p>
                                            <ul>
                                                <li>View</li>
                                                <li>Download pdf</li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                    <div className={styles.smallReportTable}>
                        {currentReports.map((report, index) => (
                            <>
                            <div className={styles.smallReportTableEntry}>

                                <div className={styles.smallReportActions}>

                                    <div className={styles.checkbox}><input type="checkbox" name="" id="" /></div>
                                    
                                    <div>
                                        <button onClick={() => toggleAction(index)}>
                                            <img src={getImageUrl("icons/action.png")} />
                                        </button>
                                        <div className={`${styles.actionsClosed} ${actionsOpen[index] && styles.theActions}`} ref={popupRef} >
                                            <p>ACTION</p>
                                            <ul>
                                                <li>View</li>
                                                <li>Download pdf</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.smallReportTableRow}>
                                    <div className={styles.greyBox}>Date</div>
                                    <div className={styles.whiteBox}>{report.date}</div>
                                </div>

                                <div className={styles.smallReportTableRow}>
                                    <div className={styles.greyBox}>Account Number</div>
                                    <div className={styles.whiteBox}>{report.acctNumber}</div>
                                </div>

                                <div className={styles.smallReportTableRow}>
                                    <div className={styles.greyBox}>Account Name</div>
                                    <div className={styles.whiteBox}>{report.acctName}</div>
                                </div>

                                <div className={styles.smallReportTableRow}>
                                    <div className={styles.greyBox}>Account Balance</div>
                                    <div className={styles.whiteBox}>{report.acctBal}</div>
                                </div>

                                <div className={styles.smallReportTableRow}>
                                    <div className={styles.greyBox}>Current Balance</div>
                                    <div className={styles.whiteBox}>{report.currBal}</div>
                                </div>
                            </div>
                            </>
                        ))}
                    </div>

                    <Pagination
                        filteredData={filteredReports}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                    </>
                )}
                </>
            }
        </div>
        </>
    )
}