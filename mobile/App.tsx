import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Magnetometer } from 'expo-sensors';
import SpeedHUD from './components/SpeedHUD';
import Gauge from './components/Gauge';
import SpeedAlert from './components/SpeedAlert';
import UnitToggle from './components/UnitToggle';
import ThemeToggle from './components/ThemeToggle';
import HUDToggle from './components/HUDToggle';
import TripSummary from './components/TripSummary';
import AdBanner from './components/AdBanner';
import BatterySaverToggle from './components/BatterySaverToggle';
import ThemeSelector from './components/ThemeSelector';
import WidgetSelector from './components/WidgetSelector';
import AnimatedButton from './components/AnimatedButton';
import FeedbackButton from './components/FeedbackButton';
import AnimatedBackground from './components/AnimatedBackground';
import { UnitProvider, useUnit } from './context/UnitContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { SpeedProvider, useSpeedContext } from './context/SpeedContext';
import { HUDProvider, useHUD } from './context/HUDContext';
import { AchievementProvider } from './context/AchievementContext';
import useVoiceCommands from './hooks/useVoiceCommands';
import AROverlay from './components/AROverlay'

// Hook: Compass (magnetometer)
function useCompass() {
  const [heading, setHeading] = React.useState(0);
  React.useEffect(() => {
    Magnetometer.setUpdateInterval(200);
    const sub = Magnetometer.addListener(({ x, y }) => {
      let angle = Math.atan2(y, x) * (180 / Math.PI);
      angle = angle < 0 ? 360 + angle : angle;
      setHeading(angle);
    });
    return () => sub.remove();
  }, []);
  return heading;
}

// Hook: Altitude (location)
function useAltitude() {
  const [altitude, setAltitude] = React.useState<number | null>(null);
  React.useEffect(() => {
    (async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setAltitude(loc.coords.altitude ?? null);
    })();
  }, []);
  return altitude;
}

// Hook: Weather (simulated weather based on time and location)
function useWeather() {
  const [weather, setWeather] = React.useState({ temp: 22, desc: 'Partly Cloudy' });
  React.useEffect(() => {
    (async () => {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) return;
      
      try {
        const loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        const now = new Date();
        const hour = now.getHours();
        
        // Simulate weather based on time of day and location
        let temp = 20 + Math.sin(hour / 24 * 2 * Math.PI) * 10; // Temperature varies by time
        temp += (loc.coords.latitude - 40) * 0.5; // Temperature varies by latitude
        
        let desc = 'Clear';
        if (hour < 6 || hour > 20) desc = 'Clear Night';
        else if (hour < 10) desc = 'Morning Sun';
        else if (hour < 16) desc = 'Partly Cloudy';
        else if (hour < 20) desc = 'Evening Light';
        
        // Add some randomness
        if (Math.random() > 0.7) desc = 'Light Rain';
        if (Math.random() > 0.9) desc = 'Cloudy';
        
        setWeather({ temp: Math.round(temp), desc });
      } catch {
        // Fallback to default weather
        setWeather({ temp: 22, desc: 'Partly Cloudy' });
      }
    })();
  }, []);
  return weather;
}

// Hook: Trip cost (dummy rate)
function useTripCost(distance: number) {
  const [cost, setCost] = React.useState(0);
  React.useEffect(() => {
    setCost(distance / 1000 * 0.1); // $0.10 per km
  }, [distance]);
  return cost;
}

// Widget: Compass
function CompassWidget() {
  const heading = useCompass();
  const [display, setDisplay] = React.useState(heading);
  React.useEffect(() => {
    let frame: any;
    const animate = () => {
      setDisplay(d => d + (heading - d) * 0.2);
      if (Math.abs(heading - display) > 0.5) frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [heading]);
  const dirs = ['N','NE','E','SE','S','SW','W','NW'];
  const dir = dirs[Math.round(display / 45) % 8];
  return (
    <View style={styles.widget}>
      <Text style={styles.widgetText}>Compass: {dir} ({display.toFixed(0)}°)</Text>
    </View>
  );
}

// Widget: Altitude
function AltitudeWidget() {
  const altitude = useAltitude();
  const [display, setDisplay] = React.useState(altitude ?? 0);
  React.useEffect(() => {
    let frame: any;
    const animate = () => {
      setDisplay(d => d + ((altitude ?? 0) - d) * 0.2);
      if (Math.abs((altitude ?? 0) - display) > 0.5) frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [altitude]);
  return (
    <View style={styles.widget}>
      <Text style={styles.widgetText}>Altitude: {display.toFixed(1)}m</Text>
    </View>
  );
}

// Widget: Weather
function WeatherWidget() {
  const weather = useWeather();
  return (
    <View style={styles.widget}>
      <Text style={styles.widgetText}>Weather: {weather.temp}°C, {weather.desc}</Text>
    </View>
  );
}

// Widget: Trip Cost
function TripCostWidget() {
  const { distance } = useSpeedContext();
  const cost = useTripCost(distance);
  const [display, setDisplay] = React.useState(cost);
  React.useEffect(() => {
    let frame: any;
    const animate = () => {
      setDisplay(d => d + (cost - d) * 0.2);
      if (Math.abs(cost - display) > 0.01) frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, [cost]);
  return (
    <View style={styles.widget}>
      <Text style={styles.widgetText}>Trip Cost: ${display.toFixed(2)}</Text>
    </View>
  );
}

// Main Dashboard
function Dashboard() {
  const { speed, distance } = useSpeedContext();
  const { dark, colorScheme } = useTheme();
  const { hud, toggleHUD, mirrored } = useHUD();
  const { toggleUnit } = useUnit();
  useVoiceCommands(toggleHUD, toggleUnit);

  const [widgetSelectorOpen, setWidgetSelectorOpen] = React.useState(false);
  const [selectedWidgets, setSelectedWidgets] = React.useState<string[]>([]);

  // Load/persist widget preferences
  React.useEffect(() => {
    AsyncStorage.getItem('selectedWidgets').then(raw => {
      if (raw) setSelectedWidgets(JSON.parse(raw));
      else setSelectedWidgets(['compass','altitude']);
    });
  }, []);
  React.useEffect(() => {
    AsyncStorage.setItem('selectedWidgets', JSON.stringify(selectedWidgets));
  }, [selectedWidgets]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: dark ? '#000' : '#fff' }]}>      
      <AnimatedBackground speed={speed} />
      {hud ? (
        <View style={styles.hudContainer}>
          <SpeedHUD />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scroll}>
          <ThemeSelector />
          <View style={styles.toolbar}>
            <UnitToggle />
            <HUDToggle />
            <ThemeToggle />
            <AnimatedButton title="Customize Widgets" onPress={() => setWidgetSelectorOpen(true)} />
          </View>
          <BatterySaverToggle />
          {selectedWidgets.includes('compass') && <CompassWidget />}
          {selectedWidgets.includes('altitude') && <AltitudeWidget />}
          {selectedWidgets.includes('weather') && <WeatherWidget />}
          {selectedWidgets.includes('tripCost') && <TripCostWidget />}
          <SpeedHUD />
          <Gauge value={speed} colorScheme={['green','cyan','magenta'].includes(colorScheme) ? colorScheme as 'green'|'cyan'|'magenta' : 'green'} />
          <SpeedAlert />
          <TripSummary />
          <AROverlay />
          <AdBanner />
        </ScrollView>
      )}
      <StatusBar style={dark ? 'light' : 'dark'} />
      <FeedbackButton />
      <WidgetSelector open={widgetSelectorOpen} setOpen={setWidgetSelectorOpen} selectedWidgets={selectedWidgets} setSelectedWidgets={setSelectedWidgets} />
    </SafeAreaView>
  );
}

// Root App
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
  );
}

// Styles
const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { padding: 16 },
  hudContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  toolbar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  widget: { backgroundColor: '#222', borderRadius: 12, padding: 16, marginVertical: 8 },
  widgetText: { fontWeight: 'bold', color: '#fff' }
});
