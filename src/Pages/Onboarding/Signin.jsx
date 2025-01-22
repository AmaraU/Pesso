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
    FormErrorMessage,
    useToast,
    Text,
    Box
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { DEFAULT_AUTH_ERR_MSG, getAPIEndpoint } from '../../../config';
import EmailValidator from "email-validator";
import { auditLog, logger } from '../../models/logging';
import { getImageUrl } from '../../../utils';
import styles from './Onboarding.module.css';

export default function Signin() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [password, setPassword] = useState();
    const [email, setEmail] = useState("");
    const [remember, setRemember] = useState(false);
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
        <>

        <Stack className={styles.whole} minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex display={{ base: 'none', md: 'flex' }} flex={{ base: 1.5, '2xl': 1 }} bg={"linear-gradient(180deg, #D2042D 0%, #210101 61%)"}>
                <Stack spacing={10}>
                    <Box p={8} as='button' onClick={() => navigate('/')}>
                        <Image src={getImageUrl("logos/allWhiteLogo.png")} w={"200px"} />
                    </Box>
                    <Text pl={8} fontSize={"28px"} color={'white'} w={'90%'}>
                        The ultimate financial management solution. Seize control, gain insightful data.
                    </Text>
                    <Box objectFit={'contain'} pt={2}>
                        <Image
                            alt={'Dashboard image'}
                            src={getImageUrl('dashboard.png')}
                            w={'80%'} h={'auto'}
                        />
                    </Box>
                </Stack>
            </Flex>

            <Flex flex={{ base: 0.8, md: 3 }} display={'flex'} flexDirection={'column'} p={'24px'}>
                
                <Stack direction={'row'}  display={'flex'} justifyContent={'space-between'} w={'100%'} top={0} position={'relative'}>
                    <a href="/home"><h3>Back <b>Home</b></h3></a>
                    <h3>No Account Yet? <a href="/signup">Sign Up</a></h3>
                </Stack>

                <Flex align={'center'} justify={'center'} mt={24}>
                    
                    <Stack spacing={10}>
                        <Stack align={'center'}>
                            <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight={700} color={'#343434'}>Log in to your account</Text>
                        </Stack>
                        <Stack spacing={5} w={{ base: 'md', md: 'lg' }} maxW={'lg'} as='form' onSubmit={processForm}>
                            <FormControl isInvalid={emailIsError} isRequired>
                                <FormLabel>Work Email</FormLabel>
                                <Input type='text' placeholder='Enter your work email' _placeholder={{ fontSize: "sm" }} value={email} onChange={(e) => setEmail(e.target.value)} border={'2px solid #CFCFCF'} />
                                {emailIsError && <FormErrorMessage>Please enter a valid email address.</FormErrorMessage>}
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input placeholder='Enter your password' _placeholder={{ fontSize: "sm" }} type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} border={'2px solid #CFCFCF'} />
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
                            </FormControl>

                            <div className={styles.rememberForgot}>
                                <div className={styles.remember}>
                                    <input type="checkbox" name="remember"  value={remember} onChange={e => setRemember(e.target.value)} />
                                    <label htmlFor="remember">Remember Me</label>
                                </div>

                                <a href='/forgot-password' style={{color:'#D2042D', fontSize: "14px",  fontWeight: 500}} _hover={{textDecor: 'underline',}}>Forgot Password?</a>
                            </div>

                            <Stack pt={4}>
                                <Button
                                    disabled={isLoading}
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
                                    {btnText}
                                </Button>
                            </Stack>
                            <Stack pt={1} direction={'row'} justify={'center'} spacing={1} fontWeight={500}>
                                <Text fontSize={'18px'} color={"#626262"}>
                                    Forgot your password?
                                </Text>
                                <Text color={'#626262'} fontSize={'18px'} fontWeight={700} textDecor={'underline'}>
                                    <Link to='/signup'>Request Reset</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Stack>
                </Flex>
            </Flex>
        </Stack>
        </>
    );
}