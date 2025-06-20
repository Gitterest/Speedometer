import { motion } from 'framer-motion'
import { fade } from '../../hooks/useAnimations'

export default function AdBanner() {
  return (
    <motion.div
      className="bg-yellow-200 text-center p-2 mt-4"
      variants={fade}
      initial="initial"
      animate="animate"
    >
      Ad Banner Placeholder
    </motion.div>
  )
}
