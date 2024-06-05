import React, { useState, useEffect, useRef } from 'react';
import styles from "./UsersRolesPage.module.css";
import { getImageUrl } from '../../../utils';



export const UsersRolesPage = () => {


    function toggle() {        
        var popup = document.getElementById('popup');
        popup.classList.toggle(`${styles.popped}`);

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.toggle(`${styles.dim}`);
    }

    const [ name, setName ] = useState("Admin");
    const [ details, setDetails ] = useState("This role grants users the permissions to manage everything on the dashboard");
    const [ members, setMembers ] = useState(["Christina Elele"]);
    const [ hasAccess, setHasAccess ] = useState([
        "Access all modules and features.",
        "Manage users, permissions, and roles.",
        "Initiate transfers and bulk transfers.",
        "Configure system settings and customize dashboard.",
        "View audit trails and reports."
    ]);
    const [ hasNoAccess, setHasNoAccess ] = useState("No specific restrictions within the application.");


    function clickAdmin() {
        setName("Admin");
        setDetails("This role grants users the permissions to manage everything on the dashboard");
        setMembers(["Christina Elele"]);
        setHasAccess([
            "Access all modules and features.",
            "Manage users, permissions, and roles.",
            "Initiate transfers and bulk transfers.",
            "Configure system settings and customize dashboard.",
            "View audit trails and reports."
        ]);
        setHasNoAccess("No specific restrictions within the application.");
    }


    function clickFinMan() {
        setName("Financial Manager");
        setDetails("This role grants users fiancial manager details");
        setMembers(["Christina Elele", "Emmanuel Ucheze"]);
        setHasAccess([
            "Access all modules except user management.",
            "Initiate transfers and bulk transfers with potential approval requirement.",
            "Create budgets, track cash flow, manage loans, and investments.",
            "Generate reports and reconcile bank statements."
        ]);
        setHasNoAccess("Cannot manage users or access user management settings.");
    }

    function clickAccMan() {
        setName("Account Manager");
        setDetails("This role grants users acount manager details");
        setMembers(["Amara Ude", "Sophia Momah"]);
        setHasAccess([
            "Access all modules except user management and system settings.",
            "Initiate transfers for managed accounts, subject to restrictions.",
            "View account details, track expenses, and budgets.",
            "Access cash flows, loans, and investments functionalities."
        ]);
        setHasNoAccess("Cannot manage users or system settings.");
    }

    function clickEmployee() {
        setName("Employee/User");
        setDetails("This role grants users employee and user details");
        setMembers(["Amara Ude"]);
        setHasAccess([
            "Access specific modules based on permissions.",
            "Initiate transfers for designated accounts.",
            "Initiate transfers and bulk transfers.",
            "View relevant account details, transactions, and budgets.",
            "Limited access to advanced functionalities like reconciliation and investments."
        ]);
        setHasNoAccess("Cannot access administrative features or manage users.");
    }

    function clickAuditor() {
        setName("Auditor");
        setDetails("This role grants users auditor details");
        setMembers(["Emmanuel Ucheze"]);
        setHasAccess([
            "Access audit trails, reports, and relevant modules.",
            "View detailed activity logs, financial reports, and transaction histories."
        ]);
        setHasNoAccess("Initiate transactions, manage users, or access administrative settings.");
    }


    return (
        <>

        <div className={styles.popup} id='popup'>
            <div className={styles.header}>
                <h3>Create Role</h3>
                <a className={styles.close} href=""><img src={getImageUrl("icons/greyClose.png")} alt="X" onClick={() => toggle()} /></a>
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

                <button>Send Invite</button>
            </form>
        </div>

        <div className={styles.dimmer} id='dimmer'></div>



        <div className={styles.whole}>

            <div className={styles.backDiv}>
                <button className={styles.backButton}>
                    <img src={getImageUrl("icons/blackLeftArrow.png")} />
                    Back
                </button>

                <button className={styles.addButton}>
                    <img src={getImageUrl("icons/whitePlus.png")} />
                    New Role
                </button>
            </div>

            <div className={styles.roles}>
                <div className={styles.rolesNav}>
                    <h4>Default Roles</h4>
                    <ul>
                        <li className={name === "Admin" ? styles.active : styles.inactive}><button onClick={() => clickAdmin()}>Admin/Owner</button></li>
                        <li className={name === "Financial Manager" ? styles.active : styles.inactive}><button onClick={() => clickFinMan()}>Financial Manager</button></li>
                        <li className={name === "Account Manager" ? styles.active : styles.inactive}><button onClick={() => clickAccMan()}>Account Manager</button></li>
                        <li className={name === "Employee/User" ? styles.active : styles.inactive}><button onClick={() => clickEmployee()}>Employee/User</button></li>
                        <li className={name === "Auditor" ? styles.active : styles.inactive}><button onClick={() => clickAuditor()}>Auditor</button></li>
                    </ul>
                </div>

                <div className={styles.info}>
                    <div className={styles.infoHeader}>
                        <h3>{name}</h3>
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


        </div>
        </>
    )
}