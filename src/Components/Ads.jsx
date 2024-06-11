import { Box, Image } from "@chakra-ui/react";
import ad from '../../assets/images/ads_1.png';

export const Ads = () => {
    return (
        <Box cursor={"pointer"} rounded={10} border={"1px solid #F3F4F6"} p={16}>
            <Image
                borderRadius={10}
                boxSize='100%'
                objectFit='contain'
                src={ad}
                alt='Advert'
            />
        </Box>
    );
}