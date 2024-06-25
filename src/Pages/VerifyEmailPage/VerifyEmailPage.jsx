import React from "react";
import { getImageUrl } from "../../../utils";
import styles from "./VerifyEmailPage.module.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const VerifyEmailPage = () => {

    const [isLoading, setIsloading] = useState(false);
    const navigate = useNavigate();



    return (
        <div className={styles.whole}>

            <img className={styles.logo} src={getImageUrl("logos/PessoLogoB.png")} alt="PESSO" />
            
            <div className={styles.box} id="login">
                <h3>Verify Email</h3>
                <p>A verification email has been sent to <span>k******@gmail.com</span>. Click the link in the email to verify your account.</p>

                <div className={styles.buttons}>
                    <button className={styles.buttonOne}>Resend Email</button>
                    <button className={styles.buttonTwo} onClick={() => navigate("/signin")}>Continue</button>
                </div>


            </div>

        </div>
    )
}