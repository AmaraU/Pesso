import { getAPIEndpoint } from "../../config";
import axios from "axios";

export async function logger(message) {
    try {
        await axios.post(getAPIEndpoint('error'), message);
    }
    catch (error) {
        console.log(error.toString());
    }
}

export async function auditLog(payload, token) {
    try {
        await axios.post(getAPIEndpoint('log-activity'), payload, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    }
    catch (error) {
        try {
            await logger({ task: `Audit Log => ${payload.activity} => ${payload.module} => ${payload.userId}`, error: error.toString() });
        } catch (error) {
            console.log(error.toString());
        }
    }
}

