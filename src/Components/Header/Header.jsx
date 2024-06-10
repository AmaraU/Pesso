import React, { useState } from "react";
import styles from "./Header.module.css";
import { getImageUrl } from "../../../utils";

export const Header = () => {

    let currentPath = window.location.pathname;
    let PageTitle;
    let linkList = [];

    switch (currentPath) {

        case "/":
        case "/dashboard":
        case "/dashboard/overview":
            PageTitle = "Dashboard";
            break;
        
        case "/dashboard/transactions":
        case "/dashboard/transactions/transfer":
            PageTitle = "Transactions";
            linkList = [
                {title: "History", link: "/dashboard/transactions"},
                {title: "Transfer", link: "/dashboard/transactions/transfer"}
            ];
            break;
        
        case "/dashboard/accounts":
            PageTitle = "Accounts";
            break;
        
        case "/dashboard/cashflow":
        case "/dashboard/cashflow/outflow":
            PageTitle = "Cashflow";
            linkList = [
                {title: "Inflow", link: "/dashboard/cashflow"},
                {title: "Outflow", link: "/dashboard/cashflow/outflow"}
            ];
            break;
        
        case "/dashboard/loans":
            PageTitle = "Loans";
            break;
        
        case "/dashboard/investments":
            PageTitle = "Investments";
            break;
        
        case "/dashboard/bulktransfer":
            PageTitle = "Bulk Transfer";
            break;
        
        case "/dashboard/budget":
            PageTitle = "Budget";
            break;
        
        case "/dashboard/reconciliation":
            PageTitle = "Reconciliation";
            break;
        
        case "/dashboard/reports":
        case "/dashboard/reports/history":
            PageTitle = "Reports";
            linkList = [
                {title: "Financial Health Indicator", link: "/dashboard/reports"},
                {title: "History", link: "/dashboard/reports/history"}
            ];
            break;
        
        case "/dashboard/audittrails":
            PageTitle = "Audit Trails";
            break;
        
        case "/dashboard/users":
        case "/dashboard/users/roles":
            PageTitle = "Users";
            linkList = [
                {title: "Members", link: "/dashboard/users"},
                {title: "Roles & Permissions", link: "/dashboard/users/roles"}
            ];
            break;
        
        case "/dashboard/settings":
        case "/dashboard/settings/account":
        case "/dashboard/settings/workflow":
            PageTitle = "Settings";
            linkList = [
                {title: "Profile", link: "/dashboard/settings"},
                {title: "Account", link: "/dashboard/settings/account"},
                {title: "Workflow", link: "/dashboard/settings/workflow"}
            ];
            break;
    }

    return (
        <div className={styles.header}>

            <div className={styles.logo} >
                <a href="/"><img src={getImageUrl("logos/whiteLogo.png")} alt="PESSO" /></a>
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