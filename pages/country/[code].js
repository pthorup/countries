import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

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
   return (
      <>
         <div>Country details</div>
         <div>{country.name}</div>
      </>
   )
}

export default CountryDetail
