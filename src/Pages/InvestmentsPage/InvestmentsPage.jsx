import React, { useState, useEffect, useRef } from 'react';
import styles from "./InvestmentsPage.module.css";
import { getImageUrl } from '../../../utils';



export const InvestmentsPage = () => {

    const investments = [
        {
            acctType: "Savings",
            invstType: "Stocks",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "6 months",
            percentage: "5%",
        },
        {
            acctType: "Current",
            invstType: "Bonds",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "6 months",
            percentage: "7.5%",
        },
        {
            acctType: "Savings",
            invstType: "Stocks",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "6 months",
            percentage: "15%",
        },
        {
            acctType: "Current",
            invstType: "Mutaul funds",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "1 year",
            percentage: "5%",
        },
        {
            acctType: "Savings",
            invstType: "Options",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "6 months",
            percentage: "10%",
        },
        {
            acctType: "Savings",
            invstType: "Current",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "6 months",
            percentage: "7%",
        },
        {
            acctType: "Current",
            invstType: "Retirement",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "1 year",
            percentage: "3.8%",
        },
        {
            acctType: "Current",
            invstType: "Stocks",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "1 year",
            percentage: "5%",
        },
        {
            acctType: "Savings",
            invstType: "Annuities",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "1 year",
            percentage: "3.6%",
        },
        {
            acctType: "Current",
            invstType: "Stocks",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "1 year",
            percentage: "8%",
        }
    ]

    const [ search, setSearch] = useState("");
    const [ currentPage, setCurrentPage ] = useState(1);
    const itemsPerPage = 10;

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };


    const filteredInvestments = investments.filter(investment => {
        const searchLower = search.toLowerCase();
        return (
            investment.acctType.toLowerCase().includes(searchLower) ||
            investment.invstType.toLowerCase().includes(searchLower) ||
            investment.name.toLowerCase().includes(searchLower) ||
            investment.amount.toLowerCase().includes(searchLower) ||
            investment.invstTenure.toLowerCase().includes(searchLower) ||
            investment.percentage.toLowerCase().includes(searchLower)
        );
    });
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInvestments = filteredInvestments.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredInvestments.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredInvestments.length / itemsPerPage)) {
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


    function toggle() {        
        var popup = document.getElementById('popup');
        popup.classList.toggle(`${styles.popped}`);

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.toggle(`${styles.dim}`);
    }


    return (
        <>

        <div className={styles.popup} id='popup'>
            <div className={styles.header}>
                <h3>Add User</h3>
                <a className={styles.close} href=""><img src={getImageUrl("icons/greyClose.png")} alt="X" onClick={() => toggle()} /></a>
            </div>
            
            <form action="">
                <div className={styles.formGroup}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="" />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="" />
                </div>

                <button>Send Invite</button>
            </form>
        </div>

        <div className={styles.dimmer} id='dimmer'></div>



        <div className={styles.whole}>
            <div className={styles.searchButtons}>
                <div className={styles.searchBar}>
                    <img src={getImageUrl("icons/search.png")} />
                    <input id="search" type="text" onChange={handleSearch} placeholder='Search investments' />
                </div>

                <div className={styles.buttons}>
                    <a onClick={() => toggle()} className={styles.buttonThree}>
                        <img src={getImageUrl("icons/whitePlus.png")} alt="" />
                        Add Investment
                    </a>

                </div>
            </div>



            {currentInvestments.length === 0 ? (
                <div className={styles.nothingBigDiv}>
                    <div className={styles.nothingFound}>
                        <img src={getImageUrl("nothing.png")} />
                        <h2>No Investment Data</h2>
                        <p>We cannot seem to find any investment data, your user information will appear here.</p>
                    </div>
                </div>
                
            ) : (
                <>

                <table className={styles.investmentTable}>
                <thead>
                    <th className={styles.tableCheckbox}><input type="checkbox" id="selectAll" /></th>
                    <th>Account Type</th>
                    <th>Investment Type</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Investment Tenure</th>
                    <th>Percentage</th>
                </thead>

                    <tbody>
                        {currentInvestments.map((investment, index) => (
                            <tr key={index}>
                                <td className={styles.checkbox}><input type="checkbox" /></td>
                                <td>{investment.acctType}</td>
                                <td>{investment.invstType}</td>
                                <td>{investment.name}</td>
                                <td>{investment.amount}</td>
                                <td>{investment.invstTenure}</td>
                                <td>{investment.percentage}</td>
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
        </>
    )
}