import React from 'react';
import { Flex,Container,InputGroup,Input,InputLeftElement } from '@chakra-ui/react';
import { CiSearch } from "react-icons/ci";
export const Searchbar =()=>{

    return(
        <Container ml={'0px'}>
            <InputGroup>
            <InputLeftElement>
                <CiSearch/>
            </InputLeftElement>
                <Input borderColor="#FFFF" placeholder='Search' />
            </InputGroup>
        </Container>
    )

}