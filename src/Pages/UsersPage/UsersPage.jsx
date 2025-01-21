import { useToast, useDisclosure, Center, Spinner } from "@chakra-ui/react";
import React, { useState, useEffect, useRef } from 'react';
import styles from "./UsersPage.module.css";
import { getImageUrl } from '../../../utils';
import { auditLog, logger } from '../../models/logging';
import axios from 'axios';
import { AddUser } from "../../Components/AddUser";
import { ConfirmDeletion } from "../../Components/ConfirmDeletion";
import { DEFAULT_GET_USERS_ERR_MSG, getAPIEndpoint } from '../../../config';
import Pagination from '../../Components/Pagination/Pagination';



export const UsersPage = () => {

    const { isOpen: isOpenAddUser, onOpen: onOpenAddUser, onClose: onCloseAddUser } = useDisclosure();
    const { isOpen: isOpenDeleteUser, onOpen: onOpenDeleteUser, onClose: onCloseDeleteUser } = useDisclosure();
    const [isLoading, setIsloading] = useState(false);
    const [isLoadingRoles, setIsloadingRoles] = useState(false);
    const [selectedUser, setSelectedUser] = useState([]);
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [isEditUser, setIsEditUser] = useState(false);
    const [ statusFilter, setStatusFilter ] = useState("");
    const [ roleFilter, setRoleFilter ] = useState("");
    const [ search, setSearch] = useState("");
    const [ actionsOpen, setActionsOpen ] = useState({});
    const [ currentPage, setCurrentPage ] = useState(1);
    const toast = useToast();

    const itemsPerPage = 10;


    useEffect(() => {
        getUsers();
        getRoles();
    }, [])

    const log = async () => {
        await auditLog({
            activity: `Viewed all users`,
            module: "User Management",
            userId: sessionStorage.getItem("id")
        }, sessionStorage.getItem("tk"));
    }

    const getUsers = async () => {
        setIsloading(true);
        try {

            const response = await axios.post(getAPIEndpoint('get-users'), null, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsloading(false);
                    setUsers(data);
                    log();
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
                            description: `${DEFAULT_GET_USERS_ERR_MSG}. ${err ? "[Details: " + err + "]" : ""} `,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_GET_USERS_ERR_MSG,
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
            await logger({ task: "Get Users", error: error.toString() });
        }
        toast({
            description: DEFAULT_GET_USERS_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsloading(false);
    }

    const getRoles = async () => {
        setIsloadingRoles(true);
        try {

            const response = await axios.post(getAPIEndpoint('get-roles'), null, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsloadingRoles(false);
                    console.log(data)
                    setRoles(data);
                    return;
                }
                else {
                    setIsloadingRoles(false);
                    let err = "";

                    if (data.length > 0) {
                        err = data[0].error;
                    }

                    if (err) {
                        toast({
                            description: `${DEFAULT_GET_ROLES_ERR_MSG}. ${err ? "[Details: " + err + "]" : ""} `,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_GET_ROLES_ERR_MSG,
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
            await logger({ task: "Get Roles", error: error.toString() });
        }
        toast({
            description: DEFAULT_GET_ROLES_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsloadingRoles(false);
    }

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
            // (statusFilter === "" || user.status === statusFilter) &&
            (roleFilter === "" || user.role_name === roleFilter) &&
            (user.full_name.toLowerCase().includes(searchLower) ||
            user.email_address.toLowerCase().includes(searchLower))
        );
    });

    const uniqueRoles = [...new Set(users.map(user => user.role))];
    // const uniqueStatuses = [...new Set(users.map(user => user.status))];


    const toggleAction = (index) => {
        setActionsOpen(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);
    
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    const handleAddUser = () => {
        onOpenAddUser();
    }
    const postDeleteUser = () => {
        setSelectedUser([]);
        setIsEditUser(false);
    }
    const resetEditUser = () => {
        setIsEditUser(false);
    }
    const handleEditUser = (user) => {
        setSelectedUser([user]);
        setIsEditUser(true);
        onOpenAddUser();
    }
    const handleDeleteUser = (user) => {
        setSelectedUser([{ id: user.id, name: user.full_name }]);
        onOpenDeleteUser();
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

        <div className={styles.whole}>
            <div className={styles.searchButtons}>
                <div className={styles.searchBar}>
                    <img src={getImageUrl("icons/search.png")} />
                    <input id="search" type="text" onChange={handleSearch} placeholder='Search users' />
                </div>

                <div className={styles.buttons}>
                    {/* <label className={styles.buttonOne}>
                        Status:
                        <select value={statusFilter} onChange={handleStatusChange}>
                            <option value="">All</option>
                            {uniqueStatuses.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </label> */}

                    <label className={styles.buttonTwo}>
                        Role:
                        <select value={roleFilter} onChange={handleRoleChange}>
                            <option value="">All</option>
                            {uniqueRoles.map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                    </label>
                    <a onClick={handleAddUser}  className={styles.buttonThree}>
                        <img src={getImageUrl("icons/whitePlus.png")} alt="" />
                        Add User
                    </a>

                </div>
            </div>


            {isLoading ? <Center><Spinner /></Center> :

                <>
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
                                    <td>{user.full_name}</td>
                                    <td>{user.email_address}</td>
                                    <td>{user.role_name}</td>
                                    <td
                                        // className={user.status.toLowerCase() == ("active") ? styles.active : styles.inactive}
                                    >
                                        {user.status}
                                    </td>
                                    <td>{user.last_loggedin}</td>
                                    <td className={styles.action}>
                                        <button onClick={() => toggleAction(index)}>
                                            <img src={getImageUrl("icons/action.png")} />
                                        </button>
                                        {actionsOpen[index] && <div className={styles.theActions} ref={popupRef}>
                                            <ul>
                                                <li>View</li>
                                                <li onClick={() => handleEditUser(user)}>Edit</li>
                                                <li onClick={() => handleDeleteUser(user)} className={styles.delete}>Delete</li>
                                            </ul>
                                        </div>}
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>

                    <div className={styles.smallUsersTable}>
                        {currentUsers.map((user, index) => (
                            <>
                            <div className={styles.smallUsersTableEntry}>

                                <div className={styles.smallUsersActions}>

                                    <div className={styles.checkbox}><input type="checkbox" name="" id="" /></div>
                                    <div>                                    
                                        <button onClick={() => toggleAction(index)}>
                                            <img src={getImageUrl("icons/action.png")} />
                                        </button>
                                        <div className={`${styles.actionsClosed} ${actionsOpen[index] && styles.theActions}`} ref={popupRef}>
                                            <ul>
                                                <li>View</li>
                                                <li onClick={() => handleEditUser(user)}>Edit</li>
                                                <li onClick={() => handleDeleteUser(user)} className={styles.delete}>Delete</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.smallUsersTableRow}>
                                    <div className={styles.greyBox}>Name</div>
                                    <div className={styles.whiteBox}>{user.full_name}</div>
                                </div>

                                <div className={styles.smallUsersTableRow}>
                                    <div className={styles.greyBox}>Email</div>
                                    <div className={styles.whiteBox}>{user.email_address}</div>
                                </div>

                                <div className={styles.smallUsersTableRow}>
                                    <div className={styles.greyBox}>Role</div>
                                    <div className={styles.whiteBox}>{user.role_name}</div>
                                </div>

                                <div className={styles.smallUsersTableRow}>
                                    <div className={styles.greyBox}>Status</div>
                                    <div className={styles.whiteBox}>{user.status}</div>
                                </div>

                                <div className={styles.smallUsersTableRow}>
                                    <div className={styles.greyBox}>Last Active</div>
                                    <div className={styles.whiteBox}>{user.last_loggedin}</div>
                                </div>
                            </div>
                            </>
                        ))}
                    </div>

                    <Pagination
                        filteredData={filteredUsers}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                    </>
                )}
                </>
            }
        </div>

        <AddUser isEdit={isEditUser} dataset={selectedUser} isOpen={isOpenAddUser} onClose={onCloseAddUser} roles={roles} resetEdit={resetEditUser} refreshData={getUsers} />
        <ConfirmDeletion isOpen={isOpenDeleteUser} onClose={onCloseDeleteUser} dataset={selectedUser} flag={1} flagTitle={"User"} refreshData={getUsers} postDelete={postDeleteUser} />

        </>
    )
}