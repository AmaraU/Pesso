import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Stack,
    useToast,
    Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,
    Checkbox,
    HStack,
    Grid
} from '@chakra-ui/react';
import { useState } from "react";
import { DEFAULT_ADD_ROLE_ERR_MSG, getAPIEndpoint } from '../../config';
import axios from 'axios';
import { auditLog, logger } from '../models/logging';

export const AddRole = ({ isOpen, onClose, isEdit = false, refreshData }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [modalTitle, setModalTitle] = useState(isEdit ? "Edit Role" : "Add Role");
    const [buttonText, setButtonText] = useState(isEdit ? "Update" : "Add");
    const [role, setRole] = useState();
    const [roleDescription, setRoleDescription] = useState();
    const toast = useToast();

    const closeModal = () => {
        reset();
        onClose();
    }

    const reset = () => {
        setRole('');
        setRoleDescription('');
        setIsLoading(false)
        setModalTitle('Add Role');
        setButtonText('Add');
    }

    const saveRole = async () => {
        setIsLoading(true);
        try {
            const payload = {
                params: {
                    role,
                    createdBy: sessionStorage.getItem("id")
                }
            };

            const response = await axios.post(getAPIEndpoint('add-role'), payload, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsLoading(false);
                    toast({
                        description: `Role has been successfully ${isEdit ? "updated" : "added"}.`,
                        position: "top",
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                    })

                    if (isEdit) {
                        await auditLog({
                            activity: `Role updated (${role})`,
                            module: "Role Management",
                            userId: sessionStorage.getItem("id")
                        }, sessionStorage.getItem("tk"));
                    }
                    else {
                        await auditLog({
                            activity: `Created role (${role})`,
                            module: "Role Management",
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
                            description: `${DEFAULT_ADD_ROLE_ERR_MSG}. ${err ? "[Details: " + err + "]" : ""} `,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_ADD_ROLE_ERR_MSG,
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
            await logger({ task: "Add role", error: error.toString() });
        }
        toast({
            description: DEFAULT_ADD_ROLE_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsLoading(false);
    }

    const processForm = async (e) => {
        e.preventDefault();
        await saveRole();
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
                                        <FormLabel fontSize={"sm"}>Role Name</FormLabel>
                                        <Input size={"sm"} rounded={5} type='text' value={role} onChange={(e) => setRole(e.target.value)} />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontSize={"sm"}>Role Description</FormLabel>
                                        <Input size={"sm"} rounded={5} type='text' value={role} onChange={(e) => setRoleDescription(e.target.value)} />
                                    </FormControl>
                                    
                                    <Text fontSize={"md"} fontWeight={500}>Select Permission</Text>
                                    <Checkbox size={"md"}>All Access</Checkbox>

                                    <Stack ml={'5%'}>
                                        <Checkbox size={"sm"}>Module Name</Checkbox>
                                        
                                        <Grid gridTemplateColumns={'repeat(3, auto)'} marginLeft={'5%'}>
                                            <Checkbox size={"sm"}>Create</Checkbox>
                                            <Checkbox size={"sm"}>Edit</Checkbox>
                                            <Checkbox size={"sm"}>Delete</Checkbox>
                                            <Checkbox size={"sm"}>View</Checkbox>
                                            <Checkbox size={"sm"}>Download</Checkbox>
                                            <Checkbox size={"sm"}>Approve</Checkbox>
                                        </Grid>
                                    </Stack>
                                    

                                </Stack>
                            </div>
                        </ModalBody>

                        <ModalFooter>
                            <Stack w={'100%'} pb={2}>
                                <Button
                                    type='submit'
                                    isDisabled={isLoading}
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