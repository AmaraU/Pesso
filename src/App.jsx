import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { Signin } from './Pages/Signin';
import { Signup } from './Pages/Signup';

import { DashboardLayout } from './Pages/DashboardLayout';

import { Overview } from './Pages/DashboardPage/Overview';
import { TransactionsPage } from './Pages/TransactionsPage/TransactionsPage';
import { TransactionsTransferPage } from './Pages/TransactionsTransferPage/TransactionsTransferPage';
import { AccountsPage } from './Pages/AccountsPage/AccountsPage';
import { CashflowInPage } from './Pages/CashflowInPage/CashflowInPage';
import { CashflowOutPage } from './Pages/CashflowOutPage/CashflowOutPage';
import { LoansPage } from './Pages/LoansPage/LoansPage';
import { InvestmentsPage } from './Pages/InvestmentsPage/InvestmentsPage'
import { BudgetPage } from './Pages/BudgetPage/BudgetPage';
import { ReportsPage } from './Pages/ReportsPage/ReportsPage';
import { ReportsHistoryPage } from './Pages/ReportsHistoryPage/ReportsHistoryPage';
import { AuditTrailsPage } from './Pages/AuditTrailsPage/AuditTrailsPage';
import { UsersPage } from './Pages/UsersPage/UsersPage';
import { UsersRolesPage } from './Pages/UsersRolesPage/UsersRolesPage';
import { SettingsProfilePage } from './Pages/SettingsProfilePage/SettingsProfilePage';
import { SettingsAccountPage } from './Pages/SettingsAccountPage/SettingsAccountPage';
import { SettingsWorkflowPage } from './Pages/SettingsWorkflowPage/SettingsWorkflowPage';

import { BlankPage } from './Pages/BlankPage';



function App() {

  const router = createBrowserRouter([
    // { path: '/', element: <Home /> },
    // { path: '/usecases', element: <UseCases /> },
    // { path: '/features', element: <Features /> },
    // { path: '/partners', element: <Partners /> },
    { path: '/signin', element: <Signin /> },
    { path: '/signup', element: <Signup /> },
    {
      path: '/dashboard', element: <DashboardLayout />,
      children: [

        { path: '/dashboard', element: <Overview /> },
        { path: 'overview', element: <Overview /> },
        { path: 'transactions', element: <TransactionsPage /> },
        { path: 'transactions/transfer', element: <TransactionsTransferPage /> },
        { path: 'accounts', element: <AccountsPage /> },
        { path: 'cashflow', element: <CashflowInPage /> },
        { path: 'cashflow/outflow', element: <CashflowOutPage /> },
        { path: 'loans', element: <LoansPage /> },
        { path: 'investments', element: <InvestmentsPage /> },
        { path: 'transfer/bulktransfers', element: <BlankPage /> },
        { path: 'budget', element: <BudgetPage /> },
        { path: 'reconciliations', element: <BlankPage /> },
        { path: 'reports', element: <ReportsPage /> },
        { path: 'reports/history', element: <ReportsHistoryPage /> },
        { path: 'audittrails', element: <AuditTrailsPage /> },
        { path: 'users', element: <UsersPage /> },
        { path: 'users/roles', element: <UsersRolesPage /> },
        { path: 'settings', element: <SettingsProfilePage /> },
        { path: 'settings/account', element: <SettingsAccountPage /> },
        { path: 'settings/workflow', element: <SettingsWorkflowPage /> },
      ]
    },
  ]);

  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App
