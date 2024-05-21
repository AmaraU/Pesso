import React, { useState, useEffect } from 'react';
import styles from "./InvestmentsPage.module.css";

export const InvestmentsPage = () => {

    const investments = [
        {
            acctType: "Savings",
            invstType: "Stocks",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "6 months",
            percentage: "5%",
        },
        {
            acctType: "Current",
            invstType: "Bonds",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "6 months",
            percentage: "7.5%",
        },
        {
            acctType: "Savings",
            invstType: "Stocks",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "6 months",
            percentage: "15%",
        },
        {
            acctType: "Current",
            invstType: "Mutaul funds",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "1 year",
            percentage: "5%",
        },
        {
            acctType: "Savings",
            invstType: "Options",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "6 months",
            percentage: "10%",
        },
        {
            acctType: "Savings",
            invstType: "Current",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "6 months",
            percentage: "7%",
        },
        {
            acctType: "Current",
            invstType: "Retirement",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "1 year",
            percentage: "3.8%",
        },
        {
            acctType: "Current",
            invstType: "Stocks",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "1 year",
            percentage: "5%",
        },
        {
            acctType: "Savings",
            invstType: "Annuities",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "1 year",
            percentage: "3.6%",
        },
        {
            acctType: "Current",
            invstType: "Stocks",
            name: "Aura",
            amount: "N300,000",
            invstTenure: "1 year",
            percentage: "8%",
        }
    ]

    const [searchedVal, setSearchedVal] = useState("");


    return (
        <div>
            <input type="text" onChange={(e) => setSearchedVal(e.target.value)} />
            <table>
                <thead>
                    <th><input type="checkbox" id="selectAll" /></th>
                    <th>Account Type</th>
                    <th>Investment Type</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Investment Tenure</th>
                    <th>Percentage</th>
                </thead>

                <tbody>
                    {investments
                        .filter((row) =>
                            !searchedVal.length || row.name || row.acctType || row.invstType
                            .toString()
                            .toLowerCase()
                            .includes(searchedVal.toString().toLowerCase()) 
                        )
                        
                        .map((investment, index) => (
                            <tr>
                                <td className={styles.checkbox}><input type="checkbox"id="" /></td>
                                <td className={styles.acctType}>{investment.acctType}</td>
                                <td className={styles.invstType}>{investment.invstType}</td>
                                <td className={styles.name}>{investment.name}</td>
                                <td className={styles.amount}>{investment.amount}</td>
                                <td className={styles.invstTenure}>{investment.invstTenure}</td>
                                <td className={styles.percentage}>{investment.percentage}</td>
                            </tr>
                        ))}

                </tbody>

                
            </table>
        </div>
    )
}