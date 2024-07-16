import React from "react";
import { getImageUrl } from "../../../utils";
import styles from "./SettingsProfilePage.module.css";

export const SettingsProfilePage = () => {
    return (
        <div className={styles.theWhole}>

            <div className={styles.profilePic}>
                <div className={styles.thePic}>FL</div>
                <button>
                    +   Change Image
                </button>
            </div>

            <h4>PERSONAL DETAILS</h4>
            <table className={styles.profileTable}>
                <tr>
                    <th>First Name:</th>
                    <td>Anthonia</td>
                </tr>
                <tr>
                    <th>Last Name:</th>
                    <td>Ekuase</td>
                </tr>
                <tr>
                    <th>Email Address:</th>
                    <td>anthoniaekuase@gmail.com</td>
                </tr>
            </table>
        </div>
    )
}