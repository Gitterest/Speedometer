import { useEffect } from 'react'
import Voice from 'react-native-voice'

export default function useVoiceCommands(
  toggleHUD: () => void,
  toggleUnit: () => void
) {
  useEffect(() => {
    Voice.onSpeechResults = e => {
      const text = e.value?.[0]?.toLowerCase() ?? ''
      if (text.includes('hud')) toggleHUD()
      if (text.includes('units')) toggleUnit()
    }
    Voice.start('en-US')
    return () => {
      Voice.destroy().then(Voice.removeAllListeners)
    }
  }, [toggleHUD, toggleUnit])
}
