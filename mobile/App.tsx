import React from 'react'
import { SafeAreaView, ScrollView, View, Text } from 'react-native'
import SpeedHUD from './components/SpeedHUD'
import Gauge from './components/Gauge'
import SpeedAlert from './components/SpeedAlert'
import UnitToggle from './components/UnitToggle'
import ThemeToggle from './components/ThemeToggle'
import TripSummary from './components/TripSummary'
import AdBanner from './components/AdBanner'
import HUDToggle from './components/HUDToggle'
import AnimatedBackground from './components/AnimatedBackground'
import { UnitProvider, useUnit } from './context/UnitContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { SpeedProvider, useSpeedContext } from './context/SpeedContext'
import { HUDProvider, useHUD } from './context/HUDContext'
import { StatusBar } from 'expo-status-bar'
import useVoiceCommands from './hooks/useVoiceCommands'
import { AchievementProvider } from './context/AchievementContext'
import ThemeSelector from './components/ThemeSelector'
import FeedbackButton from './components/FeedbackButton'
import BatterySaverToggle from './components/BatterySaverToggle'
import WidgetSelector from './components/WidgetSelector'
import AnimatedButton from './components/AnimatedButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Location from 'expo-location'
import { Magnetometer } from 'expo-sensors'
import { Easing } from 'react-native-reanimated'

function useCompass() {
  const [heading, setHeading] = React.useState(0)
  React.useEffect(() => {
    let sub: any
    let mounted = true
    const toDegrees = (x: number, y: number) => {
      let angle = Math.atan2(y, x) * (180 / Math.PI)
      angle = angle < 0 ? 360 + angle : angle
      return angle
    }
    Magnetometer.setUpdateInterval(200)
    sub = Magnetometer.addListener(({ x, y }) => {
      if (mounted) setHeading(toDegrees(x, y))
    })
    return () => {
      mounted = false
      sub && sub.remove()
    }
  }, [])
  return heading
}

function useAltitude() {
  const [altitude, setAltitude] = React.useState<number | null>(null)
  React.useEffect(() => {
    let watch: Location.LocationSubscription
    ;(async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync()
      if (!granted) return
      watch = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Highest, distanceInterval: 1 },
        pos => setAltitude(pos.coords.altitude ?? null)
      )
    })()
    return () => { watch && watch.remove() }
  }, [])
  return altitude
}

function useWeather() {
  // TODO: Replace with real API call
  const [weather, setWeather] = React.useState({ temp: 22, desc: 'Sunny' })
  // Could fetch from OpenWeatherMap using location
  return weather
}

function useTripCost(distance: number) {
  // TODO: Replace with real API call or user config
  const [cost, setCost] = React.useState(0)
  React.useEffect(() => {
    // Assume $0.10/km
    setCost(distance / 1000 * 0.1)
  }, [distance])
  return cost
}

function CompassWidget() {
  const heading = useCompass()
  const [display, setDisplay] = React.useState(heading)
  React.useEffect(() => {
    // Animate value
    let frame: any
    const animate = () => {
      setDisplay(d => d + (heading - d) * 0.2)
      if (Math.abs(heading - display) > 0.5) frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [heading])
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
  const dir = dirs[Math.round(display / 45) % 8]
  return <View style={{ backgroundColor: '#222', borderRadius: 12, padding: 12, marginVertical: 6 }}><Text style={{ color: '#39ff14', fontWeight: 'bold' }}>Compass: {dir} ({display.toFixed(0)}°)</Text></View>
}

function AltitudeWidget() {
  const altitude = useAltitude()
  const [display, setDisplay] = React.useState(altitude ?? 0)
  React.useEffect(() => {
    let frame: any
    if (altitude !== null) {
      const animate = () => {
        setDisplay(d => d + (altitude - d) * 0.2)
        if (Math.abs((altitude ?? 0) - display) > 0.5) frame = requestAnimationFrame(animate)
      }
      animate()
    }
    return () => cancelAnimationFrame(frame)
  }, [altitude])
  return <View style={{ backgroundColor: '#222', borderRadius: 12, padding: 12, marginVertical: 6 }}><Text style={{ color: '#00ffff', fontWeight: 'bold' }}>Altitude: {display.toFixed(1)}m</Text></View>
}

function WeatherWidget() {
  const weather = useWeather()
  return <View style={{ backgroundColor: '#222', borderRadius: 12, padding: 12, marginVertical: 6 }}><Text style={{ color: '#ff00ff', fontWeight: 'bold' }}>Weather: {weather.temp}°C, {weather.desc}</Text></View>
}

function TripCostWidget() {
  const { distance } = useSpeedContext()
  const cost = useTripCost(distance)
  const [display, setDisplay] = React.useState(cost)
  React.useEffect(() => {
    let frame: any
    const animate = () => {
      setDisplay(d => d + (cost - d) * 0.2)
      if (Math.abs(cost - display) > 0.01) frame = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [cost])
  return <View style={{ backgroundColor: '#222', borderRadius: 12, padding: 12, marginVertical: 6 }}><Text style={{ color: '#ffe600', fontWeight: 'bold' }}>Trip Cost: ${display.toFixed(2)}</Text></View>
}

function Dashboard() {
  const { speed, distance } = useSpeedContext()
  const { dark, colorScheme } = useTheme()
  const { hud, toggleHUD } = useHUD()
  const { toggleUnit } = useUnit()
  useVoiceCommands(toggleHUD, toggleUnit)
  const [widgetSelectorOpen, setWidgetSelectorOpen] = React.useState(false)
  const [selectedWidgets, setSelectedWidgets] = React.useState<string[]>([])

  // Load/persist widget preferences
  React.useEffect(() => {
    AsyncStorage.getItem('selectedWidgets').then(raw => {
      if (raw) setSelectedWidgets(JSON.parse(raw))
      else setSelectedWidgets(['compass', 'altitude'])
    })
  }, [])
  React.useEffect(() => {
    AsyncStorage.setItem('selectedWidgets', JSON.stringify(selectedWidgets))
  }, [selectedWidgets])
  return (
    <SafeAreaView className={dark ? 'bg-black flex-1' : 'bg-white flex-1'}>
      <AnimatedBackground speed={speed} />
      <WidgetSelector open={widgetSelectorOpen} setOpen={setWidgetSelectorOpen} selectedWidgets={selectedWidgets} setSelectedWidgets={setSelectedWidgets} />
      {hud ? (
        <View className="flex-1 items-center justify-center">
          <SpeedHUD />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <ThemeSelector />
          <View className="flex-row justify-between items-center mb-4 space-x-2">
            <UnitToggle />
            <HUDToggle />
            <ThemeToggle />
            <AnimatedButton title="Customize Widgets" onPress={() => setWidgetSelectorOpen(true)} style={{ marginLeft: 8 }} />
          </View>
          <BatterySaverToggle />
          {/* Render selected widgets */}
          {selectedWidgets.includes('compass') && <CompassWidget />}
          {selectedWidgets.includes('altitude') && <AltitudeWidget />}
          {selectedWidgets.includes('weather') && <WeatherWidget />}
          {selectedWidgets.includes('tripCost') && <TripCostWidget />}
          <SpeedHUD />
          <Gauge value={speed} colorScheme={colorScheme} />
          <SpeedAlert />
          <TripSummary />
          <AdBanner />
        </ScrollView>
      )}
      <StatusBar style={dark ? 'light' : 'dark'} />
      <FeedbackButton />
    </SafeAreaView>
  )
}

export default function App() {
  return (
    <AchievementProvider>
      <ThemeProvider>
        <UnitProvider>
          <HUDProvider>
            <SpeedProvider>
              <Dashboard />
            </SpeedProvider>
          </HUDProvider>
        </UnitProvider>
      </ThemeProvider>
    </AchievementProvider>
  )
}
