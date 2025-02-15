let styleElement: HTMLStyleElement | undefined = undefined

function minify(cssString: string) {
  return cssString
    .replace(/\s+/g, ' ')
    .replace(/; /g, ';')
    .replace(/ {/g, '{')
    .replace(/, /g, ',')
    .replace(/} /g, '}')
    .trim()
}

function hash(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 16777619) ^ str.charCodeAt(i)
  }

  return 'px' + hash.toString(36)
}

function css(raw: TemplateStringsArray) {
  let cssString = minify(raw[0])

  const name = hash(cssString)

  if (!styleElement) {
    styleElement = document.createElement('style')
    document.head.appendChild(styleElement)
  }

  if (!styleElement.textContent?.includes(name)) {
    styleElement.textContent += `.${name} { ${cssString} }\n`
  }

  return name
}

export default css
