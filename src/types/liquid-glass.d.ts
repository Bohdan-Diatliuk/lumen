import type { DefineComponent, Ref } from 'vue'

export interface LiquidGlassProps {
  displacementScale?: number
  blurAmount?: number
  saturation?: number
  aberrationIntensity?: number
  elasticity?: number
  cornerRadius?: number
  globalMousePos?: { x: number; y: number }
  mouseOffset?: { x: number; y: number }
  mouseContainer?: Ref<HTMLElement | null> | null
  class?: string
  padding?: string
  style?: Record<string, any>
  overLight?: boolean
  mode?: 'standard' | 'polar' | 'prominent' | 'shader'
}

export declare const LiquidGlass: DefineComponent<LiquidGlassProps>
