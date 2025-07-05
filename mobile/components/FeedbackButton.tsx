import React, { useState } from 'react'
import { View, Modal, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { MotiView } from 'moti'
import AnimatedButton from './AnimatedButton'

const emojis = ['😡', '😕', '😐', '😊', '🤩']

export default function FeedbackButton() {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState<number | null>(null)
  const [text, setText] = useState('')
  const [submitted, setSubmitted] = useState(false)

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
        style={styles.fab}
        onPress={() => setOpen(true)}
        activeOpacity={0.8}
      >
        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 400 }}
          style={styles.fabInner}
        >
          <Text style={{ fontSize: 28 }}>💬</Text>
        </MotiView>
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="fade">
        <View style={styles.modalBg}>
          <MotiView
            from={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', duration: 400 }}
            style={styles.modalContent}
          >
            {submitted ? (
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 32, marginBottom: 8 }}>🎉</Text>
                <Text style={{ color: '#39ff14', fontWeight: 'bold', fontSize: 18 }}>Thank you for your feedback!</Text>
              </View>
            ) : (
              <>
                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>How do you like the app?</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 12 }}>
                  {emojis.map((e, i) => (
                    <TouchableOpacity key={i} onPress={() => setRating(i + 1)}>
                      <Text style={{ fontSize: 32, marginHorizontal: 4, opacity: rating === i + 1 ? 1 : 0.5 }}>{e}</Text>
                    </TouchableOpacity>
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
                <AnimatedButton title="Submit" onPress={handleSubmit} style={{ marginTop: 12 }} />
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
    backgroundColor: '#222',
    borderRadius: 32,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#39ff14',
    shadowColor: '#39ff14',
    shadowOpacity: 0.7,
    shadowRadius: 12,
  },
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#222',
    borderRadius: 20,
    padding: 24,
    minWidth: 300,
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    backgroundColor: '#111',
    color: '#fff',
    borderRadius: 10,
    padding: 10,
    minHeight: 60,
    width: 220,
    borderWidth: 1,
    borderColor: '#39ff14',
    marginTop: 8,
    fontSize: 16,
  },
}) 