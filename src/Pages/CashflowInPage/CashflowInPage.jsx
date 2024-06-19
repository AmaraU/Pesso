import React, { useState, useEffect, useRef } from 'react';
import styles from "./CashflowInPage.module.css";
import { getImageUrl } from '../../../utils';
import classNames from 'classnames';
import { Button } from "@chakra-ui/react";
import { SlRefresh } from "react-icons/sl";


export const CashflowInPage = () => {

    
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


    const filteredInflows = inflows.filter(inflow => {
        const searchLower = search.toLowerCase();
        return (
            inflow.invoiceNo.toLowerCase().includes(searchLower) ||
            inflow.createdDate.toLowerCase().includes(searchLower) ||
            inflow.dueDate.toLowerCase().includes(searchLower) ||
            inflow.acctNo.toLowerCase().includes(searchLower) ||
            inflow.status.toLowerCase().includes(searchLower) ||
            inflow.phoneNo.toLowerCase().includes(searchLower) ||
            inflow.email.toLowerCase().includes(searchLower) ||
            inflow.description.toLowerCase().includes(searchLower) ||
            inflow.amount.toLowerCase().includes(searchLower)
        );
    });

    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentInflows = filteredInflows.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredInflows.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredInflows.length / itemsPerPage)) {
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


    const [ openFilter, setOpenFilter ] = useState(false);

    function toggleOn() {        
        var popup = document.getElementById('popup');
        popup.classList.add(`${styles.popped}`);  

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.add(`${styles.dim}`);
    }

    function successToggle() {
        var success = document.getElementById('successpopup');
        success.classList.add(`${styles.successPopped}`);

        var popup = document.getElementById('popup');
        popup.classList.remove(`${styles.popped}`);        
    }

    function toggleOff() {
        var popup = document.getElementById('popup');
        popup.classList.remove(`${styles.popped}`);

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.remove(`${styles.dim}`);

        var success =document.getElementById('successpopup');
        success.classList.remove(`${styles.successPopped}`);
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

        <div className={styles.popup} id="popup">
            <div className={styles.header}>
                <h3>Generate Invoice</h3>
                <a className={styles.close} href=""><img src={getImageUrl("icons/greyClose.png")} alt="X" onClick={(e) => {e.preventDefault(); () => toggleOff()}} /></a>
            </div>

            <form action="">
                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Recipient's Name</label>
                    <input type="text" name="" id="" placeholder='Enter Name' />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Description</label>
                    <input type="text" name="" id="" placeholder='Enter Description' />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Amount</label>
                    <input type="number" name="" id="" placeholder="Enter Amount" />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Recipient's Email</label>
                    <input type="text" name="" id="" placeholder='JohnDoe@gmail.com' />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Due Date</label>
                    <input type="date" name="" id="" />
                </div>
            </form>

            <div className={styles.generateButton}>
                <button onClick={(e) => {e.preventDefault(); () => successToggle()}}>Generate Invoice</button>
            </div>
        </div>

        <div className={styles.successPopup} id='successpopup'>
            <img src={getImageUrl("success.png")} />
            <h4>Invoice Added</h4>
            <button onClick={(e) => {e.preventDefault(); () => toggleOff()}}>Continue</button>
        </div>

        <div className={styles.dimmer} id='dimmer'></div>

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

                    <button className={styles.buttonTwo} onClick={(e) => {e.preventDefault(); () => toggleOn()}}>
                        Generate Invoice
                        <img src={getImageUrl("icons/whitePlus.png")} alt="" />
                    </button>

                </div>
            </div>

            

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
                    <div className={`${styles.treemapBox} ${styles.darkest}`}><h5>45%</h5><p>UTILITIES (N234)</p></div>
                    <div className={styles.treemapColumn}>
                        <div className={`${styles.treemapBox} ${styles.darker}`}><h5>45%</h5><p>UTILITIES (N234)</p></div>
                        <div className={`${styles.treemapBox} ${styles.dark}`}><h5>45%</h5><p>UTILITIES (N234)</p></div>
                    </div>
                    <div className={styles.treemapColumn}>
                        <div className={styles.treemapRow}>
                            <div className={`${styles.treemapBox} ${styles.blue}`}><h5>20%</h5><p>SALARIES AND WAGES (N234)</p></div>
                            <div className={`${styles.treemapBox} ${styles.blue}`}><h5>20%</h5><p>SALARIES AND WAGES (N234)</p></div>
                            <div className={`${styles.treemapBox} ${styles.blue}`}><h5>20%</h5><p>SALARIES AND WAGES (N234)</p></div>
                        </div>
                        <div className={styles.treemapRow}>
                            <div className={`${styles.treemapBox} ${styles.navy}`}><h5>10%</h5><p>SUPPLIES (N234)</p></div>
                            <div className={`${styles.treemapBox} ${styles.blue}`}><h5>10%</h5><p>UTILITIES (N234)</p></div>
                            <div className={`${styles.treemapBox} ${styles.navy}`}><h5>10%</h5><p>SUPPLIES (N234)</p></div>
                            <div className={`${styles.treemapBox} ${styles.navy}`}><h5>10%</h5><p>SUPPLIES (N234)</p></div>
                        </div>
                        <div className={styles.treemapRow}>
                            <div className={`${styles.treemapBox} ${styles.light}`}><h5>5%</h5><p>UTILITIES (N14)</p></div>
                            <div className={`${styles.treemapBox} ${styles.light}`}><h5>5%</h5><p>EQUIPMENT (N14)</p></div>
                            <div className={`${styles.treemapBox} ${styles.light}`}><h5>5%</h5><p>EQUIPMENT (N14)</p></div>
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
                                <td>{inflow.invoiceNo}</td>
                                <td>{inflow.createdDate}</td>
                                <td>{inflow.dueDate}</td>
                                <td>{inflow.acctNo}</td>
                                <td>{inflow.phoneNo}</td>
                                <td>{inflow.email}</td>
                                <td>{inflow.description}</td>
                                <td className={inflow.amount.startsWith("+") ? styles.credit : styles.debit}>
                                    {inflow.amount}
                                </td>
                                <td className={styles.status}>
                                    <div className={classNames({
                                        [styles.paid]: inflow.status.toLowerCase().includes('paid'),
                                        [styles.pending]: inflow.status.toLowerCase().includes('pending'),
                                        [styles.overdue]: inflow.status.toLowerCase().includes('overdue'),
                                    })}>
                                        {inflow.status}
                                    </div>
                                </td>
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