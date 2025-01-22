/* eslint-disable no-unused-vars */
import React,{useMemo} from "react";
import { useOutletContext } from 'react-router-dom';
import { getImageUrl} from '../../../../utils'
import styles from "./feature.module.css";

export const Feature = () => {
  const { content} = useOutletContext(); 
  const contentData = useMemo(
    () => ({
      "Loan Management": {
        title: "Effortless Loan Management",
        description:
          "Easily manage and track all your loans in one place. Stay on top of payments and never miss a due date.",
        img: "Loan.png",
      },
      "Expense Tracking": {
        title: "Stay on Top of Your Expenses",
        description:
          "Stay informed with real-time expense tracking. Analyze your spending patterns and make smarter financial decisions.",
        img: "expense.png",
      },
      Budgeting: {
        title: "Smart Budgeting Made Easy",
        description:
          "Plan, allocate, and monitor your finances with our intuitive budgeting tools. Reach your financial milestones faster.",
        img: "budgeting.png",
      },
      "Link Bank Accounts": {
        title: "Unify Your Financial Accounts",
        description:
          "Link all your bank accounts for a complete financial overview. Manage your money seamlessly in one platform.",
        img: "linkaccount.png",
      },
      "Categorize Cash": {
        title: "Simplify Cashflow Management",
        description:
          "Automatically categorize your cash flow for better financial insights. Understand where your money goes.",
        img: "Cash Flow.png",
      },
    }),
    []
  );
      const contents = contentData[content] || contentData["Loan Management"];
    return(
        <div className={styles.biggerDiv}>
        <div className={styles.About}>
        <div className={styles.bread}>
           <div className={styles.crumb}>
                <h1>
                {contents.title}
                </h1>
                <p>
                {contents.description}
                </p>
                <button className={styles}>
                Schedule A Demo
            </button> 
            </div>
            <div className={styles.img}>
                        <img src={getImageUrl(contents.img)} alt={contents.title} />
            </div>
        </div>
        </div>
        </div>    
    )
}