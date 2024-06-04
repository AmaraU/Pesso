import React, { useState } from "react";
import styles from "./Header.module.css";
import { getImageUrl } from "../../../utils";

export const Header = () => {

    let currentPath = window.location.pathname;
    let PageTitle;
    let linkList = [];

    switch (currentPath) {
        case "/":
            PageTitle = "Dashboard";
            break;
        
        case "/transactions":
        case "/transactions/transfer":
            PageTitle = "Transactions";
            linkList = [
                {title: "History", link: "/transactions"},
                {title: "Transfer", link: "/transactions/transfer"}
            ];
            break;
        
        case "/accounts":
            PageTitle = "Accounts";
            break;
        
        case "/cashflow":
        case "/cashflow/outflow":
            PageTitle = "Cashflow";
            linkList = [
                {title: "Inflow", link: "/cashflow"},
                {title: "Outflow", link: "/cashflow/outflow"}
            ];
            break;
        
        case "/loans":
            PageTitle = "Loans";
            break;
        
        case "/investments":
            PageTitle = "Investments";
            break;
        
        case "/bulktransfer":
            PageTitle = "Bulk Transfer";
            break;
        
        case "/budget":
            PageTitle = "Budget";
            break;
        
        case "/reconciliation":
            PageTitle = "Reconciliation";
            break;
        
        case "/reports":
        case "/reports/history":
            PageTitle = "Reports";
            linkList = [
                {title: "Financial Health Indicator", link: "/reports"},
                {title: "History", link: "/reports/history"}
            ];
            break;
        
        case "/audittrails":
            PageTitle = "Audit Trails";
            break;
        
        case "/users":
        case "/users/roles":
            PageTitle = "Users";
            linkList = [
                {title: "Members", link: "/users"},
                {title: "Roles & Permissions", link: "/users/roles"}
            ];
            break;
        
        case "/settings":
        case "/settings/account":
        case "/settings/workflow":
            PageTitle = "Settings";
            linkList = [
                {title: "Profile", link: "/settings"},
                {title: "Account", link: "/settings/account"},
                {title: "Workflow", link: "/settings/workflow"}
            ];
            break;
    }

    return (
        <div className={styles.header}>

            <div className={styles.logo} >
                <a href="/"><img src={getImageUrl("logos/PessoLogo.png")} alt="PESSO" /></a>
            </div>

            <div className={styles.leftRight}>

                <div className={styles.headerLeft}>

                    <h2>{PageTitle}</h2>
                    <div className={styles.links}>
                        {linkList.map(({ title, link }, index) => (
                            <a key={index} href={link} className={currentPath === link ? styles.activeLink : styles.inactiveLink}>
                                {title}
                            </a>
                        ))}
                    </div>
                </div>

                <div className={styles.headerRight}>
                    <div className={styles.headerSearch}>
                        <img src={getImageUrl("icons/search.png")} />
                        <input type="text" name="" id="" placeholder='Search' />
                    </div>
                    <div className={styles.languageDiv}>
                        <label htmlFor="language"><img src={getImageUrl("icons/globe.png")} alt="" /></label>
                        <select name="language" >
                            <option value="english">EN</option>
                            <option value="french">FR</option>
                        </select>
                    </div>
                    <a href=""><img src={getImageUrl("icons/boxes.png")} alt="" /></a>
                    <a href=""><img src={getImageUrl("icons/bell.png")} alt="" /></a>
                    <a href=""><img src={getImageUrl("Avatar.png")} alt="" /></a>
                </div>

            </div>

            

        </div>
    )
}