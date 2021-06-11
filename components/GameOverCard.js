import styles from '../styles/GameOverCard.module.css'
import Link from 'next/link'

const GameOverCard = ({
   lives,
   onRandomCountry,
   answer,
   isGameOver,
   countryCode,
}) => {
   return (
      <div className={styles.container}>
         {lives === 0 ? (
            <div>
               <div className={styles.message}>
                  <span>Sorry, you ran out of lives. Correct answer is:</span>
                  <span className={styles.correctAnswer}> {answer}</span>
               </div>
               <div className={styles.btnContainer}>
                  {countryCode ? (
                     <Link href={`/country/${countryCode}`}>
                        <a className={styles.learnMoreBtn}>
                           Learn more about the country
                        </a>
                     </Link>
                  ) : (
                     ''
                  )}

                  <button
                     className={styles.playAgainBtn}
                     onClick={onRandomCountry}
                  >
                     Play again
                  </button>
               </div>
            </div>
         ) : isGameOver ? (
            <div>
               <div className={styles.message}>
                  <span>YOU WON!</span>
               </div>
               <div className={styles.btnContainer}>
                  {countryCode ? (
                     <Link href={`/country/${countryCode}`}>
                        <a className={styles.learnMoreBtn}>
                           Learn more about the country
                        </a>
                     </Link>
                  ) : (
                     ''
                  )}

                  <button
                     className={styles.playAgainBtn}
                     onClick={onRandomCountry}
                  >
                     Play again
                  </button>
               </div>
            </div>
         ) : (
            ''
         )}
      </div>
   )
}

export default GameOverCard
