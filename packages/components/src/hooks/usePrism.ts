import Prism from 'prismjs'

export function usePrism() {
  const highlight = (code: string, lang: string) => {
    try {
      const grammar = Prism.languages[lang]
      if (grammar) {
        return Prism.highlight(code, grammar, lang)
      }
      return code
    }
    catch {
      return code
    }
  }
  return highlight
}
