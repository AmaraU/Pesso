import React,{useState} from "react";
import { Radio,RadioGroup, Textarea,
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
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
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
    PopoverCloseButton,Stack,ButtonGroup,Icon,Container,Box, Flex ,Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer,Checkbox,IconButton,Spacer, Button} from "@chakra-ui/react";
import { Searchbar } from "../../components/Searchbar/SearchBar";
import { useOutletContext } from 'react-router-dom';
import { TfiReload } from "react-icons/tfi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiSoundModuleLine } from "react-icons/ri";
import { TiPlus } from "react-icons/ti";
import { GoDash } from "react-icons/go";
import { Pagination } from "../../components/Pagination/Pagination";

export const Configuration =()=>{
    const { content} = useOutletContext(); 
    const { isOpen, onOpen, onClose } = useDisclosure();
    
  const [value, setValue] = React.useState('');
    const [formValues, setFormValues] = useState({
        planName: '',
        description: '',
        module: '',
        channel: '',
      });
      const [form2Values, setForm2Values] = useState({
        promoName: '',
        promoTitle: '',
        description: '',
        promoType: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      const handle2Change = (e) => {
        const { name, value } = e.target;
        setForm2Values((prev) => ({
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
      const promo = [
        { name: 'Basic', title: 'Advanced', description: 'Sample Description', type:'15%' },
      ];
    return(
        <Container maxW="100%" mt="100px" px={4} pl='0px' >
            <Flex alignItems="center" mb="20px">
                <Searchbar/>
                <Spacer/>
                <Flex>
                <ButtonGroup spacing={3}>
                        <IconButton
                            variant='ghost'
                            colorScheme='gray'
                            aria-label='See menu'
                            icon={<TfiReload />}
                            w="32px"
                            h="32px"
                        />
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
                              <Text fontFamily="'Work Sans', sans-serif" fontSize="12px">Filter</Text>  
                            </Button>
                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent p="4">
                                <PopoverArrow />
                                <PopoverHeader fontWeight="bold" pb="2" borderBottom="none" fontFamily="'Work Sans', sans-serif">FILTER ORGANIZATION</PopoverHeader>
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
                        <Button onClick={onOpen} w='117px' h='32px' bgColor='#D2042D' leftIcon={<TiPlus />} color='#FFFF'>
                           <Text fontFamily="'Work Sans', sans-serif" fontSize="12px"> Create {content}</Text> 
                        </Button>
                </ButtonGroup>
                </Flex>
            </Flex>
            <Box mt="30px" w="100%" mx="auto" >
                <TableContainer overflowX='hidden' overflowY='hidden'>
                    <Table variant="simple"  size="sm">
                       {content==='Plan'? (<>
                        <Thead bgColor="#F9FAFB">
                                <Tr>
                                    <Th  color='black' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'>Plan Name</Th>
                                    <Th  color='black' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'>Description</Th>
                                    <Th  color='black' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'>Modules</Th>
                                    <Th  color='black' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'>Date Created</Th>
                                    <Th  color='black' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'>Action</Th>
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
                                        <Menu isLazy>
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
                       </>):<>
                            <Thead bgColor="#F9FAFB">
                                <Tr>
                                    <Th  color='black' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'>Promo Name</Th>
                                    <Th  color='black' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'>Promo Title</Th>
                                    <Th  color='black' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'>Description</Th>
                                    <Th  color='black' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'>Promo Type</Th>
                                    <Th  color='black' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {promo.map((promo, index) => (
                                    <Tr key={index}>
                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif" fontSize="12px">{promo.name}</Td>
                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif" fontSize="12px">{promo.title}</Td>
                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif" fontSize="12px">{promo.description}</Td>
                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif" fontSize="12px">{promo.type}</Td>
                                    <Td>
                                    <Menu isLazy>
                                        <MenuButton as={IconButton} variant="ghost" colorScheme="gray" aria-label="Options" icon={<BsThreeDotsVertical />} />
                                        <MenuList>
                                        <MenuGroup title="Action">
                                            <MenuItem ml=" 10px" h="40px" w="205px" padding={"12px 16px 12px 16px"} borderBottom={"1px solid #F3F4F6"} _hover={{borderBottomColor:"blue.200",}}>Pause</MenuItem>
                                            <MenuItem ml=" 10px" h="40px" w="205px" padding={"12px 16px 12px 16px"} borderBottom={"1px solid #F3F4F6"} _hover={{borderBottomColor:"blue.200",}}>Delete</MenuItem>
                                        </MenuGroup>
                                        </MenuList>
                                        </Menu>
                                    </Td>
                                    </Tr>
                                ))}
                        </Tbody>
                       </>}
                    </Table>
                </TableContainer>
            </Box>
            <Flex ml='30px' mr='8px' w='1000px'>
                <Pagination/>
            </Flex>
            {content==="Plan"?
              <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>New Plan</ModalHeader>
              <ModalCloseButton />
              <ModalBody px={6} py={4}> 
                <FormControl isRequired>
                  <FormLabel requiredIndicator={null}>Plan Name</FormLabel>
                  <Input name="planName" placeholder="Enter Plan Name" value={formValues.planName} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired mt={4}>
                  <FormLabel requiredIndicator={null}>Description</FormLabel>
                  <Textarea name="description" placeholder="Enter Description" value={formValues.description} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired mt={4}>
                  <FormLabel requiredIndicator={null}>Module</FormLabel>
                  <Select name="module" placeholder="Select Module" value={formValues.module} onChange={handleChange}>
                    <option value="Payments">Payments</option>
                    <option value="Invoicing">Invoicing</option>
                    <option value="User Management">User Management</option>
                    <option value="Advanced">Advanced</option>
                  </Select>
                </FormControl>
                <FormControl isRequired mt={4}>
                  <FormLabel requiredIndicator={null}>Channel</FormLabel>
                  <Select name="channel" placeholder="Select Channel" value={formValues.channel} onChange={handleChange}>
                    <option value="Email">Email</option>
                    <option value="SMS">SMS</option>
                    <option value="Push">Push Notification</option>
                  </Select>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="red" w="100%" onClick={onClose} isDisabled={!isFormComplete}>Submit</Button>
              </ModalFooter>
            </ModalContent>
              </Modal>:
              <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>New Promo</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody px={6} py={4}> 
                    <FormControl isRequired>
                      <FormLabel requiredIndicator={null}>Promo Name</FormLabel>
                      <Input name="name" placeholder="Enter Promo Name" value={form2Values.promoName} onChange={handle2Change} />
                    </FormControl>
                    <FormControl isRequired mt={4}>
                      <FormLabel requiredIndicator={null}>Promo Title</FormLabel>
                      <Input name="title" placeholder="Enter Promo Title" value={form2Values.promoTitle} onChange={handle2Change} />
                    </FormControl>
                    <FormControl isRequired mt={4}>
                      <FormLabel requiredIndicator={null}>Description</FormLabel>
                      <Textarea name="description" placeholder="Enter Description" value={formValues.description} onChange={handle2Change} />
                    </FormControl>
                    <FormControl isRequired mt={4}>
                      <FormLabel requiredIndicator={null}>Promo Type</FormLabel>
                      <Select name="type" placeholder="Select Promo Type" value={form2Values.promoType} onChange={handle2Change}>
                        <option value="All">All</option>
                        <option value="Free Plan">Free Plan</option>
                        <option value="Startup Plan">Start-up Plan</option>
                        <option value="Unicorn Plan">Unicorn Plan</option>
                        <option value="Custom">Custom</option>
                      </Select>
                      <RadioGroup onChange={setValue} value={value}>
                        <Stack direction="row" mt={2}>
                          <Radio colorScheme="red" value="1">Amount/Percentage off</Radio>
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                    <Flex mt={4} gap={4}>
                      <FormControl isRequired>
                        <FormLabel requiredIndicator={null}>Start Date</FormLabel>
                        <Select name="channel" placeholder="Select Channel" value={formValues.channel} onChange={handleChange}>
                          <option value="Email">Email</option>
                          <option value="SMS">SMS</option>
                          <option value="Push">Push Notification</option>
                        </Select>
                      </FormControl>
                      <FormControl isRequired>
                        <FormLabel requiredIndicator={null}>End Date</FormLabel>
                        <Select name="channel" placeholder="Select Channel" value={formValues.channel} onChange={handleChange}>
                          <option value="Email">Email</option>
                          <option value="SMS">SMS</option>
                          <option value="Push">Push Notification</option>
                        </Select>
                      </FormControl>
                    </Flex>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="red" w="100%" onClick={onClose} isDisabled={!isFormComplete}>Submit</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            }
        </Container>
    )
}