import React from "react";
import { getImageUrl } from "../../../utils";
import styles from "./SignInPage.module.css";

import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_AUTH_ERR_MSG, getAPIEndpoint } from '../../../config';
import EmailValidator from "email-validator";
import { auditLog, logger } from '../../models/logging';

export const SignInPage = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    const [password, setPassword] = useState();
    const [email, setEmail] = useState("");
    // const [btnText, setBtnText] = useState("Sign in");
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
        <div className={styles.whole}>

            <div className={styles.image}>
                <img className={styles.background} src={getImageUrl("signin.png")} />
                <img className={styles.whiteLogo} src={getImageUrl("logos/allWhiteLogo.png")} />
                <h4>This is just a randomly generated text to be included in a later date based on a final draft.</h4>
            </div>

            <div className={styles.signIn} >
                <img className={styles.logo} src={getImageUrl("logos/PessoLogoB.png")} alt="PESSO" />
                
                <div className={styles.login}>
                    <h3>Welcome Back</h3>

                    <form onSubmit={processForm}>
                        <div className={styles.loginFormGroup}>
                            <label for="login">Email Address</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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

                        <a className={styles.forgot} href="">Forgot password?</a>

                        <button className={styles.signButton}
                            disabled={isLoading}
                            isLoading={isLoading}
                            type="submit">
                            {/* {btnText} */}
                            Sign In
                        </button>
                    </form>

                    <a className={styles.signUp} href="/signup">I don't have an account</a>
                </div>

            </div>
        </div>
    )
}