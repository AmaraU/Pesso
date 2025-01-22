import React, { useState, useEffect } from "react";

import { getImageUrl} from '../../../../utils'
import styles from "./Home.module.css";

export const Home = () => {

    // let text = 'Finances';
    // const [ text, setText ] = useState("Finances");

    // useEffect(() => {
    //     const texts = ["Finances", "Outflow", "Inflow"];
    //     let index = 0;

    //     const intervalId = setInterval(() => {
    //         index = (index + 1) % texts.length;
    //         setText(texts[index]);
    //     }, 5000);

    //     return () => clearInterval(intervalId);
    // }, []);
    //    const {text} = useTypewriter({
    //     words : ["Finaces", "Outflow" , "Photographer"],
    //     loop  :{},
    //    })
  


    // setInterval(() => setText("Outflow"), 5000);


    const words = ["Finances", "Cashflow", "Inflow", "Outflow"];


    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [letterIndex, setLetterIndex] = useState(0);

    useEffect(() => {
        const handleTyping = () => {
            const currentWord = words[currentWordIndex];
            if (isDeleting) {
                if (letterIndex === 0) {
                    setIsDeleting(false);
                    setCurrentWordIndex((prev) => (prev + 1) % words.length);
                } else {
                    setDisplayedText(currentWord.substring(0, letterIndex - 1));
                    setLetterIndex((prev) => prev - 1);
                }
            } else {
                if (letterIndex === currentWord.length) {
                    setIsDeleting(true);
                } else {
                    setDisplayedText(currentWord.substring(0, letterIndex + 1));
                    setLetterIndex((prev) => prev + 1);
                }
            }
        };

        const typingSpeed = isDeleting ? 100 : 300;
        const typingTimeout = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(typingTimeout);
    }, [currentWordIndex, displayedText, isDeleting, letterIndex]);



    return(
    <div className={styles.biggerDiv}>
        <div className={styles.About}>
        <div className={styles.bread}>
            <h1>Master Your <br /><span className={`${styles.red} ${styles.animatedText}`}>{displayedText},</span> Propel<br />  your business</h1>
            <p>The ultimate AI Driven financial management solution.Seize control,gain insightful data,
                and propel your success to new heights.
            </p>
            <button className={styles}>
                Get Started
            </button>  
            <div className={styles.img}>
                <img className={styles.img1} src={getImageUrl("icon2.png")}alt="" />
                <img className={styles.img2} src={getImageUrl("img2.png")}alt="" />
                <img className={styles.img3} src={getImageUrl("icon3.png")}alt="" />
            </div>
        </div>

        </div>

        <img className={styles.dash} src={getImageUrl("Dashboard.png")}alt="" />
    </div>
    )
}