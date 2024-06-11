import React, { useState, useEffect, useRef } from 'react';
import styles from "./SettingsWorkflowPage.module.css";
import { getImageUrl } from '../../../utils';

export const SettingsWorkflowPage = () => {

    const workflows = [
        {
            type: "Single",
            date: "July 22, 2022",
            approvers: "12"
        },
        {
            type: "Single",
            date: "July 22, 2022",
            approvers: "13"
        }
    ]
    
    const [ search, setSearch] = useState("");
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };


    const filteredWorkflows = workflows.filter(workflow => {
        const searchLower = search.toLowerCase();
        return (
            workflow.type.toLowerCase().includes(searchLower) ||
            workflow.date.toLowerCase().includes(searchLower) ||
            workflow.approvers.toLowerCase().includes(searchLower)
        );
    });


    function toggle() {        
        var popup = document.getElementById('popup');
        popup.classList.toggle(`${styles.popped}`);

        var dimmer = document.getElementById('dimmer');
        dimmer.classList.toggle(`${styles.dim}`);
    }



    return (
        <>

        <div className={styles.popup} id="popup">
            <div className={styles.header}>
                <h3>Workflow</h3>
                <a className={styles.close} href=""><img src={getImageUrl("icons/greyClose.png")} alt="X" onClick={(e) => {e.preventDefault(); () => toggle()}} /></a>
            </div>

            <form action="">
                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Workflow Type</label>
                    <select name="" id="">
                        <option value="">Select Workflow Type</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="fromAcct">Approver Levels</label>
                    <select name="" id="">
                        <option value="">Select User</option>
                    </select>
                </div>

                <button>Add Approver Level</button>
                <div className={styles.dashedDiv}>
                    <button>Approver</button>
                    <button>Approver 1</button>
                    <button>Approver 2</button>
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
                    <input id="search" type="text" onChange={handleSearch} placeholder='Search workflows' />
                </div>

                <div className={styles.buttons}>
                    <button className={styles.buttonOne} onClick={(e) => {e.preventDefault(); () => toggle()}}>
                        <img src={getImageUrl("icons/whitePlus.png")} alt="" />
                        Create Workflow
                    </button>
                </div>
            </div>

            <div className={styles.workflowDivs}>
                {filteredWorkflows.length === 0 ? (
                    <div className={styles.nothingBigDiv}>
                        <div className={styles.nothingFound}>
                            <img src={getImageUrl("nothing.png")} />
                            <h2>No Workflow Data</h2>
                            <p>We cannot seem to find any wokflow data, your reports will appear here</p>
                        </div>
                    </div>
                    
                ) : (
                    
                    filteredWorkflows.map((workflow, index) => (

                        <div className={styles.workflowDiv} id={index}>
                            <div className={styles.workflowHeader}>{workflow.type} Transfer</div>

                            <div className={styles.row}>
                                <div className={styles.row2}>
                                    <img src={getImageUrl("icons/lines.png")} />
                                    Date Created
                                </div>
                                {workflow.date}
                            </div>
                            <div className={styles.row}>
                                <div className={styles.row2}>
                                    <img src={getImageUrl("icons/people.png")} />
                                    No. of approvers
                                </div>
                                <div className={styles.approvers}>
                                    {workflow.approvers}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
        </>
    )
}