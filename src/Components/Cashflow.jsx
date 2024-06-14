import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import { SlRefresh } from "react-icons/sl";
import { SimpleLine } from "./Chart";

import styles from "./css/styling.module.css";

export const Cashflow = ({ data = [] }) => {
    return (
        <Box bg={"white"} rounded={10} border={"1px solid #F3F4F6"} p={"16px"}>
            <Stack justify={"space-between"} h={"100%"}>
                <Stack direction={"row"} justify={"space-between"}>
                    <Stack direction={"row"} display={"inline-flex"} alignItems={"center"}>
                        <Text fontSize={"20px"} fontWeight={600} color={"#374151"}>Cashflow</Text>
                        <Text fontSize={"10px"} color={"#6B7280"}>Last updated July 12, 2022</Text>
                    </Stack>
                    
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
                        <Box pl={"4px"}>
                            <SlRefresh size={"14px"} />
                        </Box>
                    </HStack>
                </Stack>
                {
                    data.length > 0 ?
                        <SimpleLine data={data} dataTooltipLabel="Income" data2TooltipLabel="Expense" dataCurrency={'NGN'} xHeight={30} /> :
                        <Text align={"center"} fontSize={"sm"} color={"gray.500"} p={24}>No data available.</Text>
                }
                <Text align={"right"} fontSize={"10px"} color={"#6B7280"}>Last updated: N/A</Text>
            </Stack>
        </Box>
    );
}