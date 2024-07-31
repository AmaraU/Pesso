import { Text, Box, useToast, Spinner, Center } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import { TbCurrencyNaira } from 'react-icons/tb';
import axios from 'axios';
import { DEFAULT_RECENT_TRXNS_ERR_MSG, getAPIEndpoint } from '../../../config';
import { auditLog, logger } from '../../models/logging';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "./AccountsPage.module.css";
import { getImageUrl } from '../../../utils';
import classNames from 'classnames';
import { format } from 'date-fns';
import Pagination from '../../Components/Pagination/Pagination';

const toTitleCase = (txt) => {
    return txt[0].toUpperCase() + txt.substring(1).toLowerCase()
}

export const AccountInfoPage = () => {

    const location = useLocation();
    const { d } = location.state || {};
    const popupRef = useRef(null);
    const [_data, setData] = useState(null);
    const [isLoading, setIsloading] = useState(false);
    const [trxns, setTrxns] = useState([]);
    const [ search, setSearch] = useState("");
    const [ openFilter, setOpenFilter ] = useState(false);
    const [ currentPage, setCurrentPage ] = useState(1);
    const toast = useToast();
    const navigate = useNavigate();
    const itemsPerPage = 10;


    console.log(d);

    useEffect(() => {
        if (d) {
            setData(d);
            try {
                getRecentTrxns(d);
            } catch (error) {
                navigate('/dashboard/accounts');
            }
        }
        else {
            navigate('/dashboard/accounts');
            console.log("Nothing");
        }
    }, [])

    useEffect(() => {
        if (!sessionStorage.getItem("id")) {
            navigate('/signin');
        }
    }, [])

    const getRecentTrxns = async (d) => {
        setIsloading(true);
        try {
            const payload = {
                id: d.account_id,
                userId: sessionStorage.getItem("id")
            }

            const response = await axios.post(getAPIEndpoint('recent-trxns'), payload, {
                headers: {
                    "Authorization": `Bearer ${sessionStorage.getItem("tk")}`
                }
            });

            if (response) {
                const { status, data } = response.data;
                if (status === "success") {
                    setIsloading(false);
                    setTrxns(data);
                    return;
                }
                else {
                    setIsloading(false);
                    return;
                }
            }
        } catch (error) {
            console.log(error)
            await logger({ task: "Get Recent Transactions", error: error.toString() });
        }
        toast({
            description: DEFAULT_RECENT_TRXNS_ERR_MSG,
            position: "top",
            status: 'error',
            duration: 8000,
            isClosable: true,
        })

        setIsloading(false);
    }

    const sortedTrxns = [...trxns].sort((a,b) => new Date(a.timestamp) - new Date(b.timestamp));


    const filteredTrxns = sortedTrxns.filter(trxn => {
        const searchLower = search.toLowerCase();
        return (
            trxn.trans_narration.toLowerCase().includes(searchLower) ||
            trxn.trans_type.toLowerCase().includes(searchLower) ||
            trxn.timestamp.toLowerCase().includes(searchLower)
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTrxns = filteredTrxns.slice(indexOfFirstItem, indexOfLastItem);

    const groupedTrxns = currentTrxns.reduce((acc, transaction) => {
        const date = transaction.timestamp;
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(transaction);
        return acc;
    }, {});
    

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
        setCurrentPage(1);
    };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setOpenFilter(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);

    
    const removeNumbers = (str) => {
        return str.replace(/\d+/g, '');
    };
    function removeNumbersAndPunctuation(str) {
        return str.replace(/[0-9\p{P}]/gu, '');
    }

    const formatNumber = (number) => {
        return new Intl.NumberFormat('en-US').format(number);
    };



    return (
        <>
        <div className={styles.whole}>
            {/* <div className={styles.breadcrumb}><a href="/dashboard/accounts">Accounts</a>{'>'}<a href="/dashboard/accounts">{_data.institution_name} - {_data.account_number}</a>{'>'}<p>All transactions</p></div> */}

            <div className={styles.searchButtons}>
                <div className={styles.searchBar}>
                    <img src={getImageUrl("icons/search.png")} />
                    <input id="search" type="text" onChange={handleSearch} placeholder='Search for transactions' />
                </div>

                <div className={styles.buttons}>
                    <button className={styles.buttonOne} onClick={() => setOpenFilter(!openFilter)}>
                        <img src={getImageUrl("icons/slides.png")} />
                        All Transactions
                        <img src={getImageUrl("icons/redDownAngle.png")} />
                    </button>
                    <div className={`${styles.filterClosed} ${openFilter && styles.filter}`} ref={popupRef}>
                        <p>FILTER</p>
                        <a href="">Last 7 days</a>
                        <a href="">Last 15 days</a>
                        <a href="">Last 30 days</a>
                        <div className={styles.customFilter}>
                            <p>CUSTOM DATE</p>
                            <div className={styles.startEnd}>
                                <input type="date" placeholder='Start Date' />-
                                <input type="date" placeholder='End Date' />
                            </div>
                        </div>
                        <a className={styles.reset} href="">Reset All</a>
                    </div>
                </div>
            </div>

            { isLoading ?
                <Center pt={10} pb={20}> <Spinner /> </Center>
                :
                filteredTrxns.length > 0 ?
                    <>
                    <div>

                        {Object.keys(groupedTrxns).map((timestamp) => (
                            <div key={timestamp} className={styles.acctInfoTable}>
                                <h4>{format(new Date (timestamp), 'MMMM dd')}</h4>
                                {groupedTrxns[timestamp].map((transaction, index) => (
                                    <div key={index} className={styles.trxn}>
                                        <div className={styles.desc}>
                                            <h3>{removeNumbersAndPunctuation(transaction.trans_narration)}</h3>
                                            <p>{transaction.trans_type}</p>
                                        </div>

                                        <div className={classNames({
                                            [styles.credit]: transaction.trans_type.toLowerCase() == 'credit',
                                            [styles.debit]: transaction.trans_type.toLowerCase() == 'debit'
                                        })}>
                                            {transaction.trans_type.toLowerCase() === ("credit") ? `+` : ''}
                                            {transaction.trans_type.toLowerCase() === ("debit") ? `-` : ''}
                                            {transaction.currency.toLowerCase() === ("ngn") ? `N` : ``}
                                            {transaction.currency.toLowerCase() === ("usd") ? `$` : ``}
                                            {formatNumber(transaction.trans_amount)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <Pagination
                        filteredData={filteredTrxns}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        onPageChange={handlePageChange}
                    />
                    </>
                    :
                    <Box pt={10} pb={20}>
                        <Text fontSize={{ base: 'xs', md: 'sm' }} color={'gray.500'} textAlign={'center'}>No transactions found</Text>
                    </Box>
            }
        </div>

        
        </>

    );
}