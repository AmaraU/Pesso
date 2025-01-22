import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import { VerifyEmailPage } from './Pages/VerifyEmailPage/VerifyEmailPage';
import { ForgotPasswordPage } from './Pages/ForgotPasswordPage/ForgotPasswordPage';
import Signin from './Pages/Onboarding/Signin';
import Signup from './Pages/Onboarding/Signup';
import SecurityQuestions from './Pages/Onboarding/SecurityQuestions';

import { DashboardLayout } from './Pages/DashboardLayout';

import { Overview } from './Pages/DashboardPage/Overview';
import { TransactionsPage } from './Pages/TransactionsPage/TransactionsPage';
import { TransactionsTransferPage } from './Pages/TransactionsTransferPage/TransactionsTransferPage';
import { AccountsPage } from './Pages/AccountsPage/AccountsPage';
import { CashflowInPage } from './Pages/CashflowInPage/CashflowInPage';
import { CashflowOutPage } from './Pages/CashflowOutPage/CashflowOutPage';
import { LoansPage } from './Pages/LoansPage/LoansPage';
import { RequestPage } from './Pages/RequestPage/RequestPage';
import { InvestmentsPage } from './Pages/InvestmentsPage/InvestmentsPage';
import { BudgetPage } from './Pages/BudgetPage/BudgetPage';
import { ReportsPage } from './Pages/ReportsPage/ReportsPage';
import { ReportsHistoryPage } from './Pages/ReportsHistoryPage/ReportsHistoryPage';
import { AuditTrailsPage } from './Pages/AuditTrailsPage/AuditTrailsPage';
import { UsersPage } from './Pages/UsersPage/UsersPage';
import { UsersRolesPage } from './Pages/UsersRolesPage/UsersRolesPage';
import { SettingsProfilePage } from './Pages/SettingsProfilePage/SettingsProfilePage';
import { SettingsAccountPage } from './Pages/SettingsAccountPage/SettingsAccountPage';
import { SettingsWorkflowPage } from './Pages/SettingsWorkflowPage/SettingsWorkflowPage';
import { SettingsCategoriesPage } from './Pages/SettingsCategoriesPage/SettingsCategoriesPage';

import { BlankPage } from './Pages/BlankPage';
import { AccountInfoPage } from './Pages/AccountsPage/AccountInfoPage';
import { Layout } from './Landing Page/Components/Layout/Layout';
import { HomePage } from './Landing Page/Pages/Homepage/Homepage';
import { Usecasepage } from './Landing Page/Pages/Usecasepage/Usecasepage';
import { Featurepage } from './Landing Page/Pages/Featurepage/Featurepage';
import { Partnerpage } from './Landing Page/Pages/Partnerpage/Partnerpage';
import { PreLoader } from './Components/PreLoader/PreLoader';


function App() {

  const router = createBrowserRouter([
    { path: "/", element: <PreLoader /> },
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "home", element: <HomePage /> },
        { path: "usecases", element: <Usecasepage /> },
        { path: "features", element: <Featurepage /> },
        { path: "partner", element: <Partnerpage /> },
      ],
    },
  
    { path: "/signin", element: <Signin /> },
    { path: "/signup", element: <Signup /> },
    { path: "/signup-security", element: <SecurityQuestions /> },
    { path: "/verify-email", element: <VerifyEmailPage /> },
    { path: "/forgot-password", element: <ForgotPasswordPage /> },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { path: "", element: <Navigate to="overview" /> },
        { path: "overview", element: <Overview /> },
        { path: "transactions", element: <TransactionsPage /> },
        { path: "transactions/transfer", element: <TransactionsTransferPage /> },
        { path: "accounts", element: <AccountsPage /> },
        { path: "account-info", element: <AccountInfoPage /> },
        { path: "cashflow", element: <CashflowInPage /> },
        { path: "cashflow/outflow", element: <CashflowOutPage /> },
        { path: "loans", element: <LoansPage /> },
        { path: "request", element: <RequestPage /> },
        { path: "investments", element: <InvestmentsPage /> },
        { path: "transfer/bulktransfers", element: <BlankPage /> },
        { path: "budget", element: <BudgetPage /> },
        { path: "reconciliations", element: <BlankPage /> },
        { path: "reports", element: <ReportsPage /> },
        { path: "reports/history", element: <ReportsHistoryPage /> },
        { path: "audittrails", element: <AuditTrailsPage /> },
        { path: "users", element: <UsersPage /> },
        { path: "users/roles", element: <UsersRolesPage /> },
        { path: "settings", element: <SettingsProfilePage /> },
        { path: "settings/account", element: <SettingsAccountPage /> },
        { path: "settings/workflow", element: <SettingsWorkflowPage /> },
        { path: "settings/categories", element: <SettingsCategoriesPage /> },
      ],
    },
  ]);

  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App
