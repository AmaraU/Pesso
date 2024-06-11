import { MaterialReactTable, MRT_ToggleFiltersButton } from 'material-react-table';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Center, Stack, Text, IconButton, HStack } from '@chakra-ui/react';
import { download, mkConfig, generateCsv } from 'export-to-csv';
import { BiArrowBack } from 'react-icons/bi';
import { PiDownloadSimple } from 'react-icons/pi';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

const TableCRUD = ({ data = [], columns = [], isLoading = false, tableHeader = "", noDataText = "", noDataTextSize = "sm", backAction = null, enableTopToolbar = false, fileName = "data", columnHeaderFontSize = "12px", rowFontSize = "12px", showHideColumns = {}, initSortingField = "", handleEditRow, handleDeleteRow }) => {
    const theme = createTheme({

    });

    const csvOptions = mkConfig({
        fieldSeparator: ',',
        filename: fileName,
        quoteCharacter: '"',
        quoteStrings: true,
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        useKeysAsHeaders: false,
        columnHeaders: columns.map((c) => ({ key: c.accessorKey, displayLabel: c.header }))
    });

    const handleExportData = () => {
        const csv = generateCsv(csvOptions)(data);
        download(csvOptions)(csv);
    };

    return (
        <ThemeProvider theme={theme}>
            <MaterialReactTable
                columns={columns}
                data={data ?? []}
                enableHiding={false}
                enableColumnResizing={false}
                enableColumnActions={true}
                enableColumnFilters={true}
                enablePagination={true}
                enableSorting={true}
                enableStickyHeader={true}
                enableBottomToolbar={true}
                enableTopToolbar={enableTopToolbar}
                muiTableBodyRowProps={{ hover: true }}
                enableColumnFilterModes={false}
                enableColumnOrdering={false}
                enableGrouping={false}
                enablePinning={false}
                enableRowActions={true}
                enableRowSelection={false}
                enableDensityToggle={false}
                enableFilterMatchHighlighting={false}
                positionGlobalFilter="left"
                muiSearchTextFieldProps={{
                    placeholder: `Search`,
                }}
                renderRowActions={({ row, table }) => (
                    <HStack spacing={4}>
                        <IconButton onClick={() => handleEditRow(row)}>
                            <EditIcon color={'#1C6BFF'} />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteRow(row)}>
                            <DeleteIcon color={'#DD0000'} />
                        </IconButton>
                    </HStack>
                )}

                muiTableProps={{
                    sx: {
                        tableLayout: 'fixed',
                        fontSize: '10px'
                    },
                }}
                muiTableHeadCellProps={{
                    sx: {
                        fontSize: columnHeaderFontSize,
                        color: '#666666',
                        fontWeight: 600
                    },
                }}
                muiTableBodyCellProps={{
                    sx: {
                        fontSize: rowFontSize
                    },
                }}
                muiTableHeadCellFilterTextFieldProps={{
                    placeholder: '',
                    sx: {
                        fontSize: '12px'
                    },
                }}

                state={{ showProgressBars: isLoading, showSkeletons: isLoading }}
                muiLinearProgressProps={({ isTopToolbar }) => ({
                    sx: {
                        display: isTopToolbar ? 'block' : 'none',
                    },
                })}
                initialState={{
                    density: 'comfortable',
                    pagination: { pageIndex: 0, pageSize: 10 },
                    showGlobalFilter: true,
                    sorting: [
                        { id: initSortingField, desc: true }
                    ],
                    columnVisibility: showHideColumns
                }}
                renderTopToolbarCustomActions={({ table }) => (
                    <Stack direction={'row'}>
                        {backAction ? <IconButton onClick={backAction}><BiArrowBack /></IconButton> : ''}
                        <Box ml={1.5} pt={1}>
                            <Text fontSize={'xl'} fontWeight={500}>{tableHeader}</Text>
                        </Box>
                    </Stack>
                )}
                renderToolbarInternalActions={({ table }) => (
                    <>
                        <IconButton onClick={handleExportData}>
                            <PiDownloadSimple />
                        </IconButton>
                        <MRT_ToggleFiltersButton table={table} />
                        {/* <MRT_FullScreenToggleButton table={table} /> */}
                    </>

                )}
                renderEmptyRowsFallback={({ table }) => (
                    <Center py={6}>
                        <Text fontSize={noDataTextSize} color={'gray.500'}>{noDataText}</Text>
                    </Center>
                )}
            />

        </ThemeProvider>
    );
};

export default TableCRUD;

