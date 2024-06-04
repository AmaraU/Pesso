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
          <img className={styles.grey} src={getImageUrl("icons/Transactions.png")} />
          <img className={styles.blue} src={getImageUrl("icons/blueTransactions.png")} />
          Transactions
        </a>
        <a href="/accounts" className={currentPath.includes("/accounts") ? styles.active : ""}>
          <img className={styles.grey} src={getImageUrl("icons/Accounts.png")} />
          <img className={styles.blue} src={getImageUrl("icons/blueAccounts.png")} />
          Accounts
        </a>
        <a href="/cashflow" className={currentPath.includes("/cashflow") ? styles.active : ""}>
          <img className={styles.grey} src={getImageUrl("icons/Cashflow.png")} />
          <img className={styles.blue} src={getImageUrl("icons/blueCashflow.png")} />
          Cashflow
        </a>
        <a href="/loans" className={currentPath.includes("/loans") ? styles.active : ""}>
          <img className={styles.grey} src={getImageUrl("icons/Loans.png")} />
          <img className={styles.blue} src={getImageUrl("icons/blueLoans.png")} />
          Loans
        </a>
        <a href="/investments" className={currentPath.includes("/investments") ? styles.active : ""}>
          <img className={styles.grey} src={getImageUrl("icons/Investments.png")} />
          <img className={styles.blue} src={getImageUrl("icons/blueInvestments.png")} />
          Investments
        </a>
        <a href="/bulktransfer" className={currentPath.includes("/bulktransfer") ? styles.active : ""}>
          <img className={styles.grey} src={getImageUrl("icons/BulkTransfer.png")} />
          <img className={styles.blue} src={getImageUrl("icons/blueBulkTransfer.png")} />
          Bulk transfer
        </a>
        <a href="/budget" className={currentPath.includes("/budget") ? styles.active : ""}>
          <img className={styles.grey} src={getImageUrl("icons/Budget.png")} alt="" />
          <img className={styles.blue} src={getImageUrl("icons/blueBudget.png")} alt="" />
          Budget
        </a>
        <a href="/reconciliations" className={currentPath.includes("/reconciliations") ? styles.active : ""}>
          <img className={styles.grey} src={getImageUrl("icons/Reconciliations.png")} />
          <img className={styles.blue} src={getImageUrl("icons/blueReconciliations.png")} />
          Reconciliations
        </a>
        <a href="/reports" className={currentPath.includes("/reports") ? styles.active : ""}>
          <img className={styles.grey} src={getImageUrl("icons/Reports.png")} />
          <img className={styles.blue} src={getImageUrl("icons/blueReports.png")} />
          Reports
        </a>
        <a href="/audittrails" className={currentPath.includes("/audittrails") ? styles.active : ""}>
          <img className={styles.grey} src={getImageUrl("icons/AuditTrails.png")} />
          <img className={styles.blue} src={getImageUrl("icons/blueAuditTrails.png")} />
          Audit Trails
        </a>
        <a href="/users" className={currentPath.includes("/users") ? styles.active : ""}>
          <img className={styles.grey} src={getImageUrl("icons/Users.png")} />
          <img className={styles.blue} src={getImageUrl("icons/blueUsers.png")} />
          Users
        </a>
        <a href="/settings" className={currentPath.includes("/settings") ? styles.active : ""}>
          <img className={styles.grey} src={getImageUrl("icons/Settings.png")} />
          <img className={styles.blue} src={getImageUrl("icons/blueSettings.png")} />
          Settings
        </a>
      </div>
    </div>
  )
}