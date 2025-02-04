import React, { useState } from "react";
import {
  Radio, RadioGroup, Select, Input, FormControl, FormLabel, useDisclosure,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody,
  ModalCloseButton, Portal, Popover, PopoverTrigger, PopoverContent,
  PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton,
  Menu, MenuButton, MenuList, MenuItem, Stack, ButtonGroup, Icon, Container,
  Box, Flex, Table, Thead, Tbody, Textarea, Tr, Th, Td, TableContainer, Checkbox,
  IconButton, Spacer, Button,MenuGroup,Text,
} from "@chakra-ui/react";
import { Searchbar } from "../../components/Searchbar/SearchBar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GoDash } from "react-icons/go";
import { TfiReload } from "react-icons/tfi";
import { TiPlus } from "react-icons/ti";
import { RiSoundModuleLine } from "react-icons/ri";
import { Pagination } from "../../components/Pagination/Pagination";

export const Communications = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [value, setValue] = React.useState('');
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    to: '',
    channel: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormComplete = Object.values(formValues).every((value) => value.trim() !== '');
  const today = new Date();
  const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
  const notify = [
    { title: 'Security Update', description: 'Reminder', to: 'All', datejoin: formattedDate, channel: 'Push Notification' },
  ];

  return (
    <Container maxW="100%" mt="100px" px={4}>
      <Flex alignItems="center" mb="20px">
        <Searchbar />
        <Spacer />
        <Flex alignItems="center" >
        <ButtonGroup spacing={3}>
          <IconButton w="32px" h="32px" variant="ghost" colorScheme="gray" aria-label="Reload" icon={<TfiReload />} />
          <Popover w="360px" h="350px">
                        <PopoverTrigger>
                            <Button
                                w="80px"
                                h="32px"
                                bgColor="#FBE6EA"
                                color="#D2042D"
                                leftIcon={<Icon as={RiSoundModuleLine} transform="rotate(180deg)" />}
                                ml="4"
                            >
                                <Text fontFamily="'Work Sans', sans-serif" fontSize="12px"> Filter</Text>
                            </Button>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent p="4">
                                <PopoverArrow />
                                <PopoverHeader fontFamily="'Work Sans', sans-serif" fontWeight="bold" pb="2" borderBottom="none">FILTER ORGANIZATION</PopoverHeader>
                                <PopoverCloseButton />
                                <PopoverBody>
                                    <FormControl>
                                        <FormLabel fontSize="sm" mb="2" fontFamily="'Work Sans', sans-serif">
                                            Organization Name
                                        </FormLabel>
                                        <Input
                                            type="text"
                                            placeholder="Enter Organization Name"
                                            borderRadius="0"
                                            mb="4"
                                        />
                                        
                                        <FormLabel fontSize="sm" mb="2">
                                            Industry
                                        </FormLabel>
                                        <Select placeholder="Select Industry" borderRadius="0" mb="4" >
                                            <option value="option1">Option 1</option>
                                            <option value="option2">Option 2</option>
                                            <option value="option3">Option 3</option>
                                        </Select>
                                        
                                        <FormLabel fontSize="sm" mb="2" fontFamily="'Work Sans', sans-serif">
                                            Date Created
                                        </FormLabel>
                                        <Flex justifyContent="space-between" alignItems="center" gap="2">
                                            <Button
                                                w="140px"
                                                variant="outline"
                                                borderColor="#F2B4C0"
                                                borderRadius="0"
                                                p="2"
                                            >
                                                Start Date
                                            </Button>
                                            <Icon as={GoDash} />
                                            <Button
                                                w="140px"
                                                variant="outline"
                                                borderColor="#F2B4C0"
                                                borderRadius="0"
                                                p="2"
                                            >
                                                End Date
                                            </Button>
                                        </Flex>
                                    </FormControl>
                                </PopoverBody>
                                <PopoverFooter borderTop="none" >
                                    <Flex justifyContent="center" gap="4" mt="4">
                                        <Button w="140px" colorScheme="red" borderRadius="0" p="2">
                                            Apply
                                        </Button>
                                        <Button w="140px" variant="outline" colorScheme="red" borderRadius="0" p="2">
                                            Reset
                                        </Button>
                                    </Flex>
                                </PopoverFooter>
                            </PopoverContent>
                        </Portal>
                    </Popover>
          <Button onClick={onOpen} w="142px" h="32px" bg="#D2042D" color="#FFF" leftIcon={<TiPlus />}>
            <Text fontFamily="'Work Sans', sans-serif" fontSize="12px"> Create Message</Text>
          </Button>
        </ButtonGroup>
        </Flex>
      </Flex>

      <Box mt="30px" w="100%">
        <TableContainer>
          <Table variant="simple" size="sm">
            <Thead bg="#F9FAFB">
              <Tr>
                <Th w="5%"  fontFamily="'Work Sans', sans-serif"textTransform='none'>Notification Title</Th>
                <Th w="15%"  fontFamily="'Work Sans', sans-serif"textTransform='none'>Description</Th>
                <Th w="15%"  fontFamily="'Work Sans', sans-serif"textTransform='none'>Sent to</Th>
                <Th w="15%"  fontFamily="'Work Sans', sans-serif"textTransform='none'>Date Joined</Th>
                <Th w="10%"  fontFamily="'Work Sans', sans-serif"textTransform='none'>Channel</Th>
                <Th w="5%"  fontFamily="'Work Sans', sans-serif"textTransform='none'>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {notify.map((notify, index) => (
                <Tr key={index}>
                  <Td>{notify.title}</Td>
                  <Td>{notify.description}</Td>
                  <Td>{notify.to}</Td>
                  <Td>{notify.datejoin}</Td>
                  <Td>{notify.channel}</Td>
                  <Td>
                      <Menu w='221px' h="210px" borderRadius="8px" isLazy>
                            <MenuButton as={IconButton} variant="unstyled" colorScheme="gray" icon={<BsThreeDotsVertical />} />
                            <MenuList>
                                <MenuGroup title="Action">
                                <MenuItem ml=" 10px" h="40px" w="205px" padding={"12px 16px 12px 16px"} borderBottom={"1px solid #F3F4F6"} _hover={{borderBottomColor:"blue.200",}}>Resend</MenuItem>
                                <MenuItem ml=" 10px" h="40px" w="205px" padding={"12px 16px 12px 16px"} borderBottom={"1px solid #F3F4F6"} _hover={{borderBottomColor:"blue.200",}}>Edit</MenuItem>
                                <MenuItem ml=" 10px" h="40px" w="205px" padding={"12px 16px 12px 16px"} borderBottom={"1px solid #F3F4F6"} _hover={{borderBottomColor:"blue.200",}}>Delete</MenuItem>
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

      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notification Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel requiredIndicator={null}>Title</FormLabel>
              <Input name="title" placeholder="Enter Title" value={formValues.title} onChange={handleChange} borderRadius='0' />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel requiredIndicator={null}>Description</FormLabel>
              <Textarea name="description" placeholder="Enter Description" value={formValues.description} onChange={handleChange} borderRadius='0'/>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel requiredIndicator={null}>Receiver</FormLabel>
              <Select name="to" placeholder="Select Receiver" value={formValues.to} onChange={handleChange} borderRadius='0'>
                <option value="All"> <Checkbox/>All</option>
                <option value="Free Plan">Free Plan</option>
                <option value="Startup Plan">Start-up Plan</option>
                <option value="Unicorn Plan">Unicorn Plan</option>
                <option value="Custom">Custom</option>
              </Select>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel requiredIndicator={null}>Company Email</FormLabel>
              <Input type="email" name="email" placeholder="Enter Company Email" value={formValues.email} onChange={handleChange} borderRadius='0'/>
              <RadioGroup onChange={setValue} value={value}>
                <Stack direction="row" mt={2}>
                  <Radio colorScheme="red" value="1">Send Now</Radio>
                  <Radio colorScheme="red" value="2">Schedule</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel requiredIndicator={null}>Channel</FormLabel>
              <Select name="channel" placeholder="Select Channel" value={formValues.channel} onChange={handleChange} borderRadius='0'>
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="Push">Push Notification</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button w='370px' colorScheme="red" mr={3} onClick={onClose} isDisabled={!isFormComplete}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};
