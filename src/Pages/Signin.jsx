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
    Box
} from '@chakra-ui/react';
import logo from "../../assets/images/logo.png";
import dashboard from "../../assets/images/dashboard-auth.png";
import { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon, LockIcon, EmailIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { DEFAULT_AUTH_ERR_MSG, getAPIEndpoint } from '../../config';
import EmailValidator from "email-validator";
import { auditLog, logger } from '../models/logging';

export const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [password, setPassword] = useState();
    const [email, setEmail] = useState("");
    const [btnText, setBtnText] = useState("Sign in");
    const [emailIsError, setEmailIsError] = useState(false);
    const toast = useToast()
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.clear();
    }, []);

    useEffect(() => {
        if (email.length > 0 && !EmailValidator.validate(email)) {
            setEmailIsError(true);
        }
        else {
            setEmailIsError(false);
        }
    }, [email]);

    const login = async () => {
        setIsloading(true);
        try {
            const payload = {
                email,
                password
            }

            const response = await axios.post(getAPIEndpoint('signin'), payload);
            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsloading(false);
                    console.log(data)
                    sessionStorage.setItem("tk", data.token);
                    sessionStorage.setItem("email", data.meta.email);
                    sessionStorage.setItem("bizName", data.meta.businessName);
                    sessionStorage.setItem("id", data.meta.id);

                    await auditLog({
                        activity: "Logged in",
                        module: "Authentication",
                        userId: data.meta.id
                    }, data.token);

                    navigate("/dashboard", {
                        state: {
                            meta: data.meta
                        }
                    })

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
                            description: `${DEFAULT_AUTH_ERR_MSG} ${err ? "[Details: " + err + "]" : ""}`,
                            position: "top",
                            status: 'warning',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_AUTH_ERR_MSG,
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
            description: DEFAULT_AUTH_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsloading(false);
    }

    const processForm = async (e) => {
        e.preventDefault();
        await login();
    }

    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex display={{ base: 'none', md: 'flex' }} flex={{ base: 1.5, '2xl': 1 }} bg={"linear-gradient(180deg, #370C94 0%, #0B0121 61%)"}>
                <Stack spacing={10}>
                    {/* <Box p={8} as='button'> */}
                    <Box p={8} as='button' onClick={() => navigate('/')}>
                        <Image src={logo} w={"200px"} />
                    </Box>
                    <Text pl={8} fontSize={"24px"} color={'white'} w={'90%'}>
                        The ultimate financial management solution. Seize control, gain insightful data.
                    </Text>
                    <Box objectFit={'contain'} w={'90%'} pt={2}>
                        <Image
                            alt={'Dashboard image'}
                            src={dashboard}
                        />
                    </Box>
                </Stack>
            </Flex>
            <Flex p={8} flex={{ base: 0.8, md: 3 }} pt={0} align={'center'} justify={'center'}>
                <Stack spacing={10}>
                    <Stack align={'center'}>
                        <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight={600}>Sign in to your account</Text>
                    </Stack>
                    <Stack spacing={5} w={{ base: 'xs', md: 'md' }} maxW={'md'} as='form' onSubmit={processForm}>
                        <FormControl isInvalid={emailIsError} isRequired>
                            <FormLabel>Work Email</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <EmailIcon color='gray.300' />
                                </InputLeftElement>
                                <Input type='text' placeholder='name@company.com' _placeholder={{ fontSize: "sm" }} value={email} onChange={(e) => setEmail(e.target.value)} />
                            </InputGroup>
                            {emailIsError && <FormErrorMessage>Please enter a valid email address.</FormErrorMessage>}
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    <LockIcon color='gray.300' />
                                </InputLeftElement>
                                <Input placeholder='enter your password' _placeholder={{ fontSize: "sm" }} type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <Stack
                                direction={'row'}
                                justify={'end'}
                                pt={2}
                            >
                                <Link to='/forgot-password'><Text color={'blue.500'} fontSize={14} fontWeight={500}>Forgot password?</Text></Link>
                            </Stack>
                        </FormControl>
                        <Stack pt={4}>
                            <Button disabled={isLoading}
                                isLoading={isLoading}
                                rounded={20}
                                py={6}
                                type="submit"
                                size="md"
                                bg={'#0E0E0E'}
                                color={'white'}
                                _hover={{
                                    bg: '#0E0E0ECC',
                                }}>
                                {btnText}
                            </Button>
                        </Stack>
                        <Stack pt={1} direction={'row'} justify={'center'} spacing={1}>
                            <Text fontSize={14}>
                                Don't have an account?
                            </Text>
                            <Text color={'blue.500'} fontSize={14} fontWeight={500}>
                                <Link to='/signup'>Create Account</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Stack>
            </Flex>
        </Stack>
    );
}