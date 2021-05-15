import Image from 'next/image'
import styles from '../styles/Logo.module.css'

const Logo = ({ width, height }) => {
   return (
      <div className={styles.logo}>
         <Image
            src='/logo.png'
            alt='Fun Learning Countries'
            width={width}
            height={height}
         />
      </div>
   )
}

export default Logo
