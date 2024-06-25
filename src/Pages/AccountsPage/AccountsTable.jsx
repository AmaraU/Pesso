import React, { useState, useEffect, useRef } from "react";
import { Tab, TabList, Tabs, Box, HStack, Text, Stack } from "@chakra-ui/react";

import styles from "./AccountsPage.module.css";
import { getImageUrl } from "../../../utils";

export const AccountsTable = () => {

    const CurrentTable = () => {

        const current = [
            {
                account: "Polaris bank",
                acctNo: "01234567",
                available: "N20,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            },
            {
                account: "Access bank",
                acctNo: "01234567",
                available: "N20,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            },
            {
                account: "Access bank",
                acctNo: "01234567",
                available: "N20,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            },
            {
                account: "Access bank",
                acctNo: "01234567",
                available: "N20,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            },
            {
                account: "Polaris bank",
                acctNo: "01234567",
                available: "N20,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            },
            {
                account: "Standard chatered",
                acctNo: "01234567",
                available: "N20,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            },
            {
                account: "Standard chartered",
                acctNo: "01234567",
                available: "N20,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            },
            {
                account: "Access bank",
                acctNo: "01234567",
                available: "N20,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            },
            {
                account: "Access bank",
                acctNo: "01234567",
                available: "N20,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            },
            {
                account: "Polaris bank",
                acctNo: "01234567",
                available: "N20,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            }
        ]
        const [ currentPage, setCurrentPage ] = useState(1);
        const itemsPerPage = 10;
        
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentCurrents = current.slice(indexOfFirstItem, indexOfLastItem);
    
        const totalPages = Math.ceil(current.length / itemsPerPage);
    
        const handleNextPage = () => {
            if (currentPage < Math.ceil(current.length / itemsPerPage)) {
                setCurrentPage(currentPage + 1);
            }
        };
    
        const handlePreviousPage = () => {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        };
    
        const handlePageClick = (pageNumber) => {
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
                                    <td>{current.account}</td>
                                    <td>{current.acctNo}</td>
                                    <td>{current.available}</td>
                                    <td>{current.prinLoanBal}</td>
                                    <td>{current.dateTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={styles.pagination}>
                        <button onClick={handlePreviousPage} disabled={currentPage === 1} className={styles.move}>
                            <img src={getImageUrl("icons/greyLeftAngle.png")} />
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button key={index + 1} onClick={() => handlePageClick(index + 1)} className={currentPage === index + 1 ? styles.activePage : styles.gotToPage}>
                                0{index + 1}
                            </button>
                        ))}
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className={styles.move}>
                            Next
                            <img src={getImageUrl("icons/greyRightAngle.png")} />
                        </button>
                    </div>
                    </>
                )}
            </div>
        )
    }


    const PreviousTable = () => {

        const previous = [
            {
                account: "Access bank",
                acctNo: "23412867",
                available: "N300,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            },
            {
                account: "Access bank",
                acctNo: "23412867",
                available: "N300,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            },
            {
                account: "Access bank",
                acctNo: "23412867",
                available: "N300,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            },
            {
                account: "Polaris bank",
                acctNo: "23412867",
                available: "N300,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            },
            {
                account: "Standard chatered",
                acctNo: "23412867",
                available: "N300,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            },
            {
                account: "Standard chartered",
                acctNo: "23412867",
                available: "N300,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            },
            {
                account: "Access bank",
                acctNo: "23412867",
                available: "N300,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            },
            {
                account: "Access bank",
                acctNo: "23412867",
                available: "N300,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            },
            {
                account: "Polaris bank",
                acctNo: "23412867",
                available: "N300,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            },
            {
                account: "Polaris bank",
                acctNo: "23412867",
                available: "N300,000",
                prinLoanBal: "N300,000",
                dateTime: "July 22, 2022; 4:24pm"
            }
        ]
        const [ currentPage, setCurrentPage ] = useState(1);
        const itemsPerPage = 10;
        
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentPrevious = previous.slice(indexOfFirstItem, indexOfLastItem);
    
        const totalPages = Math.ceil(previous.length / itemsPerPage);
    
        const handleNextPage = () => {
            if (currentPage < Math.ceil(previous.length / itemsPerPage)) {
                setCurrentPage(currentPage + 1);
            }
        };
    
        const handlePreviousPage = () => {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
            }
        };
    
        const handlePageClick = (pageNumber) => {
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
                                    <td>{previous.account}</td>
                                    <td>{previous.acctNo}</td>
                                    <td>{previous.available}</td>
                                    <td>{previous.prinLoanBal}</td>
                                    <td>{previous.dateTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={styles.pagination}>
                        <button onClick={handlePreviousPage} disabled={currentPage === 1} className={styles.move}>
                            <img src={getImageUrl("icons/greyLeftAngle.png")} />
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button key={index + 1} onClick={() => handlePageClick(index + 1)} className={currentPage === index + 1 ? styles.activePage : styles.gotToPage}>
                                0{index + 1}
                            </button>
                        ))}
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className={styles.move}>
                            Next
                            <img src={getImageUrl("icons/greyRightAngle.png")} />
                        </button>
                    </div>
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

        <Box bg={'white'} p={"16px"}>
            <Stack spacing={"16px"}>
                <Stack direction={"row"} justify={"space-between"}>
                    <HStack spacing={"24px"}>
                        <Text fontSize={"16px"} fontWeight={600} color={"#374151"}>Account Summary</Text>
                        <Tabs borderLeft={"2px solid #D1D5DB"}>
                            <TabList gap={"16px"} ml={"24px"} border={"none"}>
                                <Tab selected onClick={() => currentTable()} p={"8px"} fontSize={"16px"} color={'#9CA3AF'} bgColor={"transparent"} border={"none"} borderBottom={'2px solid transparent'} _selected={{ color: '#D2042D', borderBottom: '2px solid #D2042D', borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0 }}>
                                    <Text fontWeight={500}>Current Day</Text>
                                </Tab>
                                <Tab onClick={() => previousTable()}  p={"8px"} fontSize={"16px"} color={'#9CA3AF'} bgColor={"transparent"} border={"none"} borderBottom={'2px solid transparent'} _selected={{ color: '#D2042D', borderBottom: '2px solid #D2042D', borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0 }}>
                                    <Text fontWeight={500}>Previous Day</Text>
                                </Tab>
                            </TabList>
                        </Tabs>
                    </HStack>
                    
                    <div className={styles.buttons}>
                        <button className={styles.buttonOne} onClick={() => setOpenFilter(!openFilter)}>
                            <img src={getImageUrl("icons/slides.png")} />
                            Filter
                            <img src={getImageUrl("icons/redDownAngle.png")} />
                        </button>
                        <div className={`${styles.filterClosed} ${openFilter && styles.filter}`} ref={popupRef}>
                            <p>FILTER</p>
                            <a href="">Last 7 days</a>
                            <a href="">Last 15 days</a>
                            <a href="">Last 30 days</a>
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

                <CurrentTable />
                <PreviousTable />
                
            </Stack>            
        </Box>
        </>
    )
}