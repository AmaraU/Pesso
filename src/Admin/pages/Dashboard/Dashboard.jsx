import React from "react";
import { SlGlobe } from "react-icons/sl";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";
import { IoIosArrowDown } from "react-icons/io";
import { SkeletonCircle, Box, Menu, MenuButton,MenuGroup, MenuList, MenuItem, IconButton, Button, ButtonGroup, Select, Text, Divider, Card, CardHeader, CardBody, CardFooter, Container, Flex, Stack, Spacer } from "@chakra-ui/react";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { LineChart, PieChart ,
    ChartsYAxis,} from '@mui/x-charts';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1C6BFF',
    },
    secondary: {
      main: '#EF4444',
    },
  },
});

export const Dashboard = () => {
  const carddetails = [
    { label: "Active Users Count", amount: "2,300" },
    { label: "Total Organization", amount: "2,300" },
    { label: "Total Revenue Generated", amount: "2,300" },
  ];

  const xAxisLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dataSets = [
    { curve: "linear", data: [1200000, 520000, 750000, 195000, 3600000, 640000, 850000, 2900000, 4200000, 6700000, 800000, 9100000] },
    { curve: "linear", data: [100000, 180000, 470000, 90000, 2700000, 560000, 7200000, 12000, 2500000, 3900000, 7100000, 9500000] }
  ];

 

  const piedata = [
    { id: 'paying ', value: 132, label: 'Paying Organisation', color: 'rgba(155, 223, 196, 1)' },
    { id: 'non-paying', value: 144, label: 'Non-Paying Organisation ', color: 'rgba(98, 178, 253, 1)' },
  ];

  
  const valueFormatter = (value) => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`; // Converts to millions
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`; // Converts to thousands
    }
    return value.toString(); // No conversion for smaller values
  };
  

  return (
    <Container maxW="100%" mt="90px" px={4} pl='0px'>
      <Flex gap='20px' w="100%" >
        {carddetails.map((card) => (
          <Card direction='row' w='100%' h='80px' key={card.label} boxShadow="0px 3.5px 5.5px rgba(0, 0, 0, 0.1)" borderRadius="11px" border="1px solid #E2E2E2"   >
            <CardBody>
              <Flex align='center' justify='space-between'>
                <Box>
                  <Text fontSize='14px' fontFamily="'Work Sans', sans-serif"  color={"#505E70"}>{card.label}</Text>
                  <Text fontSize='18px' as='b' >{card.amount}</Text>
                </Box>
                <IconButton colorScheme='red' aria-label='Search database' icon={<SlGlobe />} _hover={null}/>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </Flex>

      <Flex mt='48px' w='100%' gap='80px'>
        <Card w='120%' h="370px" boxShadow="none" borderRadius="11px" border="1px solid #E2E2E2">
          <CardHeader pb={0} height="30px" display="flex" alignItems="center" justifyContent='space-between'>
            <Text  fontFamily="'Work Sans', sans-serif" fontSize="20px" fontWeight="500" marginRight="20px" height="30px">
              Cashflow
            </Text>
            <Flex align="center" height="30px" >
            <Flex align="center">
                <Text fontSize='12px'fontFamily="'Work Sans', sans-serif">Amount:</Text>
                <Select placeholder="All" w="70px" variant="outline" borderColor="transparent" size="sm">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                </Select>
            </Flex>

            < Flex align="center">
                <Text fontSize='12px' fontFamily="'Work Sans', sans-serif">TimeFrame:</Text>
                <Select placeholder="Monthly"  variant="outline" borderColor="transparent" size="sm">
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
                </Select>
            </Flex>

            <IconButton
                variant="ghost"
                colorScheme="gray"
                aria-label="Reload data"
                icon={<TfiReload />}
                size="28px"
            />

            <Menu isLazy>
                <MenuButton as={IconButton} variant="ghost" colorScheme="gray" aria-label="Options" icon={<BsThreeDotsVertical />} size="md" />
                <MenuList>
                  <MenuGroup title="Download">    
                    <MenuItem ml=" 10px" h="40px" w="205px" padding={"12px 16px 12px 16px"} borderBottom={"1px solid #F3F4F6"} _hover={{borderBottomColor:"blue.200",}}>View</MenuItem>
                    <MenuItem ml=" 10px" h="40px" w="205px" padding={"12px 16px 12px 16px"} borderBottom={"1px solid #F3F4F6"} _hover={{borderBottomColor:"blue.200",}}>Edit</MenuItem>
                    <MenuItem ml=" 10px" h="40px" w="205px" padding={"12px 16px 12px 16px"} borderBottom={"1px solid #F3F4F6"} _hover={{borderBottomColor:"blue.200",}}>Delete</MenuItem>
                  </MenuGroup>
                </MenuList>
            </Menu>
            </Flex>
        </CardHeader>
          <CardBody height="250px" overflow="hidden" >
            <ThemeProvider theme={theme}>
                <Box  height="100%" overflow="hidden">
                <LineChart
                  height={250}
                  xAxis={[
                    {
                      scaleType: 'band',
                      data: xAxisLabels, 
                    },
                  ]}
                  yAxis={[
                    {
                      min:0 ,
                      max:10000000,
                      tickValues: [10000, 100000, 500000, 1000000, 10000000],
                      valueFormatter: valueFormatter,
                    },
                  ]}
                  series={[
                    {
                      data: dataSets[0].data, // First dataset
                      curve: dataSets[0].curve, // Optional curve style
                      color: 'blue',
                      showMark: false,
                    },
                    {
                      data: dataSets[1].data, // Second dataset
                      curve: dataSets[1].curve, // Optional curve style
                      color: 'red',
                      showMark: false,
                    },
                  ]}
                  
                >
                  
                </LineChart>
                </Box>
            
            </ThemeProvider>
          </CardBody>
          <CardFooter display="flex" alignItems="center" py={3}>
            <ButtonGroup spacing="4" ml="4">
              <Button bgColor="#F0F5FD" leftIcon={<SkeletonCircle size="3" endColor="#1C6BFF" />} w="85px" h="26px" _hover={null}><Text fontFamily="'Work Sans', sans-serif" fontSize={"12px"} letterSpacing={"0.06em"} fontWeight={"600"}>PLAN 1</Text ></Button>
              <Button bgColor="#FEF2F2" leftIcon={<SkeletonCircle size="3" endColor="#EF4444" />} w="85px" h="26px" _hover={null}><Text fontFamily="'Work Sans', sans-serif" fontSize={"12px"} letterSpacing={"0.06em"} fontWeight={"600"}>PLAN 2</Text ></Button>
            </ButtonGroup>
            <Spacer />
            <Text color="gray.500" fontSize="10px" fontFamily="'Work Sans', sans-serif" fontWeight={"400"}>Last updated: July 12, 2022</Text>
          </CardFooter>
        </Card>

        <Card w='100%' h='340px' boxShadow="none" borderRadius="11px" border="1px solid #E2E2E2">
          <CardHeader>
            <Flex pb={0} height="30px" display="flex" alignItems="center" justifyContent='space-between'>
              <Text  fontFamily="'Work Sans', sans-serif" fontSize="20px" fontWeight="550" marginRight="20px" height="30px">Organizations</Text>
              <Stack direction='row' spacing={4}>
                <Button rightIcon={<IoIosArrowDown />} variant='outline' borderColor='#FFFF' _hover={null}><Text fontFamily="'Work Sans', sans-serif" fontSize="14px" fontWeight={"500"} color={"#1F2937"}>Metric</Text></Button>
                <Button rightIcon={<IoIosArrowDown />} variant='outline' borderColor='#FFFF' _hover={null}><Text fontFamily="'Work Sans', sans-serif" fontSize="14px" fontWeight={"500"}>Today</Text></Button>
              </Stack>
            </Flex>
          </CardHeader>
          <Divider borderColor="gray.300" borderWidth="1px" />
          <CardBody display="flex" justifyContent="space-between" alignItems="center" overflow="hidden">
            <ThemeProvider theme={theme}>
            <PieChart
                    series={[
                        {
                        data: [
                            { id: piedata[0].id, value: piedata[0].value, label: piedata[0].label},
                            { id: piedata[1].id, value: piedata[1].value, label: piedata[1].label},
                        ],
                        },
                    ]}
                    slotProps={{
                       legend: {
                         position: {
                          vertical: 'middle',
                          horizontal: 'right',
                        },
                        labelStyle: {
                          fontSize: 10,
                        },
                        itemMarkHeight:8,
                        itemMarkWidth:8,
                  } 
                  }}
                    width={400}
                    height={200}
                    />
            </ThemeProvider>
          </CardBody>
        </Card>
      </Flex>
    </Container>
  );
};
