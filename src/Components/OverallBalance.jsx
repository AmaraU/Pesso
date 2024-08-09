import { Box, HStack, Spinner, Stack, Text } from "@chakra-ui/react";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiShow, BiHide } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import { getImageUrl } from "../../utils";

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
        <Box py={"32px"} px={"16px"} bg={"#A80324"} border={"1px solid #F3F4F6"} backgroundImage={getImageUrl("overallBall.png")} backgroundPosition={"top right"} backgroundSize={"50%"} backgroundRepeat={"no-repeat"} rounded={8}>
            {
                isLoading ? <Spinner color="white" /> :
                    <Stack >
                        <Stack spacing={1}>

                            <Stack justify={"space-between"} direction={{lg: "row"}}>
                                <Text marginBottom={"8px"} color={"#FBBF24"} fontSize={"12px"} fontWeight={600}>OVERALL BALANCE</Text>
                                <Text fontSize={"14px"} color={"#F9FAFB"} fontWeight={500}>{accts.length} accounts</Text>
                            </Stack>

                            <Stack ml={"-1px"} spacing={0} direction={"row"} align={"center"}>
                                <Box fontSize={"28"}>
                                    <TbCurrencyNaira color={"white"} />
                                </Box>
                                <Text fontSize={{lg: "32px", md: "24px", sm: "150%"}} fontWeight={600} color={"white"}>{totalBalanceVisible ? Intl.NumberFormat('en-us', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                }).format(accounts.length > 0 ? accounts.map(e => e.account_balance).reduce((a, b) => parseFloat(a) + parseFloat(b), 0) : 0) : hideBalance()}</Text>
                                <Box pl={"3px"} cursor={"pointer"}>
                                    {
                                        totalBalanceVisible && <BiShow color={"white"} fontSize={"sm"} onClick={() => setTotalBalanceVisible(!totalBalanceVisible)} />
                                    }
                                    {
                                        !totalBalanceVisible && <BiHide color={"white"} fontSize={"sm"} onClick={() => setTotalBalanceVisible(!totalBalanceVisible)} />
                                    }
                                </Box>
                            </Stack>

                        </Stack>

                        <Text marginTop={"12px"} fontSize={"12px"} color={"white"}>Last Updated: {timestamp ? timestamp : "N/A"}</Text>
                    </Stack>
            }
        </Box>
    );
}