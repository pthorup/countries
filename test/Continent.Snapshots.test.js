import React from 'react'
import Continent from '../pages/continent/[code]'
import renderer from 'react-test-renderer'
import { continent } from '../mockData'

it('All countries within a continent', () => {
   const tree = renderer.create(<Continent continent={continent} />)

   expect(tree).toMatchSnapshot()
})
