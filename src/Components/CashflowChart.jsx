import { Box, HStack, Stack, Text, Button } from "@chakra-ui/react";
import { SlRefresh } from "react-icons/sl";
import { SimpleLine } from "./Chart";

import styles from "./css/styling.module.css";

export const CashflowChart = ({ data = [] }) => {
    return (
            <Stack justify={"space-between"} h={"100%"}>
                {
                    data.length > 0 ?
                        <SimpleLine data={data} dataTooltipLabel="Income" data2TooltipLabel="Expense" dataCurrency={'NGN'} xHeight={30} /> :
                        <Text align={"center"} fontSize={"sm"} color={"gray.500"} p={24}>No data available.</Text>
                }
            </Stack>
    );
}