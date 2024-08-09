import React, { useState, useEffect, useRef } from "react";
import { Tab, TabList, Tabs, Box, Text, Stack, Center, Spinner, useToast } from "@chakra-ui/react";
import { DEFAULT_RECENT_TRXNS_ERR_MSG, getAPIEndpoint } from '../../../config';
import { logger } from '../../models/logging';
import axios from 'axios';
import styles from "./AccountsPage.module.css";
import { getImageUrl } from "../../../utils";
import Pagination from "../../Components/Pagination/Pagination";
import { format } from 'date-fns';




export const AccountsTable = () => {

    const [ isSummaryLoading, setIsSummaryLoading ] = useState(false);
    const [ current, setCurrentDayTrxns ] = useState([]);
    const [ previous, setPreviousDayTrxns ] = useState([]);
    const toast = useToast();


    useEffect(() => {
        getSummary();
    }, []);


    const getSummary = async () => {
        
        const currentDate = "2023-12-11";
        const previousDate = "2023-12-10";
        setIsSummaryLoading(true);
        try {

            const response = await axios.post(getAPIEndpoint('trxns'), null, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsSummaryLoading(false);
                    setCurrentDayTrxns(data.filter(e => e.trans_date.split('T')[0] === currentDate));
                    setPreviousDayTrxns(data.filter(e => e.trans_date.split('T')[0] === previousDate));
                    return;
                }
                else {
                    setIsSummaryLoading(false);
                    let err = "";

                    if (data.length > 0) {
                        err = data[0].error;
                    }

                    if (err) {
                        toast({
                            description: `${DEFAULT_RECENT_TRXNS_ERR_MSG}. ${err ? "[Details: " + err + "]" : ""} `,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_RECENT_TRXNS_ERR_MSG,
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
            await logger({ task: "Get Recent Transactions", error: error.toString() });
        }
        toast({
            description: DEFAULT_RECENT_TRXNS_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsSummaryLoading(false);
    }

    console.log(current);
    console.log(previous);

    const CurrentTable = () => {

        const [ currentPage, setCurrentPage ] = useState(1);
        const itemsPerPage = 10;
        
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentCurrents = current.slice(indexOfFirstItem, indexOfLastItem);
    
        const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber);
        }
    
    
        return (
            <div id="currentTable">
                {currentCurrents.length === 0 ? (
                    <div className={styles.nothingBigDivTable}>
                        <div className={styles.nothingFoundTable}>
                            <h2>No Account Summary</h2>
                            <p>We cannot seem to find any account summary data, your account summary will apear here.</p>
                        </div>
                    </div>
                    
                ) : (
                    <>

                    <table className={styles.accountsTable}>
                        <thead>
                            <th>Account</th>
                            <th>Account No.</th>
                            <th>Opening Available</th>
                            <th>Principal Loan Balance</th>
                            <th>Date; Time</th>
                        </thead>
        
                        <tbody>
                            {currentCurrents.map((current, index) => (
                                <tr key={index}>
                                    <td>{current.institution_name}</td>
                                    <td>{current.account_number}</td>
                                    <td>
                                        {current.currency.toLowerCase() === ("ngn") ? `N` : ``}
                                        {current.currency.toLowerCase() === ("usd") ? `$` : ``}
                                        {formatNumber(current.account_balance)}
                                    </td>
                                    <td>{current.prinLoanBal}</td>
                                    <td>{format(new Date (current.trans_date), 'MMM dd, yyyy; hh:mma')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={styles.smallAccountsTable}>
                        {currentCurrents.map((current, index) => (
                            <div className={styles.smallAccountsTableEntry} id={index}>

                                <div className={styles.smallAccountsTableRow}>
                                    <div className={styles.greyBox}>Account</div>
                                    <div className={styles.whiteBox}>{current.institution_name}</div>
                                </div>

                                <div className={styles.smallAccountsTableRow}>
                                    <div className={styles.greyBox}>Account No.</div>
                                    <div className={styles.whiteBox}>{current.account_number}</div>
                                </div>

                                <div className={styles.smallAccountsTableRow}>
                                    <div className={styles.greyBox}>Opening Available</div>
                                    <div className={styles.whiteBox}>
                                        {current.currency.toLowerCase() === ("ngn") ? `N` : ``}
                                        {current.currency.toLowerCase() === ("usd") ? `$` : ``}
                                        {formatNumber(current.account_balance)}
                                    </div>
                                </div>

                                <div className={styles.smallAccountsTableRow}>
                                    <div className={styles.greyBox}>Principal Loan Balance</div>
                                    <div className={styles.whiteBox}>{current.prinLoanBal}</div>
                                </div>

                                <div className={styles.smallAccountsTableRow}>
                                    <div className={styles.greyBox}>Date; Time</div>
                                    <div className={styles.whiteBox}>{format(new Date (current.trans_date), 'MMM dd, yyyy; hh:mma')}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Pagination
                        filteredData={currentCurrents}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                    </>
                )}
            </div>
        )
    }


    const PreviousTable = () => {
        
        const [ currentPage, setCurrentPage ] = useState(1);
        const itemsPerPage = 10;
        
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentPrevious = previous.slice(indexOfFirstItem, indexOfLastItem);
    
        const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber);
        }
    
    
        return (
            <div id="previousTable" className={styles.hide}>
                {currentPrevious.length === 0 ? (
                    <div className={styles.nothingBigDivTable}>
                        <div className={styles.nothingFoundTable}>
                            <h2>No Account Summary</h2>
                            <p>We cannot seem to find any account summary data, your account summary will apear here.</p>
                        </div>
                    </div>
                    
                ) : (
                    <>

                    <table className={styles.accountsTable}>
                        <thead>
                            <th>Account</th>
                            <th>Account No.</th>
                            <th>Opening Available</th>
                            <th>Principal Loan Balance</th>
                            <th>Date; Time</th>
                        </thead>
        
                        <tbody>
                            {currentPrevious.map((previous, index) => (
                                <tr key={index}>
                                    <td>{previous.institution_name}</td>
                                    <td>{previous.account_number}</td>
                                    <td>
                                        {previous.currency.toLowerCase() === ("ngn") ? `N` : ``}
                                        {previous.currency.toLowerCase() === ("usd") ? `$` : ``}
                                        {formatNumber(previous.account_balance)}
                                    </td>
                                    <td>{previous.prinLoanBal}</td>
                                    <td>{format(new Date (previous.trans_date), 'MMM dd, yyyy; hh:mma')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={styles.smallAccountsTable}>
                        {currentPrevious.map((previous, index) => (
                            <>
                            <div className={styles.smallAccountsTableEntry} id={index}>

                                <div className={styles.smallAccountsTableRow}>
                                    <div className={styles.greyBox}>Account</div>
                                    <div className={styles.whiteBox}>{previous.institution_name}</div>
                                </div>

                                <div className={styles.smallAccountsTableRow}>
                                    <div className={styles.greyBox}>Account No.</div>
                                    <div className={styles.whiteBox}>{previous.account_number}</div>
                                </div>

                                <div className={styles.smallAccountsTableRow}>
                                    <div className={styles.greyBox}>Opening Available</div>
                                    <div className={styles.whiteBox}>
                                        {previous.currency.toLowerCase() === ("ngn") ? `N` : ``}
                                        {previous.currency.toLowerCase() === ("usd") ? `$` : ``}
                                        {formatNumber(previous.account_balance)}
                                    </div>
                                </div>

                                <div className={styles.smallAccountsTableRow}>
                                    <div className={styles.greyBox}>Principal Loan Balance</div>
                                    <div className={styles.whiteBox}>{previous.prinLoanBal}</div>
                                </div>

                                <div className={styles.smallAccountsTableRow}>
                                    <div className={styles.greyBox}>Date; Time</div>
                                    <div className={styles.whiteBox}>{format(new Date (previous.trans_date), 'MMM dd, yyyy; hh:mma')}</div>
                                </div>
                            </div>

                            <div className={styles.redLine}></div>
                            </>
                        ))}
                    </div>

                    <Pagination
                        filteredData={currentPrevious}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                    </>
                )}
            </div>
        )
    }



    function currentTable() {
        var tableC = document.getElementById("currentTable");
        var tableP = document.getElementById("previousTable");

        tableC.classList.remove(`${styles.hide}`);
        tableP.classList.add(`${styles.hide}`);
    }

    function previousTable() {
        var tableC = document.getElementById("currentTable");
        var tableP = document.getElementById("previousTable");

        tableC.classList.add(`${styles.hide}`);
        tableP.classList.remove(`${styles.hide}`);
    }


    const [ openFilter, setOpenFilter ] = useState(false);
    const [ openExport, setOpenExport ] = useState(false);

    const handleExportClick = () => {
        setOpenExport(prev => {
            if (!prev) {
                setOpenFilter(false);
            }
            return !prev;
        });
    };

    function toggleSuccess() {
        setOpenExport(false);
        var success = document.getElementById('successpopup');
        success.classList.toggle(`${styles.successPopped}`);
        var popup = document.getElementById('dimmer');
        popup.classList.toggle(`${styles.dim}`);        
    }

    const formatNumber = (number) => {
        return new Intl.NumberFormat('en-US').format(number);
    };

    

    const popupRef = useRef(null);

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setOpenFilter(false);
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

        <Box bg={'white'} p={{ base: "8px", md: "16px"}}>
            <Stack spacing={"16px"}>
                <Stack direction={{ base: "column", lg: "row" }} justifyContent={{ base: "center", lg: "space-between" }} >
                    
                    <Stack alignItems={"center"} spacing={"24px"} direction={{ base: "column", md: "row" }} justifyContent={{ base: "center", md: "center", lg: "auto" }} >
                        
                        <Text fontSize={"16px"} fontWeight={600} color={"#374151"} justifyItems={{ sm: "left" }}>Account Summary</Text>
                        <Tabs borderLeft={{ base: "none", md: "2px solid #D1D5DB"}} justifyItems={{ base: "center", md: "auto" }}>
                            <TabList gap={"16px"} ml={"24px"} border={"none"}>
                                <Tab selected onClick={() => currentTable()} p={"8px"} fontSize={"16px"} color={'#9CA3AF'} bgColor={"transparent"} border={"none"} borderBottom={'2px solid transparent'} _selected={{ color: '#D2042D', borderBottom: '2px solid #D2042D', borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0 }}>
                                    <Text fontWeight={500}>Current Day</Text>
                                </Tab>
                                <Tab onClick={() => previousTable()}  p={"8px"} fontSize={"16px"} color={'#9CA3AF'} bgColor={"transparent"} border={"none"} borderBottom={'2px solid transparent'} _selected={{ color: '#D2042D', borderBottom: '2px solid #D2042D', borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0 }}>
                                    <Text fontWeight={500}>Previous Day</Text>
                                </Tab>
                            </TabList>
                        </Tabs>

                    </Stack>
                    
                    <div className={styles.buttons}>
                        <button className={styles.buttonOne} onClick={() => setOpenFilter(!openFilter)}>
                            <img src={getImageUrl("icons/slides.png")} />
                            Filter
                            <img src={getImageUrl("icons/redDownAngle.png")} />
                        </button>
                        <div className={`${styles.filterClosed} ${openFilter && styles.filter}`} ref={popupRef}>
                            <p>FILTER</p>
                            <a href="">Last week</a>
                            <a href="">Last month</a>
                            <a href="">Last year</a>
                            <div className={styles.customFilter}>
                                <p>CUSTOM DATE</p>
                                <div className={styles.startEnd}>
                                    <input type="date" placeholder='Start Date' />-
                                    <input type="date" placeholder='End Date' />
                                </div>
                            </div>
                            <a className={styles.reset} href="">Reset All</a>
                        </div>

                        <button className={styles.buttonTwo} onClick={handleExportClick} ref={popupRef}>
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
                                    <label htmlFor="">From</label>
                                    <input type="date" name="" id="" />
                                </div>

                                <div className={styles.exportFormGroup}>
                                    <label htmlFor="">To</label>
                                    <input type="date" name="" id="" />
                                </div>
                            </div>
                            <div className={styles.exportButton}>
                                <button onClick={() => toggleSuccess()}>Export</button>
                            </div>
                        </div>
                        <div className={styles.successPopup} id='successpopup'>
                            <img src={getImageUrl("success.png")} />
                            <h4>Successfully Exported</h4>
                            <button onClick={() => toggleSuccess()}>Continue</button>
                        </div>

                    </div>
                </Stack>

                { isSummaryLoading ? <Center><Spinner h={"20px"} w={"20px"} /></Center> :
                    <>
                    <CurrentTable />
                    <PreviousTable />
                    </>
                }
                
            </Stack>            
        </Box>
        </>
    )
}