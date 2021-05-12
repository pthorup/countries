import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import styles from '../styles/Menu.module.css'

const Menu = () => {
   const [showSubMenu, setShowSubMenu] = useState('none')
   const [continents, setContinents] = useState([])

   useEffect(async () => {
      const client = new ApolloClient({
         uri: 'https://countries.trevorblades.com/',
         cache: new InMemoryCache(),
      })
      const { data } = await client.query({
         query: gql`
            {
               continents {
                  name
                  code
               }
            }
         `,
      })
      setContinents(data.continents)
   }, [])

   const handleMenuToggle = () => {
      setShowSubMenu((prev) => (prev === 'none' ? 'block' : 'none'))
   }

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

         <ul className={styles.menu}>
            <li className={styles.menuLink}>
               <Link href='/'>
                  <a>Home</a>
               </Link>
            </li>
            <li className={styles.menuLink}>
               <span className={styles.subMenuTitle} onClick={handleMenuToggle}>
                  Continents
               </span>

               <ul
                  className={styles.subMenu}
                  style={{ display: `${showSubMenu}` }}
               >
                  {continents.map((continent) => (
                     <li key={continent.code} className={styles.menuLink}>
                        <Link href={`/continent/${continent.code}`}>
                           <a>{continent.name}</a>
                        </Link>
                     </li>
                  ))}
               </ul>
            </li>
            <li className={styles.menuLink}>
               <Link href='/guess-country'>
                  <a>Play A Game</a>
               </Link>
            </li>
         </ul>
      </div>
   )
}

export default Menu
