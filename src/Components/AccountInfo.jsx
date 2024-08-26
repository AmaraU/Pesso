import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Stack,
    Text,
    Box,
    HStack,
    useToast,
    Spinner,
    Center,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { BiHide, BiShow } from 'react-icons/bi';
import { TbCurrencyNaira } from 'react-icons/tb';
import axios from 'axios';
import { DEFAULT_ACCOUNT_UNLINK_ERR_MSG, DEFAULT_RECENT_TRXNS_ERR_MSG, getAPIEndpoint } from '../../config';
import { auditLog, logger } from '../models/logging';
import { CiBank } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import styles from "../Pages/AccountsPage/AccountsPage.module.css";
import { getImageUrl } from '../../utils';
import classNames from 'classnames';
import { format } from 'date-fns';

const hideBalance = () => {
    return "******";
}

const toTitleCase = (txt) => {
    return txt[0].toUpperCase() + txt.substring(1).toLowerCase()
}

export const AccountInfo = ({ isOpen, onClose, refreshAccounts, flag, dataset = null }) => {
    const [_data, setData] = useState(null);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);
    const [isLoading, setIsloading] = useState(false);
    const [isUnlinkLoading, setIsUnlinkloading] = useState(false);
    const [trxns, setTrxns] = useState([]);
    const [ search, setSearch] = useState("");
    const navigate = useNavigate();
    const toast = useToast();


    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };

    useEffect(() => {
        if (dataset) {
            setData(dataset)
            try {
                getRecentTrxns(dataset);
            } catch (error) {

            }
        }
    }, [flag])

    useEffect(() => {
        if (!sessionStorage.getItem("id")) {
            navigate('/signin');
        }
    }, [])

    const log = async (activity, module) => {
        await auditLog({
            activity,
            module,
            userId: sessionStorage.getItem("id")
        }, sessionStorage.getItem("tk"));
    }


    const unlinkAccount = async () => {
        setIsUnlinkloading(true);
        try {
            const payload = {
                id: _data.account_id,
                userId: sessionStorage.getItem("id")
            }

            const response = await axios.post(getAPIEndpoint('account-unlink'), payload, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsUnlinkloading(false);
                    toast({
                        description: `Account (${_data.account_number} in ${_data.institution_name}) was successfully unlinked.`,
                        position: "top",
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                    })
                    await auditLog({
                        activity: `Unlinked account ${_data.account_number} in ${_data.institution_name}`,
                        module: "Accounts",
                        userId: sessionStorage.getItem("id")
                    }, sessionStorage.getItem("tk"));
                    refreshAccounts();
                    handleClose();
                    return;
                }
                else {
                    setIsUnlinkloading(false);
                    let err = "";

                    if (data.length > 0) {
                        err = data[0].error;
                    }

                    if (err) {
                        toast({
                            description: `${DEFAULT_ACCOUNT_UNLINK_ERR_MSG}. ${err ? "[Details: " + err + "]" : ""} `,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_ACCOUNT_UNLINK_ERR_MSG,
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
            await logger({ task: "Unlink Account", error: error.toString() });
        }
        toast({
            description: DEFAULT_ACCOUNT_UNLINK_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsUnlinkloading(false);
    }

    const getRecentTrxns = async (d) => {
        setIsloading(true);
        try {
            const payload = {
                id: d.account_id,
                userId: sessionStorage.getItem("id")
            }

            const response = await axios.post(getAPIEndpoint('recent-trxns'), payload, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsloading(false);
                    setTrxns(data);
                    return;
                }
                else {
                    setIsloading(false);
                    return;
                }
            }
        } catch (error) {
            console.log(error)
            await logger({ task: "Get Recent Transactions", error: error.toString() });
        }
        toast({
            description: DEFAULT_RECENT_TRXNS_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsloading(false);
    }

    const toggleBalanceVisibility = () => {
        setIsBalanceVisible(!isBalanceVisible);
    }

    const handleClose = () => {
        setData(null);
        setTrxns([]);
        setIsBalanceVisible(true);
        setIsloading(false);
        onClose();
    }

    const handleUnlink = async () => {
        await unlinkAccount();
    }

    const sortedTrxns = [...trxns].sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));

    const filteredTrxns = sortedTrxns.filter(trxns => {
        const searchLower = search.toLowerCase();
        return (
            trxns.trans_narration.toLowerCase().includes(searchLower) ||
            trxns.timestamp.toLowerCase().includes(searchLower)
        );
    });

    const groupedTrxns = filteredTrxns.reduce((acc, transaction) => {
        const date = transaction.timestamp;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
    }, {});


    const handleViewAll = (_data) => {
        log(`Viewed all transactions of account ${_data.account_number} in ${_data.institution_name}`, "Accounts");
        setSelectedAccount(_data);
        navigate('/dashboard/account-info', { state: _data });
    };
    
    const removeNumbers = (str) => {
        return str.replace(/\d+/g, '');
    };
    function removeNumbersAndPunctuation(str) {
        return str.replace(/[0-9\p{P}]/gu, '');
    }

    const formatNumber = (number) => {
        return new Intl.NumberFormat('en-US').format(number);
    };



    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={handleClose}
                size={'md'}
            >
                <DrawerOverlay />
                <DrawerContent bg={"white"}>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <div style={{ overflow: 'auto', maxHeight: '100vh' }} className={styles.drawer}>
                            <Stack spacing={5} pt={5}>

                                <Box p={"23px"} rounded={8} border={"1px solid #E5E7EB"}>

                                    <HStack spacing={10} direction={"row"} w={"100%"} alignItems={"center"} justifyContent={"space-between"} mb={"24px"}>
                                        <HStack>
                                            <Box mt={-1} fontSize={'28px'} bg={"#F9FAFB"} borderRadius={"50px"} p={"8px"} color='orange.500' >
                                                <CiBank />
                                            </Box>
                                            <Text fontSize={"16px"} fontWeight={600} color={"#374151"}>{_data ? _data.institution_name : ""}</Text>
                                        </HStack>
                                        <Button isLoading={isUnlinkLoading} isDisabled={isUnlinkLoading} px={"12px"} fontSize={"12px"} bg={"#ff000022"} color={"#DC2626"} _hover={{ bg: "#ff000033" }} onClick={handleUnlink}>
                                            Unlink account
                                        </Button>
                                    </HStack>

                                    <Stack spacing={1}>
                                        <Text fontSize={"xs"}>Account Balance</Text>
                                        <HStack ml={-1} spacing={0} >
                                            <Box fontSize={{ base: 19, md: 20 }}>
                                                <TbCurrencyNaira />
                                            </Box>
                                            <Text fontSize={{ base: "sm", md: 'md' }} fontWeight={600}>{isBalanceVisible ? Intl.NumberFormat('en-us', {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            }).format(parseFloat(_data ? _data.account_balance : "")) : hideBalance()}</Text>
                                            <Box pl={3} cursor={"pointer"} mt={-0.5}>
                                                {
                                                    isBalanceVisible && <BiShow fontSize={"xs"} color={"#374151"} onClick={() => toggleBalanceVisibility()} />
                                                }
                                                {
                                                    !isBalanceVisible && <BiHide fontSize={"xs"} color={"#374151"} onClick={() => toggleBalanceVisibility()} />
                                                }
                                            </Box>
                                        </HStack>
                                    </Stack>


                                    <Stack pt={6} direction={"row"} justify={"space-between"}>
                                        <Stack spacing={1}>
                                            <Text fontSize={"xs"}>Account Name</Text>
                                            <Text fontSize={{ base: "sm", md: 'md' }} fontWeight={600}>{_data ? _data.account_name : ""}</Text>
                                        </Stack>
                                    </Stack>


                                    <Stack mt={6} spacing={4} direction={"row"} justify={"space-between"}>
                                        <Stack spacing={1}>
                                            <Text fontSize={"xs"}>Account Number</Text>
                                            <Text fontSize={{ base: "sm", md: 'md' }} fontWeight={600}>{_data ? _data.account_number : ""}</Text>
                                        </Stack>

                                        <Stack spacing={1}>
                                            <Text fontSize={"xs"}>Account Type</Text>
                                            <Text fontSize={{ base: "sm", md: 'md' }} fontWeight={600}>{_data ? toTitleCase(_data.account_type).replace("_account", "") : ""}</Text>
                                        </Stack>
                                    </Stack>
                                </Box>

                                <Box p={"23px"} pb={0} rounded={8} border={"1px solid #E5E7EB"}>
                                    <Text color={"#374151"} fontSize={"16px"} fontWeight={600}>Recent Transactions</Text>
                                    
                                    { isLoading ?
                                        <Center pt={10} pb={20}> <Spinner /> </Center>
                                        :
                                        trxns.length > 0 ?
                                            <>
                                            <div>
                                                <div className={styles.searchBar}>
                                                    <img src={getImageUrl("icons/search.png")} />
                                                    <input id="search" type="text" onChange={handleSearch} placeholder='Search reports' />
                                                </div>

                                                {Object.keys(groupedTrxns).map((timestamp) => (
                                                    <div key={timestamp} className={styles.acctInfoTable}>
                                                        <h4>{format(new Date (timestamp), 'MMMM dd')}</h4>
                                                        {groupedTrxns[timestamp].slice(0, 5).map((transaction, index) => (
                                                            <div key={index} className={styles.trxn}>
                                                                <div className={styles.desc}>
                                                                    <h3>{removeNumbersAndPunctuation(transaction.trans_narration)}</h3>
                                                                    <p>{transaction.trans_type}</p>
                                                                </div>

                                                                <div className={classNames({
                                                                    [styles.credit]: transaction.trans_type.toLowerCase() == 'credit',
                                                                    [styles.debit]: transaction.trans_type.toLowerCase() == 'debit'
                                                                })}>
                                                                    {transaction.trans_type.toLowerCase() === ("credit") ? `+` : ''}
                                                                    {transaction.trans_type.toLowerCase() === ("debit") ? `-` : ''}
                                                                    {transaction.currency.toLowerCase() === ("ngn") ? `N` : ``}
                                                                    {transaction.currency.toLowerCase() === ("usd") ? `$` : ``}
                                                                    {formatNumber(transaction.trans_amount)}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                                <button onClick={() => handleViewAll(_data)} className={styles.viewAll}>
                                                    View All
                                                </button>
                                            </div>
                                            </>
                                            :
                                            <Box pt={10} pb={20}>
                                                <Text fontSize={{ base: 'xs', md: 'sm' }} color={'gray.500'} textAlign={'center'}>No transactions found</Text>
                                            </Box>
                                    }
                                </Box>
                            </Stack>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>

    );
}