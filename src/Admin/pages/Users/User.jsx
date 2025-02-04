import React,{ useState, useEffect }  from "react";
import {InputGroup
    ,InputLeftElement,
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
    PopoverCloseButton,ButtonGroup,
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
     Button,Textarea,Tag,TagLabel,MenuGroup,MenuDivider} from "@chakra-ui/react";
import { Searchbar } from "../../components/Searchbar/SearchBar";
import { useOutletContext } from 'react-router-dom';
import { TfiReload } from "react-icons/tfi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiSoundModuleLine } from "react-icons/ri";
import { TiPlus } from "react-icons/ti";
import { GoDash } from "react-icons/go";
import { FaRegCalendarAlt } from "react-icons/fa";
// import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css'; 
import './DatePickerStyles.css'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Pagination } from "../../components/Pagination/Pagination";
import '@fontsource-variable/work-sans'

export const User =()=>{
    const { content} = useOutletContext(); 
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [date, setDate] = useState(new Date());

    const [formValues, setFormValues] = useState({
        organizationName: '',
        description: '',
        industry: '',
        companyEmail: '',
        plan:'',
      });
      const [adminValues, setadminValues] = useState({
        FirstName: '',
        LastName: '',
        adminEmail: '',
        role:'',
      });
      const [memberValues, setValues] = useState({
        FirstName: '',
        LastName: '',
        OrganizeName: '',
        Email: '',
        phoneNumber:'',
        dob:'',
      });
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      const handleAdminChange = (e) => {
        const { name, value } = e.target;
        setadminValues((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      const handleMemberChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      

      const isFormComplete = Object.values(formValues).every((value) => value.trim() !== '');
      const today = new Date();
      const formattedDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
      const organizations=[
        {organizationName:'Acme Solutions Inc.',description:'Determing the....',industry:'Technology',companyEmail:'admin@acmesolutions.com',datejoined:formattedDate,no_members:100,plan:'Enterprise'},
        
    ];
    const admins=[
        {fname:'Chimaje',lname:'Agada',email:'admin@acmesolutions.com',role:'Admin/Owner'},
        {fname:'Chimaje',lname:'Agada',email:'admin@acmesolutions.com',role:'Financial Manager'},
        
    ];
    const members=[
        {fname:'Chimaje',lname:'Agada',email:'admin@acmesolutions.com',status:'Active',phonenum:17524871468910,datejoined:formattedDate},
        {fname:'Chimaje',lname:'Agada',email:'admin@acmesolutions.com',status:'Active',phonenum:17524871468910,datejoined:formattedDate},
        
    ];

    return(
        <Container maxW="100%" mt="100px" px={4} pl='0px' overflowX='hidden' >
            <Flex alignItems="center" mb="20px">
                <Searchbar/>
                <Spacer/>
                <ButtonGroup spacing={3}>
                        <IconButton
                            variant='ghost'
                            colorScheme='gray'
                            aria-label='See menu'
                            icon={<TfiReload />}
                        />
                        {content==='Organization'?
                        <Popover w="368px" h="350px">
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
                                <PopoverHeader fontWeight="bold" pb="2" borderBottom="none">FILTER ORGANIZATION <PopoverCloseButton /></PopoverHeader>
                                
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
                        :
                        content==='Admin'?
                        <Popover w="368px" h="350px">
                            <PopoverTrigger>
                                    <Button w='80px' h='32px' bgColor="#FBE6EA" color='#D2042D' leftIcon={ <Icon as={RiSoundModuleLine} transform='rotate(180deg)'/>} >
                                        Filter
                                    </Button>
                            </PopoverTrigger>
                            <Portal>
                                <PopoverContent>
                                <PopoverArrow />
                                <PopoverHeader>Filter Admin</PopoverHeader>
                                <PopoverCloseButton />
                                <PopoverBody>
                                    <FormControl>
                                        <FormLabel>Name</FormLabel>
                                        <Select placeholder='Select Industry'>
                                        <option value='option1'>Option 1</option>
                                        <option value='option2'>Option 2</option>
                                        <option value='option3'>Option 3</option>
                                        </Select>
                                        <FormLabel>Date Created</FormLabel>
                                        <Flex justifyContent='center ' alignItems='center'>
                                            <Button w='140px'>Start Date</Button>
                                            <Icon as={GoDash} />
                                            <Button w='140px'>End Date</Button>
                                        </Flex>
                                    </FormControl>
                                </PopoverBody>
                                <PopoverFooter>
                                     <Flex justifyContent='center ' gap='5'>
                                        <Button w='140px' colorScheme='red'borderRadius='0'>Apply</Button>
                                        <Button w='140px' variant='outline' colorScheme='red' borderRadius='0'>Reset All</Button>
                                    </Flex>
                                </PopoverFooter>
                                </PopoverContent>
                            </Portal>
                        </Popover>
                        :
                        <Popover w="368px" h="350px">
                            <PopoverTrigger>
                                    <Button w='80px' h='32px' bgColor="#FBE6EA" color='#D2042D' leftIcon={ <Icon as={RiSoundModuleLine} transform='rotate(180deg)'/>} >
                                        Filter
                                    </Button>
                            </PopoverTrigger>
                            <Portal>
                                <PopoverContent>
                                <PopoverArrow />
                                <PopoverHeader>Filter Member</PopoverHeader>
                                <PopoverCloseButton />
                                <PopoverBody>
                                    <FormControl>
                                        <FormLabel>Name</FormLabel>
                                        <Select placeholder='Select Name'>
                                        <option value='option1'>Option 1</option>
                                        <option value='option2'>Option 2</option>
                                        <option value='option3'>Option 3</option>
                                        </Select>
                                        <FormLabel>Biller Type</FormLabel>
                                        <Select placeholder='Select Biller type'>
                                        <option value='option1'>Option 1</option>
                                        <option value='option2'>Option 2</option>
                                        <option value='option3'>Option 3</option>
                                        </Select>
                                        <FormLabel>Date Created</FormLabel>
                                        <Flex justifyContent='center ' alignItems='center'>
                                            <Button w='140px'>Start Date</Button>
                                            <Icon as={GoDash} />
                                            <Button w='140px'>End Date</Button>
                                        </Flex>
                                    </FormControl>
                                </PopoverBody>
                                <PopoverFooter>
                                     <Flex justifyContent='center ' gap='5'>
                                        <Button w='140px' colorScheme='red'borderRadius='0'>Apply</Button>
                                        <Button w='140px' variant='outline' colorScheme='red' borderRadius='0'>Reset All</Button>
                                    </Flex>
                                </PopoverFooter>
                                </PopoverContent>
                            </Portal>
                        </Popover>
                        }
                        <Button onClick={onOpen}  px={4} py={2}  h='32px' bgColor='#D2042D' leftIcon={<TiPlus />} color='#FFFF'>
                          <Text fontFamily="'Work Sans', sans-serif" fontSize={"12px"}> Add New {content}</Text>  
                        </Button>
                        
                </ButtonGroup>
                
            </Flex>
                    <Box mt="30px" w="100%" mx="auto">
                        <TableContainer overflowX='hidden' overflowY='hidden'>
                            <Table variant="simple" colorScheme="gray" size="sm">
                                {content === "Organization" ? (
                                    <>
                                        <Thead bg="#F9FAFB">
                                            <Tr>
                                                <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'><Text fontSize="12px">Organization Name</Text></Th>
                                                <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'><Text fontSize="12px">Description</Text></Th>
                                                <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'><Text fontSize="12px">Industry</Text></Th>
                                                <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'><Text fontSize="12px">Admin Email</Text></Th>
                                                <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'><Text fontSize="12px">Date Joined</Text></Th>
                                                <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'><Text fontSize="12px">No. of Members</Text></Th>
                                                <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'><Text fontSize="12px">Subscription Plan</Text></Th>
                                                <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none' ><Text fontSize="12px">Action</Text></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {organizations.map((organ) => (
                                                <Tr key={organ.id}>
                                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif" ><Text fontSize="12px">{organ.organizationName || "Acme Solutions Inc."}</Text></Td>
                                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif"><Text fontSize="12px">{organ.description || "Default description"}</Text></Td>
                                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif"><Text fontSize="12px">{organ.industry || "Industry Name"}</Text></Td>
                                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif"><Text fontSize="12px">{organ.companyEmail || "email@example.com"}</Text></Td>
                                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif"><Text fontSize="12px">{organ.dateJoined || "2024-10-22"}</Text></Td>
                                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif"><Text fontSize="12px">{organ.no_members || "10"}</Text></Td>
                                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif"><Text fontSize="12px">{organ.plan || "Basic Plan"}</Text></Td>
                                                    <Td  py="2">
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
                                    </>
                                ) : content === "Admin" ? (
                                    <>
                                        <Thead bg="#F9FAFB">
                                            <Tr>
                                                <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'><Text fontSize="12px">First Name</Text></Th>
                                                <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'><Text fontSize="12px">Last Name</Text></Th>
                                                <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'><Text fontSize="12px">Admin Email</Text></Th>
                                                <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'><Text fontSize="12px">Roles & Permissions</Text></Th>
                                                <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'><Text fontSize="12px">Action</Text></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {admins.map((admin) => (
                                                <Tr key={admin.id}>
                                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif"><Text fontSize="12px">{admin.fname}</Text></Td>
                                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif"><Text fontSize="12px">{admin.lname}</Text></Td>
                                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif"><Text fontSize="12px">{admin.email}</Text></Td>
                                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif">
                                                        <Select placeholder={admin.role} borderRadius="md" size="sm">
                                                            <option value="Admin/Owner">Admin/Owner</option>
                                                            <option value="Financial Manager">Financial Manager</option>
                                                            <option value="Account Manager">Account Manager</option>
                                                            <option value="Employee/User">Employee/User</option>
                                                        </Select>
                                                    </Td>
                                                    <Td px="4" py="2">
                                                        <Menu w='221px' h="210px" borderRadius="8px" isLazy>
                                                            <MenuButton as={IconButton} variant="ghost" colorScheme="gray" icon={<BsThreeDotsVertical />} />
                                                            <MenuList>
                                                                <MenuItem ml=" 10px" h="40px" w="205px" padding={"12px 16px 12px 16px"} borderBottom={"1px solid #F3F4F6"} _hover={{borderBottomColor:"blue.200",}}>Remove</MenuItem>
                                                                <MenuItem ml=" 10px" h="40px" w="205px" padding={"12px 16px 12px 16px"} borderBottom={"1px solid #F3F4F6"} _hover={{borderBottomColor:"blue.200",}}>Suspend</MenuItem>
                                                            </MenuList>
                                                        </Menu>
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </>
                                ) : (
                                    <>
                                        <Thead bg="#F9FAFB">
                                            <Tr>
                                                <Th color='#374151' px="4" py="2" fontFamily="'Work Sans', sans-serif"textTransform='none'><Text fontSize="12px">First Name</Text></Th>
                                                <Th color='#374151'px="4" py="2" fontFamily="'Work Sans', sans-serif" textTransform='none'><Text fontSize="12px">Last Name</Text></Th>
                                                <Th color='#374151'px="4" py="2" fontFamily="'Work Sans', sans-serif" textTransform='none'><Text fontSize="12px">Organization</Text></Th>
                                                <Th color='#374151'px="4" py="2" fontFamily="'Work Sans', sans-serif" textTransform='none'><Text fontSize="12px">Email Address</Text></Th>
                                                <Th color='#374151'px="4" py="2" fontFamily="'Work Sans', sans-serif" textTransform='none'><Text fontSize="12px">Status</Text></Th>
                                                <Th color='#374151'px="4" py="2" fontFamily="'Work Sans', sans-serif" textTransform='none'><Text fontSize="12px">Phone Number</Text></Th>
                                                <Th color='#374151'px="4" py="2" fontFamily="'Work Sans', sans-serif" textTransform='none'><Text fontSize="12px">Created Date</Text></Th>
                                                <Th color='#374151'px="4" py="2" fontFamily="'Work Sans', sans-serif" textTransform='none'><Text fontSize="12px">Action</Text></Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {members.map((member, index) => (
                                                <Tr key={index}>
                                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif"><Text fontSize="12px">{member.fname}</Text></Td>
                                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif"><Text fontSize="12px">{member.lname}</Text></Td>
                                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif"><Text fontSize="12px">{member.organization}</Text></Td>
                                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif"><Text fontSize="12px">{member.email}</Text></Td>
                                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif">
                                                        <Tag borderRadius="full" colorScheme="green">
                                                            <TagLabel>{member.status}</TagLabel>
                                                        </Tag>
                                                    </Td>
                                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif"><Text fontSize="12px">{member.phonenum}</Text></Td>
                                                    <Td px="4" py="2" fontFamily="'Work Sans', sans-serif"><Text fontSize="12px">{member.datejoined}</Text></Td>
                                                    <Td px="4" py="2">
                                                        <Menu w='221px' h="210px" borderRadius="8px" isLazy>
                                                            <MenuButton as={IconButton} variant="ghost" colorScheme="gray" icon={<BsThreeDotsVertical />} />
                                                            <MenuList>
                                                                <MenuItem ml=" 10px" h="40px" w="205px" padding={"12px 16px 12px 16px"} borderBottom={"1px solid #F3F4F6"} _hover={{borderBottomColor:"blue.200",}}>Remove</MenuItem>
                                                                <MenuItem ml=" 10px" h="40px" w="205px" padding={"12px 16px 12px 16px"} borderBottom={"1px solid #F3F4F6"} _hover={{borderBottomColor:"blue.200",}}>Suspend</MenuItem>
                                                            </MenuList>
                                                        </Menu>
                                                    </Td>
                                                </Tr>
                                            ))}
                                        </Tbody>
                                    </>
                                )}
                            </Table>
                        </TableContainer>
                    </Box>


            <Flex ml='30px' mr='8px' w='1000px'>
                <Pagination/>
            </Flex>
            {content==='Organization'?
                        <Modal h="383" isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
                        <ModalOverlay />
                        <ModalContent>
                        <ModalHeader>New Organization</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl isRequired  >
                            <FormLabel requiredIndicator={null}>Organization Name</FormLabel>
                            <Input
                                name="organizationName"
                                placeholder="Enter Organization Name"
                                value={formValues.organizationName}
                                onChange={handleChange}
                                borderRadius='0'
                            />
                            </FormControl>
                            <FormControl isRequired mt={4}>
                                <FormLabel requiredIndicator={null}>Description</FormLabel>
                                <Textarea
                                    name="description"
                                    placeholder="Enter Description"
                                    value={formValues.description}
                                    onChange={handleChange}
                                    h="92px"
                                    borderRadius='0'
                                />
                            </FormControl>
                            <FormControl isRequired mt={4}>
                                <FormLabel requiredIndicator={null}>Industry</FormLabel>
                                <Select
                                    name="industry"
                                    placeholder="Select Industry"
                                    value={formValues.industry}
                                    onChange={handleChange}
                                    borderRadius='0'
                                >
                                    <option value="Access Bank">Access Bank</option>
                                    <option value="First Bank">First Bank</option>
                                    <option value="GTBank">GTBank</option>
                                    <option value="Sterling Bank">Sterling Bank</option>
                                </Select>
                            </FormControl>
                            <FormControl isRequired mt={4}>
                                <FormLabel requiredIndicator={null}>Company Email</FormLabel>
                                <Input
                                    name="companyEmail"
                                    type="email"
                                    placeholder="Enter Company Email"
                                    value={formValues.companyEmail}
                                    onChange={handleChange}
                                    borderRadius='0'
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button  w='370px' colorScheme="red" mr={3} onClick={onClose} isDisabled={!isFormComplete}>
                            Submit
                            </Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>:
                    content==='Admin'?
                    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
                        <ModalOverlay />
                        <ModalContent>
                        <ModalHeader>New Admin</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl isRequired>
                            <FormLabel  requiredIndicator={null}>First Name</FormLabel>
                            <Input
                                name="fname"
                                placeholder="Enter First Name"
                                value={adminValues.FirstName}
                                onChange={handleAdminChange}
                                borderRadius='0'
                            />
                            </FormControl>
                            <FormControl isRequired>
                            <FormLabel  requiredIndicator={null}>Last Name</FormLabel>
                            <Input
                                name="lname"
                                placeholder="Enter Last Name"
                                value={adminValues.LastName}
                                onChange={handleAdminChange}
                                borderRadius='0'
                            />
                            </FormControl>
                            <FormControl isRequired mt={4}>
                                <FormLabel  requiredIndicator={null}>Description</FormLabel>
                                <Textarea
                                    name="description"
                                    placeholder="Enter Description"
                                    h="92px"
                                    borderRadius='0'
                                />
                            </FormControl>
                            <FormControl isRequired mt={4}>
                                <FormLabel  requiredIndicator={null}> Email</FormLabel>
                                <Input
                                    name="companyEmail"
                                    type="email"
                                    placeholder="Enter Email"
                                    value={adminValues.adminEmail}
                                    onChange={handleAdminChange}
                                    borderRadius='0'
                                />
                            </FormControl>
                            <FormControl isRequired mt={4}>
                                <FormLabel  requiredIndicator={null}>Roles</FormLabel>
                                <Select
                                    name="Roles"
                                    placeholder="Select Role"
                                    value={adminValues.role}
                                    onChange={handleAdminChange}
                                    borderRadius='0'
                                >
                                    <option value="Admin/Owner">Admin/Owner</option>
                                    <option value="Financial Manager">Financial Manager</option>
                                    <option value="Account Manager">Account Manager</option>
                                    <option value="Employee/User">Employee/User</option>
                                </Select>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button w='370px' colorScheme="red" mr={3} onClick={onClose} isDisabled={!isFormComplete}>
                            Submit
                            </Button>
                        </ModalFooter>
                        </ModalContent>
                    </Modal>
                    :
                    <Modal isOpen={isOpen} onClose={onClose} motionPreset='slideInBottom'>
                    {/* the datepicker needs work */}
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader>New Member</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isRequired>
                        <FormLabel requiredIndicator={null}>First Name</FormLabel>
                        <Input
                            name="organizationName"
                            placeholder="Enter First Name"
                            value={memberValues.FirstName}
                            onChange={handleMemberChange }
                        />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel requiredIndicator={null}>Last Name</FormLabel>
                            <Input
                                name="lastname"
                                placeholder="Enter Last Name"
                                value={memberValues.LastName}
                                onChange={handleMemberChange }
                            />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel requiredIndicator={null}>Email</FormLabel>
                            <Input
                                name="email"
                                type='email'
                                placeholder="Enter Email"
                                value={memberValues.email}
                                onChange={handleMemberChange }
                            />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel requiredIndicator={null}>Gender</FormLabel>
                            <Select
                                name="gender"
                                placeholder="Select Gender"
                                value={formValues.industry}
                                onChange={handleMemberChange }
                            >
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="other">other</option>
                            </Select>
                        </FormControl>
                        <FormControl isRequired mt={6} px={2} w="100%">
                                {/* <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                    <FaRegCalendarAlt color="gray.400" />
                                    </InputLeftElement>
                                    <DatePicker
                                    onChange={setDate}
                                    value={date}
                                    format="dd-MM-y"
                                    clearIcon={null} 
                                    calendarIcon={null} 
                                    className="custom-date-picker" 
                                    />
                                </InputGroup> */}
                                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker label="Basic date picker" />
                                </DemoContainer>
                                </LocalizationProvider> */}
                                
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel requiredIndicator={null}>Phone Number</FormLabel>
                            <Input
                                name="phone number"
                                type='tel'
                                placeholder="Enter PhoneNumber"
                                value={memberValues.phoneNumber}
                                onChange={handleMemberChange }
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button w='370px' colorScheme="red" mr={3} onClick={onClose} isDisabled={!isFormComplete}>
                        Submit
                        </Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
                }
        </Container>
    )
}