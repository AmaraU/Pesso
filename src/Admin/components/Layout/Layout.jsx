import { useState} from 'react';
import { Outlet } from "react-router-dom";
import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "../SideBar/SideBar"
import { Header } from "../Header/Header";

export const LayoutAdmin = () => {
  const [page, setPage] = useState("Dashboard");
  const [content, setContent] = useState("Organization");

  return (
    <>
    <Header page={page} setContent={setContent} />
    <Flex justifyContent="space-between">
        <Sidebar setPage={setPage} />
        <Box w='100%' p={4} ml={"250px"}>
          <Outlet context={{ content }} />
      </Box>
    </Flex>
    </>
    
  )
}