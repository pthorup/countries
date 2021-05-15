import Menu from './Menu'
import Image from 'next/image'
import styles from '../styles/SideBar.module.css'

const SideBar = () => {
   return (
      <div className={styles.main}>
         <div className={styles.logo}>
            <Image
               src='/logo.png'
               alt='Fun Learning Countries'
               width={600}
               height={419}
            />
         </div>

         <Menu />
      </div>
   )
}

export default SideBar
