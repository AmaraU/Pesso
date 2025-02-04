import React from "react";
import { Flex, Container, Button } from "@chakra-ui/react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const buttonStyle = {
        variant: 'outline',
        borderColor: '#FFF',
        color: '#9CA3AF'
    };

    return (
        <Container>
            <Flex gap="3px" justify="center">
                <Button
                    {...buttonStyle}
                    leftIcon={<MdOutlineKeyboardArrowLeft size="20px" />}
                    onClick={() => onPageChange(currentPage - 1)}
                    isDisabled={currentPage === 1}
                >
                    Previous
                </Button>
                
                {[...Array(totalPages).keys()].map((_, index) => {
                    const page = index + 1;
                    return (
                        <Button
                            key={page}
                            {...buttonStyle}
                            bg={currentPage === page ? "gray.200" : "transparent"}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </Button>
                    );
                })}

                <Button
                    {...buttonStyle}
                    rightIcon={<MdOutlineKeyboardArrowRight size="20px" />}
                    onClick={() => onPageChange(currentPage + 1)}
                    isDisabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </Flex>
        </Container>
    );
};
