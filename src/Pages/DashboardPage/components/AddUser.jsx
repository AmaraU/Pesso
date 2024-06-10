import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    FormErrorMessage,
    useToast,
    Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Select, HStack
} from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { DEFAULT_USER_ROLE_ASSIGN_ERR_MSG, getAPIEndpoint } from '../../../config';
import axios from 'axios';
import { auditLog, logger } from '../../../models/logging';
import EmailValidator from "email-validator";
import { personalEmailDomains } from '../../../models/providers';

export const AddUser = ({ isOpen, onClose, roles = [], dataset = [], isEdit = false, resetEdit, refreshData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [modalTitle, setModalTitle] = useState(isEdit ? "Edit User" : "Add User");
    const [buttonText, setButtonText] = useState(isEdit ? "Update" : "Add");
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [role, setRole] = useState();
    const [email, setEmail] = useState('');
    const [emailIsError, setEmailIsError] = useState(false);
    const toast = useToast();

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
            setFirstName(dataset[0].first_name);
            setLastName(dataset[0].last_name);
            setEmail(dataset[0].email_address);
            setRole(dataset[0].role_id);
            setModalTitle("Edit User");
            setButtonText("Update");
        }
        else {
            setModalTitle("Add User");
            setButtonText("Add");
        }
    }, [isOpen]);

    const reset = () => {
        setFirstName('');
        setLastName('');
        setRole('');
        setEmail('');
        setIsLoading(false);
        setModalTitle('Add User');
        setButtonText('Add');
        resetEdit();
    }

    const saveUserInfo = async () => {
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
                        description: `User has been successfully ${isEdit ? "updated" : "added"}.`,
                        position: "top",
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                    })

                    if (isEdit) {
                        await auditLog({
                            activity: `User details updated (${firstName} ${lastName})`,
                            module: "User Management",
                            userId: sessionStorage.getItem("id")
                        }, sessionStorage.getItem("tk"));
                    }
                    else {
                        await auditLog({
                            activity: `Created user (${firstName} ${lastName})`,
                            module: "User Management",
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
        await saveUserInfo();
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
                                    <HStack spacing={3}>
                                        <FormControl isRequired>
                                            <FormLabel fontSize={"sm"}>First Name</FormLabel>
                                            <Input size={"sm"} rounded={5} type='text' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel fontSize={"sm"}>Last Name</FormLabel>
                                            <Input size={"sm"} rounded={5} type='text' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                        </FormControl>
                                    </HStack>
                                    <FormControl isInvalid={emailIsError} isRequired>
                                        <FormLabel>Email Address</FormLabel>
                                        <Input size={'sm'} placeholder='' _placeholder={{ fontSize: "sm" }} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        {emailIsError && <FormErrorMessage>Please enter a valid email address.</FormErrorMessage>}
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontSize={"sm"}>Role</FormLabel>
                                        <Select placeholder='select a role' size={"sm"} rounded={5} value={role} onChange={(e) => setRole(e.target.value)}>
                                            {
                                                roles.map((v, k) =>
                                                    <option key={k} value={v.id}>{v.role_name}</option>
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
                                    isDisabled={isLoading || emailIsError}
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