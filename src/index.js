export default {
  async fetch(request) {
    class TagRewriter {
      constructor(src) {
        this.src = src
      }

      element(element) {
        const src = element.getAttribute(this.src)

        element.setAttribute('data-modified', new Date())
        if (src) element.tagName = 'template' 
        console.log(`Found script v4: ${element.tagName} / ${src}`)
      }
    }

    const rewriter = new HTMLRewriter().on('script', new TagRewriter('src'))

    const response = await fetch(request)
    const contentType = response.headers.get('Content-Type') || ''

    if (contentType.includes('text/html')) {
      return rewriter.transform(response)
    } else {
      return response
    }
  },
}
