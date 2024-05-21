
import { getImageUrl } from '../utils';
import styles from './App.module.css';
import { Header } from './Components/Header/Header';
import { Navbar } from './Components/Navbar/Navbar';
import { InvestmentsPage } from './Pages/InvestmentsPage/InvestmentsPage'
import { ReportsPage } from './Pages/ReportsPage/ReportsPage';

function App() {

  let Component

  switch (window.location.pathname) {
    case "/investments":
      Component = InvestmentsPage
      break
    case "/reports":
      Component = ReportsPage
      break
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
