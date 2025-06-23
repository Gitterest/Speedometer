import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UnitToggle from '../UnitToggle'
import { UnitProvider } from '../../../context/UnitContext'

function Wrapper({ children }) {
  return <UnitProvider>{children}</UnitProvider>
}

test('toggles units on click', async () => {
  render(
    <Wrapper>
      <UnitToggle />
    </Wrapper>
  )
  const button = screen.getByRole('button')
  expect(button).toHaveTextContent('Switch to MPH')
  await userEvent.click(button)
  expect(button).toHaveTextContent('Switch to KMH')
})
