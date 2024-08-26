import {
    Text,
    Button,
    Input, Select,
    Stack,
    Flex,
    useToast,
    FormControl, FormLabel, 
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, 
} from '@chakra-ui/react';
import { useState } from "react";
import { getImageUrl } from '../../utils';

export const AddPayment = ({ isOpen, onClose }) => {

    const [ modalTitle, setModalTitle ] = useState("Select Payment Type");
    const [ showSingleBulk, setShowSingleBulk ] = useState(true);
    const [ showSingle, setShowSingle ] = useState(false);
    const [ showBulk, setShowBulk ] = useState(false);
    const toast = useToast();

    const closeModal = () => {
        setModalTitle("Select Payment Type");
        setShowSingleBulk(true);
        setShowSingle(false);
        setShowBulk(false);
        onClose();
    }

    const clickSingle = () => {
        setModalTitle("Single Payment");
        setShowSingleBulk(false);
        setShowSingle(true);
        setShowBulk(false);
    }

    const clickBulk = () => {
        setModalTitle("Single Payment");
        setShowSingleBulk(false);
        setShowSingle(false);
        setShowBulk(true);
    }

    const processForm = async (e) => {
        e.preventDefault();
        console.log();
    }

    return (
        <>
            <Modal isCentered size={'lg'} closeOnOverlayClick={false} isOpen={isOpen} onClose={closeModal} maxHeight={"70%"}>
                <ModalOverlay />
                <ModalContent rounded={15}>
                    <ModalHeader>
                        <Text fontSize={'16px'} fontWeight={500}>{modalTitle}</Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={2}>
                        <div style={{ overflow: 'auto', maxHeight: '60vh' }}>
                            {showSingleBulk && <Flex w={'100%'} justifyContent={'space-between'} gap={"5%"}>
                                <Stack py={'24px'} flex={1} onClick={clickSingle} cursor={'pointer'} alignItems={'center'} bg={'#F9FAFB'} borderRadius={'8px'}>
                                    <img src={getImageUrl("single.png")} style={{width: '96px', height: '96px'}} />
                                    <Text fontSize={'20px'} fontWeight={500} color={'#000000'}>Single payment</Text>
                                </Stack>

                                <Stack py={'24px'} flex={1} onClick={clickBulk} cursor={'pointer'} alignItems={'center'} bg={'#F9FAFB'} borderRadius={'8px'}>
                                    <img src={getImageUrl("bulk.png")} style={{width: '96px', height: '96px'}} />
                                    <Text fontSize={'20px'} fontWeight={500} color={'#000000'}>Bulk payment</Text>
                                </Stack>
                            </Flex>}

                            {showSingle && <Stack w={'100%'} spacing={'16px'}>
                                <FormControl>
                                    <FormLabel fontSize={'14px'} fontWeight={500} color={'#4B5563'}>Transfer From</FormLabel>
                                    <Select border={'1px solid #D1D5DB'} fontSize={'14px'} color={'#000'} placeholder={'Select account'} _placeholder={{color: '#9CA3AF'}} ></Select>
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={'14px'} fontWeight={500} color={'#4B5563'}>Beneficiary Financial Institution</FormLabel>
                                    <Select border={'1px solid #D1D5DB'} fontSize={'14px'} color={'#000'} placeholder={'Select institution'} _placeholder={{color: '#9CA3AF'}} ></Select>
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={'14px'} fontWeight={500} color={'#4B5563'}>Beneficiary Account</FormLabel>
                                    <Input border={'1px solid #D1D5DB'} fontSize={'14px'} color={'#000'} placeholder={'e.g 12345678'} _placeholder={{color: '#9CA3AF'}} autoComplete='off' />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={'14px'} fontWeight={500} color={'#4B5563'}>Amount</FormLabel>
                                    <Input type='number' border={'1px solid #D1D5DB'} fontSize={'14px'} color={'#000'} placeholder={'0.00'} _placeholder={{color: '#9CA3AF'}} autoComplete='off' />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={'14px'} fontWeight={500} color={'#4B5563'}>Frequency</FormLabel>
                                    <Select border={'1px solid #D1D5DB'} fontSize={'14px'} color={'#000'}>
                                        <option value="">Every Week</option>
                                        <option value="">Every Month</option>
                                        <option value="">Every Year</option>
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={'14px'} fontWeight={500} color={'#4B5563'}>Transfer Date</FormLabel>
                                    <Input type='date' border={'1px solid #D1D5DB'} fontSize={'14px'} color={'#000'} placeholder={'dd/mm/yyyy'} _placeholder={{color: '#9CA3AF'}} autoComplete='off' />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontSize={'14px'} fontWeight={500} color={'#4B5563'}>Description</FormLabel>
                                    <Input border={'1px solid #D1D5DB'} fontSize={'14px'} color={'#000'} placeholder={'Description'} _placeholder={{color: '#9CA3AF'}} autoComplete='off' />
                                </FormControl>
                            </Stack>}

                            {showBulk && <Stack w={'100%'} spacing={'16px'}>
                                <FormControl>
                                    <FormLabel fontSize={'14px'} fontWeight={500} color={'#4B5563'}>Transfer From</FormLabel>
                                    <Select border={'1px solid #D1D5DB'} fontSize={'14px'} color={'#000'} placeholder={'Select account'} _placeholder={{color: '#9CA3AF'}} ></Select>
                                </FormControl>
                            </Stack>}
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Stack w={'100%'} pb={0}>
                            {showSingle && <Button bg={'#D2042D'} _hover={{ bg: '#BD0429' }} color={"white"} fontSize={'16px'} fontWeight={500}>Transfer</Button>}
                            {showBulk && <Button bg={'#D2042D'} _hover={{ bg: '#BD0429' }} color={"white"} fontSize={'16px'} fontWeight={500}>Upload</Button>}
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}