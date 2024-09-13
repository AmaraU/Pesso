import React, { useState, useEffect, useRef } from 'react';
import { useToast, Spinner, Center } from "@chakra-ui/react";
import { DEFAULT_AUDIT_TRAIL_ERR_MSG, getAPIEndpoint } from "../../../config";
import axios from "axios";
import { auditLog, logger } from "../../models/logging";
import { format } from 'date-fns';
import styles from "./AuditTrailsPage.module.css";
import { getImageUrl } from '../../../utils';
import Pagination from '../../Components/Pagination/Pagination';



export const AuditTrailsPage = () => {

    const [ search, setSearch] = useState("");
    const [ actionsOpen, setActionsOpen ] = useState({});
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ isLoading, setIsloading ] = useState(false);
    const [ auditTrail, setAuditTrail ] = useState([]);
    const toast = useToast();

    useEffect(() => {
        getAuditLog();
    }, [])

    const log = async (activity, module) => {
        await auditLog({
            activity,
            module,
            userId: sessionStorage.getItem("id")
        }, sessionStorage.getItem("tk"));
    }

    const getAuditLog = async () => {
        setIsloading(true);
        try {
            const response = await axios.post(getAPIEndpoint('audit-trail'), { userId: sessionStorage.getItem("id") }, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            console.log(response);

            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsloading(false);
                    setAuditTrail(data);
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
                            description: `${DEFAULT_AUDIT_TRAIL_ERR_MSG}. ${err ? "[Details: " + err + "]" : ""} `,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_AUDIT_TRAIL_ERR_MSG,
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
            await logger({ task: "Get Audit Trail", error: error.toString() });
        }
        toast({
            description: DEFAULT_AUDIT_TRAIL_ERR_MSG,
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

    const filteredAuditTrails = auditTrail.filter(auditTrail => {
        const searchLower = search.toLowerCase();
        return (
            auditTrail.activity_description.toLowerCase().includes(searchLower) ||
            auditTrail.module.toLowerCase().includes(searchLower) ||
            auditTrail.user.toLowerCase().includes(searchLower) ||
            format(new Date (auditTrail.timestamp), 'MMMM dd, yyyy').includes(searchLower) ||
            format(new Date (auditTrail.timestamp), 'h:mm a').toLowerCase().includes(searchLower)
        );
    });

    const sortedAuditTrails = [...filteredAuditTrails].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));


    const toggleAction = (index) => {
        setActionsOpen(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const itemsPerPage = 10;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAuditTrails = sortedAuditTrails.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


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


            {isLoading ? <Center><Spinner /></Center> :
                <>
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
                                    <td>{auditTrail.activity_description}</td>
                                    <td>{auditTrail.module}</td>
                                    <td>{auditTrail.user}</td>
                                    <td>{format(new Date (auditTrail.timestamp), 'MMMM dd, yyyy')}</td>
                                    <td>{format(new Date (auditTrail.timestamp), 'h:mm a')}</td>
                                    <td className={styles.action}>
                                        <button onClick={() => toggleAction(index)}>
                                            <img src={getImageUrl("icons/action.png")} />
                                        </button>
                                        <div className={`${styles.actionsClosed} ${actionsOpen[index] && styles.theActions}`} ref={popupRef}>
                                            <ul>
                                                <li>View</li>
                                                <li>Edit</li>
                                                <li className={styles.delete}>Delete</li>
                                            </ul>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>


                    <div className={styles.smallAuditTable}>
                        {currentAuditTrails.map((auditTrail, index) => (
                            <>
                            <div className={styles.smallAuditTableEntry}>

                                <div className={styles.smallAuditActions}>

                                    <div className={styles.checkbox}><input type="checkbox" name="" id="" /></div>
                                    <div>                                    
                                        <button onClick={() => toggleAction(index)}>
                                            <img src={getImageUrl("icons/action.png")} />
                                        </button>
                                        <div className={`${styles.actionsClosed} ${actionsOpen[index] && styles.theActions}`} ref={popupRef}>
                                            <ul>
                                                <li>View</li>
                                                <li>Edit</li>
                                                <li className={styles.delete}>Delete</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.smallAuditTableRow}>
                                    <div className={styles.greyBox}>Activity</div>
                                    <div className={styles.whiteBox}>{auditTrail.activity_description}</div>
                                </div>

                                <div className={styles.smallAuditTableRow}>
                                    <div className={styles.greyBox}>Module</div>
                                    <div className={styles.whiteBox}>{auditTrail.module}</div>
                                </div>

                                <div className={styles.smallAuditTableRow}>
                                    <div className={styles.greyBox}>Names</div>
                                    <div className={styles.whiteBox}>{auditTrail.user}</div>
                                </div>

                                <div className={styles.smallAuditTableRow}>
                                    <div className={styles.greyBox}>Date</div>
                                    <div className={styles.whiteBox}>{format(new Date (auditTrail.timestamp), 'MMMM dd, yyyy')}</div>
                                </div>

                                <div className={styles.smallAuditTableRow}>
                                    <div className={styles.greyBox}>Time</div>
                                    <div className={styles.whiteBox}>{format(new Date (auditTrail.timestamp), 'h:mm a')}</div>
                                </div>
                            </div>
                            </>
                        ))}
                    </div>

                    <Pagination
                        filteredData={filteredAuditTrails}
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