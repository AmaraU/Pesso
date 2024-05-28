import React, { useState, useEffect, useRef } from 'react';
import styles from "./TransactionsPage.module.css";
import { getImageUrl } from '../../../utils';



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

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredTransactions.length / itemsPerPage)) {
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
    };

    const categories = ["Salaries and wages", "Rent", "Utilities", "Equipment", "Supplies", "Travel", "Entertainment", "Marketing and advertising"];
    const [ selectedCategory, setSelectedCategory ] = useState({});
    const [ openCategories, setOpenCategories ] = useState({});
    const [ searchCategories, setSearchCategries] = useState("");

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
    };

    const handleCategorySelection = (index, category) => {
        setSelectedCategory(prevState => ({
            ...prevState,
            [index]: category
        }));
        setOpenCategories(prevState => ({
            ...prevState,
            [index]: false
        }));
    };


    const [ openFilter, setOpenFilter ] = useState(false);
    const [ openDownload, setOpenDownload ] = useState(false);


    const popupRef = useRef(null);

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setOpenFilter(false);
            setOpenDownload(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);






    return (
        <div className={styles.whole}>
            <div className={styles.searchButtons}>
                <div className={styles.searchBar}>
                    <img src={getImageUrl("icons/search.png")} />
                    <input id="search" type="text" onChange={handleSearch} placeholder='Search reports' />
                </div>

                <div className={styles.buttons}>
                    <button className={styles.buttonOne} onClick={() => setOpenFilter(!openFilter)}>
                        <img src={getImageUrl("icons/slides.png")} />
                        Filter
                        <img src={getImageUrl("icons/blueDownAngle.png")} />
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

                    <button className={styles.buttonTwo} onClick={() => setOpenDownload(!openDownload)}>
                        <img src={getImageUrl("icons/whiteDownArrow.png")} />
                        Download
                    </button>
                    <div className={`${styles.downloadClosed} ${openDownload && styles.download}`} ref={popupRef}>
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

            <table className={styles.transactionTable}>
                <thead>
                    <th>Date Created</th>
                    <th>Reference No.</th>
                    <th>Description</th>
                    <th>Account</th>
                    <th className={styles.categoryHeader}>Category</th>
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
                                    {selectedCategory[index] || "Select Category"}
                                    <img src={getImageUrl("icons/blackDownAngle.png")} />
                                </button>

                                {openCategories[index] && (
                                    <div className={styles.theCategories} >
                                        <p>CATEGORY</p>
                                        <div className={styles.categorySearch}>
                                            <img src={getImageUrl("icons/search.png")} />
                                            <input id="search" type="text" onChange={handleSearchCategories} placeholder='Search for Category' />
                                        </div>

                                        <ul>
                                            {filteredCategories.map((category, catIndex) => (
                                                <li key={catIndex}><a onClick={() => handleCategorySelection(index, category)} href='#'>{category}</a></li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                
                            </td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.balance}</td>
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
        </div>
    )
}