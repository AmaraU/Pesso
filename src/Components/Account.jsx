import { Box, Text, Stack, HStack, Button, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CiBank } from 'react-icons/ci';
import { RxDotFilled } from "react-icons/rx";
import { SlArrowRight } from "react-icons/sl";
import { getImageUrl } from "../../utils";

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
        <Box py={"32px"} px={"16px"} bg={"#D9D9D9"} border={"1px solid #F3F4F6"} backgroundImage={getImageUrl("account.png")} backgroundPosition={"center"} backgroundSize={"80% 100%"} backgroundRepeat={"no-repeat"} rounded={8}>
                {
                isLoading ? <Spinner color="#333333" /> :
                    <Stack w={"100%"}>
                        <Stack>

                            <Stack direction={"row"} alignItems={"center"} justify={"space-between"}>

                                <HStack justify={"space-between"}>
                                    <Box display={"flex"} rounded={"50px"} p={"8px"} bg={"#FFFFFF80"}  alignItems={"center"} justifyContent={"center"}>
                                        <CiBank color="#333333" size={"24px"} />
                                    </Box>
                                    <Box mr={-5} display={"none"}>
                                        <Button size={"xs"} bg={"green.400"} color={"white"} _hover={{ bg: "green.300" }} onClick={() => link()}>Link Account</Button>
                                    </Box>
                                </HStack>

                                <Box cursor={"pointer"}>
                                    <SlArrowRight color="#333333" />
                                </Box>
                            </Stack>

                            <Text marginBottom={"6px"} fontSize={{ lg: "24px", md: "18px", sm: "24px" }} fontWeight={600} color={"#333333"}>{accounts.length > 0 ? currentAccount.account_number : "N/A"}</Text>
                        </Stack>
                        {
                            accounts.length > 0 ?
                                <HStack spacing={1}>
                                    <Text fontSize={"11.5px"} color={"#333333"}>{currentAccount.account_name} </Text>
                                    <RxDotFilled size={"10px"} color="#333333" />
                                    <Text fontSize={"11.5px"} color={"#333333"}>{currentAccount.institution_name}</Text>
                                </HStack>
                                : <Text fontSize={"11.5px"} color={"#333333"} fontWeight={500}>No account linked</Text>
                        }
                    </Stack>
                }
        </Box>
    );
}