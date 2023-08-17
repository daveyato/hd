import { create } from 'zustand'
const useHigherAIStore = create(set => ({
  PDFList: [],
  setPDFList: val => {
    set({ PDFList: val })
  }
}))

export default useHigherAIStore
