import * as React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import AnimatedButton from './AnimatedButton';
import { useTheme } from '../context/ThemeContext';

const allWidgets = [
  { key: 'compass', label: 'Compass' },
  { key: 'altitude', label: 'Altitude' },
  { key: 'weather', label: 'Weather' },
  { key: 'tripCost', label: 'Trip Cost' },
]

type WidgetKey = typeof allWidgets[number]['key']

export default function WidgetSelector({ open, setOpen, selectedWidgets, setSelectedWidgets }: {
  open: boolean
  setOpen: (v: boolean) => void
  selectedWidgets: WidgetKey[]
  setSelectedWidgets: (v: WidgetKey[]) => void
}) {
  const { colorScheme, glass } = useTheme()
  const toggleWidget = (key: WidgetKey) => {
    setSelectedWidgets(selectedWidgets.includes(key)
      ? selectedWidgets.filter(w => w !== key)
      : [...selectedWidgets, key])
  }
  const getColor = () => {
    switch (colorScheme) {
      case 'green': return '#39ff14';
      case 'cyan': return '#00ffff';
      case 'magenta': return '#ff00ff';
      case 'blue': return '#00aaff';
      case 'orange': return '#ff9900';
      case 'purple': return '#a259ff';
      default: return '#39ff14';
    }
  };
  const neon = getColor();
  return (
    <Modal visible={open} transparent animationType="fade">
      <View style={styles.bg}>
        <View style={[styles.content, {
          backgroundColor: glass ? 'rgba(30,40,60,0.85)' : '#222',
          borderColor: neon,
          borderWidth: 2.5,
          shadowColor: neon,
          shadowOpacity: 0.7,
          shadowRadius: 32,
        }]}> 
          <Text style={{ color: neon, fontWeight: 'bold', fontSize: 20, marginBottom: 12, textShadowColor: neon, textShadowRadius: 8 }}>Customize Dashboard</Text>
          {allWidgets.map(w => (
            <AnimatedButton
              title={w.label + (selectedWidgets.includes(w.key) ? ' \u2713' : '')}
              onPress={() => toggleWidget(w.key as WidgetKey)}
              colorScheme={['green','cyan','magenta'].includes(colorScheme) ? colorScheme as 'green'|'cyan'|'magenta' : 'green'}
              style={{ marginVertical: 4, backgroundColor: selectedWidgets.includes(w.key) ? neon + '22' : '#111' }}
            />
          ))}
          <AnimatedButton title="Done" onPress={() => setOpen(false)} colorScheme={['green','cyan','magenta'].includes(colorScheme) ? colorScheme as 'green'|'cyan'|'magenta' : 'green'} style={{ marginTop: 16 }} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    borderRadius: 20,
    padding: 24,
    minWidth: 280,
    alignItems: 'center',
  },
}) 