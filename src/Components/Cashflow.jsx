import { Box, HStack, Stack, Text, Button } from "@chakra-ui/react";
import { SlRefresh } from "react-icons/sl";
import { SimpleLine } from "./Chart";

import styles from "./css/styling.module.css";

export const Cashflow = ({ data = [] }) => {
    return (
        <Box bg={"white"} rounded={10} border={"1px solid #F3F4F6"} p={"16px"}>
            <Stack justify={"space-between"} h={"100%"}>
                <Stack direction={{ lg: "row", md: "column" }} justify={{ lg: "space-between", md: "normal" }}>
                    
                    <Text fontSize={"20px"} fontWeight={600} color={"#374151"}>Cashflow</Text>
                    
                    <HStack spacing={0}>
                        <div className={styles.selectDiv}>
                            <label htmlFor="">Amount:</label>
                            <select name="" id="">
                                <option value="">All</option>
                            </select>
                        </div>
                        <div className={styles.selectDiv}>
                            <label htmlFor="">Timeframe:</label>
                            <select name="" id="">
                                <option value="">Monthly</option>
                            </select>
                        </div>
                        <Button p={0} bg={"transparent"} border={"none"} _hover={{bg: "transparent"}}>
                            <SlRefresh size={"14px"} />
                        </Button>
                    </HStack>
                </Stack>

                {
                    data.length > 0 ?
                        <SimpleLine data={data} dataTooltipLabel="Income" data2TooltipLabel="Expense" dataCurrency={'NGN'} xHeight={30} /> :
                        <Text align={"center"} fontSize={"sm"} color={"gray.500"} p={{lg: 24, md: 12}}>No data available.</Text>
                }
                <Text align={"right"} fontSize={"10px"} color={"#6B7280"}>Last updated: N/A</Text>
            </Stack>
        </Box>
    );
}