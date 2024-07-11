import React, { useState } from 'react';
import { Box, Button, HStack, Spinner, Stack, Text } from "@chakra-ui/react";
import styles from "./LoansPage.module.css";
import { getImageUrl } from '../../../utils';
import classNames from 'classnames';
import { TbCurrencyNaira } from "react-icons/tb";
import { BiShow, BiHide } from "react-icons/bi";

export const LoansPage = () => {

    const loans = [
        {
            title: "FlexiFunds Loan",
            institution: "CapitalTrust Loans",
            amount: "N780,000.00",
            status: "Pending",
            date: "24/10/2024",
            repayAmt: "N1,000",
            tenor: "12 months",
            frequency: "Monthly"
        },
        {
            title: "Loan Title 2",
            institution: "CapitalTrust Loans",
            amount: "N780,000.00",
            status: "Overdue",
            date: "24/10/2024",
            repayAmt: "N1,000",
            tenor: "12 months",
            frequency: "Monthly"
        },
        {
            title: "AutoEase Loan",
            institution: "CapitalTrust Loans",
            amount: "N780,000.00",
            status: "Paid",
            date: "24/10/2024",
            repayAmt: "N1,000",
            tenor: "12 months",
            frequency: "Monthly"
        },
        {
            title: "CustomCredit Loan",
            institution: "CapitalTrust Loans",
            amount: "N200,000.00",
            status: "Paid",
            date: "24/10/2024",
            repayAmt: "N1,000",
            tenor: "12 months",
            frequency: "Monthly"
        },
        {
            title: "DreamDrive Loan",
            institution: "CapitalTrust Loans",
            amount: "N780,000.00",
            status: "Paid",
            date: "24/10/2024",
            repayAmt: "N10,000",
            tenor: "12 months",
            frequency: "Monthly"
        },
        {
            title: "HomeHaven Loan",
            institution: "CapitalTrust Loans",
            amount: "N780,000.00",
            status: "Paid",
            date: "24/10/2024",
            repayAmt: "N1,000",
            tenor: "6 months",
            frequency: "Monthly"
        },
    ]
    
    const [ search, setSearch] = useState("");
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };


    const filteredLoans = loans.filter(loan => {
        const searchLower = search.toLowerCase();
        return (
            loan.title.toLowerCase().includes(searchLower) ||
            loan.institution.toLowerCase().includes(searchLower) ||
            loan.amount.toLowerCase().includes(searchLower) ||
            loan.status.toLowerCase().includes(searchLower) ||
            loan.date.toLowerCase().includes(searchLower)
        );
    });


    function toggle() {        
        var popup = document.getElementById('popup');
        popup.classList.toggle(`${styles.popped}`);

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.toggle(`${styles.dim}`);
    }

    const [activeLoanIndex, setActiveLoanIndex] = useState(null);

    const editPopup = (index) => {
        setActiveLoanIndex(index);

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.add(`${styles.dim}`);
    }

    const closePopup = () => {
        setActiveLoanIndex(null);

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.remove(`${styles.dim}`);
    };


    
    const [totalBalanceVisible, setTotalBalanceVisible] = useState(true);
    const [isLoading, setIsloading] = useState(false);

    const hideBalance = () => {
        return "******";
    }

    const handleToggleVisibility = () => {
        setTotalBalanceVisible(!totalBalanceVisible);
    }

    const cashflowins = [1,2,3];



    return (
        <>
        <div className={styles.dimmer} id='dimmer'></div>

        <div className={styles.whole}>
            <div className={styles.searchButtons}>
                <div className={styles.searchBar}>
                    <img src={getImageUrl("icons/search.png")} />
                    <input id="search" type="text" onChange={handleSearch} placeholder='Search Loans' />
                </div>
            </div>

            <Stack spacing={1} mb={8}>
                <Text fontSize={"16px"} color={"#6B7280"} fontWeight={500}>Total Loan Balance</Text>
                {
                    isLoading ? <Spinner w={"20px"} h={"20px"}/> :
                        <HStack ml={"-1px"} spacing={0}>
                            <Box fontSize={"36px"}>
                                <TbCurrencyNaira />
                            </Box>
                            <Text fontSize={"32px"} fontWeight={600} >{totalBalanceVisible ? Intl.NumberFormat('en-us', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            }).format(cashflowins.length > 0 ? cashflowins.map(e => e.account_balance).reduce((a, b) => parseFloat(a) + parseFloat(b), 0) : 0) : hideBalance()}</Text>
                            
                            <Box pl={3} cursor={"pointer"}>
                                {
                                    totalBalanceVisible && <BiShow fontSize={"xs"} color={"#374151"} onClick={handleToggleVisibility} />
                                }
                                {
                                    !totalBalanceVisible && <BiHide fontSize={"xs"} color={"#374151"} onClick={handleToggleVisibility} />
                                }
                            </Box>
                        </HStack>
                }
            </Stack>

            {filteredLoans.length === 0 ? (
                <div className={styles.nothingBigDiv}>
                    <div className={styles.nothingFound}>
                        <img src={getImageUrl("nothing.png")} />
                        <h2>No Loan Data</h2>
                        <p>We cannot seem to find any loan data, your transaction information will appear here.</p>
                    </div>
                </div>
                
            ) : (

                <div className={styles.loanDivs}>

                    {filteredLoans.map((loan, index) => (
                        <>
                        <div className={styles.loanDiv} id={index}>
                            <div className={styles.loanHeader}>
                                {loan.title}
                                <button onClick={(e) => {e.preventDefault(); editPopup(index)}}>
                                    <img src={getImageUrl("icons/edit.png")} />
                                    View Details
                                </button>
                            </div>

                            <div className={styles.row}>
                                Loan institution:
                                <div className={styles.info}>{loan.institution}</div>
                            </div>
                            <div className={styles.row}>
                                Loan amount:
                                <div className={styles.info}>{loan.amount}</div>
                            </div>
                            <div className={styles.row}>
                                Loan status:
                                <div className={classNames({
                                    [styles.paid]: loan.status.toLowerCase().includes('paid'),
                                    [styles.pending]: loan.status.toLowerCase().includes('pending'),
                                    [styles.overdue]: loan.status.toLowerCase().includes('overdue'),
                                })}>
                                    {loan.status}
                                </div>
                            </div>
                            <div className={styles.row}>
                                Opening date:
                                <div className={styles.info}>{loan.date}</div>
                            </div>
                        </div>

                        {activeLoanIndex === index && (

                            <div className={styles.viewPopup} id="editPopup">
                                <div className={styles.header}>
                                    <h3>DETAILED LOAN INFORMATION</h3>
                                    <a className={styles.close} href=""><img src={getImageUrl("icons/greyClose.png")} alt="X" onClick={(e) => {e.preventDefault(); closePopup()}} /></a>
                                </div>

                                <div  className={styles.lightGrey}>
                                    <div>
                                        <p>Date Opened:</p>
                                        <h5>{loan.date}</h5>
                                    </div>
                                    <div  className={styles.right}>
                                        <p>Opening Balance:</p>
                                        <h5>{loan.amount}</h5>
                                    </div>
                                </div>

                                <div  className={styles.darkGrey}>
                                    <div>
                                        <p>Tenor:</p>
                                        <h5>{loan.tenor}</h5>
                                    </div>
                                    <div  className={styles.right}>
                                        <p>Performance Status:</p>
                                        <h5>Prepaid</h5>
                                    </div>
                                </div>

                                <div  className={styles.lightGrey}>
                                    <div>
                                        <p>Closed Date:</p>
                                        <h5>-</h5>
                                    </div>
                                    <div  className={styles.right}>
                                        <p>Loan Status:</p>
                                        <h5 className={classNames({
                                            [styles.green]: loan.status.toLowerCase().includes('paid'),
                                            [styles.yellow]: loan.status.toLowerCase().includes('pending'),
                                            [styles.red]: loan.status.toLowerCase().includes('overdue'),
                                        })}>
                                            {loan.status}
                                        </h5>
                                    </div>
                                </div>

                                <div  className={styles.darkGrey}>
                                    <div>
                                        <p>Repayment Frequency:</p>
                                        <h5>{loan.frequency}</h5>
                                    </div>
                                    <div  className={styles.right}>
                                        <p>Repayment Amount:</p>
                                        <h5>{loan.repayAmt}</h5>
                                    </div>
                                </div>

                                <div className={styles.center}>
                                    <p>Repayment Schedule</p>
                                    <h5>{loan.frequency}</h5>
                                </div>
                            </div>

                        )}

                        </>
                    ))}

                </div>
            )}
        </div>
        </>
    )
}