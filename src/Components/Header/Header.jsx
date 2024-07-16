import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import { getImageUrl } from "../../../utils";

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
    Image,
    Stack
} from "@chakra-ui/react"
import {
    FiBell,
    FiChevronDown,
} from "react-icons/fi";
import { IoSettingsOutline } from "react-icons/io5";
import { PiSignOut } from "react-icons/pi";
import { useNavigate } from "react-router-dom";


export const Header = () => {
    const [businessName, setBusinessName] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem('email')) {
            navigate('/');
        }
        const data = location.state;
        console.log(data);
        setBusinessName(sessionStorage.getItem('bizName'));
    }, []);


    let currentPath = window.location.pathname;
    let PageTitle;
    let linkList = [];

    switch (currentPath) {

        case "/":
        case "/dashboard":
        case "/dashboard/overview":
            PageTitle = "Dashboard";
            break;
        
        case "/dashboard/transactions":
        case "/dashboard/transactions/transfer":
            PageTitle = "Transactions";
            linkList = [
                {title: "History", link: "/dashboard/transactions"},
                {title: "Transfer", link: "/dashboard/transactions/transfer"}
            ];
            break;
        
        case "/dashboard/accounts":
            PageTitle = "Accounts";
            break;
        
        case "/dashboard/cashflow":
        case "/dashboard/cashflow/outflow":
            PageTitle = "Cashflow";
            linkList = [
                {title: "Inflow", link: "/dashboard/cashflow"},
                {title: "Outflow", link: "/dashboard/cashflow/outflow"}
            ];
            break;
        
        case "/dashboard/loans":
            PageTitle = "Loans";
            break;
        
        case "/dashboard/request":
            PageTitle = "Request";
            break;
        
        case "/dashboard/investments":
            PageTitle = "Investments";
            break;
        
        case "/dashboard/bulktransfer":
            PageTitle = "Bulk Transfer";
            break;
        
        case "/dashboard/budget":
            PageTitle = "Budget";
            break;
        
        case "/dashboard/reconciliation":
            PageTitle = "Reconciliation";
            break;
        
        case "/dashboard/reports":
        case "/dashboard/reports/history":
            PageTitle = "Reports";
            linkList = [
                {title: "Financial Health Indicator", link: "/dashboard/reports"},
                {title: "History", link: "/dashboard/reports/history"}
            ];
            break;
        
        case "/dashboard/audittrails":
            PageTitle = "Audit Trails";
            break;
        
        case "/dashboard/users":
        case "/dashboard/users/roles":
            PageTitle = "Users";
            linkList = [
                {title: "Members", link: "/dashboard/users"},
                {title: "Roles & Permissions", link: "/dashboard/users/roles"},
            ];
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
            break;
    }

    return (
        <div className={styles.header}>

            <div className={styles.logo} >
                <a href="/dashboard"><img src={getImageUrl("logos/whiteLogo.png")} alt="PESSO" /></a>
            </div>

            <div className={styles.leftRight}>

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

            

        </div>
    )
}