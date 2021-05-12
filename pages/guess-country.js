import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { useEffect, useState } from 'react'
import styles from '../styles/GuessCountry.module.css'

export const getStaticProps = async () => {
   const client = new ApolloClient({
      uri: 'https://countries.trevorblades.com/',
      cache: new InMemoryCache(),
   })

   const { data } = await client.query({
      query: gql`
         {
            countries {
               name
            }
         }
      `,
   })

   return {
      props: {
         countries: data.countries,
      },
   }
}

const GuessCountry = ({ countries }) => {
   const [answerCountryLetters, setAnswerCountryLetters] = useState([])
   const [guessedLetters, setGuessedLetters] = useState([])
   const maxLives = 5
   const [userLives, setUserLives] = useState(maxLives)

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
      const randomNum = Math.floor(Math.random() * countries.length)
      let countryRandom = [...countries[randomNum].name]

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
      setUserLives(maxLives)
   }

   useEffect(() => {
      getRandomCountry()
   }, [])

   const handleLetterClick = (e) => {
      let userChosenLetter = e.target.textContent
      const updateGuessLetters = [...guessedLetters]
      let isCorrectLetter = false

      for (let i = 0; i < answerCountryLetters.length; i++) {
         if (answerCountryLetters[i].toLowerCase() === userChosenLetter) {
            updateGuessLetters[i] = answerCountryLetters[i]
            isCorrectLetter = true
         }
      }
      setGuessedLetters(updateGuessLetters)
      !isCorrectLetter ? setUserLives((prev) => prev - 1) : ''
   }

   return (
      <div>
         <h1>Guess the Country</h1>
         <div className={styles.countryHidden}>
            {guessedLetters.map((letter, index) => (
               <div key={index} className={styles.countryHiddenLetter}>
                  <div>{letter}</div>
               </div>
            ))}
         </div>

         <div className={styles.features}>
            {userLives === 0 ? (
               <div className={styles.gameLost}>
                  <div>
                     <p>Sorry, you ran out of lives.</p>
                     <p>
                        Correct answer is:{' '}
                        <span className={styles.correctAnswer}>
                           {answerCountryLetters.join('')}
                        </span>{' '}
                     </p>
                  </div>
                  <button
                     className={styles.playAgainBtn}
                     onClick={getRandomCountry}
                  >
                     Play again
                  </button>
               </div>
            ) : isGameOver ? (
               <div className={styles.gameWon}>
                  <div>You won!!!</div>
                  <button
                     className={styles.playAgainBtn}
                     onClick={getRandomCountry}
                  >
                     Play again
                  </button>
               </div>
            ) : (
               ''
            )}
            <div className={styles.lives}>Lives: {userLives}</div>
         </div>

         <div className={styles.keyboardContainer}>
            <div className={styles.keyboard}>
               {alphabet.map((letter) => (
                  <div key={letter}>
                     <button
                        className={styles.keyboardBtn}
                        onClick={handleLetterClick}
                        disabled={isGameOver || userLives === 0}
                     >
                        {letter}
                     </button>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default GuessCountry
