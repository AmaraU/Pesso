import { Box, Button, Center, HStack, Spinner, Stack, Text, useDisclosure, useToast } from "@chakra-ui/react"
// import { RxValueNone } from "react-icons/rx";
// import Table from "../Table";
import { BiShow, BiHide } from "react-icons/bi";
import { TbCurrencyNaira } from "react-icons/tb";
import { useEffect, useState } from "react";
import ConnectWidget from "../../Components/ConnectWidget";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_ACCOUNT_DETAILS_ALL_ERR_MSG, DEFAULT_ACCOUNT_DETAILS_ERR_MSG, DEFAULT_ACCOUNT_ID_ERR_MSG, getAPIEndpoint } from '../../../config';
import { auditLog, logger } from '../../models/logging';
import { accountFields } from "../../models/data";
import { CiBank } from 'react-icons/ci';
import { RxDotFilled } from "react-icons/rx";
import { AccountInfo } from "../../Components/AccountInfo";

import styles from "./AccountsPage.module.css";
import { getImageUrl } from "../../../utils";
import { AccountsTable } from "./AccountsTable";
import { SlRefresh } from "react-icons/sl";

const DataWidget = ({ entries = [], fields = [], isLoading = false, fileName = "data", fieldFontSize = "12px", entryFontSize = "13px", type = "", initSortingField = "" }) => {
    const screenWidth = window.screen.availWidth;

    return (
        <Box pt={{ base: 3, md: 5 }} ml={"-16px"} mr={"-16px"}>
            {
                entries.length > 0 ?
                    <AccountsTable /> :
                    <Box pb={"10px"}>
                        <Text fontSize={{ base: 'xs', md: 'sm' }} color={'gray.500'} textAlign={'center'}>You do not have account data yet.</Text>
                    </Box>
            }
        </Box>
    );
}

const hideBalance = () => {
    return "******";
}

const toTitleCase = (txt) => {
    return txt[0].toUpperCase() + txt.substring(1).toLowerCase()
}

export const AccountsPage = () => {
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [connectWidgetIsOpen, setConnectWidgetIsOpen] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [accountId, setAccountId] = useState();
    const [totalBalanceVisible, setTotalBalanceVisible] = useState(true);
    const [allAccountsVisible, setAllAccountsVisible] = useState(true);
    const { isOpen: isOpenAccountInfo, onOpen: onOpenAccountInfo, onClose: onCloseAccountInfo } = useDisclosure();
    const [acctLinked, setAcctLinked] = useState(false);
    const [linkedAcctDetails, setLinkedAcctDetails] = useState({});

    const toast = useToast()
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem("id")) {
            navigate("/signin");
        }
        log("Viewed all accounts and summary", "Accounts");
        getAllAccounts();
    }, []);

    useEffect(() => {
        if (acctLinked) {
            log(`Linked an account ${linkedAcctDetails.account_number} in ${linkedAcctDetails.institution.name}`, "Accounts");
        }
    }, [acctLinked]);


    const onSuccess = async ({ code }) => {
        setConnectWidgetIsOpen(false);
        const id = await getAccountId(code);
        if (id) {
            await getAccountDetails(id);
            await getAllAccounts();
        }
    }

    const onClose = () => {
        setConnectWidgetIsOpen(false);
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
                id,
                userId: sessionStorage.getItem("id")
            }
            console.log(payload)
            const response = await axios.post(getAPIEndpoint('account-details'), payload);
            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsloading(false);
                    setAcctLinked(true);
                    setLinkedAcctDetails(data.data);
                    toast({
                        description: `Account domiciled at ${data.data.institution.name} has been successfully linked.`,
                        position: "top",
                        status: 'success',
                        duration: 6000,
                        isClosable: true,
                    });
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
        setLinkedAcctDetails({});
        setAcctLinked(false);
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

    const toggleBalanceVisibility = (d) => {
        const dt = accounts.map(e => e.id === d.id ? ({ ...e, show_balance: !e.show_balance }) : e);
        setAccounts(dt);
    }

    const handleToggleAllBalances = () => {
        const updateVisibility = !allAccountsVisible;
        const dt = accounts.map(e => ({ ...e, show_balance: !updateVisibility }));
        setAllAccountsVisible(updateVisibility);
        setTotalBalanceVisible(!totalBalanceVisible);
        setAccounts(dt);
    }

    const handleAccountView = (d) => {
        log(`Viewed details of account ${d.account_number} in ${d.institution_name}`, "Accounts");
        setSelectedAccount(d);
        onOpenAccountInfo();
    }

    const log = async (activity, module) => {
        await auditLog({
            activity,
            module,
            userId: sessionStorage.getItem("id")
        }, sessionStorage.getItem("tk"));
    }

    const accountColors = ["#EFF7FF", "#FFF4F3", "#EBFFF2"];

    return (
        <div className={styles.whole}>
            <Box bg={"white"}>
                <Stack direction={"row"} justify={"space-between"} pb={"4px"}>
                    <Stack spacing={1}>
                        <Text fontSize={"16px"} color={"#6B7280"} fontWeight={500}>Total balance</Text>
                        {
                            isLoading ? <Spinner w={"20px"} h={"20px"}/> :
                                <HStack ml={"-1px"} spacing={0}>
                                    <Box fontSize={"36px"}>
                                        <TbCurrencyNaira />
                                    </Box>
                                    <Text fontSize={"32px"} fontWeight={600} >{totalBalanceVisible ? Intl.NumberFormat('en-us', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(accounts.length > 0 ? accounts.map(e => e.account_balance).reduce((a, b) => parseFloat(a) + parseFloat(b), 0) : 0) : hideBalance()}</Text>
                                    
                                    <Box pl={3} cursor={"pointer"}>
                                        {
                                            totalBalanceVisible && <BiShow fontSize={"xs"} color={"#374151"} onClick={handleToggleAllBalances} />
                                        }
                                        {
                                            !totalBalanceVisible && <BiHide fontSize={"xs"} color={"#374151"} onClick={handleToggleAllBalances} />
                                        }
                                    </Box>
                                </HStack>
                        }

                    </Stack>
                    <Box>
                        <Button p={"0"} bg={"transparent"} border={"none"} _hover={{bg: "transaprent"}}>
                            <SlRefresh size={"24px"}/>
                        </Button>
                        <Button border={"none"} rounded={8} fontSize={"12px"} fontWeight={500} px={"12px"} py={"8px"} bg={"#D2042D"} color={"white"} _hover={{ bg: "#BD0429" }} onClick={openConnectWidget}>Link Bank Account</Button>
                    </Box>
                </Stack>
                {
                    isLoading ? <Center><Spinner h={"20px"} w={"20px"}/></Center> :
                        accounts.length === 0 ?
                            <div className={styles.nothingBigDiv}>
                                <div className={styles.nothingFound}>
                                    <img src={getImageUrl("nothing.png")} />
                                    <h2>No Account Data</h2>
                                    <p>We cannot seem to find any account data, your account information will appear here.</p>
                                </div>
                            </div>
                            :
                            <div style={{ overflow: "auto" }} className={styles.accountsDiv}>
                                <Stack direction={"row"} spacing={"24px"} mb={"12px"}>
                                    {
                                        accounts.map((e, k) =>
                                            <Box key={k} rounded={"8px"} px={"16px"} py={"24px"} bg={accountColors[k % accountColors.length]} cursor={"pointer"} border={"1px solid #F3F4F6"} _hover={{ bg: accountColors[k % accountColors.length] }} onClick={() => handleAccountView(e)}>
                                                <Stack w={"340px"} direction={"row"} alignItems={"center"} justify={"space-between"} pb={"1.5px"}>
                                                    <Stack spacing={1}>
                                                        <Text fontSize={"10px"} fontWeight={500} color={"#6B7280"}>Account Balance</Text>
                                                        <HStack spacing={0} ml={"-3px"} mt={"3px"}>
                                                            <Box fontSize={"20px"} color={"#374151"}>
                                                                <TbCurrencyNaira />
                                                            </Box>
                                                            <Text fontSize={"16px"} fontWeight={600} color={"#374151"}>{e.show_balance ? Intl.NumberFormat('en-us', {
                                                                minimumFractionDigits: 2,
                                                                maximumFractionDigits: 2,
                                                            }).format(parseFloat(e.account_balance)) : hideBalance()}</Text>
                                                            
                                                            <Box ml={"3px"} cursor={"pointer"}>
                                                                {
                                                                    e.show_balance && <BiShow fontSize={"xs"} color={"#9CA3AF"} onClick={() => toggleBalanceVisibility(e)} />
                                                                }
                                                                {
                                                                    !e.show_balance && <BiHide fontSize={"xs"} color={"#9CA3AF"} onClick={() => toggleBalanceVisibility(e)} />
                                                                }
                                                            </Box>
                                                        </HStack>
                                                    </Stack>
                                                    <Box px={"12px"} py={"8px"} bg={"#FFFBEB"} rounded={"8px"}>
                                                        <Text fontSize={"12px"} fontWeight={500} color={"#F59E0B"}>{toTitleCase(e.account_type.replace("_account", ""))}</Text>
                                                    </Box>
                                                </Stack>
                                                <div className={styles.line}></div>
                                                <Stack direction={"row"} alignItems={"center"}>
                                                    <Box padding={"6px"} bg={"#F9FAFB"} rounded={"50px"} display={"flex"} alignItems={"center"}>
                                                        <CiBank size={"20px"} color="#F59E0B"/>
                                                    </Box>
                                                    <Stack spacing={0.5}>
                                                        <Text fontSize={"16px"} fontWeight={600} color={"#374151"}>{e.institution_name}</Text>
                                                        <HStack mt={"5px"} spacing={"2px"}>
                                                            <Text fontSize={"10px"} color={"#6B7280"}>{e.account_number}</Text>
                                                            <RxDotFilled size={"10px"} color={"#6B7280"} />
                                                            <Text fontSize={"10px"} textOverflow={"ellipsis"} color={"#6B7280"}>{e.account_name}</Text>
                                                        </HStack>
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                        )
                                    }
                                </Stack>
                            </div>
                }

            </Box>


            <Box px={"6px"} py={"4px"} bg={"white"} mt={"24px"}>
                <Stack>
                    {
                        isLoading ? <Spinner h={"20px"} w={"20px"} /> :
                            <Box px={"4px"}>
                                <DataWidget entries={accounts} fields={accountFields} fileName="Accounts" initSortingField="updated_at" />
                            </Box>
                    }
                </Stack>

            </Box>

            <ConnectWidget onSuccess={onSuccess} onClose={onClose} isOpen={connectWidgetIsOpen} />
            {/* <AccountInfo isOpen={isOpenAccountInfo} onClose={onCloseAccountInfo} flag={new Date()} dataset={selectedAccount} refreshAccounts={getAllAccounts} /> */}
            
        </div>
    )
}