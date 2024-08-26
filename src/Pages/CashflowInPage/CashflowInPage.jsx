import { Box, Button, HStack, Spinner, Stack, Text, useToast, Center, useDisclosure } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from 'react';
import styles from "./CashflowInPage.module.css";
import { getImageUrl } from '../../../utils';
import classNames from 'classnames';
import { SlRefresh } from "react-icons/sl";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiShow, BiHide } from "react-icons/bi";
import { format } from 'date-fns';
import { auditLog, logger } from '../../models/logging';
import axios from 'axios';
import { DEFAULT_RECENT_TRXNS_ERR_MSG, getAPIEndpoint } from '../../../config';
import Pagination from "../../Components/Pagination/Pagination";
import { AddInvoice } from "../../Components/AddInvoice";



export const CashflowInPage = () => {

    const { isOpen: isOpenAddInvoice, onOpen: onOpenAddInvoice, onClose: onCloseAddInvoice } = useDisclosure();
    const [isEditInvoice, setIsEditInvoice] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(false);
    const [totalBalanceVisible, setTotalBalanceVisible] = useState(true);
    const [isLoading, setIsloading] = useState(false);
    const [trxns, setTrxns] = useState([]);
    const [trxnsInflow, setTrxnsInflow] = useState([]);
    const toast = useToast();


    useEffect(() => {
        log("Viewed cashflow inflow", "Cashflow");
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
                    setTrxnsInflow(data.filter(e => e.trans_type === "credit"));
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
    
    const inflows = [
        {
            invoiceNo: "235GDBH7",
            createdDate: "July 22, 2022; 4:24pm",
            dueDate: "July 22, 2023; 4:24pm",
            acctNo: "235GDBH7",
            status: "Paid",
            phoneNo: "08064538759",
            email: "Abolajiadewale@gmail.com",
            description: "Payment for site survey and inspection",
            amount: "+N300,000"
        },
        {
            invoiceNo: "235GDBH7",
            createdDate: "July 22, 2022; 4:24pm",
            dueDate: "July 22, 2023; 4:24pm",
            acctNo: "235GDBH7",
            status: "Paid",
            phoneNo: "08064538759",
            email: "Abolajiadewale@gmail.com",
            description: "Shoprite Kenya",
            amount: "-N300,000"
        },
        {
            invoiceNo: "235GDBH7",
            createdDate: "July 22, 2022; 4:24pm",
            dueDate: "July 22, 2023; 4:24pm",
            acctNo: "235GDBH7",
            status: "Paid",
            phoneNo: "08064538759",
            email: "Abolajiadewale@gmail.com",
            description: "Cadastral survey",
            amount: "+N300,000"
        },
        {
            invoiceNo: "235GDBH7",
            createdDate: "July 22, 2022; 4:24pm",
            dueDate: "July 22, 2023; 4:24pm",
            acctNo: "235GDBH7",
            status: "Paid",
            phoneNo: "08064538759",
            email: "Abolajiadewale@gmail.com",
            description: "Airtime purchase",
            amount: "-N300,000"
        },
        {
            invoiceNo: "235GDBH7",
            createdDate: "July 22, 2022; 4:24pm",
            dueDate: "July 22, 2023; 4:24pm",
            acctNo: "235GDBH7",
            status: "Paid",
            phoneNo: "08064538759",
            email: "Abolajiadewale@gmail.com",
            description: "Shoprite Kenya",
            amount: "+N300,000"
        },
        {
            invoiceNo: "235GDBH7",
            createdDate: "July 22, 2022; 4:24pm",
            dueDate: "July 22, 2023; 4:24pm",
            acctNo: "235GDBH7",
            status: "Pending",
            phoneNo: "08064538759",
            email: "Abolajiadewale@gmail.com",
            description: "Bank Charges",
            amount: "-N3,000"
        },
        {
            invoiceNo: "235GDBH7",
            createdDate: "July 22, 2022; 4:24pm",
            dueDate: "July 22, 2023; 4:24pm",
            acctNo: "235GDBH7",
            status: "Pending",
            phoneNo: "08064538759",
            email: "Abolajiadewale@gmail.com",
            description: "Cadastral survey",
            amount: "+N300,000"
        },
        {
            invoiceNo: "235GDBH7",
            createdDate: "July 22, 2022; 4:24pm",
            dueDate: "July 22, 2023; 4:24pm",
            acctNo: "235GDBH7",
            status: "Pending",
            phoneNo: "08064538759",
            email: "Abolajiadewale@gmail.com",
            description: "Shoprite Kenya",
            amount: "-N300,000"
        },
        {
            invoiceNo: "235GDBH7",
            createdDate: "July 22, 2022; 4:24pm",
            dueDate: "July 22, 2023; 4:24pm",
            acctNo: "235GDBH7",
            status: "Overdue",
            phoneNo: "08064538759",
            email: "Abolajiadewale@gmail.com",
            description: "Asbuilt",
            amount: "+N300,000"
        },
        {
            invoiceNo: "235GDBH7",
            createdDate: "July 22, 2022; 4:24pm",
            dueDate: "July 22, 2023; 4:24pm",
            acctNo: "235GDBH7",
            status: "Overdue",
            phoneNo: "08064538759",
            email: "Abolajiadewale@gmail.com",
            description: "Shoprite Kenya",
            amount: "-N300,000"
        }   
    ]

    const [ search, setSearch] = useState("");
    const [ currentPage, setCurrentPage ] = useState(1);
    const itemsPerPage = 10;

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('en-US').format(number);
    };


    // const filteredInflows = inflows.filter(inflow => {
    const filteredInflows = trxnsInflow.filter(inflow => {
        const searchLower = search.toLowerCase();
        // return (
        //     inflow.invoiceNo.toLowerCase().includes(searchLower) ||
        //     inflow.createdDate.toLowerCase().includes(searchLower) ||
        //     inflow.dueDate.toLowerCase().includes(searchLower) ||
        //     inflow.acctNo.toLowerCase().includes(searchLower) ||
        //     inflow.phoneNo.toLowerCase().includes(searchLower) ||
        //     inflow.email.toLowerCase().includes(searchLower) ||
        //     inflow.description.toLowerCase().includes(searchLower) ||
        //     inflow.amount.toLowerCase().includes(searchLower) ||
        //     inflow.status.toLowerCase().includes(searchLower)
        // );
        return (
            inflow.trans_ref.toLowerCase().includes(searchLower) ||
            inflow.trans_date.toLowerCase().includes(searchLower) ||
            format(new Date (inflow.trans_date), 'MMM dd, yyyy').toLowerCase().includes(searchLower) ||
            format(new Date (inflow.trans_date), 'MMMM dd, yyyy').toLowerCase().includes(searchLower) ||
            // inflow.dueDate.toLowerCase().includes(searchLower) ||
            inflow.account_number.toLowerCase().includes(searchLower) ||
            // inflow.phoneNo.toLowerCase().includes(searchLower) ||
            // inflow.email.toLowerCase().includes(searchLower) ||
            inflow.trans_narration.toLowerCase().includes(searchLower) ||
            inflow.trans_amount.toLowerCase().includes(searchLower) ||
            formatNumber(inflow.trans_amount).toLowerCase().includes(searchLower)
            // inflow.status.toLowerCase().includes(searchLower)

        );
    });

    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInflows = filteredInflows.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    const [ openFilter, setOpenFilter ] = useState(false);

    const handleAddInvoice = () => {
        onOpenAddInvoice();
    }
    const postDeleteInvoice = () => {
        setSelectedInvoice([]);
        setIsEditInvoice(false);
    }
    const resetEditInvoice = () => {
        setIsEditInvoice(false);
    }
    const handleEditInvoice = (inflow) => {
        setSelectedInvoice([inflow]);
        setIsEditInvoice(true);
        onOpenAddInvoice();
    }
    const handleDeleteInvoice = (inflow) => {
        setSelectedInvoice([{ id: inflow.id, name: inflow.full_name }]);
        onOpenDeleteInvoice();
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

    

    const hideBalance = () => {
        return "******";
    }

    const handleToggleVisibility = () => {
        setTotalBalanceVisible(!totalBalanceVisible);
    }

    function removeNumbersAndPunctuation(str) {
        return str.replace(/[0-9\p{P}]/gu, '');
    }


    return (
        <>
        <div className={styles.whole}>
            <div className={styles.searchButtons}>
                <div className={styles.searchBar}>
                    <img src={getImageUrl("icons/search.png")} />
                    <input id="search" type="text" onChange={handleSearch} placeholder='Search for anything' />
                </div>

                <div className={styles.buttons}>
                    <Button p={"0"} bg={"transparent"} border={"none"} _hover={{bg: "transaprent"}}>
                        <SlRefresh size={"24px"} />
                    </Button>
                    <button className={styles.buttonOne} onClick={() => setOpenFilter(!openFilter)}>
                        <img src={getImageUrl("icons/slides.png")} />
                        Filter
                        <img src={getImageUrl("icons/redDownAngle.png")} />
                    </button>
                    <div className={`${styles.filterClosed} ${openFilter && styles.filter}`} ref={popupRef}>
                        <p>FILTER</p>
                        <a>Last week</a>
                        <a>Last month</a>
                        <a>Last year</a>
                        <div className={styles.customFilter}>
                            <p>CUSTOM DATE</p>
                            <div className={styles.startEnd}>
                                <input type="date" placeholder='Start Date' />-
                                <input type="date" placeholder='End Date' />
                            </div>
                        </div>
                        <a className={styles.reset}>Reset All</a>
                    </div>

                    <button className={styles.buttonTwo} onClick={handleAddInvoice}>
                        Generate Invoice
                        <img src={getImageUrl("icons/whitePlus.png")} alt="" />
                    </button>

                </div>
            </div>

            <Stack spacing={1} mb={8}>
                <Text fontSize={"16px"} color={"#6B7280"} fontWeight={500}>Total Inflow Balance</Text>
                {
                    isLoading ? <Spinner w={"20px"} h={"20px"}/> :
                        <HStack ml={"-1px"} spacing={0}>
                            <Box fontSize={"36px"}>
                                <TbCurrencyNaira />
                            </Box>
                            <Text fontSize={"32px"} fontWeight={600} >{totalBalanceVisible ? Intl.NumberFormat('en-us', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }).format(trxnsInflow.length > 0 ? trxnsInflow.map(e => e.trans_amount).reduce((a, b) => parseFloat(a) + parseFloat(b), 0) : 0) : hideBalance()}</Text>
                            
                            <Box pl={3} cursor={"pointer"}>
                                { totalBalanceVisible && <BiShow fontSize={"xs"} color={"#374151"} onClick={handleToggleVisibility} /> }
                                { !totalBalanceVisible && <BiHide fontSize={"xs"} color={"#374151"} onClick={handleToggleVisibility} /> }
                            </Box>
                        </HStack>
                }
            </Stack>

            {isLoading ? <Center><Spinner /></Center> :
            
                <>
                {currentInflows.length === 0 ? (
                    <div className={styles.nothingBigDiv}>
                        <div className={styles.nothingFound}>
                            <img src={getImageUrl("nothing.png")} />
                            <h2>No Inflow Data</h2>
                            <p>We cannot seem to find any inflow data, your transaction information will appear here.</p>
                        </div>
                    </div>
                    
                ) : (
                    <>

                    <div className={styles.inflowTreemap}>
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

                    <table className={styles.inflowTable}>
                        <thead>
                            <th>Invoice Number</th>
                            <th>Date Created</th>
                            <th>Due Date</th>
                            <th>Account Number</th>
                            <th>Phone Number</th>
                            <th>Email Address</th>
                            <th>Description</th>
                            <th>Amount</th>
                            <th>Status</th>
                        </thead>

                        <tbody>
                            {currentInflows.map((inflow, index) => (

                                <tr key={index}>
                                    <td>{inflow.trans_ref}</td>
                                    <td>{format(new Date (inflow.trans_date), 'MMM dd, yyyy')}</td>
                                    <td>{inflow.dueDate}</td>
                                    <td>{inflow.account_number}</td>
                                    <td>{inflow.phoneNo}</td>
                                    <td>{inflow.email}</td>
                                    <td>{removeNumbersAndPunctuation(inflow.trans_narration)}</td>
                                    <td className={classNames({
                                        [styles.credit]: inflow.trans_type.toLowerCase() === ("credit"),
                                        [styles.debit]: inflow.trans_type.toLowerCase() === ("debit")
                                    })}>
                                        {inflow.trans_type.toLowerCase() === ("credit") ? `+` : ''}
                                        {inflow.trans_type.toLowerCase() === ("debit") ? `-` : ''}
                                        {inflow.currency.toLowerCase() === ("ngn") ? `N` : ``}
                                        {inflow.currency.toLowerCase() === ("usd") ? `$` : ``}
                                        {formatNumber(inflow.trans_amount)}
                                    </td>
                                    {/* <td className={styles.status}>
                                        <div className={classNames({
                                            [styles.paid]: inflow.status.toLowerCase().includes('paid'),
                                            [styles.pending]: inflow.status.toLowerCase().includes('pending'),
                                            [styles.overdue]: inflow.status.toLowerCase().includes('overdue'),
                                        })}>
                                            {inflow.status}
                                        </div>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={styles.smallCashInTable}>
                        {currentInflows.map((inflow, index) => (
                            <>
                            <div className={styles.smallCashInTableEntry} key={index}>

                                <div className={styles.smallCashInTableRow}>
                                    <div className={styles.greyBox}>Invoice Number</div>
                                    <div className={styles.whiteBox}>{inflow.trans_ref}</div>
                                </div>

                                <div className={styles.smallCashInTableRow}>
                                    <div className={styles.greyBox}>Date Created</div>
                                    <div className={styles.whiteBox}>{format(new Date (inflow.trans_date), 'MMM dd, yyyy')}</div>
                                </div>

                                <div className={styles.smallCashInTableRow}>
                                    <div className={styles.greyBox}>Due Date</div>
                                    <div className={styles.whiteBox}>{inflow.dueDate}</div>
                                </div>

                                <div className={styles.smallCashInTableRow}>
                                    <div className={styles.greyBox}>Account Number</div>
                                    <div className={styles.whiteBox}>{inflow.account_number}</div>
                                </div>

                                <div className={styles.smallCashInTableRow}>
                                    <div className={styles.greyBox}>Phone Number</div>
                                    <div className={styles.whiteBox}>{inflow.phoneNo}</div>
                                </div>

                                <div className={styles.smallCashInTableRow}>
                                    <div className={styles.greyBox}>Email Address</div>
                                    <div className={styles.whiteBox}>{inflow.email}</div>
                                </div>

                                <div className={styles.smallCashInTableRow}>
                                    <div className={styles.greyBox}>Description</div>
                                    <div className={styles.whiteBox}>{removeNumbersAndPunctuation(inflow.trans_narration)}</div>
                                </div>

                                <div className={styles.smallCashInTableRow}>

                                    <div className={styles.greyBox}>Amount</div>
                                                                        
                                    <div className={`${classNames({
                                        [styles.credit]: inflow.trans_type.toLowerCase() === ("credit"),
                                        [styles.debit]: inflow.trans_type.toLowerCase() === ("debit")})}
                                        ${styles.whiteBox}`}
                                    >
                                        {inflow.trans_type.toLowerCase() === ("credit") ? `+` : ''}
                                        {inflow.trans_type.toLowerCase() === ("debit") ? `-` : ''}
                                        {inflow.currency.toLowerCase() === ("ngn") ? `N` : ``}
                                        {inflow.currency.toLowerCase() === ("usd") ? `$` : ``}
                                        {formatNumber(inflow.trans_amount)}
                                    </div>
                                </div>

                                <div className={styles.smallCashInTableRow}>
                                    <div className={styles.greyBox}>Status</div>
                                    <div className={styles.whiteBox}>{inflow.status}</div>
                                </div>
                            </div>

                            <div className={styles.redLine}></div>
                            </>
                        ))}
                    </div>

                    <Pagination
                        filteredData={filteredInflows}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                    </>
                )}
                </>
            }
        </div>

        <AddInvoice isOpen={isOpenAddInvoice} onClose={onCloseAddInvoice} isEdit={isEditInvoice} dataset={selectedInvoice} resetEdit={resetEditInvoice} refreshData={getTrxns} />

        </>
    )
}