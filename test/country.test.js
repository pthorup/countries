import { screen, render } from '@testing-library/react'
import CountryDetail from '../pages/country/[code]'

test('should render country info', () => {
   const country = {
      name: 'Malta',
      capital: 'Valletta',
      emoji: '🇲🇹',
      currency: 'EUR',
      languages: [
         {
            name: 'Maltese',
         },
         {
            name: 'English',
         },
      ],
   }

   render(<CountryDetail country={country} />)

   const countryElement = screen.getByTestId('country-info')
   expect(countryElement).toHaveTextContent('Malta')
   expect(countryElement).toHaveTextContent('🇲🇹')
   expect(countryElement).toHaveTextContent('EUR')
   expect(countryElement).toHaveTextContent('Maltese, English')
})
