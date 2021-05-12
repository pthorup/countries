import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import styles from '../../styles/Country.module.css'

export const getStaticPaths = async () => {
   const client = new ApolloClient({
      uri: 'https://countries.trevorblades.com/',
      cache: new InMemoryCache(),
   })

   const { data } = await client.query({
      query: gql`
         {
            countries {
               code
            }
         }
      `,
   })
   const paths = data.countries.map((country) => {
      return {
         params: { code: country.code },
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
            country(code: "${code}") {
               name
               capital
               emoji
               currency
               languages {
                  name
               }
            }
         }
      `,
   })
   return {
      props: {
         country: data.country,
      },
   }
}

const CountryDetail = ({ country }) => {
   const displayLanguages = () => {
      const languages = country.languages.map((lang) => lang.name)
      return languages.join(', ')
   }

   return (
      <>
         <h1>{country.name}</h1>
         <div className={styles.container}>
            <div className={styles.emoji}>{country.emoji}</div>
            <div className={styles.countryInfo}>
               <ul className={styles.countryInfoHeading}>
                  <li>Capital:</li>
                  <li>Currency:</li>
                  <li>
                     {country.languages.length > 1 ? 'Languages:' : 'Language:'}
                  </li>
               </ul>
               <ul>
                  <li>{country.capital}</li>
                  <li>{country.currency}</li>
                  <li>{displayLanguages()}</li>
               </ul>
            </div>
         </div>
      </>
   )
}

export default CountryDetail
