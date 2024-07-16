import { Tab, TabList, TabPanel, TabPanels, Tabs, Box, HStack, Icon, Text, Stack } from "@chakra-ui/react";
import { NG } from 'country-flag-icons/react/3x2'
import Table from "./Table";
import { loanFields, paymentFields, receivableFields } from "../models/data";
import { SlRefresh } from "react-icons/sl";

const DataWidget = ({ entries = [], fields = [], isLoading = false, fileName = "data", fieldFontSize = "14px", entryFontSize = "14px", type = "" }) => {
    const screenWidth = window.screen.availWidth;

    return (
        <Box pt={{ base: 3, md: 5 }} ml={"-16px"} mr={"-16px"}>
            {
                entries.length > 0 ?
                    <Table data={entries} enableTopToolbar={true} columns={fields} columnHeaderFontSize={screenWidth <= 800 ? "12px" : fieldFontSize} rowFontSize={screenWidth <= 800 ? "12px" : entryFontSize} fileName={fileName} isLoading={isLoading} tableHeader="" noDataText="" /> :
                    <Box>
                        <Table display={{ base: "none", md: "block" }} isLoading={isLoading} data={entries} columns={fields} tableHeader="" noDataText={`You do not have any recent ${type}`} noDataTextSize="13px" />
                        <Text display={{ md: "none" }} fontSize={{ base: 'xs', md: 'sm' }} color={'gray.500'} textAlign={'center'}>You do not have any recent {type}</Text>
                    </Box>
            }
        </Box>
    );
}

export const RecentTransactions = () => {
    return (
        <Box rounded={10} bg={'white'} border={"1px solid #F3F4F6"} p={16}>
            <Stack spacing={6}>
                <Stack direction={"row"} justify={"space-between"}>
                    <Tabs>
                        <TabList gap={24}>
                            <Tab p={8} fontSize={"16px"} color={'#9CA3AF'} bgColor={"transparent"} border={"none"} _selected={{ color: '#1C6BFF', borderBottom: '2px solid #1C6BFF', borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0 }}>
                                <Text fontWeight={500}>Receivables</Text>
                            </Tab>
                            <Tab p={8} fontSize={"16px"} color={'#9CA3AF'} bgColor={"transparent"} border={"none"} _selected={{ color: '#1C6BFF', borderBottom: '2px solid #1C6BFF', borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0 }}>
                                <Text fontWeight={500}>Payments</Text>
                            </Tab>
                            <Tab p={8} fontSize={"16px"} color={'#9CA3AF'} bgColor={"transparent"} border={"none"} _selected={{ color: '#1C6BFF', borderBottom: '2px solid #1C6BFF', borderLeftWidth: 0, borderRightWidth: 0, borderTopWidth: 0 }}>
                                <Text fontWeight={500}>Loans</Text>
                            </Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <DataWidget entries={[]} fields={receivableFields} type="receivables" />
                            </TabPanel>
                            <TabPanel>
                                <DataWidget entries={[]} fields={paymentFields} type="payments" />
                            </TabPanel>
                            <TabPanel>
                                <DataWidget entries={[]} fields={loanFields} type="loans" />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                    <HStack spacing={1}>
                        <Box pr={2}>
                            <SlRefresh size={"15px"} />
                        </Box>
                        <Icon rounded={80} boxSize={"20px"} as={NG} />
                        <Text pt={0.5} fontSize={"xs"}>NGN</Text>
                    </HStack>
                </Stack>
                
            </Stack>
        </Box>
    )
}