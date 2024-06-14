import { Box, Divider, HStack, Icon, Stack, Text } from '@chakra-ui/react';
import { US, EU, GB, CA, CN, NG } from 'country-flag-icons/react/3x2'
import { SlRefresh } from "react-icons/sl";

export const ExchangeRates = () => {
    const currencies = [
        {
            name: "USD",
            buy: 1093.63,
            sell: 1099.63,
            icon: <Icon rounded={80} boxSize={"20px"} as={US} />
        },
        {
            name: "EUR",
            buy: 1180.70,
            sell: 1189.70,
            icon: <Icon rounded={80} boxSize={"20px"} as={EU} />
        },
        {
            name: "GBP",
            buy: 1330.45,
            sell: 1338.45,
            icon: <Icon rounded={80} boxSize={"20px"} as={GB} />
        },
        {
            name: "CAD",
            buy: 958.50,
            sell: 967.50,
            icon: <Icon rounded={80} boxSize={"20px"} as={CA} />
        },
        {
            name: "CNY",
            buy: 400.20,
            sell: 438.20,
            icon: <Icon rounded={80} boxSize={"20px"} as={CN} />
        }
    ]
    return (
        <Box bg={"white"} rounded={10} border={"1px solid #F3F4F6"} p={"16px"}>
            <Stack>
                <Stack direction={"row"} justify={"space-between"} marginBottom={"24px"}>
                    <Text fontSize={"20px"} fontWeight={500} color={"#374151"}>Exchange Rates</Text>
                    <HStack spacing={"8px"}>
                        <Box pr={"2px"}>
                            <SlRefresh size={"15px"} />
                        </Box>
                        <HStack spacing={"3px"}>
                            <Icon rounded={"80px"} boxSize={"20px"} as={NG} />
                            <Text pt={"0.5px"} fontSize={"xs"}>NGN</Text>
                        </HStack>
                    </HStack>
                </Stack>
                <Stack>
                    <HStack justify={"space-between"} margin={0} p={0}>
                        <Text fontSize={"14"} color={"#6B7280"} fontWeight={500}>Currency</Text>
                        <Text fontSize={"14"} color={"#6B7280"} fontWeight={500}>Buying</Text>
                        <Text fontSize={"14"} color={"#6B7280"} fontWeight={500}>Selling</Text>
                    </HStack>
                    <Divider />
                    {
                        currencies.map((v, k) =>
                            <HStack key={k} justify={"space-between"} pb={"1.5px"} borderBottom={"1px solid #F3F4F6"} py={"16px"} px={0}>
                                <HStack>
                                    {v.icon}
                                    <Text fontSize={"14"} color={"#6B7280"} fontWeight={600}>{v.name}</Text>
                                </HStack>
                                <Text fontSize={"14px"} color={"#6B7280"} fontWeight={500}>{v.buy}</Text>
                                <Text fontSize={"14px"} color={"#6B7280"} fontWeight={500}>{v.sell}</Text>
                            </HStack>
                        )
                    }
                </Stack>
            </Stack>

        </Box>
    );
}