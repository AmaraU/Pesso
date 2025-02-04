import React,{ useState, useEffect }  from "react";
import { Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,ButtonGroup,Icon,Container,Box, Flex ,Text,Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer,Checkbox,IconButton,Spacer, Button} from "@chakra-ui/react";
import { Searchbar } from "../../components/Searchbar/SearchBar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Pagination } from "../../components/Pagination/Pagination";

export const ActivityLogs =()=>{
    const [time] = useState(new Date().toLocaleTimeString());

    const today = new Date();
    const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    const logs=[
        {activity:'Transfer funds',module:'Transaction',by:'Chimaje Agada',datejoined:formattedDate,Time:time},
    ];
     
    return(
        <Container maxW="100%" mt="100px"  >
            <Flex  >
            <Searchbar />
            </Flex>
                
                <Box mt="30px" w="100%" mx="auto" pl='0px' px={4}>
                    <TableContainer overflowX='hidden' overflowY='hidden'>
                    <Table>
                        <Thead bg="#F9FAFB">
                        <Tr>
                            <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'>Activity</Th>
                            <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'>Module</Th>
                            <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'>Done by</Th>
                            <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'>Date Joined</Th>
                            <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'>Time</Th>
                            <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'>Action</Th>
                        </Tr>
                        </Thead>

                        <Tbody>
                        {logs.map((log, index) => (
                            <Tr key={index}>
                            <Td px="4" py="2"><Text fontSize="12px">{log.activity}</Text></Td>
                            <Td px="4" py="2"><Text fontSize="12px">{log.module}</Text></Td>
                            <Td px="4" py="2"><Text fontSize="12px">{log.by}</Text></Td>
                            <Td px="4" py="2"><Text fontSize="12px">{log.datejoined}</Text></Td>
                            <Td px="4" py="2"><Text fontSize="12px">{log.time}</Text></Td>
                            <Td px="4" py="2">
                            <Menu w='221px' h="210px" borderRadius="8px" isLazy>
                                    <MenuButton as={IconButton} variant="unstyled" colorScheme="gray" icon={<BsThreeDotsVertical />} />
                                    <MenuList>
                                        <MenuGroup title="Action">
                                        <MenuItem ml=" 10px" h="40px" w="205px" padding={"12px 16px 12px 16px"} borderBottom={"1px solid #F3F4F6"} _hover={{borderBottomColor:"blue.200",}}>Edit</MenuItem>
                                        <MenuItem ml=" 10px" h="40px" w="205px" padding={"12px 16px 12px 16px"} borderBottom={"1px solid #F3F4F6"} _hover={{borderBottomColor:"blue.200",}}>Delete</MenuItem>
                                        <MenuItem ml=" 10px" h="40px" w="205px" padding={"12px 16px 12px 16px"} borderBottom={"1px solid #F3F4F6"} _hover={{borderBottomColor:"blue.200",}}>Suspend</MenuItem>
                                        <MenuItem ml=" 10px" h="40px" w="205px" padding={"12px 16px 12px 16px"} borderBottom={"1px solid #F3F4F6"} _hover={{borderBottomColor:"blue.200",}}>Pause Subscription</MenuItem>
                                        </MenuGroup>
                                        
                                    </MenuList>
                                </Menu>
                            </Td>
                            </Tr>
                        ))}
                        </Tbody>
                    </Table>
                    </TableContainer>
                </Box>

                <Flex ml="30px" mr="8px" mt="20px">
                    <Pagination />
                </Flex>
        </Container>
    )
}