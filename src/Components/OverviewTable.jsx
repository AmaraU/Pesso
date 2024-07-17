
import React, { useState } from "react";
import { Tab, TabList, Tabs, Box, HStack, Icon, Text, Stack } from "@chakra-ui/react";
import { NG } from 'country-flag-icons/react/3x2'
import { SlRefresh } from "react-icons/sl";

import styles from "./css/styling.module.css";
import { getImageUrl } from "../../utils";


export const OverviewTable = () => {

    const ReceivablesTable = () => {

        const receivables = [
            {
                refNo: "CM672574",
                title: "Kenya Shoprite",
                acctNo: "0986388252",
                amount: "N1,358,495",
                date: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                title: "Kenya Shoprite",
                acctNo: "0986388252",
                amount: "N1,358,495",
                date: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                title: "Kenya Shoprite",
                acctNo: "0986388252",
                amount: "N1,358,495",
                date: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                title: "Kenya Shoprite",
                acctNo: "0986388252",
                amount: "N1,358,495",
                date: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                title: "Kenya Shoprite",
                acctNo: "0986388252",
                amount: "N1,358,495",
                date: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                title: "Kenya Shoprite",
                acctNo: "0986388252",
                amount: "N1,358,495",
                date: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                title: "Kenya Shoprite",
                acctNo: "0986388252",
                amount: "N1,358,495",
                date: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                title: "Kenya Shoprite",
                acctNo: "0986388252",
                amount: "N1,358,495",
                date: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                title: "Kenya Shoprite",
                acctNo: "0986388252",
                amount: "N1,358,495",
                date: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                title: "Kenya Shoprite",
                acctNo: "0986388252",
                amount: "N1,358,495",
                date: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                title: "Kenya Shoprite",
                acctNo: "0986388252",
                amount: "N1,358,495",
                date: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                title: "Kenya Shoprite",
                acctNo: "0986388252",
                amount: "N1,358,495",
                date: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                title: "Kenya Shoprite",
                acctNo: "0986388252",
                amount: "N1,358,495",
                date: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                title: "Kenya Shoprite",
                acctNo: "0986388252",
                amount: "N1,358,495",
                date: "July 22, 2022"
            }
        ]
        const [ currentPage, setCurrentPage ] = useState(1);
        const itemsPerPage = 10;
        
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentReceivables = receivables.slice(indexOfFirstItem, indexOfLastItem);
    
        const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber);
        }
    
    
        return (
            <div id="receivalesTable">
    
                {currentReceivables.length === 0 ? (
                    <div className={styles.nothingBigDiv}>
                        <div className={styles.nothingFound}>
                            <img src={getImageUrl("nothing.png")} />
                            <h2>No Receivable Data</h2>
                            <p>We cannot seem to find any receivable data, your user information will appear here.</p>
                        </div>
                    </div>
                    
                ) : (
                    <>
    
                    <table className={styles.overviewTable}>
                    <thead>
                        <th>Reference No.</th>
                        <th>Title</th>
                        <th>Account No.</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </thead>
    
                        <tbody>
                            {currentReceivables.map((receivable, index) => (
                                <tr key={index}>
                                    <td>{receivable.refNo}</td>
                                    <td>{receivable.title}</td>
                                    <td>{receivable.acctNo}</td>
                                    <td>{receivable.amount}</td>
                                    <td>{receivable.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    
                    <Pagination
                        filteredData={currentReceivables}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                    </>
                )}
            </div>
        )
    }
    
    const PaymentsTable = () => {
    
        const payments = [
            {
                refNo: "CM672574",
                beneficiary: "Amanda Stone",
                amount: "N1,358,495",
                date: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                beneficiary: "Amanda Stone",
                amount: "N1,358,495",
                date: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                beneficiary: "Amanda Stone",
                amount: "N1,358,495",
                date: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                beneficiary: "Amanda Stone",
                amount: "N1,358,495",
                date: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                beneficiary: "Amanda Stone",
                amount: "N1,358,495",
                date: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                beneficiary: "Amanda Stone",
                amount: "N1,358,495",
                date: "July 22, 2022"
            }
        ]
    
        const [ currentPage, setCurrentPage ] = useState(1);
        const itemsPerPage = 10;

        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentPayments = payments.slice(indexOfFirstItem, indexOfLastItem);
    
        const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber);
        }
    
    
        return (
            <div id="paymentsTable" className={styles.hide}>    
                {currentPayments.length === 0 ? (
                    <div className={styles.nothingBigDiv}>
                        <div className={styles.nothingFound}>
                            <img src={getImageUrl("nothing.png")} />
                            <h2>No Payment Data</h2>
                            <p>We cannot seem to find any payment data, your user information will appear here.</p>
                        </div>
                    </div>
                    
                ) : (
                    <>
    
                    <table className={styles.overviewTable}>
                    <thead>
                        <th>Reference No.</th>
                        <th>Beneficiary</th>
                        <th>Amount</th>
                        <th>Date</th>
                    </thead>
    
                        <tbody>
                            {currentPayments.map((payment, index) => (
                                <tr key={index}>
                                    <td>{payment.refNo}</td>
                                    <td>{payment.beneficiary}</td>
                                    <td>{payment.amount}</td>
                                    <td>{payment.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    
                    <Pagination
                        filteredData={currentPayments}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                    </>
                )}
            </div>
        )
    }
    
    const LoansTable = () => {
    
        const loans = [
            {
                refNo: "CM672574",
                acctNo: "5288102871",
                amount: "N1,358,495",
                matDate: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                acctNo: "5288102871",
                amount: "N1,358,495",
                matDate: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                acctNo: "5288102871",
                amount: "N1,358,495",
                matDate: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                acctNo: "5288102871",
                amount: "N1,358,495",
                matDate: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                acctNo: "5288102871",
                amount: "N1,358,495",
                matDate: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                acctNo: "5288102871",
                amount: "N1,358,495",
                matDate: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                acctNo: "5288102871",
                amount: "N1,358,495",
                matDate: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                acctNo: "5288102871",
                amount: "N1,358,495",
                matDate: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                acctNo: "5288102871",
                amount: "N1,358,495",
                matDate: "July 22, 2022"
            },
            {
                refNo: "CM672574",
                acctNo: "5288102871",
                amount: "N1,358,495",
                matDate: "July 22, 2022"
            }
        ]
        const [ currentPage, setCurrentPage ] = useState(1);
        const itemsPerPage = 10;
        
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentLoans = loans.slice(indexOfFirstItem, indexOfLastItem);
    
        const handlePageChange = (pageNumber) => {
            setCurrentPage(pageNumber);
        }
    
    
        return (
            <div id="loansTable" className={styles.hide}>
    
                {currentLoans.length === 0 ? (
                    <div className={styles.nothingBigDiv}>
                        <div className={styles.nothingFound}>
                            <img src={getImageUrl("nothing.png")} />
                            <h2>No Loan Data</h2>
                            <p>We cannot seem to find any loan data, your user information will appear here.</p>
                        </div>
                    </div>
                    
                ) : (
                    <>
    
                    <table className={styles.overviewTable}>
                    <thead>
                        <th>Reference No.</th>
                        <th>Account No.</th>
                        <th>Amount</th>
                        <th>Maturity Date</th>
                    </thead>
    
                        <tbody>
                            {currentLoans.map((loan, index) => (
                                <tr key={index}>
                                    <td>{loan.refNo}</td>
                                    <td>{loan.acctNo}</td>
                                    <td>{loan.amount}</td>
                                    <td>{loan.matDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    
                    <Pagination
                        filteredData={currentLoans}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                    </>
                )}
            </div>
        )
    }



    function receivalesTable() {
        var tableR = document.getElementById("receivalesTable");
        var tableP = document.getElementById("paymentsTable");
        var tableL = document.getElementById("loansTable");

        tableR.classList.remove(`${styles.hide}`);
        tableL.classList.add(`${styles.hide}`);
        tableP.classList.add(`${styles.hide}`);
    }

    function paymentsTable() {
        var tableR = document.getElementById("receivalesTable");
        var tableP = document.getElementById("paymentsTable");
        var tableL = document.getElementById("loansTable");

        tableR.classList.add(`${styles.hide}`);
        tableP.classList.remove(`${styles.hide}`);
        tableL.classList.add(`${styles.hide}`);
    }

    function loansTable() {
        var tableR = document.getElementById("receivalesTable");
        var tableP = document.getElementById("paymentsTable");
        var tableL = document.getElementById("loansTable");

        tableR.classList.add(`${styles.hide}`);
        tableP.classList.add(`${styles.hide}`);
        tableL.classList.remove(`${styles.hide}`);
    }

    return (
        <>
        <Box rounded={10} bg={'white'} border={"1px solid #F3F4F6"} p={"16px"}>
            <Stack spacing={"24px"}>
                <Stack direction={"row"} justify={"space-between"}>
                    <Tabs>
                        <TabList gap={"24px"} border={"none"}>
                            <Tab selected onClick={() => receivalesTable()} p={"8px"} fontSize={"16px"} color={'#9CA3AF'} bgColor={"transparent"} border={"none"} borderBottom={'2px solid transparent'} _selected={{ color: '#D2042D', borderBottom: '2px solid #D2042D', borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0 }}>
                                <Text fontWeight={500}>Receivables</Text>
                            </Tab>
                            <Tab onClick={() => paymentsTable()}  p={"8px"} fontSize={"16px"} color={'#9CA3AF'} bgColor={"transparent"} border={"none"} borderBottom={'2px solid transparent'} _selected={{ color: '#D2042D', borderBottom: '2px solid #D2042D', borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0 }}>
                                <Text fontWeight={500}>Payments</Text>
                            </Tab>
                            <Tab onClick={() => loansTable()}  p={"8px"} fontSize={"16px"} color={'#9CA3AF'} bgColor={"transparent"} border={"none"} borderBottom={'2px solid transparent'} _selected={{ color: '#D2042D', borderBottom: '2px solid #D2042D', borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0 }}>
                                <Text fontWeight={500}>Loans</Text>
                            </Tab>
                        </TabList>
                    </Tabs>
                    <HStack spacing={"8px"}>
                        <Box pr={"2px"}>
                            <SlRefresh size={"15px"} />
                        </Box>
                        <HStack spacing={3}>
                            <Icon rounded={80} boxSize={"20px"} as={NG} />
                            <Text pt={"0.5px"} fontSize={"xs"}>NGN</Text>
                        </HStack>
                        
                    </HStack>
                </Stack>

                <ReceivablesTable />
                <PaymentsTable />
                <LoansTable />
                
            </Stack>            
        </Box>
        </>
    )
}