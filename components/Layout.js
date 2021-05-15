import Footer from './Footer'
import SideBar from './SideBar'
import styles from '../styles/Layout.module.css'

const Layout = ({ children }) => {
   return (
      <div className={styles.container}>
         <div className={styles.menu}>
            <SideBar />
         </div>
         <main className={styles.content}>{children}</main>
         <div className={styles.footer}>
            <Footer />
         </div>
      </div>
   )
}

export default Layout
