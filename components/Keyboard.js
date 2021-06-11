import styles from '../styles/Keyboard.module.css'

const Keyboard = ({
   onLetterClick,
   alphabet,
   isGameOver,
   allGuessedLetters,
}) => {
   return (
      <div className={styles.keyboardContainer}>
         <div className={styles.keyboard}>
            {alphabet.map((letter) => (
               <div key={letter}>
                  <button
                     data-testid='keyboard-btn'
                     className={styles.keyboardBtn}
                     onClick={onLetterClick}
                     disabled={
                        allGuessedLetters.includes(letter) || isGameOver
                           ? true
                           : false
                     }
                  >
                     {letter}
                  </button>
               </div>
            ))}
         </div>
      </div>
   )
}

export default Keyboard
