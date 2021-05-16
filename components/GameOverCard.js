import styles from '../styles/GameOverCard.module.css'

const GameOverCard = ({ lives, onRandomCountry, answer, isGameOver }) => {
   return (
      <>
         {lives === 0 ? (
            <div className={styles.gameLost}>
               <div>
                  <p>Sorry, you ran out of lives.</p>
                  <p>
                     Correct answer is:{' '}
                     <span className={styles.correctAnswer}>{answer}</span>{' '}
                  </p>
               </div>
               <button
                  className={styles.playAgainBtn}
                  onClick={onRandomCountry}
               >
                  Play again
               </button>
            </div>
         ) : isGameOver ? (
            <div className={styles.gameWon}>
               <div>You won!!!</div>
               <button
                  className={styles.playAgainBtn}
                  onClick={onRandomCountry}
               >
                  Play again
               </button>
            </div>
         ) : (
            ''
         )}
      </>
   )
}

export default GameOverCard
