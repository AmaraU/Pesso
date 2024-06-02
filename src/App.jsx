import styles from './App.module.css';
import { Header } from './Components/Header/Header';
import { Navbar } from './Components/Navbar/Navbar';
import { BlankPage } from './Pages/BlankPage';
import { BudgetPage } from './Pages/BudgetPage/BudgetPage';
import { CashflowInPage } from './Pages/CashflowInPage/CashflowInPage';
import { CashflowOutPage } from './Pages/CashflowOutPage/CashflowOutPage';
import { InvestmentsPage } from './Pages/InvestmentsPage/InvestmentsPage'
import { LoansPage } from './Pages/LoansPage/LoansPage';
import { ReportsHistoryPage } from './Pages/ReportsHistoryPage/ReportsHistoryPage';
import { ReportsPage } from './Pages/ReportsPage/ReportstPage';
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
      Component = BlankPage;
      break;
    case "/transactions":
      Component = TransactionsPage;
      break;
    case "/transactions/transfer":
      Component = TransactionsTransferPage;
      break;
    case "/accounts":
      Component = BlankPage;
      break;
    case "/cashflow":
      Component = CashflowInPage;
      break;
    case "/cashflow/outflow":
      Component = CashflowOutPage;
      break;
    case "/loans":
      Component = LoansPage;
      break;
    case "/investments":
      Component = BlankPage;
      break;
    case "/bulktransfer":
      Component = BlankPage;
      break;
    case "/budget":
      Component = BudgetPage;
      break;
    case "/reconciliation":
      Component = BlankPage;
      break;
    case "/reports":
      Component = ReportsPage;
      break;
    case "/reports/history":
      Component = ReportsHistoryPage;
      break;
    case "/audittrails":
      Component = BlankPage;
      break;
    case "/users":
      Component = UsersPage;
      break;
    case "/users/roles":
        Component = UsersRolesPage;
        break;
    case "/settings":
      Component = SettingsProfilePage;
      break;
    case "/settings/account":
      Component = SettingsAccountPage;
      break;
    case "/settings/workflow":
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
