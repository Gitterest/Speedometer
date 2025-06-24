import { useHUD } from '../../context/HUDContext'
import { motion } from 'framer-motion'
import { fade } from '../../hooks/useAnimations'

export default function HUDToggle() {
  const { hud, toggleHUD } = useHUD()
  return (
    <motion.button
      onClick={toggleHUD}
      className="text-sm border rounded px-2 py-1"
      variants={fade}
      initial="initial"
      animate="animate"
    >
      {hud ? 'Dashboard' : 'HUD'}
    </motion.button>
  )
}
