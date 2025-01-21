import React, { useState, useEffect } from "react";
import styles from "./SettingsProfilePage.module.css";
import { Center, Spinner, useToast } from "@chakra-ui/react";
import { DEFAULT_USER_INFO_ERR_MSG, getAPIEndpoint } from "../../../config";
import axios from "axios";
import { auditLog, logger } from "../../models/logging";

export const SettingsProfilePage = () => {

    const [isLoading, setIsloading] = useState(false);
    const [userData, setUserData] = useState([{ first_name: "", last_name: "", email_address: "" }]);

    const toast = useToast();

    useEffect(() => {
        log();
        getUserData();
    }, [])

    const log = async () => {
        await auditLog({
            activity: `Viewed profile settings`,
            module: "Settings",
            userId: sessionStorage.getItem("id")
        }, sessionStorage.getItem("tk"));
    }


    const getUserData = async () => {
        setIsloading(true);
        try {
            const response = await axios.post(getAPIEndpoint('user-info'), { userId: sessionStorage.getItem("id") }, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            console.log(response)
            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsloading(false);
                    setUserData(data);
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
                            description: `${DEFAULT_USER_INFO_ERR_MSG}. ${err ? "[Details: " + err + "]" : ""} `,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_USER_INFO_ERR_MSG,
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
            console.log(error)
            await logger({ task: "Get User Data", error: error.toString() });
        }
        toast({
            description: DEFAULT_USER_INFO_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsloading(false);
    }
    

    return (
        <div className={styles.theWhole}>

            {isLoading ? <Center><Spinner /></Center> :
            
                <>
                <div className={styles.profilePic}>
                    <div className={styles.thePic}>{`${userData[0].first_name.substring(0,1)}${userData[0].last_name.substring(0,1)}`}</div>
                    <button>
                        +   Change Image
                    </button>
                </div>

                <h4>PERSONAL DETAILS</h4>
                <table className={styles.profileTable}>
                    <tr>
                        <th>First Name:</th>
                        <td>{userData[0].first_name}</td>
                    </tr>
                    <tr>
                        <th>Last Name:</th>
                        <td>{userData[0].last_name}</td>
                    </tr>
                    <tr>
                        <th>Email Address:</th>
                        <td>{userData[0].email_address}</td>
                    </tr>
                </table>
                </>
            }
        </div>
    )
}