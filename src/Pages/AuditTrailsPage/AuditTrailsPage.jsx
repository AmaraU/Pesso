import React, { useState, useEffect, useRef } from 'react';
import styles from "./AuditTrailsPage.module.css";
import { getImageUrl } from '../../../utils';



export const AuditTrailsPage = () => {

    const auditTrails = [
        {
            activity: "Transferred",
            module: "Transactions",
            names: "235GDBH7",
            date: "July 22, 2022",
            time: "4:24pm"
        },
        {
            activity: "Transferred",
            module: "Transactions",
            names: "235GDBH7",
            date: "July 22, 2022",
            time: "4:24pm"
        },
        {
            activity: "Updated",
            module: "Accounts",
            names: "235GDBH7",
            date: "July 22, 2022",
            time: "4:24pm"
        },
        {
            activity: "Edited",
            module: "Accounts",
            names: "235GDBH7",
            date: "July 22, 2022",
            time: "4:24pm"
        },
        {
            activity: "Edited",
            module: "Cashflow",
            names: "235GDBH7",
            date: "July 22, 2022",
            time: "4:24pm"
        },
        {
            activity: "Edited",
            module: "Loans",
            names: "235GDBH7",
            date: "July 22, 2022",
            time: "4:24pm"
        },
        {
            activity: "Created",
            module: "Budget",
            names: "235GDBH7",
            date: "July 22, 2022",
            time: "4:24pm"
        },
        {
            activity: "Deleted",
            module: "Investments",
            names: "235GDBH7",
            date: "July 22, 2022",
            time: "4:24pm"
        },
        {
            activity: "Deleted",
            module: "Reports",
            names: "235GDBH7",
            date: "July 22, 2022",
            time: "4:24pm"
        },
        {
            activity: "Deleted",
            module: "Settings",
            names: "235GDBH7",
            date: "July 22, 2022",
            time: "4:24pm"
        },
        {
            activity: "Edited",
            module: "Cashflow",
            names: "235GDBH7",
            date: "July 22, 2022",
            time: "4:24pm"
        },
        {
            activity: "Updated",
            module: "Transactions",
            names: "235GDBH7",
            date: "July 22, 2022",
            time: "4:24pm"
        },
        {
            activity: "Updated",
            module: "Budget",
            names: "235GDBH7",
            date: "July 22, 2022",
            time: "4:24pm"
        },
        {
            activity: "Transferred",
            module: "Transactions",
            names: "235GDBH7",
            date: "July 22, 2022",
            time: "4:24pm"
        },
        {
            activity: "Deleted",
            module: "Reports",
            names: "235GDBH7",
            date: "July 22, 2022",
            time: "4:24pm"
        }
    ]

    const [ search, setSearch] = useState("");
    const [ actionsOpen, setActionsOpen ] = useState({});
    const [ currentPage, setCurrentPage ] = useState(1);
    const itemsPerPage = 10;

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };

    const filteredAuditTrails = auditTrails.filter(auditTrail => {
        const searchLower = search.toLowerCase();
        return (
            auditTrail.activity.toLowerCase().includes(searchLower) ||
            auditTrail.module.toLowerCase().includes(searchLower) ||
            auditTrail.names.toLowerCase().includes(searchLower) ||
            auditTrail.date.toLowerCase().includes(searchLower) ||
            auditTrail.time.toLowerCase().includes(searchLower)
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
    const currentAuditTrails = filteredAuditTrails.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredAuditTrails.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredAuditTrails.length / itemsPerPage)) {
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


    const popupRef = useRef(null);

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setActionsOpen(false);
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
            <div className={styles.searchBar}>
                <img src={getImageUrl("icons/search.png")} />
                <input id="search" type="text" onChange={handleSearch} placeholder='Search Audit Trails' />
            </div>



            {currentAuditTrails.length === 0 ? (
                <div className={styles.nothingBigDiv}>
                    <div className={styles.nothingFound}>
                        <img src={getImageUrl("nothing.png")} />
                        <h2>No Audit Trail Data</h2>
                        <p>We cannot seem to find any audit trail data, your user information will appear here.</p>
                    </div>
                </div>
                
            ) : (
                <>

                <table className={styles.auditTrailsTable}>
                    <thead>
                        <th>Activity</th>
                        <th>Module</th>
                        <th>Names</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th className={styles.action}>Action</th>
                    </thead>

                    <tbody>
                        {currentAuditTrails.map((auditTrail, index) => (
                            <tr key={index}>
                                <td>{auditTrail.activity}</td>
                                <td>{auditTrail.module}</td>
                                <td>{auditTrail.names}</td>
                                <td>{auditTrail.date}</td>
                                <td>{auditTrail.time}</td>
                                <td className={styles.action}>
                                    <button onClick={() => toggleAction(index)}>
                                        <img src={getImageUrl("icons/action.png")} />
                                    </button>
                                    <div className={`${styles.actionsClosed} ${actionsOpen[index] && styles.theActions}`} ref={popupRef}>
                                        <ul>
                                            <li><a href="">View</a></li>
                                            <li><a href="">Edit</a></li>
                                            <li className={styles.delete}><a href="">Delete</a></li>
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