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

export const SignUpQuestionsPage = () => {

    const [questionOne, setQuestionOne] = useState("");
    const [questionOneAnswer, setQuestionOneAnswer] = useState("");
    const [questionTwo, setQuestionTwo] = useState("");
    const [questionTwoAnswer, setQuestionTwoAnswer] = useState("");
    const [isLoading, setIsloading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();




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


                <div className={styles.login} id="questions">
                    <h3>Security Questions</h3>

                    <p>Step 2 of 2</p>
                    <div className={styles.progress}>
                        <div className={styles.line1}></div>
                    </div>

                    <form onSubmit={processForm}>

                        <div className={styles.loginFormGroup}>
                            <label for="login">Security Question 1</label>
                            <select value={questionOne} onChange={(e) => setQuestionOne(e.target.value)} required >
                                <option value=""></option>
                            </select>
                        </div>

                        <div className={styles.loginFormGroup}>
                            <label for="login">Answer</label>
                            <input type="text" value={questionOneAnswer} onChange={(e) => setQuestionOneAnswer(e.target.value)} required />
                        </div>

                        <div className={styles.loginFormGroup}>
                            <label for="login">Security Question 2</label>
                            <select value={questionTwo} onChange={(e) => setQuestionTwo(e.target.value)} required >
                                <option value=""></option>
                            </select>
                        </div>

                        <div className={styles.loginFormGroup}>
                            <label for="login">Answer</label>
                            <input type="text" value={questionTwoAnswer} onChange={(e) => setQuestionTwoAnswer(e.target.value)} required />
                        </div>
                        

                        <button
                            className={styles.signButton}
                            // type="submit"
                            onClick={() => navigate("/verify-email")}
                            isLoading={isLoading}
                            // isDisabled={isLoading || !passwordIsValid || emailIsError}
                            >
                            Create Account
                            <img src={getImageUrl("icons/whiteRightAngle.png")} />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}