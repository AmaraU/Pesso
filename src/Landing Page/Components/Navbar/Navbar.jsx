import React, { useState, useEffect, useRef } from "react";
import { getImageUrl} from '../../../../utils'
import styles from "./Navbar.module.css";
import { BsBank } from "react-icons/bs";
import { useNavigate } from "react-router-dom";


export const Navbar = ({setContents} ) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState(window.location.pathname);
    const [showFeatures, setShowFeatures] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    const handleLinkClick = (link) => {
        setActiveLink(link);
        if (link === "/features") {
            setShowFeatures(!showFeatures); 
            setIsClicked(!isClicked);
        } else {
            setShowFeatures(false);
        }
    };


    const handleClick2 = (featureContent) => {
        if (setContents) {
          setContents(featureContent);
          navigate("/features");
          setShowFeatures(false);
        } else {
          console.warn("setContent is undefined");
        }
      };
    return (
        <div className={styles.whole}>
            <nav className={styles.navbar}>
                <img src={getImageUrl("PesoFinance_Logo.png")} alt="" />
            </nav>

            <div className={styles.folding}>
                <div className={`${styles.onClose} ${menuOpen && styles.menuOpen}`}>
                    <ul className={styles.links}>
                        <li>
                            <a
                                className={`${styles.link} ${activeLink === "/home" && styles.linkactive}`}
                                href="/home"
                                onClick={() => handleLinkClick("/home")}
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                className={`${styles.link} ${activeLink === "/usecases" && styles.linkactive}`}
                                href="/usecases"
                                onClick={() => handleLinkClick("/usecases")}
                            >
                                UseCases
                            </a>
                        </li>
                        <li
                            className={`${styles.link} ${activeLink === "/features" && styles.linkactive}`}
                            onClick={() => handleLinkClick("/features")} href="/features"
                        >
                            <a className={`${styles.link} ${activeLink === "/features" && styles.linkactive}`}
                        href="/features">
                            Features
                        </a>
                        <img src={getImageUrl("greyDownAngle.png")} alt="" onClick={() => handleLinkClick("/features")} className={isClicked ? "clicked" : ""}/>
                        </li>
                        <li>
                            <a
                                className={`${styles.link} ${activeLink === "/partner" && styles.linkactive}`}
                                href="/partner"
                                onClick={() => handleLinkClick("/partner")}
                            >
                                 Partner
                            </a>
                        </li>
                    </ul>

                    <div className={styles.buttons}>
                        <a href="/signin" className={styles.buttonOne}>
                            Log in
                        </a>
                        <a href="/signup" className={styles.buttonTwo}>
                            Get Started
                        </a>
                    </div>
                </div>
            </div>
            {showFeatures && 
            <div className={styles.wholes}>
                    <div className={styles.container}>
                <p>Features</p>
            <div className={styles.Grid}>
            <div className={styles.rows}>
                <button className={styles.btn} onClick={()=> handleClick2("Loan Management")}>
                    <div className="d-flex align-items-center">
                        <button className={styles.btnicon}><BsBank width="20px" height="20px"/></button>
                        <div className={styles.btncontent}>
                            <h5> Loan Management</h5>
                            <p>Keep track of repayment schedules and get reminders to avoid missed payments.</p>

                        </div>
                    </div>
                </button>
                <button className={styles.btn} onClick={()=> handleClick2("Budgeting")}>
                    <div className="d-flex align-items-center">
                        <button className={styles.btnicon}><BsBank width="20px" height="20px"/></button>
                        <div className={styles.btncontent}>
                            <h5> Budgeting</h5>
                            <p>Keep track of repayment schedules and get reminders to avoid missed payments.</p>

                        </div>
                    </div>
                </button>
                <button className={styles.btn} onClick={()=> handleClick2("Categorize Cash")}>
                    <div className="d-flex align-items-center">
                        <button className={styles.btnicon}><BsBank width="20px" height="20px"/></button>
                        <div className={styles.btncontent}>
                            <h5> Categorize Cash</h5>
                            <p>Keep track of repayment schedules and get reminders to avoid missed payments.</p>

                        </div>
                    </div>
                </button>
            </div>
            <div className={styles.rows}>
            <button className={styles.btn} onClick={()=> handleClick2("Expense Tracking")}>
                    <div className="d-flex align-items-center">
                        <button className={styles.btnicon}><BsBank width="20px" height="20px"/></button>
                        <div className={styles.btncontent}>
                            <h5> Expense Tracking</h5>
                            <p>Keep track of repayment schedules and get reminders to avoid missed payments.</p>

                        </div>
                    </div>
            </button>
            <button className={styles.btn} onClick={()=> handleClick2("Link Bank Accounts")} >
                    <div className="d-flex align-items-center">
                        <button className={styles.btnicon}><BsBank width="20px" height="20px"/></button>
                        <div className={styles.btncontent}>
                            <h5> Link Bank Accounts</h5>
                            <p>Keep track of repayment schedules and get reminders to avoid missed payments.</p>

                        </div>
                    </div>
            </button>
            </div>
            </div>
        </div>
            </div>}
        </div>
    );
};
