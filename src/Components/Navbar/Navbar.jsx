import React from "react";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../../utils";

export const Navbar = () => {

  let currentPath = window.location.pathname;

  return (
    <div className={styles.theWhole}>

      <div className={styles.linkList}>

        <a href="/dashboard/overview" className={currentPath === "/dashboard/overview" ? styles.active : ""}>
          <img className={styles.white} src={getImageUrl("icons/dashboardWhite.png")} />
          <img className={styles.red} src={getImageUrl("icons/dashboardRed.png")} />
          Dashboard
        </a>
        <a href="/dashboard/transactions" className={currentPath.includes("/dashboard/transactions") ? styles.active : ""}>
          <img className={styles.white} src={getImageUrl("icons/transactionsWhite.png")} />
          <img className={styles.red} src={getImageUrl("icons/transactionsRed.png")} />
          Transactions
        </a>
        <a href="/dashboard/accounts" className={currentPath.includes("/dashboard/accounts") ? styles.active : ""}>
          <img className={styles.white} src={getImageUrl("icons/accountsWhite.png")} />
          <img className={styles.red} src={getImageUrl("icons/accountsRed.png")} />
          Accounts
        </a>
        <a href="/dashboard/cashflow" className={currentPath.includes("/dashboard/cashflow") ? styles.active : ""}>
          <img className={styles.white} src={getImageUrl("icons/cashflowWhite.png")} />
          <img className={styles.red} src={getImageUrl("icons/cashflowRed.png")} />
          Cashflow
        </a>
        <a href="/dashboard/loans" className={currentPath.includes("/dashboard/loans") ? styles.active : ""}>
          <img className={styles.white} src={getImageUrl("icons/loansWhite.png")} />
          <img className={styles.red} src={getImageUrl("icons/loansRed.png")} />
          Loans
        </a>
        {/* <a href="/dashboard/investments" className={currentPath.includes("/dashboard/investments") ? styles.active : ""}>
          <img className={styles.white} src={getImageUrl("icons/Investments.png")} />
          <img className={styles.red} src={getImageUrl("icons/blueInvestments.png")} />
          Investments
        </a> */}
        {/* <a href="/dashboard/bulktransfer" className={currentPath.includes("/dashboard/bulktransfer") ? styles.active : ""}>
          <img className={styles.white} src={getImageUrl("icons/BulkTransfer.png")} />
          <img className={styles.red} src={getImageUrl("icons/blueBulkTransfer.png")} />
          Bulk transfer
        </a> */}
        <a href="/dashboard/budget" className={currentPath.includes("/dashboard/budget") ? styles.active : ""}>
          <img className={styles.white} src={getImageUrl("icons/budgetWhite.png")} alt="" />
          <img className={styles.red} src={getImageUrl("icons/budgetRed.png")} alt="" />
          Budget
        </a>
        {/* <a href="/dashboard/reconciliations" className={currentPath.includes("/dashboard/reconciliations") ? styles.active : ""}>
          <img className={styles.white} src={getImageUrl("icons/Reconciliations.png")} />
          <img className={styles.red} src={getImageUrl("icons/blueReconciliations.png")} />
          Reconciliations
        </a> */}
        <a href="/dashboard/reports" className={currentPath.includes("/dashboard/reports") ? styles.active : ""}>
          <img className={styles.white} src={getImageUrl("icons/reportsWhite.png")} />
          <img className={styles.red} src={getImageUrl("icons/reportsRed.png")} />
          Reports
        </a>
        <a href="/dashboard/audittrails" className={currentPath.includes("/dashboard/audittrails") ? styles.active : ""}>
          <img className={styles.white} src={getImageUrl("icons/auditTrailsWhite.png")} />
          <img className={styles.red} src={getImageUrl("icons/auditTrailsRed.png")} />
          Audit Trails
        </a>
        <a href="/dashboard/users" className={currentPath.includes("/dashboard/users") ? styles.active : ""}>
          <img className={styles.white} src={getImageUrl("icons/usersWhite.png")} />
          <img className={styles.red} src={getImageUrl("icons/usersRed.png")} />
          Users
        </a>
        {/* <a href="/dashboard/settings" className={currentPath.includes("/dashboard/settings") ? styles.active : ""}>
          <img className={styles.white} src={getImageUrl("icons/Settings.png")} />
          <img className={styles.red} src={getImageUrl("icons/blueSettings.png")} />
          Settings
        </a> */}
      </div>
    </div>
  )
}