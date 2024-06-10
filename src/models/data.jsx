import dayjs from "dayjs";
import moment from "moment-timezone";

const toTitleCase = (txt) => {
    return txt[0].toUpperCase() + txt.substring(1).toLowerCase()
}

export const receivableFields = [
    {
        accessorKey: 'id',
        header: 'Reference No.',
        enableColumnActions: false,
        size: 100,
    },
    {
        accessorKey: 'title',
        header: 'Title',
        enableColumnActions: false,
        size: 100,
    },
    {
        accessorKey: 'account',
        enableColumnActions: false,
        header: 'Account No.',
        size: 100,
    },
    {
        accessorKey: 'amount',
        enableColumnActions: false,
        header: 'Amount',
        size: 100,
    },
    {
        accessorKey: 'date',
        header: 'Date',
        size: 100,
    }
];

export const paymentFields = [
    {
        accessorKey: 'id',
        header: 'Reference No.',
        enableColumnActions: false,
        size: 100,
    },
    {
        accessorKey: 'beneficiary',
        header: 'Beneficiary',
        enableColumnActions: false,
        size: 100,
    },
    {
        accessorKey: 'amount',
        enableColumnActions: false,
        header: 'Amount',
        size: 100,
    },
    {
        accessorKey: 'date',
        header: 'Date',
        size: 100,
    }
];

export const loanFields = [
    {
        accessorKey: 'id',
        header: 'Reference No.',
        enableColumnActions: false,
        size: 100,
    },
    {
        accessorKey: 'account',
        header: 'Account No.',
        enableColumnActions: false,
        size: 100,
    },
    {
        accessorKey: 'amount',
        enableColumnActions: false,
        header: 'Amount',
        size: 100,
    },
    {
        accessorKey: 'date',
        header: 'Maturity Date',
        size: 100,
    }
];

export const accountFields = [
    {
        accessorKey: 'id',
        header: 'Reference No.',
        enableColumnActions: false
    },
    {
        accessorKey: 'institution_name',
        header: 'Bank',
        enableColumnActions: false,
        size: 100,
    },
    {
        accessorKey: 'account_number',
        header: 'Account No.',
        enableColumnActions: false,
        size: 100,
    },
    {
        accessorKey: 'account_type',
        header: 'Account Type',
        enableColumnActions: false,
        Cell: ({ cell }) => toTitleCase(cell.getValue()).replace("_account", ""),
        size: 100,
    },
    {
        accessorKey: 'account_currency',
        header: 'Currency',
        enableColumnActions: false,
        Cell: ({ cell }) => cell.getValue().toUpperCase(),
        size: 100,
    },
    {
        accessorKey: 'account_balance',
        enableColumnActions: false,
        header: 'Balance',
        Cell: ({ cell }) => parseFloat(cell.getValue()).toLocaleString('en-US'),
        size: 100,
    },
    {
        accessorFn: (row) => dayjs(new Date(row.updated_at)),
        accessorKey: 'updated_at',
        id: 'updated_at',
        header: 'Last Updated',
        Cell: ({ cell }) => cell.getValue().format('DD/MM/YYYY hh:mm:ss A'),
        size: 130,
    },
];

export const trxnFields = [
    {
        accessorKey: 'id',
        header: 'Reference No.',
        enableColumnActions: false
    },
    {
        accessorKey: 'trans_narration',
        header: 'Description',
        enableColumnActions: false,
        size: 300,
    },
    {
        accessorKey: 'trans_amount',
        header: 'Amount',
        enableColumnActions: false,
        Cell: ({ cell }) => parseFloat(cell.getValue()).toLocaleString('en-US'),
        size: 100,
    },
    {
        accessorKey: 'trans_type',
        header: 'Type',
        enableColumnActions: false,
        Cell: ({ cell }) => toTitleCase(cell.getValue()).replace("_account", ""),
        size: 100,
    },
    {
        accessorKey: 'currency',
        header: 'Currency',
        enableColumnActions: false,
        Cell: ({ cell }) => cell.getValue().toUpperCase(),
        size: 100,
    },
    {
        accessorFn: (row) => dayjs(new Date(row.trans_date)),
        accessorKey: 'trans_date',
        id: 'trans_date',
        header: 'Date',
        Cell: ({ cell }) => cell.getValue().format('DD/MM/YYYY hh:mm:ss A'),
        size: 100,
    },
];

export const trxnFields2 = [
    {
        accessorKey: 'trans_narration',
        header: 'Description',
        enableColumnActions: false,
        size: 300,
    },
    {
        accessorKey: 'trans_amount',
        header: 'Amount',
        enableColumnActions: false,
        Cell: ({ cell }) => parseFloat(cell.getValue()).toLocaleString('en-US'),
        size: 100,
    },
    {
        accessorKey: 'account_number',
        header: 'Account No',
        enableColumnActions: false,
        size: 100,
    },
    {
        accessorKey: 'currency',
        header: 'Currency',
        enableColumnActions: false,
        Cell: ({ cell }) => cell.getValue().toUpperCase(),
        size: 100,
    },
    {
        accessorFn: (row) => dayjs(new Date(row.trans_date)),
        accessorKey: 'trans_date',
        id: 'trans_date',
        header: 'Date',
        Cell: ({ cell }) => cell.getValue().format('DD/MM/YYYY hh:mm:ss A'),
        size: 100,
    },
    {
        accessorKey: 'trans_ref',
        header: 'Reference No.',
        enableColumnActions: false
    },
];

export const trxnFields3 = [
    {
        accessorKey: 'trans_narration',
        header: 'Description',
        enableColumnActions: false,
        size: 300,
    },
    {
        accessorKey: 'trans_amount',
        header: 'Amount',
        enableColumnActions: false,
        Cell: ({ cell }) => parseFloat(cell.getValue()).toLocaleString('en-US'),
        size: 100,
    },
    {
        accessorKey: 'trans_type',
        header: 'Type',
        enableColumnActions: false,
        size: 70,
    },
    {
        accessorKey: 'account_number',
        header: 'Account No',
        enableColumnActions: false,
        size: 100,
    },
    {
        accessorKey: 'currency',
        header: 'Currency',
        enableColumnActions: false,
        Cell: ({ cell }) => cell.getValue().toUpperCase(),
        size: 90,
    },
    {
        accessorFn: (row) => dayjs(new Date(row.trans_date)),
        accessorKey: 'trans_date',
        id: 'trans_date',
        header: 'Date',
        Cell: ({ cell }) => cell.getValue().format('DD/MM/YYYY hh:mm:ss A'),
        size: 100,
    },
    {
        accessorKey: 'trans_ref',
        header: 'Reference No.',
        enableColumnActions: false
    },
];

export const budgetFields = [
    {
        accessorKey: 'budget_title',
        header: 'Title',
        size: 200,
    },
    {
        accessorKey: 'budget_amount',
        header: 'Amount',
        Cell: ({ cell }) => parseFloat(cell.getValue()).toLocaleString('en-US'),
        size: 100,
    },
    {
        accessorKey: 'budget_category',
        header: 'Category',
        size: 150,
    },
    {
        accessorKey: 'budget_category_id',
        header: 'Category Id',
        size: 100,
    },
    {
        accessorKey: 'assigned_to',
        header: 'Assigned To',
        size: 120,
    },
    {
        accessorFn: (row) => dayjs(new Date(row.start_date)),
        accessorKey: 'start_date',
        id: 'start_date',
        header: 'Start date',
        Cell: ({ cell }) => cell.getValue().format('DD/MM/YYYY'),
        size: 100,
    },
    {
        accessorFn: (row) => dayjs(new Date(row.end_date)),
        accessorKey: 'end_date',
        id: 'end_date',
        header: 'End date',
        Cell: ({ cell }) => cell.getValue().format('DD/MM/YYYY'),
        size: 100,
    },
    {
        accessorFn: (row) => dayjs(new Date(row.created_date)),
        accessorKey: 'created_date',
        id: 'created_date',
        header: 'Date created',
        Cell: ({ cell }) => cell.getValue().format('DD/MM/YYYY hh:mm:ss A'),
    },
    {
        accessorKey: 'id',
        header: 'Reference No.'
    },
];

export const userFields = [
    {
        accessorKey: 'full_name',
        header: 'Name',
        size: 100,
    },
    {
        accessorKey: 'email_address',
        header: 'Email',
        size: 100,
    },
    {
        accessorKey: 'role_name',
        header: 'Role',
        size: 100,
    },
    {
        accessorFn: (row) => row.last_loggedin ? dayjs(new Date(row.last_loggedin)) : null,
        accessorKey: 'last_loggedin',
        header: 'Last Logged In',
        Cell: ({ cell }) => {
            if (cell.getValue()) {
                const dt = cell.getValue().format('YYYY-MM-DD HH:mm:ss');
                return moment.tz(dt, "Africa/Lagos").startOf('seconds').fromNow();
            }
        },
        size: 100,
    },
    {
        accessorFn: (row) => dayjs(new Date(row.updated_date)),
        accessorKey: 'updated_date',
        id: 'updated_date',
        header: 'Last Updated',
        Cell: ({ cell }) => cell.getValue().format('DD/MM/YYYY hh:mm:ss A'),
        size: 100,
    },
    {
        accessorKey: 'id',
        header: 'Reference No.'
    },
];

export const auditTrailFields = [
    {
        accessorKey: 'activity_description',
        header: 'Activity',
        size: 200,
    },
    {
        accessorKey: 'module',
        header: 'Module',
        size: 100,
    },
    {
        accessorKey: 'user',
        header: 'User',
        size: 100,
    },
    {
        accessorFn: (row) => dayjs(new Date(row.timestamp)),
        accessorKey: 'timestamp',
        id: 'timestamp',
        header: 'Date & Time',
        Cell: ({ cell }) => cell.getValue().format('DD/MM/YYYY hh:mm:ss A'),
        size: 100,
    }
];