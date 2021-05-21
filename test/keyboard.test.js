import { render, screen } from '@testing-library/react'
import Keyboard from '../components/Keyboard'
import { alphabet } from '../mockData'

test('Keyboard disable when game is over', () => {
   render(<Keyboard isGameOver={true} alphabet={alphabet} />)

   const keyBoardBtnElement = screen.getAllByTestId('keyboard-btn')
   expect(keyBoardBtnElement[0]).toHaveAttribute('disabled')
})

test('Keyboard disable when lives are 0', () => {
   render(<Keyboard lives={0} alphabet={alphabet} />)

   const keyBoardBtnElement = screen.getAllByTestId('keyboard-btn')
   expect(keyBoardBtnElement[0]).toHaveAttribute('disabled')
})
