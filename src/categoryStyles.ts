import type { LucideIcon } from 'lucide-react'
import { Palette, Dices, Bike, Puzzle, ChefHat } from 'lucide-react'
import type { Category } from './types'

// עיצוב בלבד: צבע ואייקון לכל קטגוריה (כמו labels.ts, רק לעיצוב)
export const categoryStyles: Record<Category, { border: string; chip: string; dot: string; icon: LucideIcon }> = {
  CRAFT: { border: 'border-craft', chip: 'bg-craft-bg text-craft-text', dot: 'bg-craft', icon: Palette },
  GAME: { border: 'border-game', chip: 'bg-game-bg text-game-text', dot: 'bg-game', icon: Dices },
  MOVEMENT: { border: 'border-move', chip: 'bg-move-bg text-move-text', dot: 'bg-move', icon: Bike },
  THINKING: { border: 'border-think', chip: 'bg-think-bg text-think-text', dot: 'bg-think', icon: Puzzle },
  KITCHEN: { border: 'border-kitchen', chip: 'bg-kitchen-bg text-kitchen-text', dot: 'bg-kitchen', icon: ChefHat },
}
