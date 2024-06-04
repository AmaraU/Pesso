import React from "react";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../../utils";

export const Navbar = () => {

  let currentPath = window.location.pathname;

  return (
    <div className={styles.theWhole}>

      <div className={styles.linkList}>

        <a href="/" className={currentPath === "/" ? styles.active : ""}>
          <img className={styles.grey} src={getImageUrl("icons/Dashboard.png")} />
          <img className={styles.blue} src={getImageUrl("icons/blueDashboard.png")} />
          Dashboard
        </a>
        <a href="/transactions" className={currentPath.includes("/transactions") ? styles.active : ""}>
          <img src={getImageUrl("icons/Transactions.png")} />
          Transactions
        </a>
        <a href="/accounts" className={currentPath.includes("/accounts") ? styles.active : ""}>
          <img src={getImageUrl("icons/Accounts.png")} />
          Accounts
        </a>
        <a href="/cashflow" className={currentPath.includes("/cashflow") ? styles.active : ""}>
          <img src={getImageUrl("icons/Cashflow.png")} />
          Cashflow
        </a>
        <a href="/loans" className={currentPath.includes("/loans") ? styles.active : ""}>
          <img src={getImageUrl("icons/Loans.png")} />
          Loans
        </a>
        <a href="/investments" className={currentPath.includes("/investments") ? styles.active : ""}>
          <img src={getImageUrl("icons/Investments.png")} />
          Investments
        </a>
        <a href="/bulktransfer" className={currentPath.includes("/bulktransfer") ? styles.active : ""}>
          <img src={getImageUrl("icons/BulkTransfer.png")} />
          Bulk transfer
        </a>
        <a href="/budget" className={currentPath.includes("/budget") ? styles.active : ""}>
          <img src={getImageUrl("icons/Budget.png")} alt="" />
          Budget
        </a>
        <a href="/reconciliations" className={currentPath.includes("/reconciliations") ? styles.active : ""}>
          <img src={getImageUrl("icons/Reconciliations.png")} />
          Reconciliations
        </a>
        <a href="/reports" className={currentPath.includes("/reports") ? styles.active : ""}>
          <img src={getImageUrl("icons/Reports.png")} />
          Reports
        </a>
        <a href="/audittrails" className={currentPath.includes("/audittrails") ? styles.active : ""}>
          <img src={getImageUrl("icons/AuditTrails.png")} />
          Audit Trails
        </a>
        <a href="/users" className={currentPath.includes("/users") ? styles.active : ""}>
          <img src={getImageUrl("icons/Users.png")} />
          Users
        </a>
        <a href="/settings" className={currentPath.includes("/settings") ? styles.active : ""}>
          <img src={getImageUrl("icons/Settings.png")} />
          Settings
        </a>
      </div>
    </div>
  )
}