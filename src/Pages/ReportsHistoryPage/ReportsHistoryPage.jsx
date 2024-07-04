import React, { useState, useEffect, useRef } from 'react';
import styles from "./ReportsHistoryPage.module.css";
import { getImageUrl } from '../../../utils';
import { Button } from "@chakra-ui/react";
import { SlRefresh } from "react-icons/sl";

export const ReportsHistoryPage = () => {

    const reports = [
        {
            date: "July 22, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 22, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 22, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 21, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 21, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 21, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 20, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 20, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 20, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 20, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
        {
            date: "July 19, 2022",
            acctNumber: "23412867",
            acctName: "Adewale Ayuba",
            acctBal: "N300,000",
            currBal: "N300,000",
        },
    ]
    
    const [ search, setSearch] = useState("");
    const [ actionsOpen, setActionsOpen ] = useState({});
    const [ currentPage, setCurrentPage ] = useState(1);
    const itemsPerPage = 10;

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };


    const filteredReports = reports.filter(report => {
        const searchLower = search.toLowerCase();
        return (
            report.date.toLowerCase().includes(searchLower) ||
            report.acctNumber.toLowerCase().includes(searchLower) ||
            report.acctName.toLowerCase().includes(searchLower) ||
            report.acctBal.toLowerCase().includes(searchLower) ||
            report.currBal.toLowerCase().includes(searchLower)
        );
    });


    const toggleAction = (index) => {
        setActionsOpen(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentReports = filteredReports.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredReports.length / itemsPerPage)) {
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


    const [ openDownload, setOpenDownload ] = useState(false);
    const handleDownloadToggle = () => {
        setOpenDownload(!openDownload);
        setActionsOpen(false);
    };

    

    const popupRef = useRef(null);

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setActionsOpen(false);
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
                    <Button p={"0"} bg={"transparent"} border={"none"} _hover={{bg: "transaprent"}}>
                        <SlRefresh size={"24px"}/>
                    </Button>
                    <div className={styles.buttonOne}>
                        <img src={getImageUrl("icons/slides.png")} alt="" />
                        <select name="accounts" >
                            <option value="">Current Day</option>
                        </select>
                    </div>
                    <button className={styles.buttonTwo} onClick={handleDownloadToggle}>
                        <img src={getImageUrl("icons/whiteDownArrow.png")} />
                        Download
                    </button>
                    <div className={`${styles.downloadClosed} ${openDownload && styles.download}`} >
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

            {currentReports.length === 0 ? (
                <div className={styles.nothingBigDiv}>
                    <div className={styles.nothingFound}>
                        <img src={getImageUrl("nothing.png")} />
                        <h2>No Report Data</h2>
                        <p>We cannot seem to find any report data, your transaction information will appear here.</p>
                    </div>
                </div>
                
            ) : (

                <>

                <table className={styles.reportTable}>
                    <thead>
                        <th><input type="checkbox" id="selectAll" /></th>
                        <th>Date</th>
                        <th>Account Number</th>
                        <th>Account Name</th>
                        <th>Account Balance</th>
                        <th>Current Balance</th>
                        <th className={styles.action}>Action</th>
                    </thead>

                    <tbody>
                        {currentReports.map((report, index) => (
                            <tr key={index}>
                                <td className={styles.checkbox}><input type="checkbox" /></td>
                                <td className={styles.date}>{report.date}</td>
                                <td className={styles.acctNumber}>{report.acctNumber}</td>
                                <td className={styles.acctName}>{report.acctName}</td>
                                <td className={styles.acctBal}>{report.acctBal}</td>
                                <td className={styles.currBal}>{report.currBal}</td>
                                <td className={styles.action}>
                                    <button onClick={() => toggleAction(index)}>
                                        <img src={getImageUrl("icons/action.png")} />
                                    </button>
                                    <div className={`${styles.actionsClosed} ${actionsOpen[index] && styles.theActions}`} ref={popupRef} >
                                        <p>ACTION</p>
                                        <ul>
                                            <li className={styles.view} ><a href="">View</a></li>
                                            <li><a href="">Download pdf</a></li>
                                        </ul>
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
    )
}