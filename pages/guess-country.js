import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useEffect, useState } from 'react'

// export const getStaticProps = async () => {
//    const client = new ApolloClient({
//       uri: 'https://countries.trevorblades.com/',
//       cache: new InMemoryCache(),
//    })

//    const { data } = await client.query({
//       query: gql`
//          {
//             countries {
//                name
//             }
//          }
//       `,
//    })

//    return {
//       props: {
//          countries: data.countries,
//       },
//    }
// }

const GuessCountry = ({ countries }) => {
   const [answerCountryLetters, setAnswerCountryLetters] = useState([])
   const [guessedLetters, setGuessedLetters] = useState([])
   let isGameOver =
      guessedLetters.length === 0 || guessedLetters.includes('_') ? false : true

   const alphabet = [
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z',
   ]

   const getRandomCountry = () => {
      // Get Random Country
      // const randomNum = Math.floor(Math.random() * countries.length)
      // let countryRandom = [...countries[randomNum].name]

      let countryRandom = ['A', 'a', 'c', ' ', 'e']

      // Make an array to hold hidden letters
      const countryRandomDashes = []
      for (let i = 0; i < countryRandom.length; i++) {
         // Only letters that are on the buttons should be covered up as a dash symbol
         // Rest should be reveal to user
         alphabet.includes(countryRandom[i].toLowerCase())
            ? countryRandomDashes.push('_')
            : countryRandomDashes.push(countryRandom[i])
      }
      // Set answer and user's guessed letters to respective states
      setAnswerCountryLetters(countryRandom)
      setGuessedLetters(countryRandomDashes)
   }

   useEffect(() => {
      getRandomCountry()
   }, [])

   console.log(answerCountryLetters)
   console.log(guessedLetters)

   const handleLetterClick = (e) => {
      let userChosenLetter = e.target.textContent
      const updateGuessLetters = [...guessedLetters]

      for (let i = 0; i < answerCountryLetters.length; i++) {
         answerCountryLetters[i].toLowerCase() === userChosenLetter
            ? (updateGuessLetters[i] = answerCountryLetters[i])
            : ''
      }
      setGuessedLetters(updateGuessLetters)
   }

   return (
      <div>
         <h1>Guess Country</h1>
         <div style={{ display: 'flex' }}>
            {alphabet.map((letter) => (
               <div key={letter}>
                  <button onClick={handleLetterClick}>{letter}</button>
               </div>
            ))}
         </div>
         <div style={{ color: 'red', display: 'flex' }}>
            {guessedLetters.map((letter, index) => (
               <div key={index} style={{ margin: '10px' }}>
                  <div> {letter} </div>
               </div>
            ))}
         </div>
         {isGameOver ? (
            <div>
               <div>You won!!!</div>
               <button onClick={getRandomCountry}>Play again</button>
            </div>
         ) : (
            ''
         )}
      </div>
   )
}

export default GuessCountry
