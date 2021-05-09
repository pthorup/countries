import Footer from './Footer'
import NavBar from './NavBar'
import styles from '../styles/Layout.module.css'

const Layout = ({ children }) => {
   return (
      <div className={styles.container}>
         <div className={styles.navbar}>
            <NavBar />
         </div>
         <main className={styles.main}>{children}</main>
         <div className={styles.footer}>
            <Footer />
         </div>
      </div>
   )
}

export default Layout
