import { useEffect } from 'react'
import { Platform } from 'react-native'

// Fallback voice commands for Expo Go compatibility
export default function useVoiceCommands(
  toggleHUD: () => void,
  toggleUnit: () => void
) {
  useEffect(() => {
    // For Expo Go, we'll use keyboard shortcuts instead of voice commands
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'h' || e.key === 'H') {
        toggleHUD()
      }
      if (e.key === 'u' || e.key === 'U') {
        toggleUnit()
      }
    }

    // Only add keyboard listeners for web
    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyPress)
      return () => window.removeEventListener('keydown', handleKeyPress)
    }
  }, [toggleHUD, toggleUnit])

  // Return a dummy function for compatibility
  return {
    startListening: () => console.log('Voice commands not available in Expo Go'),
    stopListening: () => console.log('Voice commands not available in Expo Go'),
    isListening: false
  }
}
