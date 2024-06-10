import { Box } from "@chakra-ui/react";
import Table from "../../Table";
import TableCRUD from "../../TableCRUD";

export const DataWidget = ({ entries = [], fields = [], isLoading = false, fileName = "data", fieldFontSize = "12px", entryFontSize = "13px", type = "", initSortingField = "", noDataText = "", showHideColumns = {}, isCrud = false, editHandler = null, deleteHandler = null }) => {
    const screenWidth = window.screen.availWidth;

    return (
        <Box pt={{ base: 3, md: 3 }}>
            {
                isCrud ?
                    <TableCRUD data={entries} enableTopToolbar={true} columns={fields} showHideColumns={showHideColumns} columnHeaderFontSize={screenWidth <= 800 ? "12px" : fieldFontSize} rowFontSize={screenWidth <= 800 ? "12px" : entryFontSize} fileName={fileName} isLoading={isLoading} tableHeader="" noDataText={noDataText} initSortingField={initSortingField} handleDeleteRow={deleteHandler} handleEditRow={editHandler} /> :
                    <Table data={entries} enableTopToolbar={true} columns={fields} showHideColumns={showHideColumns} columnHeaderFontSize={screenWidth <= 800 ? "12px" : fieldFontSize} rowFontSize={screenWidth <= 800 ? "12px" : entryFontSize} fileName={fileName} isLoading={isLoading} tableHeader="" noDataText={noDataText} initSortingField={initSortingField} />
            }
        </Box>
    );
}