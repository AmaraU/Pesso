import React, { useState, useEffect, useRef } from 'react';
import styles from "./UsersPage.module.css";
import { getImageUrl } from '../../../utils';



export const UsersPage = () => {

    const users = [
        {
            name: "Adewale Ayuba",
            email: "dewaleayuba@gmail.com",
            role: "Admin",
            status: "Active",
            lastActive: "2 days ago",
        },
        {
            name: 'Anthonia Ekuase',
            email: "anthonia78@yahoo.com",
            role: "Account officer",
            status: "Inactive",
            lastActive: "3 minutes ago",
        },
        {
            name: "Dominic Anga",
            email: "dominica@gmail.com",
            role: "Finance manager",
            status: "Active",
            lastActive: "15 days ago",
        },
        {
            name: "Precious Ivonge",
            email: "precivon@gmail.com",
            role: "Account officer",
            status: "Inactive",
            lastActive: "3 hours ago",
        },
        {
            name: "Lawal Timothy",
            email: "Lawtim@yahoo.com",
            role: "IT",
            status: "Active",
            lastActive: "2 days ago",
        },
        {
            name: "Alonge Victoria",
            email: "kingdownboy@yahoo.com",
            role: "Human resources",
            status: "Inactive",
            lastActive: "3 minutes ago",
        },
        {
            name: "Natasha Williams",
            email: "Nashy@gmail.com",
            role: "Procurement officer",
            status: "Active",
            lastActive: "15 days ago",
        },
        {
            name: "Oladele Fadeyi",
            email: "fladele@yahoo.com",
            role: "Account officer",
            status: "Active",
            lastActive: "3 minutes ago",
        },
        {
            name: "Igwe Victor",
            email: "fladele@yahoo.com",
            role: "IT",
            status: "Inactive",
            lastActive: "3 hours ago",
        },
        {
            name: "Olawale Timilehin",
            email: "Timilowkey@gmail.com",
            role: "Human resources",
            status: "Inactive",
            lastActive: "15 days ago",
        },
    ]

    const [ statusFilter, setStatusFilter ] = useState("");
    const [ roleFilter, setRoleFilter ] = useState("");
    const [ search, setSearch] = useState("");
    const [ actionsOpen, setActionsOpen ] = useState({});
    const [ currentPage, setCurrentPage ] = useState(1);
    const itemsPerPage = 10;

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };

    const handleStatusChange = (event) => {
        setStatusFilter(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRoleFilter(event.target.value);
    };


    const filteredUsers = users.filter(user => {
        const searchLower = search.toLowerCase();
        return (
            (statusFilter === "" || user.status === statusFilter) &&
            (roleFilter === "" || user.role === roleFilter) &&
            (user.name.toLowerCase().includes(searchLower) ||
            user.email.toLowerCase().includes(searchLower))
        );
    });

    const uniqueRoles = [...new Set(users.map(user => user.role))];
    const uniqueStatuses = [...new Set(users.map(user => user.status))];


    const toggleAction = (index) => {
        setActionsOpen(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(filteredUsers.length / itemsPerPage)) {
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


    function userPopup() {        
        var popup = document.getElementById('popup');
        popup.classList.add(`${styles.popped}`);

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.add(`${styles.dim}`);
    }

    function sentPopup() {        
        var popup = document.getElementById('popup');
        popup.classList.remove(`${styles.popped}`);

        var sent = document.getElementById('invite');
        sent.classList.add(`${styles.popped}`);
    }

    function closePopups() {        
        var popup = document.getElementById('popup');
        popup.classList.remove(`${styles.popped}`);

        var sent = document.getElementById('invite');
        sent.classList.remove(`${styles.popped}`);

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.remove(`${styles.dim}`);
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

        <div className={styles.popup} id='popup'>
            <div className={styles.header}>
                <h3>Add User</h3>
                <a className={styles.close} href=""><img src={getImageUrl("icons/greyClose.png")} alt="X" onClick={(e) => {e.preventDefault(); closePopups()}} /></a>
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

                <div className={styles.formGroup}>
                    <label htmlFor="role">Role</label>
                    <select name="role" id="">
                        <option value="">select role</option>
                        {uniqueRoles.map(role => (
                            <option>{role}</option>
                        ))}
                    </select>
                </div>

                <button onClick={(e) => {e.preventDefault(); sentPopup()}}>Send Invite</button>
            </form>
        </div>

        <div className={styles.sentPopup} id="invite">
            <div className={styles.header}>
                <a className={styles.close} href=""><img src={getImageUrl("icons/greyClose.png")} alt="X" onClick={(e) => {e.preventDefault(); closePopups()}} /></a>
            </div>
            <img src={getImageUrl("invite.png")} />
            <h3>Invite Sent</h3>
        </div>

        <div className={styles.dimmer} id='dimmer'></div>



        <div className={styles.whole}>
            <div className={styles.searchButtons}>
                <div className={styles.searchBar}>
                    <img src={getImageUrl("icons/search.png")} />
                    <input id="search" type="text" onChange={handleSearch} placeholder='Search users' />
                </div>

                <div className={styles.buttons}>
                    <label className={styles.buttonOne}>
                        Status:
                        <select value={statusFilter} onChange={handleStatusChange}>
                            <option value="">All</option>
                            {uniqueStatuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </label>

                    <label className={styles.buttonTwo}>
                        Role:
                        <select value={roleFilter} onChange={handleRoleChange}>
                            <option value="">All</option>
                            {uniqueRoles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </label>
                    <a onClick={(e) => {e.preventDefault(); userPopup()}} className={styles.buttonThree}>
                        <img src={getImageUrl("icons/whitePlus.png")} alt="" />
                        Add User
                    </a>

                </div>
            </div>



            {currentUsers.length === 0 ? (
                <div className={styles.nothingBigDiv}>
                    <div className={styles.nothingFound}>
                        <img src={getImageUrl("nothing.png")} />
                        <h2>No User Data</h2>
                        <p>We cannot seem to find any user data, your user information will appear here.</p>
                    </div>
                </div>
                
            ) : (
                <>

                <table className={styles.userTable}>
                    <thead>
                        <th className={styles.tableCheckbox}><input type="checkbox" id="selectAll" /></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Last Active</th>
                        <th className={styles.action}>Action</th>
                    </thead>

                    <tbody>
                        {currentUsers.map((user, index) => (
                            <tr key={index}>
                                <td className={styles.checkbox}><input type="checkbox" /></td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td className={user.status.toLowerCase() == ("active") ? styles.active : styles.inactive}>
                                    {user.status}
                                </td>
                                <td>{user.lastActive}</td>
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