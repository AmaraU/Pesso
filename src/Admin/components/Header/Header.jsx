import React,{useState , useEffect} from 'react';
import {Menu,
    MenuButton,
    MenuList,
    MenuItem,
    PopoverBody,Popover,
    PopoverTrigger,
    PopoverContent,PopoverArrow,
    PopoverCloseButton, Avatar,Flex,Container,Text ,Spacer,Button,Image,Icon,IconButton,Link,Box,
    ButtonGroup} from '@chakra-ui/react';
import { Searchbar } from '../Searchbar/SearchBar';
import { TbLayoutDashboard } from "react-icons/tb";
import { IoMdNotificationsOutline,IoIosArrowDown } from "react-icons/io";
import { SlGlobe } from "react-icons/sl";
export const Header = ({ page, setContent}) =>{
    const [selectedButton, setSelectedButton] = useState('Organization');
    const [Selectedbutton, set2SelectedButton] = useState('Plan');
    const handleClick = (name) => {
        setSelectedButton(name);
        if (setContent) {
            setContent(name); 
            
        }
      };
      const handle2Click = (name) => {
        set2SelectedButton(name);
        if (setContent) {
            if(name==="Promotion"){
                setContent("Promo");
            }
            else{
            setContent(name); 
            }
            
        }
      };
      useEffect(()=>{
        if (page==="Configurations"){
            setContent("Plan");
        }
        else if(page==="User"){
            setContent("Organization")
        }
      },[page])
    return(
        <Flex w="100%" h="80px" zIndex={10} position='fixed' bg='#FFFF'>
            <Flex bg='#FFFF'  zIndex={10} position='fixed'  top='0'  h="80px" w="100%" borderBottom="1px solid" borderBottomColor="#E5E7EB" alignItems="center" justifyContent="space-between">
            {page === 'User' ?  
            <Flex alignItems='center' ml="230px">
                    <Text fontFamily="'Work Sans', sans-serif" ml="15px" fontSize='24px' w='130px' textAlign="left" >
                        {page}
                    </Text>
                    <ButtonGroup gap={"10px"}>
                    <Button  w='115px' h="36px" onClick={() => handleClick('Organization')} variant='outline' borderBottomRadius='0' borderColor='#FFFF'
                borderBottom={selectedButton === 'Organization' ? '3px solid #D2042D' : 'none'}
                color={selectedButton === 'Organization' ? '#D2042D' : '#9CA3AF'}
                opacity={selectedButton === 'Organization' ? 1 : 0.5} _hover={{ bg: '#FFFF' }}>
                    <Text fontFamily="'Work Sans', sans-serif" fontSize="16px"> Organizations</Text>
                    </Button>
                    <Button w='59px' h="32px"onClick={() => handleClick('Admin')} variant='outline' borderBottomRadius='0' borderColor= '#FFFF'
                borderBottom={selectedButton === 'Admin' ? '3px solid #D2042D' : 'none'}
                color={selectedButton === 'Admin' ? '#D2042D' : '#9CA3AF'}
                opacity={selectedButton === 'Admin' ? 1 : 0.5}  _hover={{ bg: '#FFFF' }}>
                    <Text fontFamily="'Work Sans', sans-serif" fontSize="16px">Admin</Text></Button>
                    <Button w='72px' h="32px" onClick={() => handleClick('Member')} variant='outline' borderBottomRadius='0' borderColor= '#FFFF'
                borderBottom={selectedButton === 'Member' ? '3px solid #D2042D' : 'none'}
                color={selectedButton === 'Member' ? '#D2042D' : '#9CA3AF'}
                opacity={selectedButton === 'Member' ? 1 : 0.5} _hover={{ bg: '#FFFF' }} ><Text fontFamily="'Work Sans', sans-serif" fontSize="16px">Member</Text></Button>
                    </ButtonGroup>
                    
                </Flex>:
                page === 'Configurations'?
                <Flex alignItems='center' ml="230px">
                    <Text fontFamily="'Work Sans', sans-serif" ml="15px" fontSize='24px' w='180px' textAlign="left" >
                        {page}
                    </Text>
                    <Button w='115px' h="36px"onClick={() => handle2Click('Plan')} variant='outline' borderBottomRadius='0' borderColor='#FFFF'
                borderBottom={Selectedbutton === 'Plan' ? '3px solid #D2042D' : 'none'}
                color={Selectedbutton === 'Plan' ? '#D2042D' : '#9CA3AF'}
                opacity={Selectedbutton === 'Plan' ? 1 : 0.5}_hover={{ bg: '#FFFF' }}>Plan</Button>
                    <Button w='115px' h="36px" onClick={() => handle2Click('Promotion')} variant='outline' borderBottomRadius='0' borderColor= '#FFFF'
                borderBottom={Selectedbutton === 'Promotion' ? '3px solid #D2042D' : 'none'}
                color={Selectedbutton === 'Promotion' ? '#D2042D' : '#9CA3AF'}
                opacity={Selectedbutton === 'Promotion' ? 1 : 0.5}_hover={{ bg: '#FFFF' }} >Promotion</Button>
                </Flex>:
                <Text fontFamily="'Work Sans', sans-serif" ml="230px" fontSize='24px'  textAlign="left" pl="40px">
                        {page}
                    </Text>}
                
                <Flex  alignItems="center" gap="10px" w="430px" pr="40px">
                    <Searchbar/>
                    <Button leftIcon={<SlGlobe />} rightIcon={<IoIosArrowDown/>} variant='outline' 
                    borderColor="#FFFF" _hover={null}>
                        EN
                    </Button>
                    <Icon as={TbLayoutDashboard} size=""/>
                    <IconButton 
                    variant='outline'
                    colorScheme='black'
                    borderColor="#FFFF"
                    aria-label='notify'
                    icon={<IoMdNotificationsOutline/>}
                    />
                    <Menu isLazy>
                    <MenuButton as={Avatar} variant="unstyled" colorScheme="gray"  src='/assets/avatar.png'
                                name='User' overflowX='hidden' overflowY='hidden'/>
                            <MenuList>
                                <MenuItem>Change Password</MenuItem>
                                <MenuItem>Log Out</MenuItem>
                            </MenuList>
                    </Menu>
                    
                </Flex>
            </Flex>
        </Flex>
        
    )
}