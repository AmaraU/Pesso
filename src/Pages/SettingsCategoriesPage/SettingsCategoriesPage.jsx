import React, { useState, useEffect, useRef } from 'react';
import styles from "./SettingsCategoriesPage.module.css";
import { getImageUrl } from '../../../utils';
import classNames from 'classnames';
import { SketchPicker } from 'react-color';
import Pagination from '../../Components/Pagination/Pagination';



export const SettingsCategoriesPage = () => {

    const categories = [
        {
            category: "Bad Debts",
            createdBy: "Adewale Ayuba",
            color: "#8B4513",
            type: "Inflow"
        },
        {
            category: "Charitable contributions",
            createdBy: "Anthonia Ekuase",
            color: "#483D8B",
            type: "Outflow"
        },
        {
            category: "Cost of goods sold (COGS)",
            createdBy: "Dominic Anga",
            color: "#B8860B",
            type: "Inflow"
        },
        {
            category: "Depreciation and amortization",
            createdBy: "Precious Ivonge",
            color: "#8B0000",
            type: "Outflow"
        },
        {
            category: "Equipment",
            createdBy: "Lawal Timothy",
            color: "#6A5ACD",
            type: "Inflow"
        },
        {
            category: "Fees and Commissions",
            createdBy: "Alonge Victoria",
            color: "#2F4F4F",
            type: "Outflow"
        },
        {
            category: "Insurance",
            createdBy: "Natasha Williams",
            color: "#8B008B",
            type: "Inflow"
        },
        {
            category: "Marketing and advertising",
            createdBy: "Oladele Fadeyi",
            color: "#556B2F",
            type: "Inflow"
        },
        {
            category: "Other expenses",
            createdBy: "Igwe Victor",
            color: "#696969",
            type: "Outflow"
        },
        {
            category: "Professional services",
            createdBy: "Olawale Timilehin",
            color: "#4682B4",
            type: "Outflow"
        },
    ]

    const [ search, setSearch] = useState("");
    const [ actionsOpen, setActionsOpen ] = useState({});
    const [ currentPage, setCurrentPage ] = useState(1);
    const itemsPerPage = 10;

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };

    const filteredCategories = categories.filter(category => {
        const searchLower = search.toLowerCase();
        return (
            category.category.toLowerCase().includes(searchLower) ||
            category.createdBy.toLowerCase().includes(searchLower) ||
            category.color.toLowerCase().includes(searchLower) ||
            category.type.toLowerCase().includes(searchLower)
        );
    });


    const toggleAction = (index) => {
        setActionsOpen(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    const popupRef = useRef(null);

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setActionsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    const [ colorState, setColorState ] = useState({});
    const [ showColorPicker, setShowColorPicker ] = useState({});

    const handleColorChange = (color, index) => {
        setColorState(prevState => ({
            ...prevState,
            [index]: color.hex,
        }));
    };

    const toggleColorPicker = (index) => {
        setActionsOpen(false);
        setShowColorPicker(prevState => ({
            ...prevState,
            [index]: !prevState[index],
        }));
    };


    return (

        <div className={styles.whole}>
            <div className={styles.searchBar}>
                <img src={getImageUrl("icons/search.png")} />
                <input id="search" type="text" onChange={handleSearch} placeholder='Search categories' />
            </div>



            {currentCategories.length === 0 ? (
                <div className={styles.nothingBigDiv}>
                    <div className={styles.nothingFound}>
                        <img src={getImageUrl("nothing.png")} />
                        <h2>No Category Data</h2>
                        <p>We cannot seem to find any category data, your user information will appear here.</p>
                    </div>
                </div>
                
            ) : (
                <>

                <table className={styles.categoriestable}>
                    <thead>
                        <th className={styles.checkboxColumn}><input type="checkbox" id="selectAll" /></th>
                        <th>Categories</th>
                        <th>Created By</th>
                        <th>Colors Assigned</th>
                        <th>Type</th>
                        <th className={styles.action}>Action</th>
                    </thead>

                    <tbody>
                        {currentCategories.map((category, index) => (
                            <tr key={index}>
                                <td className={styles.checkbox}><input type="checkbox" /></td>
                                <td>{category.category}</td>
                                <td>{category.createdBy}</td>
                                <td className={styles.color}>
                                    <div className={styles.colorBox} style={{backgroundColor: colorState[index] || category.color}} />
                                </td>
                                <td className={styles.type}>
                                    <div className={classNames({
                                        [styles.inflow]: category.type.toLowerCase().includes('inflow'),
                                        [styles.outflow]: category.type.toLowerCase().includes('outflow'),
                                    })}>
                                        {category.type}
                                    </div>
                                </td>
                                <td className={styles.action}>
                                    <button onClick={() => toggleAction(index)}>
                                        <img src={getImageUrl("icons/action.png")} />
                                    </button>
                                    <div className={`${styles.actionsClosed} ${actionsOpen[index] && styles.theActions}`} ref={popupRef}>
                                        <p>ACTION</p>
                                        <ul>
                                            <li>Remove</li>
                                            <li onClick={() => toggleColorPicker(index)}>Change Color</li>
                                        </ul>
                                    </div>
                                    {showColorPicker[index] && (
                                        <div className={styles.popover}>
                                            <div className={styles.cover} onClick={() => toggleColorPicker(index)}/>
                                            <SketchPicker color={colorState[index] || category.color}
                                                onChange={(color) => handleColorChange(color, index)}
                                            />
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>

                <Pagination
                    filteredData={filteredCategories}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                    onPageChange={handlePageChange}
                />
                </>
            )}
        </div>
    )
}