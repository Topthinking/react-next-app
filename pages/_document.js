import Document, { Head, Main, NextScript } from 'next/document'
import PropTypes from 'prop-types'
import flush from 'styled-jsx/server'
import htmlescape from 'htmlescape'
import cxs from 'cxs'


function getPagePathname (pathname, nextExport) {
  if (!nextExport) return pathname
  if (pathname === '/') return '/index.js'
  return `${pathname}/index.js`
}

function formatXMEsiToEsi (text) {
  return text
    .replace(/_XM_ESI_AND/g, '&')
    .replace(/_XM_ESI_MARK/g, '"')
    .replace(/"_XM_ESI_BEGIN/g, '\'<')
    .replace(/_XM_ESI_END"/g, '>\'')
}

class XMNextScript extends NextScript {
  render () {
    const { staticMarkup, __NEXT_DATA__, chunks } = this.context._documentProps
    const { pathname, nextExport, buildId, assetPrefix } = __NEXT_DATA__
    const pagePathname = getPagePathname(pathname, nextExport)

    __NEXT_DATA__.chunks = chunks

    return <div>
      {staticMarkup ? null : <script dangerouslySetInnerHTML={{
        __html: `
          __NEXT_DATA__ = ${formatXMEsiToEsi(htmlescape(__NEXT_DATA__))}
          module={}
          __NEXT_LOADED_PAGES__ = []
          __NEXT_LOADED_CHUNKS__ = []

          __NEXT_REGISTER_PAGE = function (route, fn) {
            __NEXT_LOADED_PAGES__.push({ route: route, fn: fn })
          }

          __NEXT_REGISTER_CHUNK = function (chunkName, fn) {
            __NEXT_LOADED_CHUNKS__.push({ chunkName: chunkName, fn: fn })
          }
        `
      }} />}
      <script async id={`__NEXT_PAGE__${pathname}`} type='text/javascript' src={`${assetPrefix}/_next/${buildId}/page${pagePathname}`} />
      <script async id={`__NEXT_PAGE__/_error`} type='text/javascript' src={`${assetPrefix}/_next/${buildId}/page/_error/index.js`} />
      {staticMarkup ? null : this.getDynamicChunks()}
      {staticMarkup ? null : this.getScripts()}
    </div>
  }
}

class XMain extends Main { 
  static propTypes = {
    className: PropTypes.string
  }

  static contextTypes = {
    _documentProps: PropTypes.any
  }

  render () {
    const { html, errorHtml } = this.context._documentProps
    const { className } = this.props

    console.log('render_Main>>>>>>')
    
    return (
      <div className={className}>
        <div id='__next' dangerouslySetInnerHTML={{ __html: html }} />
        <h1 style={{color:'red',display:'none'}} id="__next-react-error">Error</h1>
        <div id='__next-error' style={{display:'none'}} dangerouslySetInnerHTML={{ __html: errorHtml }} />
      </div>
    )
  }
}

export default class MyDocument extends Document {
  static getInitialProps ({ renderPage }) {
    const {html, head, errorHtml, chunks} = renderPage()
    const styles = flush()
    const style = cxs.css()
    
    return { html, head, errorHtml, chunks, styles, style }
  }

  componentDidMount () {
    //document.body.hidden = false
  }

  render () {
    return (
      <html>
        <Head>
          <title>页面加载中...</title>
          <style>{`body { margin: 0 } /* custom! */`}</style>
          <style dangerouslySetInnerHTML={{ __html: this.props.style }} />
        </Head>
        <body className='page' hidden>
          {this.props.customValue}
          <XMain />
          <XMNextScript />
        </body>
        
      </html>
    )
  }
}
