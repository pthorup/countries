import React from 'react'
import GameOverCard from '../components/GameOverCard'
import renderer from 'react-test-renderer'
import { answer } from '../mockData'

it('when lives are over', () => {
   const tree = renderer.create(
      <GameOverCard
         lives={0}
         onRandomCountry={jest.fn()}
         answer={answer}
         isGameOver={false}
      />
   )

   expect(tree).toMatchSnapshot()
})

it('when isGameOver is true', () => {
   const tree = renderer.create(
      <GameOverCard
         lives={3}
         onRandomCountry={jest.fn()}
         answer={answer}
         isGameOver
      />
   )

   expect(tree).toMatchSnapshot()
})
