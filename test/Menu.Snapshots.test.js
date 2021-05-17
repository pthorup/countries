import React from 'react'
import Menu from '../components/Menu'
import renderer from 'react-test-renderer'

it('Menu links', () => {
   const tree = renderer.create(<Menu />)

   expect(tree).toMatchSnapshot()
})
