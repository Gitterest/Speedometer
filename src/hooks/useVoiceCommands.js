import { useEffect } from 'react'

export default function useVoiceCommands(toggleHUD, toggleUnit) {
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.onresult = e => {
      const text = e.results[e.results.length - 1][0].transcript
        .trim()
        .toLowerCase()
      if (text.includes('hud')) toggleHUD()
      if (text.includes('units')) toggleUnit()
    }
    recognition.start()
    return () => recognition.stop()
  }, [toggleHUD, toggleUnit])
}
