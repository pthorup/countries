import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import Link from 'next/link'
import styles from '../../styles/Continent.module.css'

export const getStaticPaths = async () => {
   const client = new ApolloClient({
      uri: 'https://countries.trevorblades.com/',
      cache: new InMemoryCache(),
   })

   const { data } = await client.query({
      query: gql`
         {
            continents {
               code
            }
         }
      `,
   })
   const paths = data.continents.map((continent) => {
      return {
         params: { code: continent.code },
      }
   })

   return {
      paths,
      fallback: false,
   }
}

export const getStaticProps = async (context) => {
   const code = context.params.code
   const client = new ApolloClient({
      uri: 'https://countries.trevorblades.com/',
      cache: new InMemoryCache(),
   })
   const { data } = await client.query({
      query: gql`
      {
         continent(code: "${code}") {
            name
            countries {
               name
               code
            }
         }
      }
      `,
   })

   return {
      props: {
         continent: data.continent,
      },
   }
}

const Continent = ({ continent }) => {
   return (
      <div>
         <h1>{continent.name}</h1>
         <div className={styles.countryList}>
            {continent.countries.map((country) => (
               <div className={styles.listItem} key={country.code}>
                  <Link href={`/country/${country.code}`}>
                     <a>{country.name}</a>
                  </Link>
               </div>
            ))}
         </div>
      </div>
   )
}

export default Continent
