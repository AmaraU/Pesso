import React, { useState, useEffect, useRef } from 'react';
import styles from "./TransactionsPage.module.css";
import { getImageUrl } from '../../../utils';
import classNames from 'classnames';
import { Button, Center, Spinner, useToast } from "@chakra-ui/react";
import { SlRefresh } from "react-icons/sl";
import { auditLog, logger } from '../../models/logging';
import { format } from 'date-fns';
import axios from 'axios';
import { DEFAULT_RECENT_TRXNS_ERR_MSG, getAPIEndpoint } from '../../../config';
import Pagination from '../../Components/Pagination/Pagination';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';




export const TransactionsPage = () => {

    const [ search, setSearch] = useState("");
    const [ currentPage, setCurrentPage ] = useState(1);
    const categories = ["Salaries and wages", "Rent", "Utilities", "Equipment", "Supplies", "Travel", "Entertainment", "Marketing and advertising"];
    const [ selectedCategory, setSelectedCategory ] = useState({});
    const [ openCategories, setOpenCategories ] = useState({});
    const [ searchCategories, setSearchCategries] = useState("");
    const [ openFilter, setOpenFilter ] = useState(false);
    const [ openDownload, setOpenDownload ] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [trxns, setTrxns] = useState([]);
    const toast = useToast();
    const containerRefs = useRef([]);
    const categoriesRef = useRef(null);
    const filterRef = useRef(null);
    const downloadRef = useRef(null);
    

    const itemsPerPage = 10;

    useEffect(() => {
        getTrxns();
        log("Viewed transaction history", "Transactions");
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
                    setTrxns(data.slice(0,100));
                    console.log(data.slice(0,2));
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
    
    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('en-US').format(number);
    };


    const filteredTransactions = trxns.filter(transaction => {
        const searchLower = search.toLowerCase();
        return (
            transaction.trans_date.toLowerCase().includes(searchLower) ||
            format(new Date (transaction.trans_date), 'MMM dd, yyyy').toLowerCase().includes(searchLower) ||
            format(new Date (transaction.trans_date), 'MMMM dd yyyy').toLowerCase().includes(searchLower) ||
            transaction.trans_ref.toLowerCase().includes(searchLower) ||
            transaction.trans_narration.toLowerCase().includes(searchLower) ||
            transaction.account_number.toLowerCase().includes(searchLower) ||
            transaction.institution_name.toLowerCase().includes(searchLower) ||
            transaction.trans_amount.toLowerCase().includes(searchLower) ||
            formatNumber(transaction.trans_amount).toLowerCase().includes(searchLower) ||
            transaction.account_balance.toLowerCase().includes(searchLower) ||
            formatNumber(transaction.account_balance).toLowerCase().includes(searchLower)
        );
    });

    const sortedTransactions = [...filteredTransactions].sort((a, b) => new Date(b.trans_date) - new Date(a.trans_date));


    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTransactions = sortedTransactions.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    const handleSearchCategories = (event) => {
        setSearchCategries(event.target.value);
    };
    
    const filteredCategories = categories.filter(category => 
        category.toLowerCase().includes(searchCategories.toLowerCase())
    );

    const toggleCategories = (event, index) => {
        event.stopPropagation();
        setOpenCategories(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
        setSearchCategries('');
    };
    const handleCategorySelection = (index, category) => {
        setSelectedCategory(prevState => ({...prevState, [index]: category }));
        setOpenCategories(prevState => ({...prevState, [index]: false }));
    };


    const handleFilterToggle = () => {
        setOpenFilter(!openFilter);
    };
    const handleDownloadToggle = () => {
        setOpenDownload(!openDownload);
    };



    const handleClickOutside = (event) => {
        if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
            setOpenCategories(false);
        }
        if (filterRef.current && !filterRef.current.contains(event.target)) {
            setOpenFilter(false);
        }
        if (downloadRef.current && !downloadRef.current.contains(event.target)) {
            setOpenDownload(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);


    const convertToCSV = (transactions) => {
        const headers = [
            'Date Created', 
            'Reference No.', 
            'Description', 
            'Account', 
            'Category',
            'Type',
            'Amount',
            'Balance'
        ];

        const rows = transactions.map(transaction => [
            format(new Date(transaction.trans_date)),
            transaction.trans_ref,
            transaction.trans_narration,
            `${transaction.account_number} - ${transaction.institution_name}`,
            'Salaries and wage', // or your dynamic category
            transaction.trans_type,
            `${transaction.currency.toLowerCase() === 'ngn' ? 'N' : ''}${transaction.currency.toLowerCase() === 'usd' ? '$' : ''}${transaction.trans_amount}`,
            `${transaction.currency.toLowerCase() === 'ngn' ? 'N' : ''}${transaction.currency.toLowerCase() === 'usd' ? '$' : ''}${transaction.account_balance}`
        ]);

        const csvContent = [
            headers.join(','), 
            ...rows.map(row => row.join(','))
        ].join('\n');

        return csvContent;
    };

    const downloadCSV = () => {
        const csvContent = convertToCSV(sortedTransactions);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);

        link.setAttribute('href', url);
        link.setAttribute('download', 'transactions_data.csv');
        link.style.visibility = 'hidden';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        log("Downloaded transaction history (csv)", "Transactions");
    };

    const generatePDF = () => {
        const input = document.getElementById('transaction-table');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                const imgProps = pdf.getImageProperties(imgData);
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

                pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                pdf.save('transactions.pdf');
            });
        log("Downloaded transaction history (pdf)", "Transactions");
    };



    return (
        <div className={styles.whole} >
            <div className={styles.searchButtons}>
                <div className={styles.searchBar}>
                    <img src={getImageUrl("icons/search.png")} />
                    <input id="search" type="text" onChange={handleSearch} placeholder='Search transactions' />
                </div>

                <div className={styles.buttons}>
                    <Button p={"0"} bg={"transparent"} border={"none"} _hover={{bg: "transaprent"}}>
                        <SlRefresh size={"24px"}/>
                    </Button>
                    <button className={styles.buttonOne} onClick={handleFilterToggle} >
                        <img src={getImageUrl("icons/slides.png")} />
                        Filter
                        <img src={getImageUrl("icons/redDownAngle.png")} />
                    </button>
                    {openFilter && <div className={styles.filter} ref={filterRef} >
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
                        <a className={styles.reset}>Reset All</a>
                    </div>}

                    <button className={styles.buttonTwo} onClick={handleDownloadToggle}>
                        <img src={getImageUrl("icons/whiteDownArrow.png")} />
                        Download
                    </button>
                    {openDownload && <div className={styles.download} ref={downloadRef}>
                        <p>DOWNLOAD</p>
                        <a onClick={generatePDF}>
                            <img src={getImageUrl("icons/pdf.png")} />
                            PDF Format
                        </a>
                        <br />
                        <a className={styles.csv} onClick={downloadCSV}>
                            <img src={getImageUrl("icons/csv.png")} />
                            CSV Format
                        </a>
                    </div>}

                </div>
            </div>

            {isLoading ? <Center><Spinner /></Center> :

                <>
                {currentTransactions.length === 0 ? (
                    <div className={styles.nothingBigDiv}>
                        <div className={styles.nothingFound}>
                            <img src={getImageUrl("nothing.png")} />
                            <h2>No Transaction Data</h2>
                            <p>We cannot seem to find any transaction data, your transaction information will appear here.</p>
                        </div>
                    </div>
                    
                ) : (
                    <>
                    <table className={styles.transactionTable} id='transaction-table'>
                        <thead>
                            <th>Date Created</th>
                            <th>Reference No.</th>
                            <th>Description</th>
                            <th>Account</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Balance</th>
                        </thead>

                        <tbody>
                            {currentTransactions.map((transaction, index) => (
                                <tr key={index}>
                                    <td>{format(new Date (transaction.trans_date), 'MMM dd, yyyy')}</td>
                                    <td>{transaction.trans_ref}</td>
                                    <td>{transaction.trans_narration}</td>
                                    <td>{transaction.account_number} - {transaction.institution_name}</td>
                                    <td className={styles.category}>
                                        <button className={styles.categoriesButton} onClick={(e) => toggleCategories(e, index)}>
                                            <p>{selectedCategory[index] || "Salaries and wage"}</p>
                                            <img src={getImageUrl("icons/blackDownAngle.png")} />
                                        </button>

                                        {openCategories[index] && <div className={styles.theCategories} ref={categoriesRef} >
                                            <p>CATEGORY</p>
                                            <div className={styles.categorySearch}>
                                                <img src={getImageUrl("icons/search.png")} />
                                                <input id="search" type="text" onChange={handleSearchCategories} placeholder='Search for Category' />
                                            </div>

                                            <ul>
                                                {filteredCategories.map((category, catIndex) => (
                                                    <li key={catIndex} onClick={() => handleCategorySelection(index, category)}>{category}</li>
                                                ))}
                                            </ul>
                                        </div>}
                                        
                                    </td>
                                    <td className={classNames({
                                        [styles.credit]: transaction.trans_type.toLowerCase() === ("credit"),
                                        [styles.debit]: transaction.trans_type.toLowerCase() === ("debit")
                                    })}>
                                        {transaction.trans_type.toLowerCase() === ("credit") ? `+` :
                                        transaction.trans_type.toLowerCase() === ("debit") ? `-` : ``}
                                        {transaction.currency.toLowerCase() === ("ngn") ? `₦` :
                                        transaction.currency.toLowerCase() === ("usd") ? `$` : ``}
                                        {formatNumber(transaction.trans_amount)}
                                    </td>
                                    <td>
                                        {transaction.currency.toLowerCase() === ("ngn") ? `₦` :
                                        transaction.currency.toLowerCase() === ("usd") ? `$` : ``}
                                        {formatNumber(transaction.account_balance)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className={styles.smallTransactionTable}>
                        {currentTransactions.map((transaction, index) => (
                            <div key={index}>
                                <div className={styles.smallTransactionTableEntry}>

                                    <div className={styles.smallTransactionTableRow}>
                                        <div className={styles.greyBox}>Date Created</div>
                                        <div className={styles.whiteBox}>{format(new Date (transaction.trans_date), 'MMM dd, yyyy')}</div>
                                    </div>

                                    <div className={styles.smallTransactionTableRow}>
                                        <div className={styles.greyBox}>Reference No.</div>
                                        <div className={styles.whiteBox}>{transaction.trans_ref}</div>
                                    </div>

                                    <div className={styles.smallTransactionTableRow}>
                                        <div className={styles.greyBox}>Description</div>
                                        <div className={styles.whiteBox}>{transaction.trans_narration}</div>
                                    </div>

                                    <div className={styles.smallTransactionTableRow}>
                                        <div className={styles.greyBox}>Account</div>
                                        <div className={styles.whiteBox}>{transaction.account_number} - {transaction.institution_name}</div>
                                    </div>

                                    <div className={styles.smallTransactionTableRow}>
                                        <div className={styles.greyBox}>Category</div>

                                        <div className={styles.whiteBox}>
                                            <button className={styles.categoriesButton} onClick={(e) => toggleCategories(e, index)}>
                                                <p>{selectedCategory[index] || "Salaries and wage"}</p>
                                                <img src={getImageUrl("icons/blackDownAngle.png")} />
                                            </button>
                                        </div>

                                        {openCategories[index] && <div className={styles.theCategories} ref={categoriesRef} >
                                            <p>CATEGORY</p>
                                            <div className={styles.categorySearch}>
                                                <img src={getImageUrl("icons/search.png")} />
                                                <input id="search" type="text" onChange={handleSearchCategories} placeholder='Search for Category' />
                                            </div>

                                            <ul>
                                                {filteredCategories.map((category, catIndex) => (
                                                    <li key={catIndex} onClick={() => handleCategorySelection(index, category)}>{category}</li>
                                                ))}
                                            </ul>
                                        </div>}
                                    </div>

                                    <div className={styles.smallTransactionTableRow}>

                                        <div className={styles.greyBox}>Amount</div>
                                                                            
                                        <div className={`${classNames({
                                            [styles.credit]: transaction.trans_type.toLowerCase() === ("credit"),
                                            [styles.debit]: transaction.trans_type.toLowerCase() === ("debit") })}
                                            ${styles.whiteBox}`}
                                        >
                                            {transaction.trans_type.toLowerCase() === ("credit") ? `+` : ``}
                                            {transaction.trans_type.toLowerCase() === ("debit") ? `-` : ``}
                                            {transaction.currency.toLowerCase() === ("ngn") ? `N` : ``}
                                            {transaction.currency.toLowerCase() === ("usd") ? `$` : ``}
                                            {formatNumber(transaction.trans_amount)}
                                        </div>
                                    </div>

                                    <div className={styles.smallTransactionTableRow}>
                                        <div className={styles.greyBox}>Balance</div>

                                        <div className={styles.whiteBox}>
                                            {transaction.currency.toLowerCase() === ("ngn") ? `N` : ``}
                                            {transaction.currency.toLowerCase() === ("usd") ? `$` : ``}
                                            {formatNumber(transaction.account_balance)}
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.redLine}></div>
                            </div>
                        ))}
                    </div>


                    <Pagination
                        filteredData={filteredTransactions}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                    </>
                )}
                </>
            }
        </div>
    )
}