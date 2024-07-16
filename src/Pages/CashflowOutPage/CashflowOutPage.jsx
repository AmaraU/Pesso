import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, HStack, Spinner, Stack, Text } from "@chakra-ui/react";
import styles from "./CashflowOutPage.module.css";
import { getImageUrl } from '../../../utils';
import classNames from 'classnames';
import { SlRefresh } from "react-icons/sl";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiShow, BiHide } from "react-icons/bi";



export const CashflowOutPage = () => {

    const historyOutflows = [
        {

            refNo: "235GDBH7",
            title: "Outflow title",
            type: "Single",
            amount: "N300,000",
            dateTime: "July 22, 2022; 4:24pm",
            category: "Salaries and Wages"
        },
        {

            refNo: "235GDBH7",
            title: "Outflow title",
            type: "Bulk",
            amount: "N300,000",
            dateTime: "July 22, 2022; 4:24pm",
            category: "Rent"
        },
        {

            refNo: "235GDBH7",
            title: "Outflow title",
            type: "Single",
            amount: "N300,000",
            dateTime: "July 22, 2022; 4:24pm",
            category: "Utilities"
        },
        {

            refNo: "235GDBH7",
            title: "Outflow title",
            type: "Single",
            amount: "N300,000",
            dateTime: "July 22, 2022; 4:24pm",
            category: "Utilities"
        },
        {

            refNo: "235GDBH7",
            title: "Outflow title",
            type: "Bulk",
            amount: "N300,000",
            dateTime: "July 22, 2022; 4:24pm",
            category: "Equipment"
        },
        {

            refNo: "235GDBH7",
            title: "Outflow title",
            type: "Single",
            amount: "N300,000",
            dateTime: "July 22, 2022; 4:24pm",
            category: "Salaries and Wages"
        },
        {

            refNo: "235GDBH7",
            title: "Outflow title",
            type: "Bulk",
            amount: "N300,000",
            dateTime: "July 22, 2022; 4:24pm",
            category: "Supplies"
        },
        {

            refNo: "235GDBH7",
            title: "Outflow title",
            type: "Single",
            amount: "N300,000",
            dateTime: "July 22, 2022; 4:24pm",
            category: "Travel"
        },
        {

            refNo: "235GDBH7",
            title: "Outflow title",
            type: "Bulk",
            amount: "N300,000",
            dateTime: "July 22, 2022; 4:24pm",
            category: "Travel`"
        },
        {

            refNo: "235GDBH7",
            title: "Outflow title",
            type: "Single",
            amount: "N300,000",
            dateTime: "July 22, 2022; 4:24pm",
            category: "Salaries and Wages"
        }
    ]


    const pendingOutflows = [
        {
            refNo: "235GDBH7",
            title: "Washer fluid",
            type: "Single",
            amount: "N300,000",
            status: "Paid",
            date: "July 22, 2022",
            category: "Salaries and Wages"
        },
        {
            refNo: "235GDBH7",
            title: "Mid year bonus",
            type: " Bulk",
            amount: "N2,300,000",
            status: "Paid",
            date: "July 22, 2022",
            category: "Rent"
        },
        {
            refNo: "235GDBH7",
            title: "Office supplies",
            type: "Single",
            amount: "N24,450",
            status: "Paid",
            date: "July 22, 2022",
            category: "Utilities"
        },
        {
            refNo: "235GDBH7",
            title: "Office supplies",
            type: "Single",
            amount: "N190,845",
            status: "Paid",
            date: "July 22, 2022",
            category: "Utilities"
        },
        {
            refNo: "235GDBH7",
            title: "Transport",
            type: "Bulk",
            amount: "N860,000",
            status: "Paid",
            date: "July 22, 2022",
            category: "Equipment"
        },
        {
            refNo: "235GDBH7",
            title: "Office supplies",
            type: "Single",
            amount: "N30,000",
            status: "Pending",
            date: "July 22, 2022",
            category: "Salaries and Wages"
        },
        {
            refNo: "235GDBH7",
            title: "Data allowance",
            type: "Bulk",
            amount: "N1,642,000",
            status: "Pending",
            date: "July 22, 2022",
            category: "Supplies"
        },
        {
            refNo: "235GDBH7",
            title: "Office supplies",
            type: "Single",
            amount: "N22,000",
            status: "Pending",
            date: "July 22, 2022",
            category: "Travel"
        },
        {
            refNo: "235GDBH7",
            title: "Housing",
            type: "Bulk",
            amount: "N3,673,970",
            status: "Overdue",
            date: "July 22, 2022",
            category: "Travel"
        },
        {
            refNo: "235GDBH7",
            title: "Office supplies",
            type: "Single",
            amount: "N34,780",
            status: "Overdue",
            date: "July 22, 2022",
            category: "Salaries and Wages"
        },
        {
            refNo: "235GDBH7",
            title: "Housing",
            type: "Bulk",
            amount: "N300,000",
            status: "Overdue",
            date: "July 22, 2022",
            category: "Travel"
        },
    ]

    const [ search, setSearch] = useState("");
    const [ actionsOpen, setActionsOpen ] = useState({});
    const [ currentHistoryPage, setCurrentHistoryPage ] = useState(1);
    const [ currentPendingPage, setCurrentPendingPage ] = useState(1);
    const itemsPerPage = 10;

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPendingPage(1);
        setCurrentHistoryPage(1);
    };

    const filteredHistoryOutflows = historyOutflows.filter(outflow => {
        const searchLower = search.toLowerCase();
        return (
            outflow.refNo.toLowerCase().includes(searchLower) ||
            outflow.title.toLowerCase().includes(searchLower) ||
            outflow.type.toLowerCase().includes(searchLower) ||
            outflow.amount.toLowerCase().includes(searchLower) ||
            outflow.dateTime.toLowerCase().includes(searchLower) ||
            outflow.category.toLowerCase().includes(searchLower)
        );
    });

    const filteredPendingOutflows = pendingOutflows.filter(outflow => {
        const searchLower = search.toLowerCase();
        return (
            outflow.refNo.toLowerCase().includes(searchLower) ||
            outflow.title.toLowerCase().includes(searchLower) ||
            outflow.type.toLowerCase().includes(searchLower) ||
            outflow.amount.toLowerCase().includes(searchLower) ||
            outflow.status.toLowerCase().includes(searchLower) ||
            outflow.date.toLowerCase().includes(searchLower) ||
            outflow.category.toLowerCase().includes(searchLower)
        );
    });

    const toggleAction = (index) => {
        setActionsOpen(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    
    const indexOfLastItem1 = currentHistoryPage * itemsPerPage;
    const indexOfLastItem2 = currentPendingPage * itemsPerPage;

    const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage;
    const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage;


    const currentHistoryOutflows = filteredHistoryOutflows.slice(indexOfFirstItem1, indexOfLastItem1);
    const currentPendingOutflows = filteredPendingOutflows.slice(indexOfFirstItem2, indexOfLastItem2);

    const totalHistoryPages = Math.ceil(filteredHistoryOutflows.length / itemsPerPage);
    const totalPendingPages = Math.ceil(filteredPendingOutflows.length / itemsPerPage);

    const handleNextPage1 = () => {
        if (currentHistoryPage < Math.ceil(filteredHistoryOutflows.length / itemsPerPage)) {
            setCurrentHistoryPage(currentHistoryPage + 1);
        }
    };

    const handlePreviousPage1 = () => {
        if (currentHistoryPage > 1) {
            setCurrentHistoryPage(currentHistoryPage - 1);
        }
    };


    const handleNextPage2 = () => {
        if (currentPendingPage < Math.ceil(filteredPendingOutflows.length / itemsPerPage)) {
            setCurrentPendingPage(currentPendingPage + 1);
        }
    };

    const handlePreviousPage2 = () => {
        if (currentPendingPage > 1) {
            setCurrentPendingPage(currentPendingPage - 1);
        }
    };

    const handlePageClick1 = (pageNumber) => {
        setCurrentHistoryPage(pageNumber);
    }

    const handlePageClick2 = (pageNumber) => {
        setCurrentPendingPage(pageNumber);
    }

    const [ activeButton, setActiveButton ] = useState(1);

    function changeTables(buttonNumber) {
        setActiveButton(buttonNumber);

        var table1 = document.getElementById('table1');
        var table2 = document.getElementById('table2');

        table1.classList.toggle(`${styles.hideTable}`);
        table2.classList.toggle(`${styles.hideTable}`);
    }

    const [ openFilter, setOpenFilter ] = useState(false);
    const [ openExport, setOpenExport ] = useState(false);

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
            setOpenExport(false);
            setActionsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);


    const handleFilterClick = () => {
        setOpenFilter(prev => {
            if (!prev) {
                setOpenExport(false);
            }
            return !prev;
        });
    };

    const handleExportClick = () => {
        setOpenExport(prev => {
            if (!prev) {
                setOpenFilter(false);
            }
            return !prev;
        });
    };


    function toggleSingleBulk() {        
        var popup = document.getElementById('popup');
        popup.classList.toggle(`${styles.popped}`);

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.toggle(`${styles.dim}`);
    }

    function toggleSingle() {
        var popup = document.getElementById('popup');
        popup.classList.remove(`${styles.popped}`);

        var singlePopup = document.getElementById('singlePopup');
        singlePopup.classList.add(`${styles.popped}`);
    }
    function transferSuccess() {
        var singlePopup = document.getElementById('singlePopup');
        singlePopup.classList.remove(`${styles.popped}`);

        var singleSuccess = document.getElementById('paysuccesspopup');
        singleSuccess.classList.add(`${styles.popped}`);
    }
    function toggleSingleOff() {
        var singlePopup = document.getElementById('singlePopup');
        singlePopup.classList.remove(`${styles.popped}`);

        var singleSuccess = document.getElementById('paysuccesspopup');
        singleSuccess.classList.remove(`${styles.popped}`);

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.remove(`${styles.dim}`);
    }

    function toggleBulk() {
        var popup = document.getElementById('popup');
        popup.classList.remove(`${styles.popped}`);

        var bulkPopup = document.getElementById('bulkpopup');
        bulkPopup.classList.add(`${styles.popped}`);
    }
    function toggleBulkOff() {
        var bulkPopup = document.getElementById('bulkpopup');
        bulkPopup.classList.remove(`${styles.popped}`);

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.remove(`${styles.dim}`);
    }


    const [totalBalanceVisible, setTotalBalanceVisible] = useState(true);
    const [isLoading, setIsloading] = useState(false);

    const hideBalance = () => {
        return "******";
    }

    const handleToggleVisibility = () => {
        setTotalBalanceVisible(!totalBalanceVisible);
    }

    const cashflowins = [1,2,3];






    return (
        <>

        <div className={styles.popup} id="popup">

            <div className={styles.header}>
                <h3>Select payment type</h3>
                <a className={styles.close} href=""><img src={getImageUrl("icons/greyClose.png")} alt="X" onClick={(e) => {e.preventDefault(); toggleSingleBulk()}} /></a>
            </div>

            <div className={styles.singleBulk}>
                <button onClick={(e) => {e.preventDefault(); toggleSingle()}}>
                    <img src={getImageUrl("single.png")} />
                    Single payment
                </button>

                <button onClick={(e) => {e.preventDefault(); toggleBulk()}}>
                    <img src={getImageUrl("bulk.png")} />
                    Bulk payment
                </button>
            </div>
        </div>

        <div className={styles.singleDiv} id='singlePopup'>

            <div className={styles.singleHeader}>
                <h3>Single Payment</h3>
                <a onClick={(e) => {e.preventDefault(); toggleSingleOff()}}><img src={getImageUrl("icons/greyClose.png")} alt="" /></a>
            </div>

            <form action="">
                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Transfer from</label>
                    <select name="" id="">
                        <option value="">Select account</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Beneficiary Financial Institution</label>
                    <select name="" id="">
                        <option value="">Select institution</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Beneficiary Account</label>
                    <input type="number" name="" id="" placeholder="e.g 12345678" />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Amount</label>
                    <input type="number" name="" id="" placeholder='0.00' />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Frequency</label>
                    <select name="" id="">
                        <option value="">Every Month</option>
                        <option value="">Every Year</option>
                        <option value="">Every Week</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Transfer date</label>
                    <input type="date" placeholder="Select date" />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Description</label>
                    <input type="text" name="" id=""  placeholder="Description" />
                </div>

            </form>

            <div className={styles.singleButton}>
                <button onClick={(e) => {e.preventDefault(); transferSuccess()}}>Transfer</button>
            </div>
        </div>

        <div className={styles.paymentSuccessPopup} id='paysuccesspopup'>
            <img src={getImageUrl("success.png")} />
            <h4>Successfully Exported</h4>
            <button onClick={(e) => {e.preventDefault(); () => toggleSingleOff()}}>View Payments</button>
        </div>

        <div className={styles.bulkDiv} id='bulkpopup'>
            <div className={styles.bulkHeader}>
                <h4>Bulk Payment</h4>
                <a href="" onClick={(e) => {e.preventDefault(); toggleBulkOff()}}><img src={getImageUrl("icons/greyClose.png")} alt="" /></a>
            </div>

            <div className={styles.bulkForm}>
                <label htmlFor="">Transfer From</label>
                <select name="" id="">
                    <option value="">Select account</option>
                </select>

                <div className={styles.csvUpload}>
                    <img src={getImageUrl("uploading.png")} alt="" />
                    Drag a csv file, or
                    <button>Choose file</button>
                </div>
            </div>

            <div className={styles.bulkButton}>
                <button onClick={(e) => {e.preventDefault(); () => toggleBulkOff()}}>Upload</button>
            </div>
            

        </div>

        <div className={styles.dimmer} id='dimmer'></div>


        <div className={styles.whole}>

            <div className={styles.buttonSwitch}>
                <button className={ `${styles.switchButton} ${activeButton === 1 ? styles.active : ''}`} onClick={() => changeTables(1)}>History</button>
                <button className={ `${styles.switchButton} ${activeButton === 2 ? styles.active : ''}`} onClick={() => changeTables(2)}>Pending Payments</button>
            </div>

            <div id='table1'>

                <div className={styles.searchButtons}>
                    <div className={styles.searchBar}>
                        <img src={getImageUrl("icons/search.png")} />
                        <input id="search" type="text" onChange={handleSearch} placeholder='Search for outflows' />
                    </div>

                    <div className={styles.buttons}>
                        <Button p={"0"} bg={"transparent"} border={"none"} _hover={{bg: "transaprent"}}>
                            <SlRefresh size={"24px"} />
                        </Button>
                        <button className={styles.buttonOne} onClick={handleFilterClick}>
                            <img src={getImageUrl("icons/slides.png")} />
                            Filter
                            <img src={getImageUrl("icons/redDownAngle.png")} />
                        </button>
                        <div className={`${styles.filterClosed} ${openFilter && styles.filter}`} ref={popupRef}>
                            <p>FILTER</p>
                            <a href="">All transactions</a>
                            <a href="">Credit transactions</a>
                            <a href="">Debit transactions</a>
                            <br />
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
                            <img src={getImageUrl("icons/whiteDownArrow.png")} alt="" />
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
                </div>

                <Stack spacing={1} mb={8}>
                    <Text fontSize={"16px"} color={"#6B7280"} fontWeight={500}>Total Outflow Balance</Text>
                    {
                        isLoading ? <Spinner w={"20px"} h={"20px"}/> :
                            <HStack ml={"-1px"} spacing={0}>
                                <Box fontSize={"36px"}>
                                    <TbCurrencyNaira />
                                </Box>
                                <Text fontSize={"32px"} fontWeight={600} >{totalBalanceVisible ? Intl.NumberFormat('en-us', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }).format(cashflowins.length > 0 ? cashflowins.map(e => e.account_balance).reduce((a, b) => parseFloat(a) + parseFloat(b), 0) : 0) : hideBalance()}</Text>
                                
                                <Box pl={3} cursor={"pointer"}>
                                    {
                                        totalBalanceVisible && <BiShow fontSize={"xs"} color={"#374151"} onClick={handleToggleVisibility} />
                                    }
                                    {
                                        !totalBalanceVisible && <BiHide fontSize={"xs"} color={"#374151"} onClick={handleToggleVisibility} />
                                    }
                                </Box>
                            </HStack>
                    }
                </Stack>

                {currentHistoryOutflows.length === 0 ? (
                    <div className={styles.nothingBigDiv}>
                        <div className={styles.nothingFound}>
                            <img src={getImageUrl("nothing.png")} />
                            <h2>No Outflow Data</h2>
                            <p>We cannot seem to find any outflow data, your transaction information will appear here.</p>
                        </div>
                    </div>
                    
                ) : (
                    <>

                    <div className={styles.outflowTreemap}>
                        <div className={styles.treemapColumn}>
                            <div className={styles.treemapRow}>
                                <div className={`${styles.treemapBox} ${styles.one}`}><h5>45%</h5><p>BAD DEBTS</p></div>
                                <div className={`${styles.treemapBox} ${styles.two}`}><h5>45%</h5><p>CHARTITABLE CONTRIBUTIONS</p></div>
                            </div>
                            <div className={styles.treemapRow}>
                                <div className={`${styles.treemapBox} ${styles.three}`}><h5>45%</h5><p>COST OF GOODS SOLD (COGS)</p></div>
                                <div className={`${styles.treemapBox} ${styles.four}`}><h5>45%</h5><p>DEPRECIATION AND AMORIZATION</p></div>
                                <div className={`${styles.treemapBox} ${styles.five}`}><h5>45%</h5><p>EQUIPMENT</p></div>
                            </div>
                        </div>

                        <div className={styles.treemapColumn}>
                            <div className={`${styles.treemapBox} ${styles.six}`}><h5>45%</h5><p>FEES AND COMMISSIONS</p></div>
                            <div className={`${styles.treemapBox} ${styles.seven}`}><h5>45%</h5><p>INSURANCE</p></div>
                            <div className={`${styles.treemapBox} ${styles.eight}`}><h5>45%</h5><p>INTEREST</p></div>
                        </div>

                        <div className={styles.treemapColumn}>
                            <div className={styles.treemapRow}>
                                <div className={`${styles.treemapBox} ${styles.nine}`}><h5>20%</h5><p>MARKETING & ADVERTISING</p></div>
                                <div className={`${styles.treemapBox} ${styles.ten}`}><h5>20%</h5><p>OTHER EXPENSES</p></div>
                                <div className={`${styles.treemapBox} ${styles.eleven}`}><h5>20%</h5><p>PROFESSIONAL SERVICES</p></div>
                                <div className={`${styles.treemapBox} ${styles.twelve}`}><h5>20%</h5><p>RENT</p></div>
                                <div className={`${styles.treemapBox} ${styles.thirteen}`}><h5>20%</h5><p>REPAIRS AND MAINTENANCE</p></div>
                                <div className={`${styles.treemapBox} ${styles.fourteen}`}><h5>20%</h5><p>RESEARCH AND DEVELOPMENT</p></div>
                            </div>
                            <div className={styles.treemapRow}>
                                <div className={`${styles.treemapBox} ${styles.fifteen}`}><h5>10%</h5><p>SALARIES & WAGES</p></div>
                                <div className={`${styles.treemapBox} ${styles.sixteen}`}><h5>10%</h5><p>SHIPPING & POSTAGE</p></div>
                                <div className={`${styles.treemapBox} ${styles.seventeen}`}><h5>10%</h5><p>SOFTWARE & SUBSCRIPTIONS</p></div>
                                <div className={`${styles.treemapBox} ${styles.eighteen}`}><h5>10%</h5><p>SUPPLIES</p></div>
                                <div className={`${styles.treemapBox} ${styles.nineteen}`}><h5>10%</h5><p>TAXES</p></div>
                                <div className={`${styles.treemapBox} ${styles.twenty}`}><h5>10%</h5><p>TRAINING & DEVELOPMENT</p></div>
                            </div>
                            <div className={styles.treemapRow}>
                                <div className={`${styles.treemapBox} ${styles.twentyone}`}><h5>5%</h5><p>TRAVEL</p></div>
                                <div className={`${styles.treemapBox} ${styles.twentytwo}`}><h5>5%</h5><p>UTILITIES</p></div>
                                <div className={`${styles.treemapBox} ${styles.twentythree}`}><h5>5%</h5><p>ENTERTAINMENT</p></div>
                            </div>
                        </div>
                    </div>

                    <table className={styles.outflowTable}>
                        <thead>
                            <th className={styles.tableCheckbox}><input type="checkbox" id="selectAll" /></th>
                            <th>Reference Number</th>
                            <th>Title</th>
                            <th>Payment Type</th>
                            <th>Amount</th>
                            <th>Date; Time</th>
                            <th>Category</th>
                            <th className={styles.action}>Action</th>
                        </thead>

                        <tbody>
                            {currentHistoryOutflows.map((outflow, index) => (
                                <tr key={index}>
                                    <td className={styles.tableCheckbox}><input type="checkbox" /></td>
                                    <td>{outflow.refNo}</td>
                                    <td>{outflow.title}</td>
                                    <td>{outflow.type}</td>
                                    <td>{outflow.amount}</td>
                                    <td>{outflow.dateTime}</td>
                                    <td>{outflow.category}</td>
                                    <td className={styles.action}>
                                        <button onClick={() => toggleAction(index)}>
                                            <img src={getImageUrl("icons/action.png")} />
                                        </button>
                                        <div className={`${styles.actionsClosed} ${actionsOpen[index] && styles.theActions}`} >
                                            <p>ACTION</p>
                                            <ul>
                                                <li>Approve</li>
                                                <li>Reject</li>
                                                <li>Hold</li>
                                                <li>Download Receipt</li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                    <div className={styles.pagination}>
                        <button onClick={handlePreviousPage1} disabled={currentHistoryPage === 1} className={styles.move}>
                            <img src={getImageUrl("icons/greyLeftAngle.png")} />
                            Previous
                        </button>
                        {Array.from({ length: totalHistoryPages }, (_, index) => (
                            <button key={index + 1} onClick={() => handlePageClick1(index + 1)} className={currentHistoryPage === index + 1 ? styles.activePage : styles.gotToPage}>
                                0{index + 1}
                            </button>
                        ))}
                        <button onClick={handleNextPage1} disabled={currentHistoryPage === totalHistoryPages} className={styles.move}>
                            Next
                            <img src={getImageUrl("icons/greyRightAngle.png")} />
                        </button>
                    </div>
                    </>
                )}
            </div>



            <div className={`${styles.hideTable}`} id='table2'>

                <div className={styles.searchButtons}>
                    <div className={styles.searchBar}>
                        <img src={getImageUrl("icons/search.png")} />
                        <input id="search" type="text" onChange={handleSearch} placeholder='Search for transaction' />
                    </div>

                    <div className={styles.buttons}>
                        <Button p={"0"} bg={"transparent"} border={"none"} _hover={{bg: "transaprent"}}>
                            <SlRefresh size={"24px"}/>
                        </Button>
                        <button className={styles.buttonTwo} onClick={(e) => {e.preventDefault(); toggleSingleBulk()}}>
                            New Payment
                            <img src={getImageUrl("icons/send.png")} />
                        </button>
                    </div>
                </div>

                {currentPendingOutflows.length === 0 ? (
                    <div className={styles.nothingBigDiv}>
                        <div className={styles.nothingFound}>
                            <img src={getImageUrl("nothing.png")} />
                            <h2>No Outflow Data</h2>
                            <p>We cannot seem to find any outflow data, your transaction information will appear here.</p>
                        </div>
                    </div>
                    
                ) : (
                    <>

                    <table className={styles.outflowTable}>
                        <thead>
                            <th className={styles.tableCheckbox}><input type="checkbox" id="selectAll" /></th>
                            <th>Reference Number</th>
                            <th>TItle</th>
                            <th>Payment Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Category</th>
                            <th className={styles.action}>Action</th>
                        </thead>

                        <tbody>
                            {currentPendingOutflows.map((outflow, index) => (
                                <tr key={index}>
                                    <td className={styles.tableCheckbox}><input type="checkbox" /></td>
                                    <td>{outflow.refNo}</td>
                                    <td>{outflow.title}</td>
                                    <td>{outflow.type}</td>
                                    <td>{outflow.amount}</td>
                                    <td className={styles.status}>
                                        <div className={classNames({
                                            [styles.paid]: outflow.status.toLowerCase().includes('paid'),
                                            [styles.pending]: outflow.status.toLowerCase().includes('pending'),
                                            [styles.overdue]: outflow.status.toLowerCase().includes('overdue'),
                                        })}>
                                            {outflow.status}
                                        </div>
                                    </td>
                                    <td>{outflow.date}</td>
                                    <td>{outflow.category}</td>
                                    <td className={styles.action}>
                                        <button onClick={() => toggleAction(index)}>
                                            <img src={getImageUrl("icons/action.png")} />
                                        </button>
                                        <div className={`${styles.actionsClosed} ${actionsOpen[index] && styles.theActions}`} >
                                            <p>ACTION</p>
                                            <ul>
                                                <li>Hold</li>
                                                <li>Retry</li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                    <div className={styles.pagination}>
                        <button onClick={handlePreviousPage2} disabled={currentPendingPage === 1} className={styles.move}>
                            <img src={getImageUrl("icons/greyLeftAngle.png")} />
                            Previous
                        </button>
                        {Array.from({ length: totalPendingPages }, (_, index) => (
                            <button key={index + 1} onClick={() => handlePageClick2(index + 1)} className={currentPendingPage === index + 1 ? styles.activePage : styles.gotToPage}>
                                0{index + 1}
                            </button>
                        ))}
                        <button onClick={handleNextPage2} disabled={currentPendingPage === totalPendingPages} className={styles.move}>
                            Next
                            <img src={getImageUrl("icons/greyRightAngle.png")} />
                        </button>
                    </div>
                    </>
                )}
            </div>
        </div>
        </>
    )
}