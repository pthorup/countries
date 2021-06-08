import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useEffect, useState, useRef } from 'react'
import GameOverCard from '../components/GameOverCard'
import Keyboard from '../components/Keyboard'
import styles from '../styles/GuessCountry.module.css'

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
   const [correctGuessedLetters, setCorrectGuessedLetters] = useState([])
   const [allGuessedLetters, setAllGuessedLetters] = useState([])
   const maxLives = 7
   const [userLives, setUserLives] = useState(maxLives)
   let isGameOver = !correctGuessedLetters.includes('_')
      ? true
      : userLives > 0
      ? false
      : true

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

      let countryRandom = ['a', 'b', 'c']

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
      setCorrectGuessedLetters(countryRandomDashes)
      setUserLives(maxLives)
      setAllGuessedLetters([])
   }

   useEffect(() => {
      getRandomCountry()
   }, [])

   const handleLetterClick = (e) => {
      const userChosenLetter = e.target.textContent
      const updateGuessLetters = [...correctGuessedLetters]
      let isCorrectLetter = false

      for (let i = 0; i < answerCountryLetters.length; i++) {
         if (answerCountryLetters[i].toLowerCase() === userChosenLetter) {
            updateGuessLetters[i] = answerCountryLetters[i]
            isCorrectLetter = true
         }
      }
      setCorrectGuessedLetters(updateGuessLetters)
      !isCorrectLetter ? setUserLives((prev) => prev - 1) : ''

      // track all chosen letters
      setAllGuessedLetters((prev) => [...prev, userChosenLetter])
   }

   return (
      <div>
         <h1>Guess the Country</h1>
         <div className={styles.countryHidden}>
            {correctGuessedLetters.map((letter, index) => (
               <div key={index} className={styles.countryHiddenLetter}>
                  <div>{letter}</div>
               </div>
            ))}
         </div>

         <div className={styles.features}>
            <GameOverCard
               lives={userLives}
               onRandomCountry={getRandomCountry}
               answer={answerCountryLetters.join('')}
               isGameOver={isGameOver}
            />
            <div className={styles.lives}>Lives: {userLives}</div>
         </div>

         <Keyboard
            onLetterClick={handleLetterClick}
            alphabet={alphabet}
            isGameOver={isGameOver}
            lives={userLives}
            allGuessedLetters={allGuessedLetters}
         />
      </div>
   )
}

export default GuessCountry

/*

1.
The app would be more stable/secure if you had one variable for game over and one determining if won or lost. Could be something like this:
   let isGameOver =
      guessedLetters.length === 0 || guessedLetters.includes('_') || userLives> 0 ? false : true
Then in e.g. the comp KeyBoard only isGameOver would be needed.

2.
The submenu to the left would preferably be a comp. Then you could use a ternary to toggle the display wit a bool, the code would be simpler. 
Your solution have the advantage of no re-rendering on each click, however that is critical here. 


*/
