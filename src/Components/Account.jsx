import { Box, Text, Stack, HStack, Button, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CiBank } from 'react-icons/ci';
import { RxDotFilled } from "react-icons/rx";
import { SlArrowRight } from "react-icons/sl";

export const Account = ({ accts = [], link, isLoading = false }) => {
    const [accounts, setAccounts] = useState([]);
    const [currentAccount, setCurrentAccount] = useState({
        account_number: "",
        account_name: "",
        institution_name: ""
    });

    useEffect(() => {
        if (accts.length > 0) {
            setAccounts(accts);
            setCurrentAccount(accts[0]);
        }
    }, [accts])

    return (
        <Box py={"32px"} px={"16px"} bg={"#16A34A"} rounded={8}>
                {
                isLoading ? <Spinner color="white" /> :
                    <Stack w={"100%"}>
                        <Stack>

                            <Stack direction={"row"} alignItems={"center"} justify={"space-between"}>

                                <HStack justify={"space-between"}>
                                    <Box display={"flex"} rounded={50} p={"8px"} bg={"#FFFFFF33"}  alignItems={"center"} justifyContent={"center"}>
                                        <CiBank color="white" size={"24px"} />
                                    </Box>
                                    <Box mr={-5} display={"none"}>
                                        <Button size={"xs"} bg={"green.400"} color={"white"} _hover={{ bg: "green.300" }} onClick={() => link()}>Link Account</Button>
                                    </Box>
                                </HStack>

                                <Box cursor={"pointer"}>
                                    <SlArrowRight color="white" />
                                </Box>
                            </Stack>

                            <Text marginBottom={"6px"} fontSize={"24px"} fontWeight={600} color={"white"}>{accounts.length > 0 ? currentAccount.account_number : "N/A"}</Text>
                        </Stack>
                        {
                            accounts.length > 0 ?
                                <HStack spacing={1}>
                                    <Text fontSize={"11.5px"} color={"white"}>{currentAccount.account_name} </Text>
                                    <RxDotFilled size={"10px"} color="white" />
                                    <Text fontSize={"11.5px"} color={"white"}>{currentAccount.institution_name}</Text>
                                </HStack>
                                : <Text fontSize={"11.5px"} color={"white"} fontWeight={500}>No account linked</Text>
                        }
                    </Stack>
                }
        </Box>
    );
}