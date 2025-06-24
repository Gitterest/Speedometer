import React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import SpeedHUD from './components/SpeedHUD'
import Gauge from './components/Gauge'
import SpeedAlert from './components/SpeedAlert'
import UnitToggle from './components/UnitToggle'
import ThemeToggle from './components/ThemeToggle'
import TripSummary from './components/TripSummary'
import AdBanner from './components/AdBanner'
import HUDToggle from './components/HUDToggle'
import { UnitProvider } from './context/UnitContext'
import { UnitProvider, useUnit } from './context/UnitContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { SpeedProvider } from './context/SpeedContext'
import { HUDProvider, useHUD } from './context/HUDContext'
import { StatusBar } from 'expo-status-bar'
import useVoiceCommands from './hooks/useVoiceCommands'

function Dashboard() {
  const { dark } = useTheme()
  const { hud } = useHUD()
  const { hud, toggleHUD } = useHUD()
  const { toggleUnit } = useUnit()
  useVoiceCommands(toggleHUD, toggleUnit)
  return (
    <SafeAreaView className={dark ? 'bg-black flex-1' : 'bg-white flex-1'}>
      {hud ? (
        <View className="flex-1 items-center justify-center">
          <SpeedHUD />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <View className="flex-row justify-between items-center mb-4 space-x-2">
            <UnitToggle />
            <HUDToggle />
            <ThemeToggle />
          </View>
          <SpeedHUD />
          <Gauge />
          <SpeedAlert />
          <TripSummary />
          <AdBanner />
        </ScrollView>
      )}
      <StatusBar style={dark ? 'light' : 'dark'} />
    </SafeAreaView>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <UnitProvider>
        <HUDProvider>
          <SpeedProvider>
            <Dashboard />
          </SpeedProvider>
        </HUDProvider>
      </UnitProvider>
    </ThemeProvider>
  )
}
