import type { NavOperations, ShortcutOptions } from '@slidev/types'
import { defineShortcutsSetup } from '@slidev/types'

export default defineShortcutsSetup((nav: NavOperations, base: ShortcutOptions[]) => {
  return base.filter((op) => {
    return op.name && ['next_space', 'pre_space', 'next_right', 'pre_left'].includes(op.name)
  })
})
