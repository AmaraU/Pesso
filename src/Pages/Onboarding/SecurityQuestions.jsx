import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Image,
    InputGroup,
    InputRightElement,
    InputLeftElement,
    FormErrorMessage,
    useToast,
    Text,
    Box,
    Select
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon, LockIcon } from '@chakra-ui/icons';
import { useNavigate, Link } from 'react-router-dom';
import EmailValidator from "email-validator";
import { DEFAULT_ONBOARDING_ERR_MSG, getAPIEndpoint } from '../../../config';
import axios from 'axios';
import { logger } from '../../models/logging';
import { personalEmailDomains } from '../../models/providers';
import { getImageUrl } from '../../../utils';
import styles from './Onboarding.module.css';


export default function SecurityQuestions() {

    const [questionOne, setQuestionOne] = useState("");
    const [questionOneAnswer, setQuestionOneAnswer] = useState("");
    const [questionTwo, setQuestionTwo] = useState("");
    const [questionTwoAnswer, setQuestionTwoAnswer] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();


    const processForm = async (e) => {
        e.preventDefault();
        await signup();
    }

    const reset = () => {
        setQuestionOne("");
        setQuestionOneAnswer("");
        setQuestionTwo("");
        setQuestionTwoAnswer("");
    }

    const signup = async () => {
        setIsloading(true);
        try {
            const payload = {
                questionOne,
                questionOneAnswer,
                questionTwo,
                questionTwoAnswer
            }

            const response = await axios.post(getAPIEndpoint('signup'), payload);
            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsloading(false);
                    toast({
                        description: `Welcome to the Cash Management Portal! Your account has been successfully created. Please proceed to log in. (Redirecting in 3 seconds...)`,
                        position: "top",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })
                    reset();
                    setTimeout(() => navigate("/signin"), 3000);

                    return;
                }
                else {
                    setIsloading(false);
                    let err = "";

                    if (data.length > 0) {
                        err = data[0].error;
                    }

                    if (err) {
                        toast({
                            description: `${DEFAULT_ONBOARDING_ERR_MSG} ${err ? "[Details: " + err + "]" : ""}`,
                            position: "top",
                            status: 'warning',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_ONBOARDING_ERR_MSG,
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
            await logger({ task: "Sign up - Client", error: error.toString() });
        }
        toast({
            description: DEFAULT_ONBOARDING_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsloading(false);
    }

    return (
        <Stack className={styles.whole} minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex display={{ base: 'none', md: 'flex' }} flex={{ base: 1.5, '2xl': 1 }} bg={"linear-gradient(180deg, #D2042D 0%, #210101 61%)"}>
                <Stack spacing={10}>
                    <Box p={8} as='button' onClick={() => navigate('/')}>
                        <Image src={getImageUrl("logos/allWhiteLogo.png")} w={"50%"} />
                    </Box>
                    <Text pl={8} fontSize={"31px"} color={'white'} w={'90%'}>
                        The ultimate financial management solution. Seize control, gain insightful data.
                    </Text>
                    <Box objectFit={'contain'} w={'80%'} pt={2}>
                        <Image
                            alt={'Dashboard image'}
                            src={getImageUrl('dashboard.png')}
                        />
                    </Box>
                </Stack>
            </Flex>

            <Flex flex={{ base: 0.8, md: 3 }} display={'flex'} flexDirection={'column'} p={'24px'}>

                <Stack direction={'row'}  display={'flex'} justifyContent={'space-between'} w={'100%'} top={0} position={'relative'}>
                    <a><h3>Back <b>Home</b></h3></a>
                </Stack>

                <Flex align={'center'} justify={'center'} mt={0}>
                    <Stack
                        px={8}
                        py={7}
                        as='form'
                        onSubmit={processForm}
                    >
                        <Stack spacing={5} w={{ base: 'xs', md: 'lg' }} maxW={'lg'}>
                            <Stack align={'start'} pb={2}>
                                <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight={700} color={'#343434'}>Security Questions</Text>
                                <Text fontSize={{ base: '14px', md: '18px' }} color={'#666666'}>Let's help you get started on Pesso Finance</Text>
                            </Stack>

                            <progress className={styles.steps} max={100} value={95}></progress>


                            <Stack spacing={5} w={'100%'} as='form' onSubmit={processForm}>
                                <FormControl isRequired>
                                    <FormLabel>Security Question 1</FormLabel>
                                    <Select value={questionOne} onChange={(e) => setQuestionOne(e.target.value)} border={'2px solid #CFCFCF'}>
                                        {/* <Option></Option> */}
                                    </Select>
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Answer</FormLabel>
                                    <Input value={questionOneAnswer} onChange={(e) => setQuestionOneAnswer(e.target.value)} border={'2px solid #CFCFCF'} />
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Security Question 2</FormLabel>
                                    <Select value={questionTwo} onChange={(e) => setQuestionTwo(e.target.value)} border={'2px solid #CFCFCF'}>
                                        {/* <Option></Option> */}
                                    </Select>
                                </FormControl>

                                <FormControl isRequired>
                                    <FormLabel>Answer</FormLabel>
                                    <Input value={questionTwoAnswer} onChange={(e) => setQuestionTwoAnswer(e.target.value)} border={'2px solid #CFCFCF'} />
                                </FormControl>

                                <div className={styles.terms}>
                                    <input type="checkbox" name="agreed"  value={agreed} onChange={e => setAgreed(e.target.value)} />
                                    <label htmlFor="agreed" style={{fontSize:'16px'}}>I have read and agree to the <a href="">Terms of Use</a> and <a href="" style={{color: '#D2042D'}}>Privacy Policy</a></label>
                                </div>

                                <Stack pt={4}>
                                    <Button disabled={isLoading}
                                        isLoading={isLoading}
                                        rounded={620}
                                        py={'26px'}
                                        px={'16px'}
                                        type="submit"
                                        size="md"
                                        bg={'#0E0E0E'}
                                        color={'white'}
                                        _hover={{
                                            bg: '#0E0E0ECC',
                                        }}>
                                        Sign Up
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Flex>
            </Flex>
        </Stack>
    );
}