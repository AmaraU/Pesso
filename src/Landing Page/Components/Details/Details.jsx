import React, { useState,useMemo } from "react";
import { useOutletContext } from 'react-router-dom';
import { GrUserManager } from "react-icons/gr";
import styles from "./details.module.css";

export const Details =()=>{
    const features = useMemo(
        () => ({
          "Loan Management": [
            {
              title: "Comprehensive Loan Overview",
              description:
                "View all active loans with detailed repayment info, ensuring transparency and easy management.",
              Icon: GrUserManager,
            },
            {
              title: "Quick Access via Sidebar",
              description:
                "Navigate seamlessly to access crucial loan information quickly, saving time and effort.",
              Icon: GrUserManager,
            },
            {
              title: "Detailed Loan Cards",
              description:
                "Instantly view loan summaries with key details like Institution, Amount, Status, and Opening Date.",
              Icon: GrUserManager,
            },
            {
              title: "Flexible Repayment Information",
              description:
                "Stay on top of repayments with clear details on amounts and flexible schedule options.",
              Icon: GrUserManager,
            },
            {
              title: "Enhanced Performance Tracking",
              description:
                "Monitor loan performance statuses in real-time to identify and address issues proactively.",
              Icon: GrUserManager,
            },
          ],
          "Expense Tracking": [
            {
              title: "Comprehensive Loan Overview",
              description:
                "View all active loans with detailed repayment info, ensuring transparency and easy management.",
              Icon: GrUserManager,
            },
            {
              title: "Quick Access via Sidebar",
              description:
                "Navigate seamlessly to access crucial loan information quickly, saving time and effort.",
              Icon: GrUserManager,
            },
            {
              title: "Detailed Loan Cards",
              description:
                "Instantly view loan summaries with key details like Institution, Amount, Status, and Opening Date.",
              Icon: GrUserManager,
            },
            {
              title: "Flexible Repayment Information",
              description:
                "Stay on top of repayments with clear details on amounts and flexible schedule options.",
              Icon: GrUserManager,
            },
            {
              title: "Enhanced Performance Tracking",
              description:
                "Monitor loan performance statuses in real-time to identify and address issues proactively.",
              Icon: GrUserManager,
            },
            {
                title: "Enhanced Performance Tracking",
                description:
                  "Monitor loan performance statuses in real-time to identify and address issues proactively.",
                Icon: GrUserManager,
              },
          ],
          "Budgeting": [
            {
              title: "Comprehensive Loan Overview",
              description:
                "View all active loans with detailed repayment info, ensuring transparency and easy management.",
              Icon: GrUserManager,
            },
            {
              title: "Quick Access via Sidebar",
              description:
                "Navigate seamlessly to access crucial loan information quickly, saving time and effort.",
              Icon: GrUserManager,
            },
            {
              title: "Detailed Loan Cards",
              description:
                "Instantly view loan summaries with key details like Institution, Amount, Status, and Opening Date.",
              Icon: GrUserManager,
            },
          ],
          "Link Bank Accounts": [
            {
              title: "Comprehensive Loan Overview",
              description:
                "View all active loans with detailed repayment info, ensuring transparency and easy management.",
              Icon: GrUserManager,
            },
            {
              title: "Quick Access via Sidebar",
              description:
                "Navigate seamlessly to access crucial loan information quickly, saving time and effort.",
              Icon: GrUserManager,
            },
            {
              title: "Detailed Loan Cards",
              description:
                "Instantly view loan summaries with key details like Institution, Amount, Status, and Opening Date.",
              Icon: GrUserManager,
            },
          ],
          "Categorize Cash": [
            {
              title: "Comprehensive Loan Overview",
              description:
                "View all active loans with detailed repayment info, ensuring transparency and easy management.",
              Icon: GrUserManager,
            },
            {
              title: "Quick Access via Sidebar",
              description:
                "Navigate seamlessly to access crucial loan information quickly, saving time and effort.",
              Icon: GrUserManager,
            },
            {
              title: "Detailed Loan Cards",
              description:
                "Instantly view loan summaries with key details like Institution, Amount, Status, and Opening Date.",
              Icon: GrUserManager,
            },
          ],
        }),
        []
      );
      const { content} = useOutletContext(); 
      const contents = features[content] || features["Loan Management"];

    return(
    <div className={styles.gridContainer}>
        {contents.map((feature, index) => (
        <div key={index} className={styles.gridItem}>
          <button className={styles.btn} aria-label={feature.title}>
            <feature.Icon width="20px" height="20px" />
          </button>
          <h5>{feature.title}</h5>
          <p>{feature.description}</p>
        </div>
      ))}
    </div>
    );
};