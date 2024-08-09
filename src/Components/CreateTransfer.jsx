import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    FormErrorMessage,
    useToast,
    Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Select, HStack,
    Checkbox
} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { DEFAULT_ADD_INVOICE_ERR_MSG, getAPIEndpoint } from '../../config';
import axios from 'axios';
import { auditLog, logger } from '../models/logging';
import EmailValidator from "email-validator";
import { personalEmailDomains } from '../models/providers';

export const CreateTransfer = ({ isOpen, onClose, dataset = [], isEdit = false, resetEdit, refreshData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [modalTitle, setModalTitle] = useState(isEdit ? "Edit Transfer" : "Schedule Transfer");
    const [buttonText, setButtonText] = useState(isEdit ? "Update" : "Schedule");
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [role, setRole] = useState();
    const [email, setEmail] = useState('');
    const [emailIsError, setEmailIsError] = useState(false);
    const toast = useToast();

    const [ transferFrom, setTransferFrom ] = useState();
    const [ institution, setInstitution ] = useState();
    const [ transferTo, setTransferTo ] = useState();
    const [ category, setCategory ] = useState();
    const [ accountName, setAccountName ] = useState();
    const [ amount, setAmount ] = useState();
    const [ description, setDescription ] = useState();
    const [ date, setDate ] = useState();
    const [ time, setTime ] = useState();
    const [ startDate, setStartDate ] = useState();
    const [ startTime, setStartTime ] = useState();
    const [ endDate, setEndDate ] = useState();
    const [ endTime, setEndTime ] = useState();
    const [ isRecurring, setIsRecurring ] = useState();

    const handleCheckboxChange = (event) => {
        setIsRecurring(event.target.checked);
    };


    const closeModal = () => {
        reset();
        onClose();
    }

    useEffect(() => {
        if (email.length > 0 && !EmailValidator.validate(email)) {
            setEmailIsError(true);
        }
        else {
            const tmp = email.split("@");
            const domain = personalEmailDomains.filter(e => e === tmp[1]);
            if (domain.length > 0) {
                setEmailIsError(true);
            }
            else {
                setEmailIsError(false);
            }
        }
    }, [email]);

    useEffect(() => {
        if (isEdit && dataset.length > 0) {
            setTransferFrom(dataset[0].fromAcct);
            setInstitution(dataset[0].institution);
            setTransferTo(dataset[0].toAcct);
            setCategory(dataset[0].category);
            setAccountName(dataset[0].toAcctName);
            setAmount(dataset[0].amount);
            setDescription(dataset[0].description);
            setDate(dataset[0].scheduleDate);
            setTime(dataset[0].scheduleTime);
            setStartDate('');
            setStartTime('');
            setEndDate('');
            setEndTime('');
            setModalTitle("Edit Transfer");
            setButtonText("Update");
        }
        else {
            setModalTitle("Create Transfer");
            setButtonText("Create Transfer");
        }
    }, [isOpen]);

    const reset = () => {
        setTransferFrom('');
        setInstitution('');
        setTransferTo('');
        setCategory('');
        setAccountName('');
        setAmount('');
        setDescription('');
        setDate('');
        setTime('');
        setStartDate('');
        setStartTime('');
        setEndDate('');
        setEndTime('');
        setIsLoading(false);
        setModalTitle('Create Transfer');
        setButtonText('Create Transfer');
        resetEdit();
    }

    const saveInvoiceInfo = async () => {
        setIsLoading(true);
        try {
            const payload = {
                params: {
                    firstName,
                    lastName,
                    email,
                    role,
                    createdBy: sessionStorage.getItem("id"),
                    isEdit,
                    id: isEdit ? dataset[0].id : null
                }
            };

            const response = await axios.post(getAPIEndpoint('user-assign-role'), payload, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsLoading(false);
                    toast({
                        description: `Invoice has been successfully ${isEdit ? "updated" : "created"}.`,
                        position: "top",
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                    })

                    if (isEdit) {
                        await auditLog({
                            activity: `Edited invoice (${firstName} ${lastName})`,
                            module: "Cashflow",
                            userId: sessionStorage.getItem("id")
                        }, sessionStorage.getItem("tk"));
                    }
                    else {
                        await auditLog({
                            activity: `Created invoice (${firstName} ${lastName})`,
                            module: "Cashflow",
                            userId: sessionStorage.getItem("id")
                        }, sessionStorage.getItem("tk"));
                    }

                    refreshData();
                    closeModal();
                    return;
                }
                else {
                    setIsLoading(false);
                    let err = "";

                    if (data.length > 0) {
                        err = data[0].error;
                    }

                    if (err) {
                        toast({
                            description: `${DEFAULT_USER_ROLE_ASSIGN_ERR_MSG}. ${err ? "[Details: " + err + "]" : ""} `,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_USER_ROLE_ASSIGN_ERR_MSG,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    return;
                }
            }
        } catch (error) {
            console.log(error)
            await logger({ task: "Assign user to role", error: error.toString() });
        }
        toast({
            description: DEFAULT_USER_ROLE_ASSIGN_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsLoading(false);
    }

    const processForm = async (e) => {
        e.preventDefault();
        await saveInvoiceInfo();
    }

    return (
        <>
            <Modal isCentered size={'lg'} closeOnOverlayClick={false} isOpen={isOpen} onClose={closeModal} maxHeight={"70%"}>
                <ModalOverlay />
                <ModalContent rounded={15}>
                    <form onSubmit={processForm}>
                        <ModalHeader>
                            <Stack spacing={3} pt={0}>
                                <Text fontSize={'18px'}>{modalTitle}</Text>
                                <Text color={'gray.500'} fontWeight={'normal'} fontSize={'13px'}>
                                    Fields marked with (*) are required.
                                </Text>
                            </Stack>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={2}>
                            <div style={{ overflow: 'auto', maxHeight: '60vh' }}>
                                <Stack spacing={4}>
                                    <FormControl isRequired>
                                        <FormLabel fontSize={"sm"}>Transfer From</FormLabel>
                                        <Input size={"sm"} border={"1px solid #D1D5DB"} type='text' value={transferFrom} onChange={(e) => setTransferFrom(e.target.value)} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontSize={"sm"}>Beneficiary Financial Institution</FormLabel>
                                        <Input size={"sm"} border={"1px solid #D1D5DB"} type='text' value={institution} onChange={(e) => setInstitution(e.target.value)} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Beneficiary Account</FormLabel>
                                        <Input size={'sm'} border={"1px solid #D1D5DB"} type="text" value={transferTo} onChange={(e) => setTransferTo(e.target.value)} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontSize={"sm"}>Category</FormLabel>
                                        <Input size={"sm"} border={"1px solid #D1D5DB"} type='text' value={category} onChange={(e) => setCategory(e.target.value)} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontSize={"sm"}>Beneficiary Account Name</FormLabel>
                                        <Input size={"sm"} border={"1px solid #D1D5DB"} type='text' value={accountName} onChange={(e) => setAccountName(e.target.value)} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontSize={"sm"}>Amount</FormLabel>
                                        <Input size={"sm"} border={"1px solid #D1D5DB"} type='text' value={amount} onChange={(e) => setAmount(e.target.value)} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontSize={"sm"}>Description</FormLabel>
                                        <Input size={"sm"} border={"1px solid #D1D5DB"} type='text' value={description} onChange={(e) => setDescription(e.target.value)} />
                                    </FormControl>
                                    {!isRecurring && <HStack direction={"row"}>
                                        <FormControl isRequired>
                                            <FormLabel fontSize={"sm"}>Date</FormLabel>
                                            <Input size={"sm"} border={"1px solid #D1D5DB"} type='date' value={date} onChange={(e) => setDate(e.target.value)} />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel fontSize={"sm"}>Time</FormLabel>
                                            <Input size={"sm"} border={"1px solid #D1D5DB"} type='time' value={time} onChange={(e) => setTime(e.target.value)} />
                                        </FormControl>
                                    </HStack>}
                                    {isRecurring && <HStack direction={"row"}>
                                        <FormControl isRequired>
                                            <FormLabel fontSize={"sm"}>Start Date</FormLabel>
                                            <Input size={"sm"} border={"1px solid #D1D5DB"} type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel fontSize={"sm"}>Start Time</FormLabel>
                                            <Input size={"sm"} border={"1px solid #D1D5DB"} type='time' value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                                        </FormControl>
                                    </HStack>}
                                    {isRecurring && <HStack direction={"row"}>
                                        <FormControl isRequired>
                                            <FormLabel fontSize={"sm"}>End Date</FormLabel>
                                            <Input size={"sm"} border={"1px solid #D1D5DB"} type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel fontSize={"sm"}>End Time</FormLabel>
                                            <Input size={"sm"} border={"1px solid #D1D5DB"} type='time' value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                                        </FormControl>
                                    </HStack>}
                                    <FormControl>
                                        <Checkbox value={isRecurring} onChange={handleCheckboxChange}>Recurring</Checkbox>
                                    </FormControl>
                                </Stack>
                            </div>
                        </ModalBody>

                        {/*                             
                            <form action="">
                                <div className={styles.formGroup}>
                                    <label htmlFor="fromAcct">Transfer from</label>
                                    <select name="" id="">
                                        <option value="">Select account</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="fromAcct">Beneficiary Financial Institution</label>
                                    <select name="" id="">
                                        <option value="">Select institution</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="fromAcct">Beneficiary Account</label>
                                    <input type="number" name="" id="" placeholder="e.g 12345678" />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="fromAcct">Category</label>
                                    <select name="" id="">
                                        <option value="">Select category</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="fromAcct">Beneficiary Account Name</label>
                                    <select name="" id="">
                                        <option value="">Select account</option>
                                    </select>
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="fromAcct">Amount</label>
                                    <input type="number" name="" id="" placeholder="0.00" />
                                </div>

                                <div className={styles.formGroup}>
                                    <label htmlFor="fromAcct">Description</label>
                                    <input type="text" name="" id="" placeholder="" />
                                </div>

                            </form>
                        </div> */}

                        <ModalFooter>
                            <Stack w={'100%'} pb={2}>
                                <Button
                                    type='submit'
                                    isLoading={isLoading}
                                    bg={'#D2042D'}
                                    _hover={{ bg: '#BD0429' }}
                                    color={"white"}
                                    fontSize={'16px'}
                                    fontWeight={500}
                                    rounded={'8px'}
                                >
                                    {buttonText}
                                </Button>
                            </Stack>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    )
}