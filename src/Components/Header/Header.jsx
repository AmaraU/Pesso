import {
    IconButton,
    Avatar,
    Box,
    HStack,
    VStack,
    useColorModeValue,
    Text,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Stack
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { FiBell, FiChevronDown } from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";
import styles from "./Header.module.css";
import { getImageUrl } from "../../../utils";
import { useNavigate } from "react-router-dom";


export const Header = () => {

    const [ showNav, setShowNav ] = useState(false);
    const [ businessName, setBusinessName ] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('email')) {
            navigate('/');
        }
        const data = location.state;
        setBusinessName(sessionStorage.getItem('bizName'));
    }, []);


    let currentPath = window.location.pathname;
    let PageTitle;
    let linkList = [];
    let isWider = false;

    switch (currentPath) {

        case "/":
        case "/dashboard":
        case "/dashboard/overview":
            PageTitle = "Dashboard";
            isWider = false;
            break;
        
        case "/dashboard/transactions":
        case "/dashboard/transactions/transfer":
            PageTitle = "Transactions";
            linkList = [
                {title: "History", link: "/dashboard/transactions"},
                {title: "Transfer", link: "/dashboard/transactions/transfer"}
            ];
            isWider = true;
            break;
        
        case "/dashboard/accounts":
        case "/dashboard/account-info":
            PageTitle = "Accounts";
            isWider = false;
            break;
        
        case "/dashboard/cashflow":
        case "/dashboard/cashflow/outflow":
            PageTitle = "Cashflow";
            linkList = [
                {title: "Inflow", link: "/dashboard/cashflow"},
                {title: "Outflow", link: "/dashboard/cashflow/outflow"}
            ];
            isWider = true;
            break;
        
        case "/dashboard/loans":
            PageTitle = "Loans";
            isWider = false;
            break;
        
        case "/dashboard/request":
            PageTitle = "Request";
            isWider = false;
            break;
        
        case "/dashboard/investments":
            PageTitle = "Investments";
            isWider = false;
            break;
        
        case "/dashboard/bulktransfer":
            PageTitle = "Bulk Transfer";
            isWider = false;
            break;
        
        case "/dashboard/budget":
            PageTitle = "Budget";
            isWider = false;
            break;
        
        case "/dashboard/reconciliation":
            PageTitle = "Reconciliation";
            isWider = false;
            break;
        
        case "/dashboard/reports":
        case "/dashboard/reports/history":
            PageTitle = "Reports";
            linkList = [
                {title: "Financial Health Indicator", link: "/dashboard/reports"},
                {title: "History", link: "/dashboard/reports/history"}
            ];
            isWider = true;
            break;
        
        case "/dashboard/audittrails":
            PageTitle = "Audit Trails";
            isWider = false;
            break;
        
        case "/dashboard/users":
        case "/dashboard/users/roles":
            PageTitle = "Users";
            linkList = [
                {title: "Members", link: "/dashboard/users"},
                {title: "Roles & Permissions", link: "/dashboard/users/roles"},
            ];
            isWider = true;
            break;
        
        case "/dashboard/settings":
        case "/dashboard/settings/account":
        case "/dashboard/settings/workflow":
        case "/dashboard/settings/categories":
            PageTitle = "Settings";
            linkList = [
                {title: "Profile", link: "/dashboard/settings"},
                {title: "Account", link: "/dashboard/settings/account"},
                {title: "Workflow", link: "/dashboard/settings/workflow"},
                {title: "Categories", link: "/dashboard/settings/categories"}
            ];
            isWider = true;
            break;
    }

    return (
        <>
        <div className={`${styles.header} ${isWider ? styles.widerHeader : styles.header}`}>

            <div className={styles.logo} >
                <a href="/dashboard"><img src={getImageUrl("logos/whiteLogo.png")} alt="PESSO" /></a>
            </div>
            <button className={styles.menuOpen} onClick={()=>setShowNav(!showNav)}><img src={getImageUrl("icons/menuOpen.png")} alt="" /></button>
            
            <div>
                {showNav && <div className={styles.popupNav}>
                    <button onClick={()=>setShowNav(false)}>
                        <img src={getImageUrl('icons/whiteLeftArrow.png')} />
                        Back
                    </button>
                    <div className={`${styles.linkList} ${isWider ? styles.widerLinkList : styles.linkList}`}>

                        <a href="/dashboard/overview" className={currentPath === "/dashboard/overview" ? styles.active : ""}>
                            <img className={styles.white} src={getImageUrl("icons/dashboardWhite.png")} />
                            <img className={styles.red} src={getImageUrl("icons/dashboardRed.png")} />
                            Dashboard
                        </a>
                        <a href="/dashboard/transactions" className={currentPath.includes("/dashboard/transactions") ? styles.active : ""}>
                            <img className={styles.white} src={getImageUrl("icons/transactionsWhite.png")} />
                            <img className={styles.red} src={getImageUrl("icons/transactionsRed.png")} />
                            Transactions
                        </a>
                        <a href="/dashboard/accounts" className={currentPath.includes("/dashboard/accounts") ? styles.active : ""}>
                            <img className={styles.white} src={getImageUrl("icons/accountsWhite.png")} />
                            <img className={styles.red} src={getImageUrl("icons/accountsRed.png")} />
                            Accounts
                        </a>
                        <a href="/dashboard/cashflow" className={currentPath.includes("/dashboard/cashflow") ? styles.active : ""}>
                            <img className={styles.white} src={getImageUrl("icons/cashflowWhite.png")} />
                            <img className={styles.red} src={getImageUrl("icons/cashflowRed.png")} />
                            Cashflow
                        </a>
                        <a href="/dashboard/loans" className={currentPath.includes("/dashboard/loans") ? styles.active : ""}>
                            <img className={styles.white} src={getImageUrl("icons/loansWhite.png")} />
                            <img className={styles.red} src={getImageUrl("icons/loansRed.png")} />
                            Loans
                        </a>
                        <a href="/dashboard/request" className={currentPath.includes("/dashboard/request") ? styles.active : ""}>
                            <img className={styles.white} src={getImageUrl("icons/loansWhite.png")} />
                            <img className={styles.red} src={getImageUrl("icons/loansRed.png")} />
                            Request
                        </a>
                        <a href="/dashboard/budget" className={currentPath.includes("/dashboard/budget") ? styles.active : ""}>
                            <img className={styles.white} src={getImageUrl("icons/budgetWhite.png")} alt="" />
                            <img className={styles.red} src={getImageUrl("icons/budgetRed.png")} alt="" />
                            Budget
                        </a>
                        <a href="/dashboard/reports" className={currentPath.includes("/dashboard/reports") ? styles.active : ""}>
                            <img className={styles.white} src={getImageUrl("icons/reportsWhite.png")} />
                            <img className={styles.red} src={getImageUrl("icons/reportsRed.png")} />
                            Reports
                        </a>
                        <a href="/dashboard/audittrails" className={currentPath.includes("/dashboard/audittrails") ? styles.active : ""}>
                            <img className={styles.white} src={getImageUrl("icons/auditTrailsWhite.png")} />
                            <img className={styles.red} src={getImageUrl("icons/auditTrailsRed.png")} />
                            Audit Trails
                        </a>
                        <a href="/dashboard/users" className={currentPath.includes("/dashboard/users") ? styles.active : ""}>
                            <img className={styles.white} src={getImageUrl("icons/usersWhite.png")} />
                            <img className={styles.red} src={getImageUrl("icons/usersRed.png")} />
                            Users
                        </a>
                    </div>
                </div>}
            </div>

            <div className={`${styles.whole} ${isWider ? styles.widerWhole : styles.whole}`}>    
            
                <div className={`${styles.leftRight} ${isWider ? styles.widerLeftRight : styles.leftRight}`}>

                    <div className={styles.headerLeft}>

                        <h2>{PageTitle}</h2>
                        <div className={styles.links}>
                            {linkList.map(({ title, link }, index) => (
                                <a key={index} href={link} className={currentPath === link ? styles.activeLink : styles.inactiveLink}>
                                    {title}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className={styles.headerRight}>
                        <Stack>
                            <HStack spacing={{ base: "0", md: "6" }}>
                                <IconButton _hover={{ bg: "#5F57FF11" }}
                                    size="lg"
                                    variant="ghost"
                                    aria-label="open menu"
                                    icon={<FiBell />}
                                />
                                <Box alignItems={"center"} zIndex={5}>
                                    <Menu>
                                        <MenuButton
                                            py={2}
                                            transition="all 0.3s"
                                            _focus={{ boxShadow: "none" }}
                                        >
                                            <HStack>
                                                <Avatar
                                                    size={"sm"}
                                                    name={businessName}
                                                    bg={"gray.700"}
                                                    color={"white"}
                                                />
                                                <VStack
                                                    display={{ base: "none", md: "flex" }}
                                                    alignItems="flex-start"
                                                    spacing="1px"
                                                    ml="2"
                                                >
                                                    <Text fontSize="sm">{businessName}</Text>
                                                    <Text fontSize="xs" color="gray.600">
                                                        {sessionStorage.getItem('email') ? sessionStorage.getItem('email') : ""}
                                                    </Text>
                                                </VStack>
                                                <Box display={{ base: "none", md: "flex" }}>
                                                    <FiChevronDown />
                                                </Box>
                                            </HStack>
                                        </MenuButton>
                                        <MenuList
                                            bg={useColorModeValue("white", "gray.900")}
                                            borderColor={useColorModeValue("gray.200", "gray.700")}
                                            fontSize={'sm'}
                                        >
                                            <MenuItem _hover={{ bg: "#5F57FF11" }} onClick={() => navigate("/dashboard/settings")}>
                                                <HStack pl={4} spacing={3}>
                                                    <IoSettingsOutline />
                                                    <Text>Account settings</Text>
                                                </HStack>
                                            </MenuItem>
                                            <MenuDivider />
                                            <MenuItem _hover={{ bg: "#1C6BFF11" }} onClick={() => navigate("/signin")}>
                                                <HStack pl={4} spacing={3}>
                                                    <PiSignOut />
                                                    <Text>Log out</Text>
                                                </HStack>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Box>
                            </HStack>
                        </Stack>
                    </div>
                </div>

                {isWider ? 
                <div className={styles.widerLinks}>
                    {linkList.map(({ title, link }, index) => (
                    <a key={index} href={link} className={currentPath === link ? styles.activeLink : styles.inactiveLink}>
                        {title}
                    </a>
                ))}
                </div>
                :
                <></>
            }
            </div>

            
        </div>
        </>
    )
}