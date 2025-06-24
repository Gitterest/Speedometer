import React from 'react'
import { render, screen } from '@testing-library/react'
import SpeedAlert from '../SpeedAlert'
import { UnitProvider } from '../../../context/UnitContext'
import { useSpeedContext } from '../../../context/SpeedContext'

jest.mock('../../../context/SpeedContext', () => ({
  useSpeedContext: jest.fn()
}))

const mockedUseSpeedContext = useSpeedContext

test('shows warning when speed exceeds limit', () => {
  mockedUseSpeedContext.mockReturnValue({ speed: 100, maxSpeed: 100 })
  render(
    <UnitProvider>
      <SpeedAlert />
    </UnitProvider>
  )
  expect(screen.getByText(/Slow down!/i)).toBeInTheDocument()
})
