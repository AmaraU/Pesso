import React, { useState, useEffect, useRef } from 'react';
import styles from "./BudgetPage.module.css";
import { getImageUrl } from '../../../utils';

export const BudgetPage = () => {

    const budgets = [
        {
            title: "Budget Title 1",
            total: "N1,015,000",
            assignee: "Alabi Ayoade David",
            categories: ["Salaries and wages", "Rent"]
        },
        {
            title: "Budget Title 2",
            total: "N3,000,000",
            assignee: "Emmanuel Ucheze",
            categories: ["Utilities", "Rent"]
        },
        {
            title: "Budget Title 3",
            total: "N2,900,000",
            assignee: "Amara",
            categories: ["Salaries and wages"]
        }
    ]
    
    const [ search, setSearch] = useState("");
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };


    const filteredBudgets = budgets.filter(budget => {
        const searchLower = search.toLowerCase();
        return (
            budget.title.toLowerCase().includes(searchLower) ||
            budget.total.toLowerCase().includes(searchLower) ||
            budget.assignee.toLowerCase().includes(searchLower) ||
            budget.categories.some(category => category.toLowerCase().includes(searchLower))
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



    return (
        <>

        <div className={styles.popup} id="popup">
            <div className={styles.header}>
                <h3>Budget</h3>
                <a className={styles.close} href=""><img src={getImageUrl("icons/greyClose.png")} alt="X" onClick={(e) => {e.preventDefault(); () => toggle()}} /></a>
            </div>

            <form action="">
                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Budget Title</label>
                    <input type="text" placeholder='Enter Title' />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Budget Amount</label>
                    <input type="text" placeholder='Enter Amount' />
                </div>

                <div className={styles.dateFormGroup}>
                    <div className={styles.formGroup}>
                        <label htmlFor="fromAcct">Start</label>
                        <input type="date" placeholder='Enter Title' />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="fromAcct">End</label>
                        <input type="date" placeholder='Enter Title' />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Assign To</label>
                    <select name="" id="">
                        <option value="">Select Beneficiary</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Category</label>
                    <select name="" id="">
                        <option value="">Select Category(s)</option>
                        <option value="">Salaries and Wages</option>
                        <option value="">Equipment</option>
                        <option value="">Rent</option>
                    </select>
                </div>
            </form>

            <div className={styles.submitButton}>
                <button onClick={(e) => {e.preventDefault(); toggle()}}>Submit</button>
            </div>
        </div>


        <div className={styles.dimmer} id='dimmer'></div>



        <div className={styles.whole}>
            <div className={styles.searchButtons}>
                <div className={styles.searchBar}>
                    <img src={getImageUrl("icons/search.png")} />
                    <input id="search" type="text" onChange={handleSearch} placeholder='Search for budget' />
                </div>

                <div className={styles.buttons}>
                    <button className={styles.buttonOne} onClick={(e) => {e.preventDefault(); () => toggle()}}>
                        <img src={getImageUrl("icons/whitePlus.png")} alt="" />
                        Create Budget
                    </button>
                </div>
            </div>

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
                                    {budget.title}
                                    <button onClick={() => editPopup(index)}>
                                        <img src={getImageUrl("icons/edit.png")} />
                                        Edit
                                    </button>
                                </div>

                                <div className={styles.row}>
                                    <div className={styles.row2}>
                                        <img src={getImageUrl("icons/naira.png")} />
                                        Total Spent
                                    </div>
                                    <div className={styles.total}>{budget.total}</div>
                                </div>
                                <div className={styles.column}>
                                    <div className={styles.row2}>
                                        <img src={getImageUrl("icons/people.png")} />
                                        Assignee
                                    </div>
                                    <div className={styles.circle}>
                                        {budget.assignee}
                                    </div>
                                </div>
                                <div className={styles.column}>
                                    <div className={styles.row2}>
                                        <img src={getImageUrl("icons/boxess.png")} />
                                        Categories
                                    </div>
                                    <div className={styles.row3}>
                                        {budget.categories.map((categoy) => (
                                            <div className={styles.circle}>
                                                {categoy}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {activeBudgetIndex === index && (

                                <div className={styles.editPopup} id="editPopup">
                                    <div className={styles.header}>
                                        <h3>Budget</h3>
                                        <a className={styles.close} href=""><img src={getImageUrl("icons/greyClose.png")} alt="X" onClick={closePopup} /></a>
                                    </div>

                                    <form action="">
                                        <div className={styles.formGroup}>
                                            <label htmlFor="fromAcct">Budget Title</label>
                                            <input type="text" placeholder={budget.title} />
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="fromAcct">Budget Amount</label>
                                            <input type="text" placeholder={budget.total} />
                                        </div>

                                        <div className={styles.dateFormGroup}>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="fromAcct">Start</label>
                                                <input type="date" placeholder='Enter Title' />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label htmlFor="fromAcct">End</label>
                                                <input type="date" placeholder='Enter Title' />
                                            </div>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="fromAcct">Assign To</label>
                                            <select name="" id="">
                                                <option value="">{budget.assignee}</option>
                                            </select>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="fromAcct">Category</label>
                                            <select name="" id="">
                                                <option value="">Select Category(s)</option>
                                            </select>
                                        </div>

                                        <div>
                                            {budget.categories.map((category) => (
                                                <div className={styles.tabFormGroup}>
                                                    <label htmlFor="fromAcct">{category} Amount</label>
                                                    <div className={styles.catInputDiv}>
                                                        <input type="number" placeholder='0.00' />
                                                        <img src={getImageUrl("icons/delete.png")} alt="" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </form>

                                    <div className={styles.submitButton}>
                                        <button>Submit</button>
                                    </div>
                                </div>

                            )}

                            </>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}