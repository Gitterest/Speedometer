import { useTheme } from '../../context/ThemeContext'

export default function CustomizationPanel() {
  const { dark, setDark } = useTheme()
  return (
    <div className="p-2">
      <label className="mr-2">Theme:</label>
      <select value={dark ? 'dark' : 'light'} onChange={e => setDark(e.target.value === 'dark')}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  )
}
