import { create } from 'zustand'
const useHigherAIStore = create(set => ({
  text: 'asdfasdfasdf',
  setText: val => {
    set({ text: val })
  }
}))

export default useHigherAIStore
