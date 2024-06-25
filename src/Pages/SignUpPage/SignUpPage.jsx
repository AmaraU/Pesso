import React from "react";
import { getImageUrl } from "../../../utils";
import styles from "./SignUpPage.module.css";

import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import EmailValidator from "email-validator";
import { DEFAULT_ONBOARDING_ERR_MSG, getAPIEndpoint } from '../../../config';
import axios from 'axios';
import { logger } from '../../models/logging';
import { personalEmailDomains } from '../../models/providers';
import { useToast } from "@chakra-ui/react";

export const SignUpPage = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState();
    const [businessName, setBusinessName] = useState();
    const [phoneNo, setPhoneNo] = useState("");
    const [phoneIsError, setPhoneIsError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState();
    const [passwordIsValid, setPasswordIsValid] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState();
    const [emailIsError, setEmailIsError] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const [questionOne, setQuestionOne] = useState("");
    const [questionOneAnswer, setQuestionOneAnswer] = useState("");
    const [questionTwo, setQuestionTwo] = useState("");
    const [questionTwoAnswer, setQuestionTwoAnswer] = useState("");



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
        if (!phoneNumberIsValid()) {
            setPhoneIsError(true);
        }
        else {
            setPhoneIsError(false);
        }
    }, [phoneNo]);

    useEffect(() => {
        if (password || confirmPassword) {
            if (password === confirmPassword) {
                setPasswordIsValid(true);
            }
            else {
                setPasswordIsValid(false);
            }
        }
        else {
            setPasswordIsValid(true);
        }
    }, [password, confirmPassword]);

    const phoneNumberIsValid = () => {
        try {
            if (phoneNo.length > 0 && phoneNo.length !== 11) {
                return false;
            }
            else {
                return true;
            }
        } catch (error) {
            if (error.toString().includes('length')) {
                return false;
            }
            else {
                return true;
            }
        }
    }

    const reset = () => {
        setFirstName("");
        setLastName("");
        setBusinessName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhoneNo("");
        setQuestionOne("");
        setQuestionOneAnswer("");
        setQuestionTwo("");
        setQuestionTwoAnswer("");
    }

    const signup = async () => {
        setIsloading(true);
        try {
            const payload = {
                firstName,
                lastName,
                workEmail: email,
                businessName,
                phoneNo,
                password

                // questionOne,
                // questionOneAnswer,
                // questionTwo,
                // questionTwoAnswer
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
                    setTimeout(() => navigate("/signup-security"), 3000);
                    // setTimeout(() => navigate("/signin"), 3000);

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

    const processForm = async (e) => {
        e.preventDefault();
        await signup();
    }



    return (
        <div className={styles.whole}>

            <div className={styles.image}>
                <img className={styles.background} src={getImageUrl("signup.png")} />
                <img className={styles.whiteLogo} src={getImageUrl("logos/allWhiteLogo.png")} />
                <h4>This is just a randomly generated text to be included in a later date based on a final draft.</h4>
            </div>

            <div className={styles.signIn} >
                <img className={styles.logo} src={getImageUrl("logos/PessoLogoB.png")} alt="PESSO" />
                
                <div className={styles.login} id="login">
                    <h3>Create Account</h3>

                    <p>Step 1 of 2</p>
                    <div className={styles.progress}>
                        <div className={styles.line1}></div>
                        <div className={styles.line2}></div>
                    </div>

                    <form onSubmit={processForm}>

                        <div className={styles.names}>
                            <div className={styles.loginFormGroup}>
                                <label for="login">First Name</label>
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                            </div>

                            <div className={styles.loginFormGroup}>
                                <label for="login">Last Name</label>
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                            </div>
                        </div>

                        <div className={styles.loginFormGroup}>
                            <label for="login">Business Name</label>
                            <input type="text" value={businessName} onChange={(e) => setBusinessName(e.target.value)} required />
                        </div>

                        <div className={styles.loginFormGroup}>
                            <label for="login">Work Email</label>
                            <input type="email" isInvalid={emailIsError} value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>

                        <div className={styles.passwordFormGroup}>
                            <label for="password">Password</label>
                            <div className={styles.passwordDiv}>
                                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} />
                                <button onClick={() => setShowPassword((showPassword) => !showPassword)} type="button">
                                    <img src={getImageUrl("icons/view.png")} alt="view" />
                                    {/* {showPassword ? <ViewIcon /> : <ViewOffIcon />} */}
                                </button>
                            </div>
                        </div>

                        <div className={styles.checkbox}>
                            <input type="checkbox" required />
                            <label htmlFor="checkbox">I have read and agreed to the <a href="">Terms of use</a> and <a href="">privacy policy</a></label>
                        </div>

                        <button
                            className={styles.signButton}
                            type="submit"
                            isLoading={isLoading}
                            isDisabled={isLoading || !passwordIsValid || emailIsError}>
                            Next - Security Question
                        </button>
                    </form>

                    <a className={styles.signUp} href="/signin">I have an account</a>
                </div>

            </div>
        </div>
    )
}