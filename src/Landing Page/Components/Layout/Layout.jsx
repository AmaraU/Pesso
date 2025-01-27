import React ,{useState}from "react"
import { Navbar } from "../Navbar/Navbar"
import { Outlet } from "react-router-dom";
import { Footer } from "../Footer/Footer";

export const Layout =()=>{
    const [content,setContents]=useState("Loan Management");
    return(
        <div style={{ overflowX: 'hidden' }}>
        <Navbar setContents={setContents}/>
        <Outlet context={{content}}/>
        <Footer/>
        </div>
    )
}