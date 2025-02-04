import React, { useState, useEffect } from 'react';
import { Container, Button, VStack, Image, Icon, Flex, Text } from '@chakra-ui/react';
import { RxDashboard } from "react-icons/rx";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { GiCash } from "react-icons/gi";
import { CgNotes } from "react-icons/cg";
import { BsCoin } from "react-icons/bs";
import { useNavigate } from 'react-router-dom'; 
import { IoIosLogOut } from "react-icons/io";

export const Sidebar = ({ setPage }) => {
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate(); 

  const buttons = [
    { label: "Dashboard", icon: RxDashboard, id: 1, path: '/Admin/dashboard' },
    { label: "User", icon: HiOutlineUserGroup, id: 2, path: '/Admin/user' },
    { label: "Communications", icon: IoChatbubbleEllipsesOutline, id: 3, path: '/Admin/communications' },
    { label: "Request", icon: GiCash, id: 4, path: '/Admin/request' },
    { label: "Configurations", icon: BsCoin, id: 5, path: '/Admin/configurations' },
    { label: "Activity Logs", icon: GiCash, id: 6, path: '/Admin/activity-logs' },
    { label: "Reports", icon: CgNotes, id: 7, path: '/Admin/report' }
  ];

  useEffect(() => {
    const lastPage = localStorage.getItem('page');
    const lastButton = localStorage.getItem('activeButton');
    const lastpage = localStorage.getItem('pagename');
    if (lastPage && lastpage) {
      setPage(lastpage);
      navigate(lastPage); 
    }

    if (lastButton) {
      setActiveButton(parseInt(lastButton)); 
    }
  }, [navigate, setPage]);

  const handleButtonClick = (button) => {
    setActiveButton(button.id); 
    setPage(button.label);  
    localStorage.setItem('page', button.path);
    localStorage.setItem('pagename', button.label);
    localStorage.setItem('activeButton', button.id);
    navigate(button.path);
  };

  return (
    <Container pos="fixed" ml='0px' width='230px' h='100%' bg='#0D0D0D' zIndex={11} overflow="hidden" overflowY="scroll" css={{
      "&::-webkit-scrollbar": {
        display: "none",
      },
      scrollbarWidth: "none",
    }}>
      <VStack spacing={10}>
        <Image src="/assets/PesoFinance_Logo.png" w='130px' h='50px' mr='50px' pt='25px' alt='Logo' />
        <VStack align="stretch"> 
          {buttons.map((button) => (
            <Button
              key={button.id}
              onClick={() => handleButtonClick(button)} 
              variant='ghost'
              bg={activeButton === button.id ? '#F6CDD5' : '#0D0D0D'}
              w='232px'
              h='40px'
              justifyContent="start" 
              pl={6} 
              borderLeft='4px solid'
              borderLeftColor={activeButton === button.id ? '#A80324' : 'transparent'}
              _hover={{ bg: activeButton === button.id ? 'gray.600' : 'gray.600' }}
              color={activeButton === button.id ? '#D2042D' : 'white'} 
              borderRadius="none"
            >
              <Flex align="center"> 
                <Icon as={button.icon} boxSize={6} mr={4} />
                <Text fontSize='14px' fontFamily="'Work Sans', sans-serif">{button.label}</Text>
              </Flex>
            </Button>
          ))}
        </VStack>
        
      </VStack>
    </Container>
  );
};
