import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Center, HStack, Spinner, Stack, Text, useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalFooter, ModalBody } from "@chakra-ui/react";
import styles from "./CashflowOutPage.module.css";
import { getImageUrl } from '../../../utils';
import classNames from 'classnames';
import { SlRefresh } from "react-icons/sl";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiShow, BiHide } from "react-icons/bi";
import { format } from 'date-fns';
import { auditLog, logger } from '../../models/logging';
import axios from 'axios';
import { DEFAULT_RECENT_TRXNS_ERR_MSG, getAPIEndpoint } from '../../../config';
import Pagination from '../../Components/Pagination/Pagination';
import { AddPayment } from '../../Components/AddPayment';



export const CashflowOutPage = () => {

    const { isOpen: isOpenAddPayment, onOpen: onOpenAddPayment, onClose: onCloseAddPayment } = useDisclosure();
    const { isOpen: isOpenSuccess, onOpen: onOpenSuccess, onClose: onCloseSuccess } = useDisclosure();
    const [search, setSearch] = useState("");
    const [actionsOpen, setActionsOpen] = useState({});
    const [currentHistoryPage, setCurrentHistoryPage] = useState(1);
    const [currentPendingPage, setCurrentPendingPage] = useState(1);
    const [openFilter, setOpenFilter] = useState(false);
    const [openExport, setOpenExport] = useState(false);
    const [activeButton, setActiveButton] = useState(1);
    const [totalBalanceVisible, setTotalBalanceVisible] = useState(true);
    const [isLoading, setIsloading] = useState(false);
    const [trxns, setTrxns] = useState([]);
    const [trxnsOutflow, setTrxnsOutflow] = useState([]);
    const toast = useToast();

    const itemsPerPage = 10;


    useEffect(() => {
        log("Viewed cashflow outflow", "Cashflow");
        getTrxns();
    }, [])

    const log = async (activity, module) => {
        await auditLog({
            activity,
            module,
            userId: sessionStorage.getItem("id")
        }, sessionStorage.getItem("tk"));
    }

    const getTrxns = async () => {
        setIsloading(true);
        try {

            const response = await axios.post(getAPIEndpoint('trxns'), null, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsloading(false);
                    setTrxnsOutflow(data.filter(e => e.trans_type === "debit"));
                    setTrxns(data);
                    return;
                }
                else {
                    setIsloading(false);
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

        setIsloading(false);
    }


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

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPendingPage(1);
        setCurrentHistoryPage(1);
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('en-US').format(number);
    };

    const filteredHistoryOutflows = trxnsOutflow.filter(outflow => {
        const searchLower = search.toLowerCase();
        // return (
        //     outflow.refNo.toLowerCase().includes(searchLower) ||
        //     outflow.title.toLowerCase().includes(searchLower) ||
        //     outflow.type.toLowerCase().includes(searchLower) ||
        //     outflow.amount.toLowerCase().includes(searchLower) ||
        //     outflow.dateTime.toLowerCase().includes(searchLower) ||
        //     outflow.category.toLowerCase().includes(searchLower)
        // );
        return (
            outflow.trans_ref.toLowerCase().includes(searchLower) ||
            outflow.trans_narration.toLowerCase().includes(searchLower) ||
            // outflow.type.toLowerCase().includes(searchLower) ||
            formatNumber(outflow.trans_amount).toLowerCase().includes(searchLower) ||
            outflow.trans_amount.toLowerCase().includes(searchLower) ||
            outflow.trans_date.toLowerCase().includes(searchLower) ||
            format(new Date(outflow.trans_date), 'MMM dd, yyyy; h:mma').toLowerCase().includes(searchLower) ||
            format(new Date(outflow.trans_date), 'MMMM dd, yyyy; hh:mm a').toLowerCase().includes(searchLower)
            // outflow.category.toLowerCase().includes(searchLower)
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

    const handlePageChange1 = (pageNumber) => {
        setCurrentHistoryPage(pageNumber);
    }

    const handlePageChange2 = (pageNumber) => {
        setCurrentPendingPage(pageNumber);
    }


    function changeTables(buttonNumber) {
        setActiveButton(buttonNumber);

        var table1 = document.getElementById('table1');
        var table2 = document.getElementById('table2');

        table1.classList.toggle(`${styles.hideTable}`);
        table2.classList.toggle(`${styles.hideTable}`);
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


    const hideBalance = () => {
        return "******";
    }

    const handleToggleVisibility = () => {
        setTotalBalanceVisible(!totalBalanceVisible);
    }

    function removeNumbersAndPunctuation(str) {
        return str.replace(/[0-9\p{P}]/gu, '');
    }



    const handleAddPayment = () => {
        onOpenAddPayment();
    }


    return (
        <>
            <div className={styles.whole}>

                <div className={styles.buttonSwitch}>
                    <button className={`${styles.switchButton} ${activeButton === 1 ? styles.active : ''}`} onClick={() => changeTables(1)}>History</button>
                    <button className={`${styles.switchButton} ${activeButton === 2 ? styles.active : ''}`} onClick={() => changeTables(2)}>Pending Payments</button>
                </div>

                <div id='table1'>

                    <div className={styles.searchButtons}>
                        <div className={styles.searchBar}>
                            <img src={getImageUrl("icons/search.png")} />
                            <input id="search" type="text" onChange={handleSearch} placeholder='Search for outflows' />
                        </div>

                        <div className={styles.buttons}>
                            <Button p={"0"} bg={"transparent"} border={"none"} _hover={{ bg: "transaprent" }}>
                                <SlRefresh size={"24px"} />
                            </Button>
                            <div>
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
                            </div>

                            <div>
                                <button className={styles.buttonTwo} onClick={handleExportClick}>
                                    <img src={getImageUrl("icons/whiteDownArrow.png")} alt="" />
                                    Export
                                </button>
                                <div className={`${styles.exportClosed} ${openExport && styles.export}`} ref={popupRef}>
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
                                        <button onClick={onOpenSuccess}>Export</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Stack spacing={1} mb={8}>
                        <Text fontSize={"16px"} color={"#6B7280"} fontWeight={500}>Total Outflow Balance</Text>
                        {
                            isLoading ? <Spinner w={"20px"} h={"20px"} /> :
                                <HStack ml={"-1px"} spacing={0}>
                                    <Box fontSize={"36px"}>
                                        <TbCurrencyNaira />
                                    </Box>
                                    <Text fontSize={"32px"} fontWeight={600} >{totalBalanceVisible ? Intl.NumberFormat('en-us', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(trxnsOutflow.length > 0 ? trxnsOutflow.map(e => e.trans_amount).reduce((a, b) => parseFloat(a) + parseFloat(b), 0) : 0) : hideBalance()}</Text>

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

                    {isLoading ? <Center><Spinner /></Center> :

                        <>

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
                                                    <td>{outflow.trans_ref}</td>
                                                    <td>{removeNumbersAndPunctuation(outflow.trans_narration)}</td>
                                                    <td>{outflow.type}</td>
                                                    <td>
                                                        {outflow.trans_type.toLowerCase() === ("credit") ? `+` : ''}
                                                        {outflow.trans_type.toLowerCase() === ("debit") ? `-` : ''}
                                                        {outflow.currency.toLowerCase() === ("ngn") ? `N` : ``}
                                                        {outflow.currency.toLowerCase() === ("usd") ? `$` : ``}
                                                        {formatNumber(outflow.trans_amount)}
                                                    </td>
                                                    <td>{format(new Date(outflow.trans_date), 'MMM dd, yyyy; h:mma')}</td>
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

                                    <div className={styles.smallCashOutTable}>
                                        {currentHistoryOutflows.map((outflow, index) => (
                                            <>
                                                <div className={styles.smallCashOutTableEntry} key={index}>

                                                    <div className={styles.smallCashOutTableRow}>
                                                        <div className={styles.greyBox}>Reference Number</div>
                                                        <div className={styles.whiteBox}>{outflow.trans_ref}</div>
                                                    </div>

                                                    <div className={styles.smallCashOutTableRow}>
                                                        <div className={styles.greyBox}>Title</div>
                                                        <div className={styles.whiteBox}>{removeNumbersAndPunctuation(outflow.trans_narration)}</div>
                                                    </div>

                                                    <div className={styles.smallCashOutTableRow}>
                                                        <div className={styles.greyBox}>Payment Type</div>
                                                        <div className={styles.whiteBox}>{outflow.type}</div>
                                                    </div>

                                                    <div className={styles.smallCashOutTableRow}>

                                                        <div className={styles.greyBox}>Amount</div>

                                                        <div className={styles.whiteBox}>
                                                            {outflow.trans_type.toLowerCase() === ("credit") ? `+` : ''}
                                                            {outflow.trans_type.toLowerCase() === ("debit") ? `-` : ''}
                                                            {outflow.currency.toLowerCase() === ("ngn") ? `N` : ``}
                                                            {outflow.currency.toLowerCase() === ("usd") ? `$` : ``}
                                                            {formatNumber(outflow.trans_amount)}
                                                        </div>
                                                    </div>

                                                    <div className={styles.smallCashOutTableRow}>
                                                        <div className={styles.greyBox}>Date; Time</div>
                                                        <div className={styles.whiteBox}>{format(new Date(outflow.trans_date), 'MMM dd, yyyy; h:mma')}</div>
                                                    </div>

                                                    <div className={styles.smallCashOutTableRow}>
                                                        <div className={styles.greyBox}>Category</div>
                                                        <div className={styles.whiteBox}>{outflow.category}</div>
                                                    </div>
                                                </div>

                                                <div className={styles.redLine}></div>
                                            </>
                                        ))}
                                    </div>

                                    <Pagination
                                        filteredData={filteredHistoryOutflows}
                                        currentPage={currentHistoryPage}
                                        itemsPerPage={itemsPerPage}
                                        onPageChange={handlePageChange1}
                                    />
                                </>
                            )}
                        </>
                    }
                </div>



                <div className={`${styles.hideTable}`} id='table2'>

                    <div className={styles.searchButtons}>
                        <div className={styles.searchBar}>
                            <img src={getImageUrl("icons/search.png")} />
                            <input id="search" type="text" onChange={handleSearch} placeholder='Search for transaction' />
                        </div>

                        <div className={styles.buttons}>
                            <Button p={"0"} bg={"transparent"} border={"none"} _hover={{ bg: "transaprent" }}>
                                <SlRefresh size={"24px"} />
                            </Button>
                            <button className={styles.buttonTwo} onClick={handleAddPayment}>
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
                                    <th>Title</th>
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

                            <div className={styles.smallCashOutTable}>
                                {currentPendingOutflows.map((outflow, index) => (
                                    <>
                                        <div className={styles.smallCashOutTableEntry} key={index}>

                                            <div className={styles.smallCashOutTableRow}>
                                                <div className={styles.greyBox}>Reference Number</div>
                                                <div className={styles.whiteBox}>{outflow.refNo}</div>
                                            </div>

                                            <div className={styles.smallCashOutTableRow}>
                                                <div className={styles.greyBox}>Title</div>
                                                <div className={styles.whiteBox}>{outflow.title}</div>
                                            </div>

                                            <div className={styles.smallCashOutTableRow}>
                                                <div className={styles.greyBox}>Payment Type</div>
                                                <div className={styles.whiteBox}>{outflow.type}</div>
                                            </div>

                                            <div className={styles.smallCashOutTableRow}>
                                                <div className={styles.greyBox}>Amount</div>
                                                <div className={styles.whiteBox}>{outflow.amount}</div>
                                            </div>

                                            <div className={styles.smallCashOutTableRow}>
                                                <div className={styles.greyBox}>Status</div>
                                                <div className={`${styles.whiteBox} ${styles.status}`}>
                                                    <div className={classNames({
                                                        [styles.paid]: outflow.status.toLowerCase().includes('paid'),
                                                        [styles.pending]: outflow.status.toLowerCase().includes('pending'),
                                                        [styles.overdue]: outflow.status.toLowerCase().includes('overdue')
                                                    })}>
                                                        {outflow.status}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={styles.smallCashOutTableRow}>
                                                <div className={styles.greyBox}>Date</div>
                                                <div className={styles.whiteBox}>{outflow.date}</div>
                                            </div>

                                            <div className={styles.smallCashOutTableRow}>
                                                <div className={styles.greyBox}>Category</div>
                                                <div className={styles.whiteBox}>{outflow.category}</div>
                                            </div>
                                        </div>

                                        <div className={styles.redLine}></div>
                                    </>
                                ))}
                            </div>

                            <Pagination
                                filteredData={filteredPendingOutflows}
                                currentPage={currentPendingPage}
                                itemsPerPage={itemsPerPage}
                                onPageChange={handlePageChange2}
                            />
                        </>
                    )}
                </div>
            </div>

            <AddPayment isOpen={isOpenAddPayment} onClose={onCloseAddPayment} />

            <Modal isCentered size={'md'} closeOnOverlayClick={true} isOpen={isOpenSuccess} onClose={onCloseSuccess} >
                <ModalOverlay />
                <ModalContent rounded={15} p={'20px'} justifyContent={'center'} w={'fit-content'}>
                    <ModalCloseButton />
                    <ModalBody pb={2}>
                        <div style={{ overflow: 'auto', maxHeight: '60vh' }}>
                            <Stack alignItems={'center'} spacing={0}>
                                <img src={getImageUrl("success.png")} style={{ width: '50%', height: 'auto' }} />
                                <Text fontSize={'24px'} fontWeight={500} color={'#000000'} mt={'-12px'}>Successfully Exported</Text>
                            </Stack>
                        </div>
                    </ModalBody>
                    <ModalFooter p={1}>
                        <Button w={'100%'} bg={'#D2042D'} _hover={{ bg: '#BD0429' }} color={"white"} fontSize={'16px'} fontWeight={500}>Continue</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}