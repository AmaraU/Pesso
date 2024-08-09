const BASE_URL = "https://cashmgt.wovapt.tech/api"; //"http://localhost:7000/api";

export const DEFAULT_ONBOARDING_ERR_MSG = "We are unable to create your account at the moment. Please contact support or try again later.";
export const DEFAULT_AUTH_ERR_MSG = "We are unable to authenticate you at the moment. Please contact support or try again later";
export const DEFAULT_ACCOUNT_ID_ERR_MSG = "We are unable to retrieve account ID at this time. Please contact support or try again later"
export const DEFAULT_ACCOUNT_DETAILS_ERR_MSG = "We are unable to retrieve account details at this time. Please contact support or try again later"
export const DEFAULT_ACCOUNT_DETAILS_ALL_ERR_MSG = "We are unable to retrieve your linked accounts at this time. Please contact support or try again later"
export const DEFAULT_RECENT_TRXNS_ERR_MSG = "We are unable to retrieve your recent transactions at this time. Please contact support or try again later"
export const DEFAULT_ACCOUNT_UNLINK_ERR_MSG = "We are unable to unlink account at this time. Please contact support or try again later";
export const DEFAULT_CASHFLOW_SUMMARY_ERR_MSG = "We are unable to retrieve cashflow summary at this time. Please contact support or try again later";
export const DEFAULT_BUDGET_CATEGORIES_ERR_MSG = "We are unable to retrieve budget categories at this time. Please contact support or try again later";
export const DEFAULT_BANKS_ERR_MSG = "We are unable to retrieve bank list at this time. Please contact support or try again later";
export const DEFAULT_CREATE_BUDGET_ERR_MSG = "We are unable to create your budget at this time. Please contact support or try again later";
export const DEFAULT_BUDGET_DATA_ERR_MSG = "We are unable to fetch your budgets at this time. Please contact support or try again later";
export const DEFAULT_ADD_ROLE_ERR_MSG = "We are unable to create role at this time. Please contact support or try again later";
export const DEFAULT_USER_ROLE_ASSIGN_ERR_MSG = "We are unable to assign user to role at this time. Please contact support or try again later";
export const DEFAULT_GET_ROLES_ERR_MSG = "We are unable to fetch roles at this time. Please contact support or try again later";
export const DEFAULT_GET_USERS_ERR_MSG = "We are unable to fetch users at this time. Please contact support or try again later";
export const DEFAULT_AUDIT_TRAIL_ERR_MSG = "We are unable to fetch audit trail at this time. Please contact support or try again later";
export const DEFAULT_USER_INFO_ERR_MSG = "We are unable to retrieve user's personal data at this time. Please contact support or try again later";

export const DEFAULT_ADD_INVOICE_ERR_MSG = "We are unable to create this invoice at this time. Please contact support or try again later."

export function getAPIEndpoint(type, isremote = false) {
    let url = null;
    switch (type) {
        case 'signin':
            url = `${BASE_URL}/auth`
            break;
        case 'signup':
            url = `${BASE_URL}/onboarding`
            break;
        case 'error':
            url = `${BASE_URL}/log/error`
            break;
        case 'account-id':
            url = `${BASE_URL}/account/id`
            break;
        case 'account-details':
            url = `${BASE_URL}/account/details`
            break;
        case 'accounts-fetch':
            url = `${BASE_URL}/account/details/all`
            break;
        case 'recent-trxns':
            url = `${BASE_URL}/account/recent/trxns`
            break;
        case 'account-unlink':
            url = `${BASE_URL}/account/unlink`
            break;
        case 'trxns':
            url = `${BASE_URL}/transactions/`
            break;
        case 'cashflow-summary':
            url = `${BASE_URL}/transactions/cashflow/summary`
            break;
        case 'budget-categories':
            url = `${BASE_URL}/budget/categories`
            break;
        case 'get-banks':
            url = `${BASE_URL}/static/data/banks`
            break;
        case 'add-budget':
            url = `${BASE_URL}/budget/save`
            break;
        case 'get-budgets':
            url = `${BASE_URL}/budget/data/all`
            break;
        case 'user-assign-role':
            url = `${BASE_URL}/user/role/assign`
            break;
        case 'add-role':
            url = `${BASE_URL}/user/role/add`
            break;
        case 'delete-role':
            url = `${BASE_URL}/user/role/delete`
            break;
        case 'get-roles':
            url = `${BASE_URL}/user/roles/all`
            break;
        case 'get-users':
            url = `${BASE_URL}/user/get/all`
            break;
        case 'delete-user':
            url = `${BASE_URL}/user/delete`
            break;
        case 'delete-budget':
            url = `${BASE_URL}/budget/delete`
            break;
        case 'log-activity':
            url = `${BASE_URL}/log/activity`
            break;
        case 'audit-trail':
            url = `${BASE_URL}/log/audit/trail`
            break;
        case 'user-info':
            url = `${BASE_URL}/user/info`
            break;
    }

    return url;
}