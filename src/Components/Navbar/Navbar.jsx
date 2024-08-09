import React from "react";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../../utils";

export const Navbar = () => {

  let currentPath = window.location.pathname;
  let isWider = false;

  switch (currentPath) {

    case "/":
    case "/dashboard":
    case "/dashboard/overview":
      isWider = false;
      break;
    
    case "/dashboard/transactions":
    case "/dashboard/transactions/transfer":
      isWider = true;
      break;
    
    case "/dashboard/accounts":
    case "/dashboard/account-info":
      isWider = false;
      break;
    
    case "/dashboard/cashflow":
    case "/dashboard/cashflow/outflow":
      isWider = true;
      break;
    
    case "/dashboard/loans":
      isWider = false;
      break;
    
    case "/dashboard/request":
      isWider = false;
      break;
    
    case "/dashboard/investments":
      isWider = false;
      break;
    
    case "/dashboard/bulktransfer":
      isWider = false;
      break;
    
    case "/dashboard/budget":
      isWider = false;
      break;
    
    case "/dashboard/reconciliation":
      isWider = false;
      break;
    
    case "/dashboard/reports":
    case "/dashboard/reports/history":
      isWider = true;
      break;
    
    case "/dashboard/audittrails":
      isWider = false;
      break;
    
    case "/dashboard/users":
    case "/dashboard/users/roles":
      isWider = true;
      break;
    
    case "/dashboard/settings":
    case "/dashboard/settings/account":
    case "/dashboard/settings/workflow":
    case "/dashboard/settings/categories":
      isWider = true;
      break;
  }

  return (
    <div className={styles.theWhole}>

      <div className={`${styles.linkList} ${isWider ? styles.widerLinkList : styles.linkList}`}>
      {/* <div className={styles.linkList}> */}

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
        <a href="/dashboard/request" className={currentPath.includes("/dashboard/request") ? styles.active : ""}>
          <img className={styles.white} src={getImageUrl("icons/loansWhite.png")} />
          <img className={styles.red} src={getImageUrl("icons/loansRed.png")} />
          Request
        </a>
        <a href="/dashboard/budget" className={currentPath.includes("/dashboard/budget") ? styles.active : ""}>
          <img className={styles.white} src={getImageUrl("icons/budgetWhite.png")} alt="" />
          <img className={styles.red} src={getImageUrl("icons/budgetRed.png")} alt="" />
          Budget
        </a>
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
      </div>
    </div>
  )
}