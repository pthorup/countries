import Menu from './Menu'
import styles from '../styles/SideBar.module.css'
import Logo from './Logo'

const SideBar = () => {
   return (
      <div className={styles.main}>
         <Logo width={600} height={419} />
         <Menu />
      </div>
   )
}

export default SideBar
