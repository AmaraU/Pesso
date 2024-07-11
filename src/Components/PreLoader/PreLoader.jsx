import React, { useEffect, useState } from "react";
import styles from './PreLoader.module.css';
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../../utils";

export const PreLoader = () => {

    const navigate = useNavigate();


    useEffect(() => {
        
        const progressBar = document.querySelector('#progress');
        var progressPage = document.getElementById('page');
        const logo = document.querySelector('#logo');


        console.log(progressBar);

        function clear() {
            progressPage.style.display = "none";
        }

        function shrink() {
            progressBar.classList.add(`${styles.shrink}`);
        }

        function showLogo() {
            logo.classList.remove(`${styles.hide}`);
        }

        function load(perc = 0) {

            progressBar.value = perc;
    
            if (perc < 100)
                requestAnimationFrame(() => load(perc + 0.25))
            else {
                setTimeout(shrink, 250);
                setTimeout(showLogo, 3000);
                setTimeout(clear, 6000)
            }
        }

        load();

    })

    return (
        <div className={styles.whole} id="page">
            <progress className={styles.progress} id="progress" max={100} />
            <img src={getImageUrl('logos/justP.png')} className={`${styles.hide} ${styles.logo}`} id="logo"/>
        </div>
    )
}