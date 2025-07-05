import React from 'react'
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import AnimatedButton from './AnimatedButton'

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
  const toggleWidget = (key: WidgetKey) => {
    setSelectedWidgets(selectedWidgets.includes(key)
      ? selectedWidgets.filter(w => w !== key)
      : [...selectedWidgets, key])
  }
  return (
    <Modal visible={open} transparent animationType="fade">
      <View style={styles.bg}>
        <View style={styles.content}>
          <Text style={{ color: '#39ff14', fontWeight: 'bold', fontSize: 20, marginBottom: 12 }}>Customize Dashboard</Text>
          {allWidgets.map(w => (
            <AnimatedButton
              key={w.key}
              title={w.label + (selectedWidgets.includes(w.key) ? ' ✓' : '')}
              onPress={() => toggleWidget(w.key as WidgetKey)}
              style={{ marginVertical: 4, backgroundColor: selectedWidgets.includes(w.key) ? '#39ff1422' : '#111' }}
            />
          ))}
          <AnimatedButton title="Done" onPress={() => setOpen(false)} style={{ marginTop: 16 }} />
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
    backgroundColor: '#222',
    borderRadius: 20,
    padding: 24,
    minWidth: 280,
    alignItems: 'center',
  },
}) 