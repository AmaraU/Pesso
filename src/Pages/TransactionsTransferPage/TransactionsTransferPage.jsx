import React, { useState, useEffect, useRef } from 'react';
import styles from "./TransactionsTransferPage.module.css";
import { getImageUrl } from '../../../utils';
import { Button, Center, Spinner } from "@chakra-ui/react";
import { SlRefresh } from "react-icons/sl";
import { auditLog, logger } from '../../models/logging';
import axios from 'axios';
import { DEFAULT_RECENT_TRXNS_ERR_MSG, getAPIEndpoint } from '../../../config';
import Pagination from '../../Components/Pagination/Pagination';



export const TransactionsTransferPage = () => {

    const [ isRecurring, setIsRecurring ] = useState(false);
    const [ isLoading, setIsloading ] = useState(false);
    const [trxns, setTrxns] = useState([]);
    const [ activeButton, setActiveButton ] = useState(1);
    const [ frequencyFilter, setFrequencyFilter ] = useState("");
    const [ search, setSearch] = useState("");
    const [ actionsOpen, setActionsOpen ] = useState({});
    const [ currentPage1, setCurrentPage1 ] = useState(1);
    const [ currentPage2, setCurrentPage2 ] = useState(1);
    const popupRef = useRef(null);
    const itemsPerPage = 10;

    useEffect(() => {
        getTrxns();
        log("Viewed transaction transfers", "Transactions")
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

    const pendingTransfers = [
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "23412867",
            type: "Single",
            amount: "N300,000",
            frequency: "Once",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "004563782, 13...",
            type: "Bulk",
            amount: "N300,000",
            frequency: "Recurring",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "23412867",
            type: "Single",
            amount: "N300,000",
            frequency: "Once",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "23412867",
            type: "Single",
            amount: "N300,000",
            frequency: "Recurring",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "004563782, 13...",
            type: "Bulk",
            amount: "N300,000",
            frequency: "Once",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "23412867",
            type: "Single",
            amount: "N300,000",
            frequency: "Recurring",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "004563782, 13...",
            type: "Bulk",
            amount: "N300,000",
            frequency: "Once",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "23412867",
            type: "Single",
            amount: "N300,000",
            frequency: "Recurring",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "004563782, 13...",
            type: "Bulk",
            amount: "N300,000",
            frequency: "Once",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "23412867",
            type: "Single",
            amount: "N300,000",
            frequency: "Recurring",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        }
    ]


    const completedTransfers = [
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "004563782, 13...",
            type: "Bulk",
            amount: "N300,000",
            frequency: "Recurring",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "23412867",
            type: "Single",
            amount: "N300,000",
            frequency: "Once",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "23412867",
            type: "Single",
            amount: "N300,000",
            frequency: "Recurring",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "004563782, 13...",
            type: "Bulk",
            amount: "N300,000",
            frequency: "Once",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "23412867",
            type: "Single",
            amount: "N300,000",
            frequency: "Recurring",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "004563782, 13...",
            type: "Bulk",
            amount: "N300,000",
            frequency: "Once",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "23412867",
            type: "Single",
            amount: "N300,000",
            frequency: "Recurring",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "004563782, 13...",
            type: "Bulk",
            amount: "N300,000",
            frequency: "Once",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "23412867",
            type: "Single",
            amount: "N300,000",
            frequency: "Recurring",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "23412867",
            type: "Single",
            amount: "N300,000",
            frequency: "Once",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "23412867",
            type: "Single",
            amount: "N300,000",
            frequency: "Once",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "23412867",
            type: "Single",
            amount: "N300,000",
            frequency: "Recurring",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "004563782, 13...",
            type: "Bulk",
            amount: "N300,000",
            frequency: "Once",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        },
        {
            fromAcct: "0123456789 - Polaris Bank",
            toAcct: "23412867",
            type: "Single",
            amount: "N300,000",
            frequency: "Recurring",
            scheduleDate: "July 22, 2022",
            description: "Determing the purpose of  the transaction"
        }
    ]


    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage1(1);
        setCurrentPage2(1);
    };

    const handleFrequencyChange = (event) => {
        setFrequencyFilter(event.target.value);
    };


    const filteredPendingTransfers = pendingTransfers.filter(transfer => {
        const searchLower = search.toLowerCase();
        return (
            (frequencyFilter === "" || transfer.frequency === frequencyFilter) &&
            (transfer.fromAcct.toLowerCase().includes(searchLower) ||
            transfer.toAcct.toLowerCase().includes(searchLower) ||
            transfer.type.toLowerCase().includes(searchLower) ||
            transfer.amount.toLowerCase().includes(searchLower) ||
            transfer.scheduleDate.toLowerCase().includes(searchLower) ||
            transfer.description.toLowerCase().includes(searchLower))
        );
    });

    const filteredCompletedTransfers = completedTransfers.filter(transfer => {
        const searchLower = search.toLowerCase();
        return (
            (frequencyFilter === "" || transfer.frequency === frequencyFilter) &&
            (transfer.fromAcct.toLowerCase().includes(searchLower) ||
            transfer.toAcct.toLowerCase().includes(searchLower) ||
            transfer.type.toLowerCase().includes(searchLower) ||
            transfer.amount.toLowerCase().includes(searchLower) ||
            transfer.scheduleDate.toLowerCase().includes(searchLower) ||
            transfer.description.toLowerCase().includes(searchLower))
        );
    });

    const uniquePendingFrequency = [...new Set(pendingTransfers.map(transfer => transfer.frequency))];
    const uniqueCompletedFrequency = [...new Set(completedTransfers.map(transfer => transfer.frequency))];


    const toggleAction = (index) => {
        setActionsOpen(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    
    const indexOfLastItem1 = currentPage1 * itemsPerPage;
    const indexOfLastItem2 = currentPage2 * itemsPerPage;

    const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage;
    const indexOfFirstItem2 = indexOfLastItem2 - itemsPerPage;

    const currentPendingTransfers = filteredPendingTransfers.slice(indexOfFirstItem1, indexOfLastItem1);
    const currentCompletedTransfers = filteredCompletedTransfers.slice(indexOfFirstItem2, indexOfLastItem2);

    const handlePageChange1 = (pageNumber) => {
        setCurrentPage1(pageNumber);
    }
    const handlePageChange2 = (pageNumber) => {
        setCurrentPage2(pageNumber);
    }


    function toggleOpen() {        
        var popup = document.getElementById('popup');
        popup.classList.add(`${styles.popped}`);

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.add(`${styles.dim}`);
    }

    function toggleClose() {        
        var popup = document.getElementById('popup');
        popup.classList.remove(`${styles.popped}`);

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.remove(`${styles.dim}`);
    }

    function changeTables(buttonNumber) {

        setActiveButton(buttonNumber);
        setSearch("");

        var table1 = document.getElementById('table1');
        var table2 = document.getElementById('table2');

        table1.classList.toggle(`${styles.hideTable}`);
        table2.classList.toggle(`${styles.hideTable}`);
    }


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


    const handleCheckboxChange = (event) => {
        setIsRecurring(event.target.checked);
    };


    return (
        <>

        <div className={styles.popup} id="popup">

            <div className={styles.header}>
                <h3>Schedule Transfer</h3>
                <a className={styles.close} href=""><img src={getImageUrl("icons/greyClose.png")} alt="X" onClick={(e) => {e.preventDefault(); toggleClose()}} /></a>
            </div>
            
            <form action="">
                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Transfer from</label>
                    <select name="" id="">
                        <option value="">Select account</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Beneficiary Financial Institution</label>
                    <select name="" id="">
                        <option value="">Select institution</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Beneficiary Account</label>
                    <input type="number" name="" id="" placeholder="e.g 12345678" />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Category</label>
                    <select name="" id="">
                        <option value="">Select category</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Beneficiary Account Name</label>
                    <select name="" id="">
                        <option value="">Select account</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Amount</label>
                    <input type="number" name="" id="" placeholder="0.00" />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Description</label>
                    <input type="text" name="" id="" placeholder="" />
                </div>

                {!isRecurring && <div className={styles.dateTime}>
                    <div className={styles.formGroup}>
                        <label htmlFor="Date">Date</label>
                        <input type="date" name="" id="" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="Time">Time</label>
                        <input type="time" name="" id="" />
                    </div>
                </div>}

                {isRecurring && <div className={styles.dateTime}>
                    <div className={styles.formGroup}>
                        <label htmlFor="startDate">Start Date</label>
                        <input type="date" name="" id="" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="startTime">Start Time</label>
                        <input type="time" name="" id="" />
                    </div>
                </div>}

                {isRecurring && <div className={styles.dateTime}>
                    <div className={styles.formGroup}>
                        <label htmlFor="endDate">End Date</label>
                        <input type="date" name="" id="" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="endTime">End Time</label>
                        <input type="time" name="" id="" />
                    </div>
                </div>}

                <div className={styles.checkFormGroup}>
                    <input type="checkbox" name='recurr' checked={isRecurring} onChange={handleCheckboxChange} />
                    <label htmlFor="recurr">Recurring</label>
                </div>

            </form>

            <div className={styles.transferButton}>
                <button onClick={() => toggleClose()}>Transfer</button>
            </div>
        </div>

        
        <div className={styles.dimmer} id='dimmer'></div>


        <div className={styles.whole}>

            <div className={styles.buttonSwitch}>
                <button className={ `${styles.switchButton} ${activeButton === 1 ? styles.active : ''}`} onClick={() => changeTables(1)}>Pending</button>
                <button className={ `${styles.switchButton} ${activeButton === 2 ? styles.active : ''}`} onClick={() => changeTables(2)}>Completed</button>
            </div>

            <div id='table1'>
                <div className={styles.searchButtons}>
                    <div className={styles.searchBar}>
                        <img src={getImageUrl("icons/search.png")} />
                        <input id="search" type="text" onChange={handleSearch} placeholder='Search for transaction' />
                    </div>

                    <div className={styles.buttons}>
                        <Button p={"0"} bg={"transparent"} border={"none"} _hover={{bg: "transaprent"}}>
                            <SlRefresh size={"24px"}/>
                        </Button>
                        <label className={styles.buttonOne}>
                            Frequency:
                            <select value={frequencyFilter} onChange={handleFrequencyChange}>
                                <option value="">All</option>
                                {uniquePendingFrequency.map(frequency => (
                                    <option key={frequency} value={frequency}>{frequency}</option>
                                ))}
                            </select>
                        </label>

                        <button className={styles.buttonTwo} onClick={() => toggleOpen()}>
                            Schedule Transfer
                            <img src={getImageUrl("icons/send.png")} />
                        </button>

                    </div>
                </div>

                {isLoading ? <Center><Spinner /></Center> :

                    <>
                    {currentPendingTransfers.length === 0 ? (
                        <div className={styles.nothingBigDiv}>
                            <div className={styles.nothingFound}>
                                <img src={getImageUrl("nothing.png")} />
                                <h2>No Transaction Data</h2>
                                <p>We cannot seem to find any transaction data, your transaction information will appear here.</p>
                            </div>
                        </div>
                        
                    ) : (

                        <>
                        <table className={styles.transferTable}>
                            <thead>
                                <th className={styles.tableCheckbox}><input type="checkbox" id="selectAll" /></th>
                                <th>From Accout</th>
                                <th>To Account</th>
                                <th>Transfer Type</th>
                                <th>Amount</th>
                                <th>Frequency</th>
                                <th>Scheduled Date</th>
                                <th>Description</th>
                                <th className={styles.action}>Action</th>
                            </thead>

                            <tbody>
                                {currentPendingTransfers.map((transfer, index) => (
                                    <tr key={index}>
                                        <td><input type="checkbox" /></td>
                                        <td>{transfer.fromAcct}</td>
                                        <td>{transfer.toAcct}</td>
                                        <td>{transfer.type}</td>
                                        <td>{transfer.amount}</td>
                                        <td>{transfer.frequency}</td>
                                        <td>{transfer.scheduleDate}</td>
                                        <td>{transfer.description}</td>
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

                        <Pagination
                            filteredData={filteredPendingTransfers}
                            currentPage={currentPage1}
                            itemsPerPage={itemsPerPage}
                            onPageChange={handlePageChange1}
                        />
                        </>
                    )}
                    </>
                }
            </div>



            <div className={`${styles.hideTable}`} id='table2'>

                <div className={styles.searchButtons}>
                    <div className={styles.searchBar}>
                        <img src={getImageUrl("icons/search.png")} />
                        <input id="search" type="text" onChange={handleSearch} placeholder='Search for transaction' />
                    </div>

                    <div className={styles.buttons}>
                        <Button p={"0"} bg={"transparent"} border={"none"} _hover={{bg: "transaprent"}}>
                            <SlRefresh size={"24px"}/>
                        </Button>
                        <label className={styles.buttonOne}>
                            Frequency:
                            <select value={frequencyFilter} onChange={handleFrequencyChange}>
                                <option value="">All</option>
                                {uniqueCompletedFrequency.map(frequency => (
                                    <option key={frequency} value={frequency}>{frequency}</option>
                                ))}
                            </select>
                        </label>

                        <button className={styles.buttonTwo} onClick={() => toggleOpen()}>
                            Schedule Transfer
                            <img src={getImageUrl("icons/send.png")} />
                        </button>

                    </div>
                </div>


                {currentCompletedTransfers.length === 0 ? (
                    <div className={styles.nothingBigDiv}>
                        <div className={styles.nothingFound}>
                            <img src={getImageUrl("nothing.png")} />
                            <h2>No Transaction Data</h2>
                            <p>We cannot seem to find any transaction data, your transaction information will appear here.</p>
                        </div>
                    </div>
                    
                ) : (

                    <>

                    <table className={styles.transferTable}>
                        <thead>
                            <th className={styles.tableCheckbox}><input type="checkbox" id="selectAll" /></th>
                            <th>From Accout</th>
                            <th>To Account</th>
                            <th>Transfer Type</th>
                            <th>Amount</th>
                            <th>Frequency</th>
                            <th>Scheduled Date</th>
                            <th>Description</th>
                            <th className={styles.action}>Action</th>
                        </thead>

                        <tbody>
                            {currentCompletedTransfers.map((transfer, index) => (
                                <tr key={index}>
                                    <td><input type="checkbox" /></td>
                                    <td>{transfer.fromAcct}</td>
                                    <td>{transfer.toAcct}</td>
                                    <td>{transfer.type}</td>
                                    <td>{transfer.amount}</td>
                                    <td>{transfer.frequency}</td>
                                    <td>{transfer.scheduleDate}</td>
                                    <td>{transfer.description}</td>
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

                    <Pagination
                        filteredData={filteredCompletedTransfers}
                        currentPage={currentPage2}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange2}
                    />
                    </>
                )}
            </div>            
        </div>
        </>
    )
}