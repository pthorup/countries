import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import styles from '../../styles/Country.module.css'

// Get all countries data
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

   const countryName = data.country.name
   // replace spaces with '%20' which wikipedia requires instead on spaces in the search term
   const searchTerm = countryName.replace(/\s/g, '%20')
   // fetch data from wikipedia limit 2 and term search in title
   let wikiData = []
   let error = ''
   try {
      const response = await fetch(
         `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=intitle:${searchTerm}&prop=info|extracts|pageimages&inprop=url&exintro=1&exlimit=10&exchars=400&format=json&inprop=url&gsrlimit=3`,
         {
            headers: {
               Accept: 'application/json, text/plain, */*',
               'User-Agent': '*',
            },
         }
      )

      wikiData = await response.json()
   } catch (e) {
      error = e.toString()
   }

   return {
      props: {
         country: data.country,
         wikiData: wikiData.query.pages,
         error: error,
      },
   }
}

const CountryDetail = ({ country, wikiData, error }) => {
   // TODO: check for Wikipedia fetch error and country fetch
   let articleOne = ''
   let articleTwo = ''
   let articleThree = ''

   if (wikiData) {
      articleOne = wikiData[Object.keys(wikiData)[0]]
      articleTwo = wikiData[Object.keys(wikiData)[1]]
      articleThree = wikiData[Object.keys(wikiData)[2]]
   }

   const displayLanguages = () => {
      const languages = country.languages.map((lang) => lang.name)
      return languages.join(', ')
   }

   return (
      <div data-testid={'country-info'}>
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
            <div className={styles.countryExtraInfo}>
               <h3 className={styles.learnMoreTitle}>Article Links:</h3>
               {wikiData ? (
                  <ul>
                     <li>
                        <a
                           className={styles.learnMoreLink}
                           href={articleOne.fullurl}
                           rel='noopener noreferrer'
                           target='_blank'
                        >
                           {articleOne.title}
                        </a>
                     </li>
                     <li>
                        <a
                           className={styles.learnMoreLink}
                           href={articleTwo.fullurl}
                           rel='noopener noreferrer'
                           target='_blank'
                        >
                           {articleTwo.title}
                        </a>
                     </li>
                     <li>
                        <a
                           className={styles.learnMoreLink}
                           href={articleThree.fullurl}
                           rel='noopener noreferrer'
                           target='_blank'
                        >
                           {articleThree.title}
                        </a>
                     </li>
                  </ul>
               ) : (
                  ''
               )}
            </div>
         </div>
      </div>
   )
}

export default CountryDetail
