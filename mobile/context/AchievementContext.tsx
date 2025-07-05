import React, { createContext, useContext, useState, useCallback } from 'react'

export interface Achievement {
  id: string
  title: string
  description: string
  icon?: string
}

const defaultAchievements: Achievement[] = [
  { id: 'first_drive', title: 'First Drive', description: 'Complete your first trip.' },
  { id: 'speedster', title: 'Speedster', description: 'Reach 100 km/h.' },
  { id: 'safe_driver', title: 'Safe Driver', description: 'Drive 10km without exceeding the speed limit.' },
  { id: 'long_haul', title: 'Long Haul', description: 'Drive 100km in total.' },
  { id: 'night_owl', title: 'Night Owl', description: 'Drive between 12am and 5am.' },
]

interface AchievementContextProps {
  unlocked: string[]
  unlock: (id: string) => void
  isUnlocked: (id: string) => boolean
  achievements: Achievement[]
  lastUnlocked?: Achievement
}

const AchievementContext = createContext<AchievementContextProps | undefined>(undefined)

export const AchievementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unlocked, setUnlocked] = useState<string[]>([])
  const [lastUnlocked, setLastUnlocked] = useState<Achievement | undefined>(undefined)

  const unlock = useCallback((id: string) => {
    if (!unlocked.includes(id)) {
      setUnlocked(prev => [...prev, id])
      const ach = defaultAchievements.find(a => a.id === id)
      if (ach) setLastUnlocked(ach)
    }
  }, [unlocked])

  const isUnlocked = useCallback((id: string) => unlocked.includes(id), [unlocked])

  return (
    <AchievementContext.Provider value={{ unlocked, unlock, isUnlocked, achievements: defaultAchievements, lastUnlocked }}>
      {children}
    </AchievementContext.Provider>
  )
}

export const useAchievements = () => {
  const ctx = useContext(AchievementContext)
  if (!ctx) throw new Error('useAchievements must be used within AchievementProvider')
  return ctx
} 