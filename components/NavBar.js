import { useState } from 'react'
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
   const [showSubMenu, setShowSubMenu] = useState('none')
   const handleMenuToggle = () => {
      setShowSubMenu((prev) => (prev === 'none' ? 'block' : 'none'))
   }
   return (
      <div className={styles.main}>
         <ul className={styles.menu}>
            <li className={styles.menuLink}>LInk</li>
            <li className={styles.menuLink}>
               <span onClick={handleMenuToggle}>Continents</span>

               <ul style={{ display: `${showSubMenu}` }}>
                  <li className={styles.menuLink}>LInk</li>
                  <li className={styles.menuLink}>LInk</li>
                  <li className={styles.menuLink}>LInk</li>
               </ul>
            </li>
         </ul>
      </div>
   )
}

export default NavBar
