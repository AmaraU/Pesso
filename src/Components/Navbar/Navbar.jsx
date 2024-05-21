import React from "react";
import styles from "./Navbar.module.css";
import { getImageUrl } from "../../../utils";

export const Navbar = () => {
  return (
    <div className={styles.theWhole}>

      <div className={styles.linkList}>

        <a href="/dashboard">
          <img src={getImageUrl("icons/Dashboard.png")} />
          Dashboard
        </a>
        <a href="/transactions">
          <img src={getImageUrl("icons/Transactions.png")} />
          Transactions
        </a>
        <a href="/accounts">
          <img src={getImageUrl("icons/Accounts.png")} />
          Accounts
        </a>
        <a href="/cashflow">
          <img src={getImageUrl("icons/Cashflow.png")} />
          Cashflow
        </a>
        <a href="/loans">
          <img src={getImageUrl("icons/Loans.png")} />
          Loans
        </a>
        <a href="/investments">
          <img src={getImageUrl("icons/Investments.png")} />
          Investments
        </a>
        <a href="/bulktransfer">
          <img src={getImageUrl("icons/BulkTransfer.png")} />
          Bulk transfer
        </a>
        <a href="/budget">
          <img src={getImageUrl("icons/Budget.png")} alt="" />
          Budget
        </a>
        <a href="/reconciliations">
          <img src={getImageUrl("icons/Reconciliations.png")} />
          Reconciliations
        </a>
        <a href="/reports">
          <img src={getImageUrl("icons/Reports.png")} />
          Reports
        </a>
        <a href="/audittrails">
          <img src={getImageUrl("icons/AuditTrails.png")} />
          Audit Trails
        </a>
        <a href="/users">
          <img src={getImageUrl("icons/Users.png")} />
          Users
        </a>
        <a href="/settings">
          <img src={getImageUrl("icons/Settings.png")} />
          Settings
        </a>
      </div>
    </div>
  )
}