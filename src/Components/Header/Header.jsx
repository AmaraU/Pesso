import React from "react";
import styles from "./Header.module.css";
import { getImageUrl } from "../../../utils";

export const Header = () => {
    return (
        <div className={styles.header}>

            <div className={styles.logo} >
                <a href="/dashboard"><img src={getImageUrl("logos/CMLogo.png")} alt="Cash Management" /></a>
            </div>

            <div className={styles.leftRight}>

                <div className={styles.headerLeft}>
                    <h2>Reports</h2>
                    <div className={styles.links}>
                        <a href="">Financial Health Indicator</a>
                        <a href="">History</a>
                        <a href="">History</a>
                    </div>
                </div>

                <div className={styles.headerRight}>
                    <div className={styles.headerSearch}>
                        <img src={getImageUrl("icons/search.png")} />
                        <input type="text" name="" id="" placeholder='Search' />
                    </div>
                    <div className={styles.languageDiv}>
                        <label htmlFor="language"><img src={getImageUrl("icons/globe.png")} alt="" /></label>
                        <select name="language" >
                            <option value="english">EN</option>
                            <option value="french">FR</option>
                        </select>
                    </div>
                    <a href=""><img src={getImageUrl("icons/boxes.png")} alt="" /></a>
                    <a href=""><img src={getImageUrl("icons/bell.png")} alt="" /></a>
                    <a href=""><img src={getImageUrl("Avatar.png")} alt="" /></a>
                </div>

            </div>

            

        </div>
    )
}