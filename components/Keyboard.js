import styles from '../styles/Keyboard.module.css'

const Keyboard = ({ onLetterClick, alphabet, isGameOver, lives }) => {
   return (
      <div className={styles.keyboardContainer}>
         <div className={styles.keyboard}>
            {alphabet.map((letter) => (
               <div key={letter}>
                  <button
                     data-testid='keyboard-btn'
                     className={styles.keyboardBtn}
                     onClick={onLetterClick}
                     disabled={isGameOver || lives === 0}
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
