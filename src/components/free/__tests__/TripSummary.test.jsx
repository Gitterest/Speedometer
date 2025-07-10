import { render, screen } from '@testing-library/react'
import TripSummary from '../TripSummary'
import { UnitProvider } from '../../../context/UnitContext'
import { useSpeedContext } from '../../../context/SpeedContext'

jest.mock('../../../context/SpeedContext', () => ({
  useSpeedContext: jest.fn()
}))

const mockedUseSpeedContext = useSpeedContext

test('renders trip stats', () => {
  mockedUseSpeedContext.mockReturnValue({ distance: 2000, duration: 100, avgSpeed: 50, maxSpeed: 80, clearTrip: jest.fn() })
  render(
    <UnitProvider>
      <TripSummary />
    </UnitProvider>
  )
  expect(screen.getByText(/Distance:/)).toBeInTheDocument()
  expect(screen.getByText(/Duration:/)).toBeInTheDocument()
  expect(screen.getByText(/Avg speed/)).toBeInTheDocument()
  expect(screen.getByText(/Max speed/)).toBeInTheDocument()
  expect(screen.getByText(/Clear trip/)).toBeInTheDocument()
})
