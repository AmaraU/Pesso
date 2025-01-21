import React, { useState, useEffect } from 'react';
import { useToast, useDisclosure, Center, Spinner } from "@chakra-ui/react";
import styles from "./UsersRolesPage.module.css";
import { getImageUrl } from '../../../utils';
import { auditLog, logger } from '../../models/logging';
import axios from 'axios';
import { DEFAULT_GET_ROLES_ERR_MSG, getAPIEndpoint } from '../../../config';
import { AddRole } from "../../Components/AddRole";
import { ConfirmDeletion } from "../../Components/ConfirmDeletion";


export const UsersRolesPage = () => {

    const { isOpen: isOpenAddRole, onOpen: onOpenAddRole, onClose: onCloseAddRole } = useDisclosure();
    const { isOpen: isOpenDeleteRole, onOpen: onOpenDeleteRole, onClose: onCloseDeleteRole } = useDisclosure();
    const [ isLoadingRoles, setIsloadingRoles ] = useState(false);
    const [ selectedRole, setSelectedRole ] = useState([]);
    const [ roles, setRoles ] = useState([]);
    const toast = useToast();

    useEffect(() => {
        getRoles();
    }, [])

    const log = async () => {
        await auditLog({
            activity: `Viewed all roles`,
            module: "Roles and Permissions",
            userId: sessionStorage.getItem("id")
        }, sessionStorage.getItem("tk"));
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
                    setRoles(data);
                    setSelectedRole(data[0]);
                    log();
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

    
    const handleAddRole = () => {
        onOpenAddRole();
    }
    const handleDeleteRole = (role) => {
        setSelectedRole([{ id: role.id, name: role.role_name }]);
        onOpenDeleteRole();
    }
    const postDeleteRole = () => {
        setSelectedRole([]);
    }

    const details = "This role grants users the permissions to manage everything on the dashboard";
    const members = ["Christina Elele"];
    const hasAccess = [
        "Access all modules and features.",
        "Manage users, permissions, and roles.",
        "Initiate transfers and bulk transfers.",
        "Configure system settings and customize dashboard.",
        "View audit trails and reports."
    ];
    const hasNoAccess = "No specific restrictions within the application.";


    return (
        <>

        <div className={styles.whole}>

            <div className={styles.backDiv}>
                <button className={styles.backButton}>
                    <img src={getImageUrl("icons/blackLeftArrow.png")} />
                    Back
                </button>

                <button className={styles.addButton} onClick={handleAddRole}>
                    <img src={getImageUrl("icons/whitePlus.png")} />
                    New Role
                </button>
            </div>

            {isLoadingRoles ? <Center><Spinner /></Center> :

                <div className={styles.roles}>
                    <div className={styles.rolesNav}>
                        <h4>Default Roles</h4>
                        <ul>
                            {roles.map((role, index) => (
                                <li className={role.role_name == selectedRole.role_name ? styles.active : styles.inactive} key={index}>
                                    <button onClick={() => setSelectedRole(role)}>{role.role_name}</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={styles.info}>
                        <div className={styles.infoHeader}>
                            <h3>{selectedRole.role_name}</h3>
                            <p className={styles.desc}>{details}</p>
                            <ul>
                                {members.map((member, index) => (
                                    <li>
                                        <div className={styles.greyCircle}></div>
                                        <p>Team Members with this role ({index + 1}): {member}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className={styles.accessNoAccess}>
                            <div className={styles.access}>
                                <div className={styles.accessHeader}>
                                    What this role can access
                                </div>
                                <ul>
                                    {hasAccess.map((access, index) => (
                                        <li>{access}</li>
                                    ))}                                
                                </ul>
                            </div>
                            <div className={styles.noAccess}>
                                <div className={styles.noAccessHeader}>
                                    What this role cannot access
                                </div>
                                <ul><p>{hasNoAccess}</p></ul>
                            </div>
                        </div>
                    </div>

                </div>
            }

        </div>

        <AddRole isOpen={isOpenAddRole} onClose={onCloseAddRole} roles={roles} refreshData={getRoles} />
        <ConfirmDeletion isOpen={isOpenDeleteRole} onClose={onCloseDeleteRole} dataset={selectedRole} flag={2} flagTitle={"Role"} refreshData={getRoles} postDelete={postDeleteRole} />
        </>
    )
}