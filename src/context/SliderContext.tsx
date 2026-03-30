import { createContext, useContext } from 'react'

interface SliderContextType {
  currentSlide: number
  goToSlide: (index: number) => void
  totalSlides: number
}

export const SliderContext = createContext<SliderContextType>({
  currentSlide: 0,
  goToSlide: () => {},
  totalSlides: 0,
})

export const useSlider = () => useContext(SliderContext)
