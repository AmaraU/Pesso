/* eslint-disable no-unused-vars */
import React,{useState} from "react";

import { getImageUrl} from '../../../../utils'
import styles from "./Scale.module.css";
import { BsBank   } from "react-icons/bs";
import { BiLineChart } from "react-icons/bi";
import { PiChurch } from "react-icons/pi";
import { MdOutlineWindow } from "react-icons/md";
import { GoMegaphone } from "react-icons/go";
import { LuHandshake } from "react-icons/lu";

export const Scale = () => {
    const [active,Setactive]=useState("Banking Services");
    const handleClick =(active)=>{
        Setactive(active);
        console.log(active);
    }
    const content =[
        {header:"Banking Services",
        context:"Pesso revolutionizes banking services by providing a comprehensive suite of tools.It enables banks to streamline transactions, enhance customer account management,and optimize financial processes.Real-time transactions tracking,seamless account integration, andnrobust security features ensure a superior banking experience for both financial institutions and their clients.",
        image:"banking.png"},
        {header:"Fintechs",
        context:"Tailored for the dynamic needs of fintech ventures, Peso offers innovative solutions. It empowers these companies to drive efficiency in transaction management, ensuring secure and complaint operations. Fintechs can leverage features such as advanced payment processing, investment tracking and real-time compliance monitoring to stay at the forefront of the rapidly evolving financial technology landscape.",
        image:"fintech.png"},
        {header:"Churches",
        context:"Peso Finance simplifies financial stewardship for churches by providing specialized features. These include intuitive tools for managing donations, tracking expenses, and maintaining transparent financial records. Churches can benefit from features like automated donation tracking, budgeting modules, and customizable financial reporting, supporting their mission with efficient and accountable financial management.",
        image:"churches.png"},
        {header:"Account Organization",
        context:"In the realm of business account organization, Cash Management serves as a centralized platform. It empowers businesses to efficiently manage their accounts, offering features for seamless account reconciliation and real-time insights. The platform ensures financial clarity and accuracy by providing businesses with the tools needed to organize, reconcile, and report on their financial data effectively.",
        image:"account copy.png"},
        {header:"Investment Companies",
        context:"Peso Finance caters specifically to the needs of investment companies, elevating their portfolio management. The platform enhances investment analysis, decision-making, and overall financial performance. Investment firms can leverage sophisticated tools for monitoring diverse portfolios, analyzing market trends, and making strategic decisions, thereby ensuring sustained growth and profitability.",
        image:"investment.png"},
        {header:"Financial Consistution",
        context:"For financial consultants, Cash Management provides a robust set of tools for delivering top-notch services. Consultants can conduct in-depth financial analysis, manage client portfolios efficiently, and gain strategic insights through the platform. The tools offered enable consultants to provide informed financial consultations, enhancing the overall quality of their services and strengthening client relationships.",
        image:"finance.png"},


    ];
    const activeContent = content.find((item) => item.header === active);
    return(
        <div className={styles.scale}>
            <div className={styles.word}>
                <h1>For <span className={styles.spa}>businesses</span> who create training videos at scale</h1>
               
                <div className={styles.container}>
                    <ul className={styles.navPills}>
                        <li className={styles.navItem}>
                        <button
                            className={`${styles.buttons} ${active === 'Banking Services' ? styles.activeButton : ''}`}
                            onClick={() => handleClick('Banking Services')}
                        >
                            <BsBank width="20px" height="20px" />
                            Banking Services
                        </button>
                        </li>
                        <li className={styles.navItem}>
                        <button
                            className={`${styles.buttons} ${active === 'Fintechs' ? styles.activeButton : ''}`}
                            onClick={() => handleClick('Fintechs')}
                        >
                            <BiLineChart width="20px" height="20px" />
                            Fintechs
                        </button>
                        </li>
                        <li className={styles.navItem}>
                        <button
                            className={`${styles.buttons} ${active === 'Churches' ? styles.activeButton : ''}`}
                            onClick={() => handleClick('Churches')}
                        >
                            <PiChurch width="20px" height="20px" />
                            Churches
                        </button>
                        </li>
                        <li className={styles.navItem}>
                        <button
                            className={`${styles.buttons} ${active === 'Account Organization' ? styles.activeButton : ''}`}
                            onClick={() => handleClick('Account Organization')}
                        >
                            <MdOutlineWindow width="20px" height="20px" />
                            Account Organization
                        </button>
                        </li>
                        <li className={styles.navItem}>
                        <button
                            className={`${styles.buttons} ${active === 'Investment Companies' ? styles.activeButton : ''}`}
                            onClick={() => handleClick('Investment Companies')}
                        >
                            <GoMegaphone width="20px" height="20px" />
                            Investment Companies
                        </button>
                        </li>
                        <li className={styles.navItem}>
                        <button
                            className={`${styles.buttons} ${active === 'Financial Consistution' ? styles.activeButton : ''}`}
                            onClick={() => handleClick('Financial Consistution')}
                        >
                            <LuHandshake width="20px" height="20px" />
                            Financial Consistution
                        </button>
                        </li>
                    </ul>
                    </div>
            </div>
            <div className={styles.bread}>
            {activeContent && ( <>
                    <div className={styles.crumb}>
                        <h1 >{activeContent.header}</h1>
                        <p dangerouslySetInnerHTML={{ __html: activeContent.context }}></p>
                    </div>
                    <div className={styles.img}>
                        <img src={getImageUrl(activeContent.image)} alt={activeContent.header} />
                  </div>
                  </>

              )}
                </div>
        </div>
    )
}