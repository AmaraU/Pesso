import { useRef, useState, useEffect } from "react";
import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter, useToast } from '@chakra-ui/react';
import { getAPIEndpoint } from "../../config";
import axios from "axios";
import { auditLog } from "../models/logging";

export const ConfirmDeletion = ({ isOpen, onClose, dataset = [], flag = 0, flagTitle = "", refreshData, postDelete = null }) => {
    const cancelRef = useRef();
    const [name, setName] = useState("");
    const [id, setId] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    useEffect(() => {
        if (dataset.length > 0) {
            setName(dataset[0].name);
            setId(dataset[0].id);
        }
    }, [dataset])

    const toTitleCase = (txt) => {
        return txt[0].toUpperCase() + txt.substring(1).toLowerCase()
    }

    const closeModal = () => {
        setName("");
        setId(0);
        setIsLoading(false);
        onClose();
        if (postDelete) {
            postDelete();
        }
    }

    const processDeletion = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            let uri = "";
            const params = {
                params: {
                    id,
                    deletedBy: sessionStorage.getItem("id")
                }
            }

            switch (flag) {
                case 1:
                    uri = "delete-user";
                    break;
                case 2:
                    uri = "delete-role";
                    break;
                case 3:
                    uri = "delete-budget";
                    break;
                default:
                    break;
            }

            const response = await axios.post(getAPIEndpoint(uri), params, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsLoading(false);
                    toast({
                        description: `${toTitleCase(flagTitle)} (${name}) has been successfully deleted.`,
                        position: "top",
                        status: 'success',
                        duration: 4000,
                        isClosable: true,
                    })

                    switch (flag) {
                        case 1:
                            await auditLog({
                                activity: `Deleted user (${name})`,
                                module: "User Management",
                                userId: sessionStorage.getItem("id")
                            }, sessionStorage.getItem("tk"));
                            break;
                        case 2:
                            await auditLog({
                                activity: `Deleted role (${name})`,
                                module: "Role Management",
                                userId: sessionStorage.getItem("id")
                            }, sessionStorage.getItem("tk"));
                            break;
                        case 3:
                            await auditLog({
                                activity: `Deleted budget (${name})`,
                                module: "Budget",
                                userId: sessionStorage.getItem("id")
                            }, sessionStorage.getItem("tk"));
                            break;
                        default:
                            break;
                    }

                    refreshData();
                    closeModal();
                    return;

                }
                else {
                    setIsLoading(false);
                    let err = "";
                    if (status === "error") {
                        if (data[0].error === '""') {
                            return;
                        }

                        const msg = JSON.parse(data[0].error);
                        if ("Message" in msg) {
                            err = msg.Message;
                        }
                        else if ("errors" in msg) {
                            err = msg.errors.toString();
                        }
                        else if ("title" in msg) {
                            err = msg.title.toString();
                        }
                    }
                    toast({
                        description: `Unable to delete ${flagTitle.toLowerCase()}${err ? " [Details: " + err + "]" : "."} `,
                        position: "top",
                        status: 'error',
                        duration: 8000,
                        isClosable: true,
                    })
                    return;
                }
            }
        } catch (error) {
            console.log(error)
        }
        toast({
            description: `Unable to delete ${flagTitle.toLowerCase()}.`,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })
        setIsLoading(false);
    }

    return (
        <>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent as="form" onSubmit={processDeletion}>
                    <AlertDialogHeader fontSize={'lg'}>Delete {toTitleCase(flagTitle)}</AlertDialogHeader>
                    <AlertDialogCloseButton />
                    <AlertDialogBody fontSize={"sm"}>
                        Are you sure you want to delete this {flagTitle.toLowerCase()}: <strong>{name}</strong>?
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button size={'sm'} ref={cancelRef} onClick={onClose}>
                            No
                        </Button>
                        <Button type="submit" size={'sm'} colorScheme='red' ml={3} isDisabled={isLoading} isLoading={isLoading}>
                            Yes
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}