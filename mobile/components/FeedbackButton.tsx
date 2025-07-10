import React, { useState } from 'react'
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { MotiView } from 'moti'
import AnimatedButton from './AnimatedButton'
import { useTheme } from '../context/ThemeContext'

const emojis = ['😡', '😕', '😐', '😊', '🤩']

export default function FeedbackButton() {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const theme = useTheme()

  const handleSubmit = () => {
    setSubmitted(true)
    setTimeout(() => {
      setOpen(false)
      setSubmitted(false)
      setRating(null)
      setText('')
    }, 2000)
  }

  return (
    <>
      <TouchableOpacity
        style={[styles.fab, theme.threeD && { shadowColor: theme.colorScheme === 'green' ? '#39ff14' : theme.colorScheme === 'cyan' ? '#00ffff' : theme.colorScheme === 'magenta' ? '#ff00ff' : '#00aaff', shadowRadius: 24, shadowOpacity: 1 }, theme.glass && { backgroundColor: 'rgba(30,40,60,0.7)' }]}
        onPress={() => setOpen(true)}
        activeOpacity={0.8}
      >
        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, shadowOpacity: 1 }}
          transition={{ type: 'spring', duration: 400 }}
          style={[styles.fabInner, { borderColor: theme.colorScheme === 'green' ? '#39ff14' : theme.colorScheme === 'cyan' ? '#00ffff' : theme.colorScheme === 'magenta' ? '#ff00ff' : '#00aaff', shadowColor: theme.colorScheme === 'green' ? '#39ff14' : theme.colorScheme === 'cyan' ? '#00ffff' : theme.colorScheme === 'magenta' ? '#ff00ff' : '#00aaff' }]}
        >
          <Text style={{ fontSize: 28 }}>💬</Text>
        </MotiView>
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="fade">
        <View style={styles.modalBg}>
          <MotiView
            from={{ scale: 0.8, opacity: 0, shadowOpacity: 0 }}
            animate={{ scale: 1, opacity: 1, shadowOpacity: 1 }}
            transition={{ type: 'spring', duration: 400 }}
            style={[styles.modalContent, { borderColor: theme.colorScheme === 'green' ? '#39ff14' : theme.colorScheme === 'cyan' ? '#00ffff' : theme.colorScheme === 'magenta' ? '#ff00ff' : '#00aaff', shadowColor: theme.colorScheme === 'green' ? '#39ff14' : theme.colorScheme === 'cyan' ? '#00ffff' : theme.colorScheme === 'magenta' ? '#ff00ff' : '#00aaff', backgroundColor: theme.glass ? 'rgba(30,40,60,0.85)' : '#181c' }]}
          >
            {submitted ? (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 32, marginBottom: 8 }}>🎉</Text>
                <Text style={{ color: '#39ff14', fontWeight: 'bold', fontSize: 18, textShadowColor: '#00ffff', textShadowRadius: 8 }}>Thank you for your feedback!</Text>
              </View>
            ) : (
              <>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginBottom: 8, textShadowColor: '#00ffff', textShadowRadius: 6 }}>How do you like the app?</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 12 }}>
                  {emojis.map((e, i) => (
                    <MotiView
                      key={i}
                      from={{ scale: 0.8, opacity: 0.5 }}
                      animate={{ scale: rating === i + 1 ? 1.2 : 1, opacity: 1 }}
                      transition={{ type: 'spring', duration: 300 }}
                      style={{ marginHorizontal: 4 }}
                    >
                      <TouchableOpacity onPress={() => setRating(i + 1)}>
                        <Text style={{ fontSize: 32, opacity: rating === i + 1 ? 1 : 0.5 }}>{e}</Text>
                      </TouchableOpacity>
                    </MotiView>
                  ))}
                </View>
                <TextInput
                  value={text}
                  onChangeText={setText}
                  placeholder="Your feedback..."
                  placeholderTextColor="#aaa"
                  style={styles.input}
                  multiline
                />
                <AnimatedButton title="Submit" onPress={handleSubmit} style={{ marginTop: 12 }} colorScheme="cyan" />
              </>
            )}
            <TouchableOpacity onPress={() => setOpen(false)} style={{ position: 'absolute', top: 12, right: 12 }}>
              <Text style={{ color: '#fff', fontSize: 22 }}>✕</Text>
            </TouchableOpacity>
          </MotiView>
        </View>
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    zIndex: 100,
    elevation: 10,
  },
  fabInner: {
    backgroundColor: 'rgba(30,40,60,0.7)',
    borderRadius: 32,
    width: 62,
    height: 62,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#00ffff',
    shadowColor: '#00ffff',
    shadowOpacity: 1,
    shadowRadius: 18,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'rgba(30,40,60,0.85)',
    borderRadius: 28,
    padding: 28,
    minWidth: 320,
    alignItems: 'center',
    position: 'relative',
    borderWidth: 2.5,
    borderColor: '#00ffff',
    shadowColor: '#00ffff',
    shadowOpacity: 1,
    shadowRadius: 24,
  },
  input: {
    backgroundColor: 'rgba(20,30,40,0.7)',
    color: '#fff',
    borderRadius: 12,
    padding: 12,
    minHeight: 60,
    width: 240,
    borderWidth: 1.5,
    borderColor: '#39ff14',
    marginTop: 8,
    fontSize: 16,
  },
}) 