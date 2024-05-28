import styles from './App.module.css';
import { Header } from './Components/Header/Header';
import { Navbar } from './Components/Navbar/Navbar';
import { CashflowInPage } from './Pages/CashflowInPage/CashflowInPage';
import { CashflowOutPage } from './Pages/CashflowOutPage/CashflowOutPage';
import { InvestmentsPage } from './Pages/InvestmentsPage/InvestmentsPage'
import { ReportsPage } from './Pages/ReportsPage/ReportsPage';
import { TransactionsPage } from './Pages/TransactionsPage/TransactionsPage';
import { TransactionsTransferPage } from './Pages/TransactionsTransferPage/TransactionsTransferPage';
import { UsersPage } from './Pages/UsersPage/UsersPage';

function App() {

  let Component

  switch (window.location.pathname) {
    case "/":
      Component = ReportsPage;
      break;
    case "/transactions":
      Component = TransactionsPage;
      break;
    case "/accounts":
      Component = ReportsPage;
      break;
    case "/cashflow":
      Component = CashflowInPage;
      break;
    case "/cashflow/outflow":
      Component = CashflowOutPage;
      break;
    case "/loans":
      Component = ReportsPage;
      break;
    case "/investments":
      Component = InvestmentsPage;
      break;
    case "/bulktransfer":
      Component = ReportsPage;
      break;
    case "/budget":
      Component = ReportsPage;
      break;
    case "/reconciliation":
      Component = ReportsPage;
      break;
    case "/reports":
      Component = ReportsPage;
      break;
    case "/audittrails":
      Component = ReportsPage;
      break;
    case "/users":
      Component = UsersPage;
      break;
    case "/setting":
      Component = ReportsPage;
      break;
    case "/transactions/transfer":
      Component = TransactionsTransferPage;
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
