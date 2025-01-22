import React,{useMemo} from "react";
import { getImageUrl} from '../../../../utils'
import styles from "./Team.module.css";
import { useOutletContext } from 'react-router-dom';

export const Team = () => {
    const { content} = useOutletContext();
    const contentData = useMemo(
        () => ({
          "Loan Management": {
            title: "View and manage all your loans in one centralized dashboard.",
            img: "LoanManagement.png",
          },
          "Expense Tracking": {
            title: "Analyze your spending patterns with real-time data.",
            img: "ExpenseTracking.png",
          },
          Budgeting: {
            title: "Create, adjust, and monitor your budgets with our interactive tools.",
            img: "Budget.png",
          },
          "Link Bank Accounts": {
            title: "Analyze your spending patterns with real-time data.",
            img: "LinkBankAccounts.png",
          },
          "Categorize Cash": {
            title: "Gain clarity on your cash flow with easy-to-read categories and summaries.",
            img: "CashFlow.png",
          },
        }),
        []
      );
          const contents = contentData[content] || contentData["Loan Management"];
    return (
        <div className={styles.team}>
            <h1>{contents.title}</h1>
            <div className={styles.ellipse}></div> {/* Ellipse div */}
            <img src={getImageUrl(contents.img)} alt={contents.title} />
        </div>
    );
};
