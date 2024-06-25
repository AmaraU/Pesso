import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../Components/Navbar/Navbar';
import { Header } from '../Components/Header/Header';
import { Box } from '@chakra-ui/react';
import styles from '../App.module.css';

export const DashboardLayout = () => {
    return (
        <>
        <Header />

        <div className={styles.withNav}>
            <Navbar />
            <Box width={"100%"}>
                <Outlet />
            </Box>
        </div>
        </>
    );
}