import React, { useState, useEffect, useRef } from 'react';
import styles from "./TransactionsTransferPage.module.css";
import { getImageUrl } from '../../../utils';
import { Button } from "@chakra-ui/react";
import { SlRefresh } from "react-icons/sl";



export const TransactionsTransferPage = () => {

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

    const [ frequencyFilter, setFrequencyFilter ] = useState("");
    const [ search, setSearch] = useState("");
    const [ actionsOpen, setActionsOpen ] = useState({});
    const [ currentPage1, setCurrentPage1 ] = useState(1);
    const [ currentPage2, setCurrentPage2 ] = useState(1);
    const itemsPerPage = 10;

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

    const totalPendingPages = Math.ceil(filteredPendingTransfers.length / itemsPerPage);
    const totalCompletedPages = Math.ceil(filteredCompletedTransfers.length / itemsPerPage);

    const handleNextPage1 = () => {
        if (currentPage1 < Math.ceil(filteredPendingTransfers.length / itemsPerPage)) {
            setCurrentPage1(currentPage1 + 1);
        }
    };

    const handlePreviousPage1 = () => {
        if (currentPage1 > 1) {
            setCurrentPage1(currentPage1 - 1);
        }
    };


    const handleNextPage2 = () => {
        if (currentPage2 < Math.ceil(filteredCompletedTransfers.length / itemsPerPage)) {
            setCurrentPage2(currentPage2 + 1);
        }
    };

    const handlePreviousPage2 = () => {
        if (currentPage2 > 1) {
            setCurrentPage2(currentPage2 - 1);
        }
    };

    const handlePageClick1 = (pageNumber) => {
        setCurrentPage1(pageNumber);
    }
    const handlePageClick2 = (pageNumber) => {
        setCurrentPage2(pageNumber);
    }


    function toggle() {        
        var popup = document.getElementById('popup');
        popup.classList.toggle(`${styles.popped}`);

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.toggle(`${styles.dim}`);
    }

    const [ activeButton, setActiveButton ] = useState(1);

    function changeTables(buttonNumber) {

        setActiveButton(buttonNumber);
        setSearch("");

        var table1 = document.getElementById('table1');
        var table2 = document.getElementById('table2');

        table1.classList.toggle(`${styles.hideTable}`);
        table2.classList.toggle(`${styles.hideTable}`);
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
        <>

        <div className={styles.popup} id="popup">

            <div className={styles.header}>
                <h3>Schedule Transfer</h3>
                <a className={styles.close} href=""><img src={getImageUrl("icons/greyClose.png")} alt="X" onClick={(e) => {e.preventDefault(); () => toggle()}} /></a>
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

                <div className={styles.dateTime}>
                    <div className={styles.formGroup}>
                        <label htmlFor="fromAcct">Date</label>
                        <input type="date" name="" id="" />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="fromAcct">Time</label>
                        <input type="time" name="" id="" />
                    </div>
                </div>

                <div className={styles.checkFormGroup}>
                    <input type="checkbox" name="" id="" />
                    <label htmlFor="fromAcct">Recurring</label>
                </div>

            </form>

            <div className={styles.transferButton}>
                <button onClick={(e) => {e.preventDefault(); toggle()}}>Transfer</button>
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

                        <button className={styles.buttonTwo} onClick={(e) => {e.preventDefault(); () => toggle()}}>
                            Schedule Transfer
                            <img src={getImageUrl("icons/send.png")} />
                        </button>

                    </div>
                </div>

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
                        <button onClick={handlePreviousPage1} disabled={currentPage1 === 1} className={styles.move}>
                            <img src={getImageUrl("icons/greyLeftAngle.png")} />
                            Previous
                        </button>
                        {Array.from({ length: totalPendingPages }, (_, index) => (
                            <button key={index + 1} onClick={() => handlePageClick1(index + 1)} className={currentPage1 === index + 1 ? styles.activePage : styles.gotToPage}>
                                0{index + 1}
                            </button>
                        ))}
                        <button onClick={handleNextPage1} disabled={currentPage1 === totalPendingPages} className={styles.move}>
                            Next
                            <img src={getImageUrl("icons/greyRightAngle.png")} />
                        </button>
                    </div>

                    </>
                )}
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

                        <button className={styles.buttonTwo} onClick={() => toggle()}>
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
                        <button onClick={handlePreviousPage2} disabled={currentPage2 === 1} className={styles.move}>
                            <img src={getImageUrl("icons/greyLeftAngle.png")} />
                            Previous
                        </button>
                        {Array.from({ length: totalCompletedPages }, (_, index) => (
                            <button key={index + 1} onClick={() => handlePageClick2(index + 1)} className={currentPage2 === index + 1 ? styles.activePage : styles.gotToPage}>
                                0{index + 1}
                            </button>
                        ))}
                        <button onClick={handleNextPage2} disabled={currentPage2 === totalCompletedPages} className={styles.move}>
                            Next
                            <img src={getImageUrl("icons/greyRightAngle.png")} />
                        </button>
                    </div>
                    </>
                )}
            </div>            
        </div>
        </>
    )
}