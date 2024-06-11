import { Box, HStack, Spinner, Stack, Text } from "@chakra-ui/react";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiShow, BiHide } from "react-icons/bi";
import { useEffect, useState } from "react";

const hideBalance = () => {
    return "******";
}

export const OverallBalance = ({ accts = [], timestamp = "", isLoading = false }) => {
    const [accounts, setAccounts] = useState([]);
    const [totalBalanceVisible, setTotalBalanceVisible] = useState(true);

    useEffect(() => {
        if (accts.length > 0) {
            setAccounts(accts);
        }
    }, [accts])

    return (
        <Box py={32} px={16} bg={"#1656CC"} rounded={8}>
            {
                isLoading ? <Spinner color="white" /> :
                    <Stack spacing={3}>
                        <Stack spacing={1}>
                            <Text marginBottom={8} color={"#FBBF24"} fontSize={"12px"} fontWeight={600}>OVERALL BALANCE</Text>

                            <HStack alignItems={"center"} justify={"space-between"}>

                                <HStack ml={-1} spacing={0} display={"flex"} alignItems={"center"}>
                                    <Box fontSize={"28"}>
                                        <TbCurrencyNaira color={"white"} />
                                    </Box>
                                    <Text fontSize={"32px"} fontWeight={600} color={"white"}>{totalBalanceVisible ? Intl.NumberFormat('en-us', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    }).format(accounts.length > 0 ? accounts.map(e => e.account_balance).reduce((a, b) => parseFloat(a) + parseFloat(b), 0) : 0) : hideBalance()}</Text>
                                    <Box pl={3} cursor={"pointer"}>
                                        {
                                            totalBalanceVisible && <BiShow color={"white"} fontSize={"sm"} onClick={() => setTotalBalanceVisible(!totalBalanceVisible)} />
                                        }
                                        {
                                            !totalBalanceVisible && <BiHide color={"white"} fontSize={"sm"} onClick={() => setTotalBalanceVisible(!totalBalanceVisible)} />
                                        }
                                    </Box>
                                </HStack>

                                <Text fontSize={"14px"} color={"#F9FAFB"} fontWeight={500}>{accts.length} accounts</Text>
                            </HStack>

                            
                        </Stack>
                        <Text marginTop={24} fontSize={"14px"} color={"white"}>Last Updated: {timestamp ? timestamp : "N/A"}</Text>
                    </Stack>
            }
        </Box>
    );
}