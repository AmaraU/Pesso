import React, { useState } from "react";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  Text,
  Select,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Portal,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  Textarea,
  ButtonGroup,
  Icon,
  Container,
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Checkbox,
  IconButton,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { Searchbar } from "../../components/Searchbar/SearchBar";
import { BsThreeDotsVertical } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";
import { RiSoundModuleLine } from "react-icons/ri";
import { TiPlus } from "react-icons/ti";
import { GoDash } from "react-icons/go";
import { Pagination } from "../../components/Pagination/Pagination";

export const Request = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formValues, setFormValues] = useState({
    planName: '',
    description: '',
    module: '',
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
  const plans = [
    { Plan: 'Basic', description: 'Sample Description', modules: 'Advanced', dateCreated: formattedDate },
  ];

  return (
    <Container maxW="100%" mt="100px" px="20px">
      <Flex alignItems="center" mb="20px">
        <Searchbar />
        <Spacer />
        <Flex>
        <ButtonGroup spacing={3}>
          <IconButton variant="ghost" colorScheme="gray" aria-label="Reload" icon={<TfiReload />} w="32px" h="32px" />
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
                                Filter
                            </Button>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent p="4">
                                <PopoverArrow />
                                <PopoverHeader fontWeight="bold" pb="2" borderBottom="none">FILTER ORGANIZATION</PopoverHeader>
                                <PopoverCloseButton />
                                <PopoverBody>
                                    <FormControl>
                                        <FormLabel fontSize="sm" mb="2">
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
                                        
                                        <FormLabel fontSize="sm" mb="2">
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
          <Button onClick={onOpen} w="117px" h="32px" bg="#D2042D" color="#FFF" leftIcon={<TiPlus />}>
            <Text fontFamily="'Work Sans', sans-serif" fontSize="10px"> Create Request</Text>
          </Button>
        </ButtonGroup>
        </Flex>
      </Flex>

      <Box w="100%">
        <TableContainer>
          <Table variant="simple" size="md">
            <Thead bgColor="#F9FAFB">
              <Tr>
                <Th fontFamily="'Work Sans', sans-serif"textTransform='none'>Plan Name</Th>
                <Th fontFamily="'Work Sans', sans-serif"textTransform='none'>Description</Th>
                <Th fontFamily="'Work Sans', sans-serif"textTransform='none'>Modules</Th>
                <Th fontFamily="'Work Sans', sans-serif"textTransform='none'>Date Created</Th>
                <Th fontFamily="'Work Sans', sans-serif"textTransform='none'>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {plans.map((plan, index) => (
                <Tr key={index}>
                  <Td>{plan.Plan}</Td>
                  <Td>{plan.description}</Td>
                  <Td>{plan.modules}</Td>
                  <Td>{plan.dateCreated}</Td>
                  <Td>
                    <Menu>
                      <MenuButton as={IconButton} variant="ghost" colorScheme="gray" aria-label="Options" icon={<BsThreeDotsVertical />} />
                      <MenuList>
                      <MenuGroup title="Action">
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

      <Flex mt="20px" justify="center">
        <Pagination />
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Plan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel  requiredIndicator={null}>Plan Name</FormLabel>
              <Input name="planName" placeholder="Enter Plan Name" value={formValues.planName} onChange={handleChange} 
                                borderRadius='0' />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel requiredIndicator={null}>Description</FormLabel>
              <Textarea name="description" placeholder="Enter Description" value={formValues.description} onChange={handleChange} 
                                borderRadius='0' />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel requiredIndicator={null}>Module</FormLabel>
              <Select name="module" placeholder="Select Module" value={formValues.module} onChange={handleChange} 
                                borderRadius='0'>
                <option value="Payments">Payments</option>
                <option value="Invoicing">Invoicing</option>
                <option value="User Management">User Management</option>
                <option value="Advanced">Advanced</option>
              </Select>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel requiredIndicator={null}>Channel</FormLabel>
              <Select name="channel" placeholder="Select Channel" value={formValues.channel} onChange={handleChange} 
                                borderRadius='0'>
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="Push">Push Notification</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button  w='370px' colorScheme="red" mr={3} onClick={onClose} isDisabled={!isFormComplete}>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};
