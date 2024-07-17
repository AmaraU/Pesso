import React, { useState, useEffect, useRef } from 'react';
import styles from "./TransactionsPage.module.css";
import { getImageUrl } from '../../../utils';
import { Button } from "@chakra-ui/react";
import { SlRefresh } from "react-icons/sl";
import Pagination from '../../Components/Pagination/Pagination';



export const TransactionsPage = () => {

    const transactions = [
        {
            date: "July 22, 2022",
            refNo: "23412867",
            description: "Payment for site survey and inspection",
            account: "0123456789 - Polaris Bank",
            amount: "+N300,000",
            balance: "N300,000"
        },
        {
            date: "July 22, 2022",
            refNo: "23412867",
            description: "Shoprite Kenya",
            account: "0123456789 - Polaris Bank",
            amount: "-N300,000",
            balance: "N300,000"
        },
        {
            date: "July 22, 2022",
            refNo: "23412867",
            description: "Cadastral survey",
            account: "0123456789 - Polaris Bank",
            amount: "+N300,000",
            balance: "N300,000"
        },
        {
            date: "July 22, 2022",
            refNo: "23412867",
            description: "Airtime purchase",
            account: "0123456789 - Polaris Bank",
            amount: "-N300,000",
            balance: "N300,000"
        },
        {
            date: "July 22, 2022",
            refNo: "23412867",
            description: "Shoprite Kenya",
            account: "0123456789 - Polaris Bank",
            amount: "+N300,000",
            balance: "N300,000"
        },
        {
            date: "July 22, 2022",
            refNo: "23412867",
            description: "Bank Charges",
            account: "0123456789 - Polaris Bank",
            amount: "-N300,000",
            balance: "N300,000"
        },
        {
            date: "July 22, 2022",
            refNo: "23412867",
            description: "Cadastral survey",
            account: "0123456789 - Polaris Bank",
            amount: "+N300,000",
            balance: "N300,000"
        },
        {
            date: "July 22, 2022",
            refNo: "23412867",
            description: "Shoprite Kenya",
            account: "0123456789 - Polaris Bank",
            amount: "-N300,000",
            balance: "N300,000"
        },
        {
            date: "July 22, 2022",
            refNo: "23412867",
            description: "Asbuilt",
            account: "0123456789 - Polaris Bank",
            amount: "+N300,000",
            balance: "N300,000"
        },
        {
            date: "July 22, 2022",
            refNo: "23412867",
            description: "Shoprite Kenya",
            account: "0123456789 - Polaris Bank",
            amount: "-N300,000",
            balance: "N300,000"
        }
    ]

    const [ search, setSearch] = useState("");
    const [ currentPage, setCurrentPage ] = useState(1);
    const itemsPerPage = 10;

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };


    const filteredTransactions = transactions.filter(transaction => {
        const searchLower = search.toLowerCase();
        return (
            transaction.date.toLowerCase().includes(searchLower) ||
            transaction.refNo.toLowerCase().includes(searchLower) ||
            transaction.description.toLowerCase().includes(searchLower) ||
            transaction.account.toLowerCase().includes(searchLower) ||
            transaction.amount.toLowerCase().includes(searchLower)
        );
    });

    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const categories = ["Salaries and wages", "Rent", "Utilities", "Equipment", "Supplies", "Travel", "Entertainment", "Marketing and advertising"];
    const [ selectedCategory, setSelectedCategory ] = useState({});
    const [ openCategories, setOpenCategories ] = useState({});
    const [ searchCategories, setSearchCategries] = useState("");
    const [ openFilter, setOpenFilter ] = useState(false);
    const [ openDownload, setOpenDownload ] = useState(false);
    

    const handleSearchCategories = (event) => {
        setSearchCategries(event.target.value);
    };
    
    const filteredCategories = categories.filter(category => 
        category.toLowerCase().includes(searchCategories.toLowerCase())
    );

    const toggleCategories = (index) => {
        setOpenCategories(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
        setOpenFilter(false);
        setOpenDownload(false);
    };

    const handleCategorySelection = (index, category) => {
        setSelectedCategory(prevState => ({...prevState, [index]: category }));
        setOpenCategories(prevState => ({...prevState, [index]: false }));
    };


    const handleFilterToggle = () => {
        setOpenFilter(!openFilter);
        setOpenDownload(false);
        setOpenCategories({});
    };

    const handleDownloadToggle = () => {
        setOpenDownload(!openDownload);
        setOpenFilter(false);
        setOpenCategories({});
    };


    const containerRefs = useRef([]);
    const filterRef = useRef(null);
    const downloadRef = useRef(null);


    const handleClickOutside = (event) => {
        containerRefs.current.forEach((ref, index) => {
            if (ref && !ref.contains(event.target)) {
                setOpenCategories(prevState => ({...prevState, [index] : false}));
            }
        });     
    };

    const handleClickOutside2 = (event) => {
        if (filterRef.current && !filterRef.current.contains(event.target)) {
            setOpenFilter(false);
        }
    };

    const handleClickOutside3 = (event) => {
        if (downloadRef.current && !downloadRef.current.contains(event.target)) {
            setOpenDownload(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        document.addEventListener('click', handleClickOutside2, true);
        document.addEventListener('click', handleClickOutside3, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
            document.removeEventListener('click', handleClickOutside2, true);
            document.removeEventListener('click', handleClickOutside3, true);
        };
    }, []);



    return (
        <div className={styles.whole} >
            <div className={styles.searchButtons}>
                <div className={styles.searchBar}>
                    <img src={getImageUrl("icons/search.png")} />
                    <input id="search" type="text" onChange={handleSearch} placeholder='Search reports' />
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
                    <div className={`${styles.filterClosed} ${openFilter && styles.filter}`} ref={filterRef} >
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
                    </div>

                    <button className={styles.buttonTwo} onClick={handleDownloadToggle}>
                        <img src={getImageUrl("icons/whiteDownArrow.png")} />
                        Download
                    </button>
                    <div className={`${styles.downloadClosed} ${openDownload && styles.download}`}>
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
                <table className={styles.transactionTable}>
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
                                <td>{transaction.date}</td>
                                <td>{transaction.refNo}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.account}</td>
                                <td className={styles.category}>
                                    <button className={styles.categoriesButton} onClick={() => toggleCategories(index)}>
                                        <p>{selectedCategory[index] || "Salaries and wage"}</p>
                                        <img src={getImageUrl("icons/blackDownAngle.png")} />
                                    </button>

                                    {openCategories[index] && (
                                        <div className={styles.theCategories} ref={el => containerRefs.current[index] = el} >
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
                                        </div>
                                    )}
                                    
                                </td>
                                <td className={transaction.amount.startsWith("+") ? styles.credit : styles.debit}>
                                    {transaction.amount}
                                </td>
                                <td>{transaction.balance}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Pagination
                    filteredData={filteredTransactions}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
                </>
            )}
        </div>
    )
}