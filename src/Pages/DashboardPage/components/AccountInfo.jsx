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
import { DataWidget } from './DataWidget';
import axios from 'axios';
import { DEFAULT_ACCOUNT_UNLINK_ERR_MSG, DEFAULT_RECENT_TRXNS_ERR_MSG, getAPIEndpoint } from '../../../config';
import { auditLog, logger } from '../../../models/logging';
import { CiBank } from 'react-icons/ci';
import { trxnFields } from '../../../models/data';
import { useNavigate } from 'react-router-dom';

const hideBalance = () => {
    return "******";
}

const toTitleCase = (txt) => {
    return txt[0].toUpperCase() + txt.substring(1).toLowerCase()
}

export const AccountInfo = ({ isOpen, onClose, refreshAccounts, flag, dataset = null }) => {
    const [_data, setData] = useState(null);
    const [isBalanceVisible, setIsBalanceVisible] = useState(true);
    const [isLoading, setIsloading] = useState(false);
    const [isUnlinkLoading, setIsUnlinkloading] = useState(false);
    const [trxns, setTrxns] = useState([]);
    const toast = useToast();
    const navigate = useNavigate();

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
            // navigate('/signin');
        }
    }, [])


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
                    setTrxns(data)
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

    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={handleClose}
                size={'xl'}
            >
                <DrawerOverlay />
                <DrawerContent bg={"white"}>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <div style={{ overflow: 'auto', maxHeight: '100vh' }}>
                            <Stack pt={7} spacing={10} direction={"row"}>
                                <HStack>
                                    <Box mt={-1} fontSize={'xl'} color='orange.500' >
                                        <CiBank />
                                    </Box>
                                    <Text fontSize={"lg"} fontWeight={600}>{_data ? _data.institution_name : ""}</Text>
                                </HStack>
                                <Button isLoading={isUnlinkLoading} isDisabled={isUnlinkLoading} size={"xs"} bg={"#ff000022"} color={"red.600"} _hover={{ bg: "#ff000033" }} onClick={handleUnlink}>
                                    Unlink account
                                </Button>
                            </Stack>
                            <Stack spacing={5} pt={5}>
                                <Box py={4} px={6} bg={"#F8F9F9"} rounded={15} borderWidth={1}>
                                    <Stack spacing={4} direction={"row"} justify={"space-between"}>
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
                                                        isBalanceVisible && <BiShow fontSize={"xs"} color={"#1C6BFF"} onClick={() => toggleBalanceVisibility()} />
                                                    }
                                                    {
                                                        !isBalanceVisible && <BiHide fontSize={"xs"} color={"#1C6BFF"} onClick={() => toggleBalanceVisibility()} />
                                                    }
                                                </Box>
                                            </HStack>
                                        </Stack>
                                        <Stack spacing={1}>
                                            <Text fontSize={"xs"}>Account Number</Text>
                                            <Text fontSize={{ base: "sm", md: 'md' }} fontWeight={600}>{_data ? _data.account_number : ""}</Text>
                                        </Stack>

                                        <Stack spacing={1}>
                                            <Text fontSize={"xs"}>Account Type</Text>
                                            <Text fontSize={{ base: "sm", md: 'md' }} fontWeight={600}>{_data ? toTitleCase(_data.account_type).replace("_account", "") : ""}</Text>
                                        </Stack>
                                    </Stack>
                                    <Stack pt={6} direction={"row"} justify={"space-between"}>
                                        <Stack spacing={1}>
                                            <Text fontSize={"xs"}>Account Name</Text>
                                            <Text fontSize={{ base: "sm", md: 'md' }} fontWeight={600}>{_data ? _data.account_name : ""}</Text>
                                        </Stack>
                                    </Stack>
                                </Box>
                                <Box bg={"#F8F9F9"} rounded={15} mb={6} borderWidth={1}>
                                    <Text pt={4} pl={6} color={"gray.600"} fontSize="md" fontWeight={600}>Recent Transactions</Text>
                                    {
                                        isLoading ?
                                            <Center pt={10} pb={20}> <Spinner /> </Center>
                                            :
                                            trxns.length > 0 ?
                                                <DataWidget entries={trxns} fields={trxnFields} noDataText="No transactions found" isLoading={isLoading} showHideColumns={{ id: false }} entryFontSize="11px" fileName='Recent_Transactions' initSortingField='trans_date' /> :
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