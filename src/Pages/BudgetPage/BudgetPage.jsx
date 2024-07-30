import React, { useState, useEffect, useRef } from 'react';
import styles from "./BudgetPage.module.css";
import { getImageUrl } from '../../../utils';

import { Box, Button, Stack, Text, useDisclosure, useToast, Spinner, Center } from "@chakra-ui/react"
import { budgetFields } from "../../models/data"
import { AddIcon } from "@chakra-ui/icons"
import { AddBudget } from "../../Components/AddBudget"
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { DEFAULT_BANKS_ERR_MSG, DEFAULT_BUDGET_CATEGORIES_ERR_MSG, DEFAULT_BUDGET_DATA_ERR_MSG, getAPIEndpoint } from "../../../config";
import { auditLog, logger } from '../../models/logging';
import { ConfirmDeletion } from "../../Components/ConfirmDeletion"


export const BudgetPage = () => {

    const { isOpen: isOpenAddBudget, onOpen: onOpenAddBudget, onClose: onCloseAddBudget } = useDisclosure();
    const { isOpen: isOpenEditBudget, onOpen: onOpenEditBudget, onClose: onCloseEditBudget } = useDisclosure();
    const { isOpen: isOpenDeleteBudget, onOpen: onOpenDeleteBudget, onClose: onCloseDeleteBudget } = useDisclosure();
    const [categories, setCategories] = useState([]);
    const [banks, setBanks] = useState([]);
    const [budgetData, setBudgetData] = useState([]);
    const [selectedBudget, setSelectedBudget] = useState([]);
    const [isLoadingCat, setIsloadingCat] = useState(false);
    const [isLoadingBanks, setIsloadingBanks] = useState(false);
    const [isLoadingBudgetData, setIsLoadingBudgetData] = useState(false);
    const [isEditBudget, setIsEditBudget] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();


    useEffect(() => {
        if (!sessionStorage.getItem("id")) {
            navigate('/signin');
        }
        log();
        getCategories();
        getBanks();
        getBudgets();
    }, [])

    const log = async () => {
        await auditLog({
            activity: `Viewed all budgets`,
            module: "Budget",
            userId: sessionStorage.getItem("id")
        }, sessionStorage.getItem("tk"));
    }

    const getCategories = async () => {
        setIsloadingCat(true);
        try {

            const response = await axios.post(getAPIEndpoint('budget-categories'), null, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsloadingCat(false);
                    console.log(data)
                    setCategories(data);
                    return;
                }
                else {
                    setIsloadingCat(false);
                    let err = "";

                    if (data.length > 0) {
                        err = data[0].error;
                    }

                    if (err) {
                        toast({
                            description: `${DEFAULT_BUDGET_CATEGORIES_ERR_MSG}. ${err ? "[Details: " + err + "]" : ""} `,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_BUDGET_CATEGORIES_ERR_MSG,
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
            await logger({ task: "Get Budget Categories", error: error.toString() });
        }
        toast({
            description: DEFAULT_BUDGET_CATEGORIES_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsloadingCat(false);
    }

    const getBudgets = async () => {
        setIsLoadingBudgetData(true);
        try {

            const response = await axios.post(getAPIEndpoint('get-budgets'), null, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsLoadingBudgetData(false);
                    console.log(data)
                    setBudgetData(data);
                    return;
                }
                else {
                    setIsLoadingBudgetData(false);
                    let err = "";

                    if (data.length > 0) {
                        err = data[0].error;
                    }

                    if (err) {
                        toast({
                            description: `${DEFAULT_BUDGET_DATA_ERR_MSG}. ${err ? "[Details: " + err + "]" : ""} `,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_BUDGET_DATA_ERR_MSG,
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
            await logger({ task: "Get Budget Categories", error: error.toString() });
        }
        toast({
            description: DEFAULT_BUDGET_DATA_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsLoadingBudgetData(false);
    }

    const getBanks = async () => {
        setIsloadingBanks(true);
        try {

            const response = await axios.post(getAPIEndpoint('get-banks'), null, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsloadingBanks(false);
                    if (data.status === "successful") {
                        setBanks(data.data.filter(e => e.type === "PERSONAL_BANKING" || e.bank_code === null).map(v => ({ bank_code: v.bank_code, bank_name: v.name, country: v.country })));
                    }
                    else {
                        setBanks([]);
                        throw new Error(`${DEFAULT_BANKS_ERR_MSG} [Status: ${data.status}, Message: ${data.message}]`)
                    }

                    return;
                }
                else {
                    setIsloadingBanks(false);
                    let err = "";

                    if (data.length > 0) {
                        err = data[0].error;
                    }

                    if (err) {
                        toast({
                            description: `${DEFAULT_BANKS_ERR_MSG}. ${err ? "[Details: " + err + "]" : ""} `,
                            position: "top",
                            status: 'error',
                            duration: 8000,
                            isClosable: true,
                        })
                    }
                    else {
                        toast({
                            description: DEFAULT_BANKS_ERR_MSG,
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
            await logger({ task: "Get Banks", error: error.toString() });
        }
        toast({
            description: DEFAULT_BANKS_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsloadingBanks(false);
    }

    const handleAddBudget = () => {
        onOpenAddBudget();
    }

    const postDeleteBudget = () => {
        setSelectedBudget([]);
        setIsEditBudget(false);
    }

    const resetEditBudget = () => {
        setIsEditBudget(false);
    }

    const handleEditBudget = (budget) => {
        setSelectedBudget([budget]);
        setIsEditBudget(true);
        onOpenAddBudget();
    }

    const handleDeleteBudget = (budget) => {
        setSelectedBudget([{ id: budget.id, name: budget.budget_title }]);
        onOpenDeleteBudget();
    }


    
    const [ search, setSearch] = useState("");
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    const filteredBudgets = budgetData.filter(budget => {
        const searchLower = search.toLowerCase();
        return (
            budget.budget_title.toLowerCase().includes(searchLower) ||
            budget.budget_amount.toLowerCase().includes(searchLower) ||
            budget.assigned_to.toLowerCase().includes(searchLower) ||
            budget.budget_category.toLowerCase().includes(searchLower)
        );
    });


    function toggle() {
        var popup = document.getElementById('popup');
        popup.classList.toggle(`${styles.popped}`);

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.toggle(`${styles.dim}`);
    }

    const [activeBudgetIndex, setActiveBudgetIndex] = useState(null);

    const editPopup = (index) => {
        setActiveBudgetIndex(index);

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.add(`${styles.dim}`);
    }

    const closePopup = () => {
        setActiveBudgetIndex(null);

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.remove(`${styles.dim}`);
    };

    const formatNumber = (number) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    };


    return (
        <>

        <div className={styles.whole}>
            <div className={styles.searchButtons}>
                <div className={styles.searchBar}>
                    <img src={getImageUrl("icons/search.png")} />
                    <input id="search" type="text" onChange={handleSearch} placeholder='Search for budget' />
                </div>

                <div className={styles.buttons}>
                    <button className={styles.buttonOne} onClick={handleAddBudget}>
                        <img src={getImageUrl("icons/whitePlus.png")} alt="" />
                        Create Budget
                    </button>
                </div>
            </div>

            {isLoadingBudgetData ? <Center><Spinner /></Center> :
                <>
                {filteredBudgets.length === 0 ? (
                    <div className={styles.nothingBigDiv}>
                        <div className={styles.nothingFound}>
                            <img src={getImageUrl("nothing.png")} />
                            <h2>No Budget Data</h2>
                            <p>We cannot seem to find any budget data, your transaction information will appear here.</p>
                        </div>
                    </div>
                    
                ) : (

                    <div className={styles.budgetDivs}>
                        {filteredBudgets.map((budget, index) => (
                            <>
                            <div className={styles.budgetDiv} id={index}>
                                <div className={styles.budgetHeader}>
                                    {budget.budget_title}
                                    <button onClick={() => handleEditBudget(budget)}>
                                        <img src={getImageUrl("icons/edit.png")} />
                                        Edit
                                    </button>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.row2}>
                                        <img src={getImageUrl("icons/naira.png")} />
                                        Total Spent
                                    </div>
                                    <div className={styles.total}>N{formatNumber(budget.budget_amount)}</div>
                                </div>
                                <div className={styles.column}>
                                    <div className={styles.row2}>
                                        <img src={getImageUrl("icons/people.png")} />
                                        Assignee
                                    </div>
                                    <div className={styles.circle}>
                                        {budget.assigned_to}
                                    </div>
                                </div>
                                <div className={styles.column}>
                                    <div className={styles.row2}>
                                        <img src={getImageUrl("icons/boxess.png")} />
                                        Categories
                                    </div>
                                    <div className={styles.row3}>
                                        <div className={styles.circle}>
                                            {budget.budget_category}
                                        </div>
                                        {/* {budget.budget_category.map((category) => (
                                            <div className={styles.circle}>
                                                {category}
                                            </div>
                                        ))} */}
                                    </div>
                                </div>
                            </div>

                            {activeBudgetIndex === index && (

                                <div className={styles.editPopup} id="editPopup">
                                    <div className={styles.header}>
                                        <h3>Budget</h3>
                                        <a className={styles.close} href=""><img src={getImageUrl("icons/greyClose.png")} alt="X" onClick={(e) => {e.preventDefault(); closePopup()}} /></a>
                                    </div>

                                    <form action="">
                                        <div className={styles.formGroup}>
                                            <label htmlFor="fromAcct">Budget Title</label>
                                            <input type="text" placeholder={budget.budget_title} />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="fromAcct">Budget Amount</label>
                                            <input type="text" placeholder={budget.budget_amount} />
                                        </div>

                                        <div className={styles.dateFormGroup}>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="fromAcct">Start</label>
                                                <input type="date" placeholder={budget.start_date} />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="fromAcct">End</label>
                                                <input type="date" placeholder={budget.end_date} />
                                            </div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="fromAcct">Assign To</label>
                                            <select name="" id="">
                                                <option value="">{budget.assigned_to}</option>
                                            </select>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="fromAcct">Category</label>
                                            <select name="" id="">
                                                <option value="">{budget.budget_category}</option>
                                                {categories.map((category, index) => (
                                                    <option key={index} value={category.category_name}>{category.category_name}</option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* <div>
                                            {categories.map((category) => (
                                                <div className={styles.tabFormGroup}>
                                                    <label htmlFor="fromAcct">{category} Amount</label>
                                                    <div className={styles.catInputDiv}>
                                                        <input type="number" placeholder='0.00' />
                                                        <img src={getImageUrl("icons/delete.png")} alt="" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div> */}
                                    </form>

                                    <div className={styles.submitButton}>
                                        <button onClick={() => closePopup()}>Submit</button>
                                    </div>
                                </div>

                            )}

                            </>
                        ))}
                    </div>
                )}
                </>
            }
        </div>

        <AddBudget isOpen={isOpenAddBudget} onClose={onCloseAddBudget} isEdit={isEditBudget} dataset={selectedBudget} resetEdit={resetEditBudget} categories={categories} banks={banks} refreshData={getBudgets} />
        <ConfirmDeletion isOpen={isOpenDeleteBudget} onClose={onCloseDeleteBudget} dataset={selectedBudget} flag={3} flagTitle={"Budget"} refreshData={getBudgets} postDelete={postDeleteBudget} />
        </>
    )
}