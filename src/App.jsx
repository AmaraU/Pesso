import styles from './App.module.css';
import { Header } from './Components/Header/Header';
import { Navbar } from './Components/Navbar/Navbar';
import { BlankPage } from './Pages/BlankPage';
import { BudgetPage } from './Pages/BudgetPage/BudgetPage';
import { CashflowInPage } from './Pages/CashflowInPage/CashflowInPage';
import { CashflowOutPage } from './Pages/CashflowOutPage/CashflowOutPage';
import { Overview } from './Pages/DashboardPage/Overview';
import { InvestmentsPage } from './Pages/InvestmentsPage/InvestmentsPage'
import { LoansPage } from './Pages/LoansPage/LoansPage';
import { ReportsHistoryPage } from './Pages/ReportsHistoryPage/ReportsHistoryPage';
import { ReportsPage } from './Pages/ReportsPage/ReportsPage';
import { SettingsAccountPage } from './Pages/SettingsAccountPage/SettingsAccountPage';
import { SettingsProfilePage } from './Pages/SettingsProfilePage/SettingsProfilePage';
import { SettingsWorkflowPage } from './Pages/SettingsWorkflowPage/SettingsWorkflowPage';
import { TransactionsPage } from './Pages/TransactionsPage/TransactionsPage';
import { TransactionsTransferPage } from './Pages/TransactionsTransferPage/TransactionsTransferPage';
import { UsersPage } from './Pages/UsersPage/UsersPage';
import { UsersRolesPage } from './Pages/UsersRolesPage/UsersRolesPage';

function App() {

  let Component

  switch (window.location.pathname) {

    case "/":
    case "/dashboard":
      window.location.pathname = "/dashboard/overview";
      break;
    case "/dashboard/overview":
      Component = Overview;
      break;
    case "/dashboard/transactions":
      Component = TransactionsPage;
      break;
    case "/dashboard/transactions/transfer":
      Component = TransactionsTransferPage;
      break;
    case "/dashboard/accounts":
      Component = BlankPage;
      break;
    case "/dashboard/cashflow":
      Component = CashflowInPage;
      break;
    case "/dashboard/cashflow/outflow":
      Component = CashflowOutPage;
      break;
    case "/dashboard/loans":
      Component = LoansPage;
      break;
    case "/dashboard/investments":
      Component = InvestmentsPage;
      break;
    case "/dashboard/bulktransfer":
      Component = BlankPage;
      break;
    case "/dashboard/budget":
      Component = BudgetPage;
      break;
    case "/dashboard/reconciliation":
      Component = BlankPage;
      break;
    case "/dashboard/reports":
      Component = ReportsPage;
      break;
    case "/dashboard/reports/history":
      Component = ReportsHistoryPage;
      break;
    case "/dashboard/audittrails":
      Component = BlankPage;
      break;
    case "/dashboard/users":
      Component = UsersPage;
      break;
    case "/dashboard/users/roles":
        Component = UsersRolesPage;
        break;
    case "/dashboard/settings":
      Component = SettingsProfilePage;
      break;
    case "/dashboard/settings/account":
      Component = SettingsAccountPage;
      break;
    case "/dashboard/settings/workflow":
      Component = SettingsWorkflowPage;
      break;   
  }

  return (
    <>
    <div className={styles.theWhole}>

      <Header />

      <div className={styles.withNav}>
        <Navbar className={styles.verticalNav} />
        <Component className={styles.component} />
      </div>
      
    </div>
    </>
  )
}

export default App
