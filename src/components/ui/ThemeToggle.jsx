import { useTheme } from '../../context/ThemeContext'

export default function ThemeToggle() {
  const { dark, setDark } = useTheme()
  return (
    <button
      onClick={() => setDark(!dark)}
      className="text-sm border rounded px-2 py-1 transition-colors duration-500"
    >
      {dark ? 'Day' : 'Night'}
    </button>
  )
}
