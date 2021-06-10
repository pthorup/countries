import styles from '../styles/GameOverCard.module.css'

const GameOverCard = ({ lives, onRandomCountry, answer, isGameOver }) => {
   return (
      <div className={styles.container}>
         {lives === 0 ? (
            <div>
               <div className={styles.message}>
                  <span>Sorry, you ran out of lives. Correct answer is:</span>
                  <span className={styles.correctAnswer}> {answer}</span>
               </div>
               <div className={styles.btnContainer}>
                  <button
                     className={styles.learnMoreBtn}
                     onClick={onRandomCountry}
                  >
                     Learn more about the country
                  </button>
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
                  <span>You Won!</span>
               </div>
               <div className={styles.btnContainer}>
                  <button
                     className={styles.learnMoreBtn}
                     onClick={onRandomCountry}
                  >
                     Learn more about the country
                  </button>
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
