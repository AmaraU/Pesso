import { Stack, SimpleGrid, Grid, GridItem, useToast, Box } from "@chakra-ui/react";
import { OverallBalance } from "../../Components/OverallBalance";
import { Account } from "../../Components/Account";
import { Cashflow } from "../../Components/Cashflow";
import { ScheduleCalendar } from "../../Components/Calendar";
import { ExchangeRates } from "../../Components/ExchangeRates";
import { useEffect, useState } from "react";
import ConnectWidget from "../../Components/ConnectWidget";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_ACCOUNT_DETAILS_ALL_ERR_MSG, DEFAULT_ACCOUNT_DETAILS_ERR_MSG, DEFAULT_ACCOUNT_ID_ERR_MSG, DEFAULT_CASHFLOW_SUMMARY_ERR_MSG, getAPIEndpoint } from '../../../config';
import { auditLog, logger } from '../../models/logging';

import styles from "./Overview.module.css";
import { getImageUrl } from "../../../utils";

export const Overview = () => {
    const [accounts, setAccounts] = useState([]);
    const [connectWidgetIsOpen, setConnectWidgetIsOpen] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [isCashflowLoading, setIsCashflowloading] = useState(false);
    const [accountId, setAccountId] = useState();
    const [cashflowSummary, setCashflowSummary] = useState([]);
    const toast = useToast()
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem("id")) {
            navigate("/signin");
        }
        log();
        getAllAccounts();
        getCashflowSummary();
    }, []);

    const onSuccess = async ({ code }) => {
        setConnectWidgetIsOpen(false);
        const id = await getAccountId(code);
        if (id) {
            await getAccountDetails(id);
        }
    }

    const log = async () => {
        await auditLog({
            activity: "Viewed dashboard",
            module: "Dashboard",
            userId: sessionStorage.getItem("id")
        }, sessionStorage.getItem("tk"));
    }

    const openConnectWidget = () => {
        setConnectWidgetIsOpen(true);
    }

    const getAccountId = async (code) => {
        setIsloading(true);
        try {
            const payload = {
                code
            }
            const response = await axios.post(getAPIEndpoint('account-id'), payload);
            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsloading(false);
                    setAccountId(data.id);
                    return data.id;
                }
                else {
                    setIsloading(false);
                    let err = "";

                    if (data.length > 0) {
                        err = data[0].error;
                    }

                    if (err) {
                        toast({
                            description: `${DEFAULT_ACCOUNT_ID_ERR_MSG}. ${err ? "[Details: " + err + "]" : ""} `,
                            position: "top",
                            status: 'warning',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_ACCOUNT_ID_ERR_MSG,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    return null;
                }
            }
        } catch (error) {
            await logger({ task: "Get Account ID", error: error.toString() });
        }
        toast({
            description: DEFAULT_ACCOUNT_ID_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsloading(false);
        return null;
    }

    const getAccountDetails = async (id) => {
        setIsloading(true);
        try {
            const payload = {
                id
            }
            console.log(payload)
            const response = await axios.post(getAPIEndpoint('account-details'), payload);
            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsloading(false);
                    toast({
                        description: `Your account domiciled at ${data.data.institution.name} has been successfully linked.`,
                        position: "top",
                        status: 'success',
                        duration: 8000,
                        isClosable: true,
                    })
                    return;
                }
                else {
                    setIsloading(false);
                    let err = "";

                    if (data.length > 0) {
                        err = data[0].error;
                    }

                    if (err) {
                        toast({
                            description: `${DEFAULT_ACCOUNT_DETAILS_ERR_MSG}. ${err ? "[Details: " + err + "]" : ""} `,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_ACCOUNT_DETAILS_ERR_MSG,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    return;
                }
            }
        } catch (error) {
            await logger({ task: "Get Account Details", error: error.toString() });
        }
        toast({
            description: DEFAULT_ACCOUNT_DETAILS_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsloading(false);
    }

    const getAllAccounts = async (code) => {
        setIsloading(true);
        try {
            const payload = {
                userId: sessionStorage.getItem("id")
            }
            const response = await axios.post(getAPIEndpoint('accounts-fetch'), payload);
            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsloading(false);
                    const dt = data.map(e => ({ ...e, show_balance: true }));
                    console.log(data)
                    setAccounts(dt);
                    return;
                }
                else {
                    setIsloading(false);
                    let err = "";

                    if (data.length > 0) {
                        err = data[0].error;
                    }

                    if (err) {
                        toast({
                            description: `${DEFAULT_ACCOUNT_DETAILS_ALL_ERR_MSG}. ${err ? "[Details: " + err + "]" : ""} `,
                            position: "top",
                            status: 'warning',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_ACCOUNT_DETAILS_ALL_ERR_MSG,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    return null;
                }
            }
        } catch (error) {
            await logger({ task: "Get Accounts", error: error.toString() });
        }
        toast({
            description: DEFAULT_ACCOUNT_DETAILS_ALL_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsloading(false);
    }

    const getCashflowSummary = async () => {
        setIsCashflowloading(true);
        try {

            const response = await axios.post(getAPIEndpoint('cashflow-summary'), null, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsCashflowloading(false);

                    if (data.length > 0) {
                        const d = data.map(e => ({ ...e, expense: parseFloat(e.expense), income: parseFloat(e.income) }));
                        setCashflowSummary(d);
                    }
                    else {
                        setCashflowSummary([]);
                    }

                    return;
                }
                else {
                    setIsCashflowloading(false);
                    let err = "";

                    if (data.length > 0) {
                        err = data[0].error;
                    }

                    if (err) {
                        toast({
                            description: `${DEFAULT_CASHFLOW_SUMMARY_ERR_MSG}. ${err ? "[Details: " + err + "]" : ""} `,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_CASHFLOW_SUMMARY_ERR_MSG,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    return;
                }
            }
        } catch (error) {
            console.log(error)
            await logger({ task: "Get Cashflow Summary", error: error.toString() });
        }
        toast({
            description: DEFAULT_CASHFLOW_SUMMARY_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsCashflowloading(false);
    }


    return (
        <div className={styles.whole}>
            <SimpleGrid templateColumns={"70% 30%"} spacing={"24px"}>
                <Stack h={0} gap={"24px"}>

                    <Grid gridTemplateColumns={"1fr 1fr"} gap={"24px"}>
                        <GridItem colSpan={1}>
                            <OverallBalance accts={accounts} />
                        </GridItem>
                        <GridItem colSpan={1}>
                            <Account link={openConnectWidget} accts={accounts} isLoading={isLoading} />
                        </GridItem>
                    </Grid>

                    <div className={styles.advert}>
                        <div className={styles.text}>
                            <div className={styles.green}>New</div>
                            <h3>Personalize your experience</h3>
                            <p>You can now customise your widgets based on data you want to see.</p>
                        </div>
                        <button>Explore Our Plans</button>
                    </div>
                    <Cashflow data={cashflowSummary} />
                </Stack>
                <Stack spacing={"24px"}>
                    <ScheduleCalendar />
                    {/* <Ads /> */}
                </Stack>
            </SimpleGrid>
            <ConnectWidget onSuccess={onSuccess} isOpen={connectWidgetIsOpen} />
        </div>
    );
}