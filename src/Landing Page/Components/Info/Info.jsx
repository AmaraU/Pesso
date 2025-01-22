import React,{useMemo} from "react";
import { useOutletContext } from 'react-router-dom';
import { getImageUrl} from '../../../../utils'
import styles from "./info.module.css";


export const Info = () => {
    const { content} = useOutletContext(); 
    const contentData = useMemo(
      () => ({
        "Loan Management": {
          title: "Simplify Your Loan Management Today",
          description:
            "Manage loans effortlessly with comprehensive overviews, detailed repayments, and real-time tracking.",
          img: "loans.png",
          but:"Get Started Now",
        },
        "Expense Tracking": {
          title: "Master your Cashflow",
          description:
            "Gain complete control over your finances with detailed expense tracking and insightful analysis.",
          img: "expenses.png",
          but:"Schedule a Demo",
        },
        Budgeting: {
          title: "Take Control of Your Finances",
          description:
            "Allocate funds, track spending, and collaborate with your team seamlessly. Optimize your budget today.",
          img: "Budget - Form.png",
          but:"Try It For Free",
        },
        "Link Bank Accounts": {
          title: "Streamline Your Finances",
          description:
            "Link bank accounts, monitor transactions, and gain insights with Pesso Finance.",
          img: "Add bank Account - local account.png",
          but:"Link Bank Accounts Now",
        },
        "Categorize Cash": {
          title: "Effortless Loan Management",
          description:
            "Gain real-time insights and streamline transfers for optimal financial control.",
          img: "loans.png",
          but:"Schedule a Demo",
        },
      }),
      []
    );
        const contents = contentData[content] || contentData["Loan Management"];
    return(
        <div className={styles.start}>
            <div className={styles.bread}>
                <div className={styles.crumb}>
                    {content==="Link Bank Accounts"?
                    <>
                        <div className={styles.img}>
                        <img src={getImageUrl(contents.img)} alt=""/>
                    </div>
                    <div className={styles.text}>
                        <h1>{contents.title}</h1>
                        <p>{contents.description} </p>
                        <button> {contents.but}</button>
                    </div>
                    
                    </>:
                    <>
                    <div className={styles.text}>
                        <h1>{contents.title}</h1>
                        <p>{contents.description} </p>
                        <button> {contents.but}</button>
                    </div>
                    <div className={styles.img}>
                        <img src={getImageUrl(contents.img)} alt=""/>
                    </div>
                    </>}
                </div>
            </div>
        </div>
    )
}