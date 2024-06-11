import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    useToast,
    Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Select, HStack
} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { DEFAULT_CREATE_BUDGET_ERR_MSG, getAPIEndpoint } from '../../../config';
import axios from 'axios';
import { auditLog, logger } from '../models/logging';

export const AddBudget = ({ isOpen, onClose, banks = [], categories = [], dataset = [], isEdit = false, resetEdit, refreshData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [modalTitle, setModalTitle] = useState(isEdit ? "Edit Budget" : "Create Budget");
    const [buttonText, setButtonText] = useState(isEdit ? "Update" : "Create");
    const [title, setTitle] = useState();
    const [amount, setAmount] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [assignedTo, setAssignedTo] = useState();
    const [category, setCategory] = useState();
    const toast = useToast();

    const closeModal = () => {
        reset();
        onClose();
    }

    const reset = () => {
        setTitle('');
        setAmount('');
        setStartDate('');
        setEndDate('');
        setAssignedTo('');
        setCategory('');
        setIsLoading(false)
        setModalTitle('Create Budget');
        setButtonText('Create');
        resetEdit();
    }

    useEffect(() => {
        if (isEdit && dataset.length > 0) {
            setTitle(dataset[0].budget_title);
            setAmount(dataset[0].budget_amount);
            setStartDate(dataset[0].start_date.substring(0, 10));
            setEndDate(dataset[0].end_date.substring(0, 10));
            setAssignedTo(dataset[0].assigned_to);
            setCategory(dataset[0].budget_category_id);
            setModalTitle("Edit Budget");
            setButtonText("Update");
        }
        else {
            setModalTitle("Create Budget");
            setButtonText("Create");
        }
    }, [isOpen]);

    const saveBudget = async () => {
        setIsLoading(true);
        try {
            const payload = {
                params: {
                    title,
                    amount,
                    category,
                    startDate,
                    endDate,
                    assignedTo,
                    createdBy: sessionStorage.getItem("id"),
                    isEdit,
                    id: isEdit ? dataset[0].id : null
                }
            };

            const response = await axios.post(getAPIEndpoint('add-budget'), payload, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsLoading(false);
                    toast({
                        description: `Budget has been successfully ${isEdit ? "updated" : "created"}.`,
                        position: "top",
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                    });

                    if (isEdit) {
                        await auditLog({
                            activity: `Modified budget (${title})`,
                            module: "Budget",
                            userId: sessionStorage.getItem("id")
                        }, sessionStorage.getItem("tk"));
                    }
                    else {
                        await auditLog({
                            activity: `Created budget (${title})`,
                            module: "Budget",
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
                            description: `${DEFAULT_CREATE_BUDGET_ERR_MSG}. ${err ? "[Details: " + err + "]" : ""} `,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_CREATE_BUDGET_ERR_MSG,
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
            await logger({ task: "Create Budget", error: error.toString() });
        }
        toast({
            description: DEFAULT_CREATE_BUDGET_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsLoading(false);
    }

    const processForm = async (e) => {
        e.preventDefault();
        await saveBudget();
    }

    return (
        <>
            <Modal isCentered size={'lg'} closeOnOverlayClick={false} isOpen={isOpen} onClose={closeModal}>
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
                                        <FormLabel fontSize={"sm"}>Budget Title</FormLabel>
                                        <Input size={"sm"} rounded={5} type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontSize={"sm"}>Budget Amount</FormLabel>
                                        <Input pattern='[0-9.]*' size={"sm"} rounded={5} type='text' value={amount} onChange={(e) => setAmount((v) => e.target.validity.valid ? e.target.value : '')} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontSize={"sm"}>Budget Category</FormLabel>
                                        <Select placeholder='select a category' size={"sm"} rounded={5} value={category} onChange={(e) => setCategory(e.target.value)}>
                                            {
                                                categories.map((v, k) =>
                                                    <option key={k} value={v.id}>{v.category_name}</option>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                    <HStack spacing={3}>
                                        <FormControl isRequired>
                                            <FormLabel fontSize={"sm"}>Start Date</FormLabel>
                                            <Input size={"sm"} rounded={5} type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel fontSize={"sm"}>End Date</FormLabel>
                                            <Input size={"sm"} rounded={5} type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                                        </FormControl>
                                    </HStack>
                                    <FormControl isRequired>
                                        <FormLabel fontSize={"sm"}>Assigned To</FormLabel>
                                        <Select placeholder='select an institution' size={"sm"} rounded={5} value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)}>
                                            {
                                                banks.map((v, k) =>
                                                    <option key={k} value={v.bank_name}>{v.bank_name}</option>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Stack w={'100%'} pb={2}>
                                <Button
                                    type='submit'
                                    isDisabled={isLoading}
                                    isLoading={isLoading}
                                    bg={'#1C6BFF'}
                                    _hover={{ bg: '#1C6BFFDD' }}
                                    color={"white"}
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