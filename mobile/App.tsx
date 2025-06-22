import React from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import SpeedHUD from './components/SpeedHUD'
import Gauge from './components/Gauge'
import SpeedAlert from './components/SpeedAlert'
import UnitToggle from './components/UnitToggle'
import ThemeToggle from './components/ThemeToggle'
import TripSummary from './components/TripSummary'
import AdBanner from './components/AdBanner'
import { UnitProvider } from './context/UnitContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import { StatusBar } from 'expo-status-bar'

function Dashboard() {
  const { dark } = useTheme()
  return (
    <SafeAreaView className={dark ? 'bg-black flex-1' : 'bg-white flex-1'}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View className="flex-row justify-between items-center mb-4">
          <UnitToggle />
          <ThemeToggle />
        </View>
        <SpeedHUD />
        <Gauge />
        <SpeedAlert />
        <TripSummary />
        <AdBanner />
      </ScrollView>
      <StatusBar style={dark ? 'light' : 'dark'} />
    </SafeAreaView>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <UnitProvider>
        <Dashboard />
      </UnitProvider>
    </ThemeProvider>
  )
}
