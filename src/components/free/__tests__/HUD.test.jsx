import React from 'react'
import { render, screen } from '@testing-library/react'
import SpeedHUD from '../../ui/SpeedHUD'
import { UnitProvider } from '../../../context/UnitContext'

jest.mock('../../../context/SpeedContext', () => ({
  useSpeedContext: jest.fn(() => ({ speed: 0, maxSpeed: 0, distance: 0, duration: 0, avgSpeed: 0, error: null }))
}))

test('renders speed display with unit', () => {
  render(
    <UnitProvider>
      <SpeedHUD />
    </UnitProvider>
  )
  expect(screen.getByTestId('speed-display').textContent).toContain('km/h')
})
