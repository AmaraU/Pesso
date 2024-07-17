import React, { useState, useEffect, useRef } from 'react';
import styles from "./RequestPage.module.css";
import { getImageUrl } from '../../../utils';
import classNames from 'classnames';
import Pagination from '../../Components/Pagination/Pagination';



export const RequestPage = () => {

    const requests = [
        {
            date: "July 22, 2022",
            name: "Adewale Ayuba",
            description: "Determing the purpose of  the transaction",
            requestType: "Single",
            approvalLevel: "Once",
            status: "Approved"
        },
        {
            date: "July 22, 2022",
            name: "Anthonia Ekuase",
            description: "Determing the purpose of  the transaction",
            requestType: "Bulk",
            approvalLevel: "Recurring",
            status: "Approved"
        },
        {
            date: "July 22, 2022",
            name: "Dominic Anga",
            description: "Determing the purpose of  the transaction",
            requestType: "Single",
            approvalLevel: "Once",
            status: "Declined"
        },
        {
            date: "July 22, 2022",
            name: "Precious Ivonge",
            description: "Determing the purpose of  the transaction",
            requestType: "Single",
            approvalLevel: "Recurring",
            status: "Approved"
        },
        {
            date: "July 22, 2022",
            name: "Lawal Timothy",
            description: "Determing the purpose of  the transaction",
            requestType: "Bulk",
            approvalLevel: "Once",
            status: "Approved"
        },
        {
            date: "July 22, 2022",
            name: "Alonge Victoria",
            description: "Determing the purpose of  the transaction",
            requestType: "Single",
            approvalLevel: "Recurring",
            status: "Declined"
        },
        {
            date: "July 22, 2022",
            name: "Natasha Williams",
            description: "Determing the purpose of  the transaction",
            requestType: "Bulk",
            approvalLevel: "Once",
            status: "Declined"
        },
        {
            date: "July 22, 2022",
            name: "Oladele Fadeyi",
            description: "Determing the purpose of  the transaction",
            requestType: "Single",
            approvalLevel: "Recurring",
            status: "Declined"
        },
        {
            date: "July 22, 2022",
            name: "Igwe Victor",
            description: "Determing the purpose of  the transaction",
            requestType: "Bulk",
            approvalLevel: "Once",
            status: "Approved"
        },
        {
            date: "July 22, 2022",
            name: "Olawale Timilehin",
            description: "Determing the purpose of  the transaction",
            requestType: "Single",
            approvalLevel: "Recurring",
            status: "Approved"
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

    const filteredRequests = requests.filter(request => {
        const searchLower = search.toLowerCase();
        return (
            request.date.toLowerCase().includes(searchLower) ||
            request.name.toLowerCase().includes(searchLower) ||
            request.description.toLowerCase().includes(searchLower) ||
            request.requestType.toLowerCase().includes(searchLower) ||
            request.approvalLevel.toLowerCase().includes(searchLower) ||
            request.status.toLowerCase().includes(searchLower)
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
    const currentRequests = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
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
                <input id="search" type="text" onChange={handleSearch} placeholder='Search Requests' />
            </div>



            {currentRequests.length === 0 ? (
                <div className={styles.nothingBigDiv}>
                    <div className={styles.nothingFound}>
                        <img src={getImageUrl("nothing.png")} />
                        <h2>No Request Data</h2>
                        <p>We cannot seem to find any request data, your user information will appear here.</p>
                    </div>
                </div>
                
            ) : (
                <>

                <table className={styles.requestsTable}>
                    <thead>
                        <th className={styles.checkboxColumn}><input type="checkbox" id="selectAll" /></th>
                        <th>Date</th>
                        <th>Name of Requester</th>
                        <th>Description</th>
                        <th>Request Type</th>
                        <th>Approval Level</th>
                        <th>Status</th>
                        <th className={styles.action}>Action</th>
                    </thead>

                    <tbody>
                        {currentRequests.map((request, index) => (
                            <tr key={index}>
                                <td className={styles.checkbox}><input type="checkbox" /></td>
                                <td>{request.date}</td>
                                <td>{request.name}</td>
                                <td>{request.description}</td>
                                <td>{request.requestType}</td>
                                <td>{request.approvalLevel}</td>
                                <td className={styles.status}>
                                    <div className={classNames({
                                        [styles.approved]: request.status.toLowerCase().includes('approved'),
                                        [styles.declined]: request.status.toLowerCase().includes('declined'),
                                    })}>
                                        {request.status}
                                    </div>
                                </td>
                                <td className={styles.action}>
                                    <button onClick={() => toggleAction(index)}>
                                        <img src={getImageUrl("icons/action.png")} />
                                    </button>
                                    <div className={`${styles.actionsClosed} ${actionsOpen[index] && styles.theActions}`} ref={popupRef}>
                                        <p>ACTION</p>
                                        <ul>
                                            <li>Approve</li>
                                            <li>Decline</li>
                                        </ul>
                                    </div>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

                <Pagination
                    filteredData={filteredRequests}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
                </>
            )}
        </div>
    )
}