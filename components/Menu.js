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
         <Image
            className={styles.logo}
            src='/logo.png'
            alt='Fun Learning Countries'
            width={600}
            height={419}
         />
         <ul className={styles.menu}>
            <li className={styles.menuLink}>test</li>
            <li className={styles.menuLink}>
               <span onClick={handleMenuToggle}>Continents</span>

               <ul style={{ display: `${showSubMenu}` }}>
                  {continents.map((continent) => (
                     <li key={continent.code} className={styles.menuLink}>
                        <Link href={`/continent/${continent.code}`}>
                           <a>{continent.name}</a>
                        </Link>
                     </li>
                  ))}
               </ul>
            </li>
         </ul>
      </div>
   )
}

export default Menu
