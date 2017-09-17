const UrlPrettifier = require('next-url-prettifier').default

let routes = [
  {
    page: 'post',
    prettyUrl: ({id}) => `/p/${id}`,
    prettyUrlPatterns: '/p/:id'
  }, {
    page: 'subject',
    prettyUrl: ({id}) => `/subject/${id}`,
    prettyUrlPatterns: '/subject/:id'
  }, {
    page: 'game',
    prettyUrl: ({id}) => `/game/${id}`,
    prettyUrlPatterns: '/game/:id'
  }
]

const urlPrettifier = new UrlPrettifier(routes)
exports.default = routes
exports.Router = urlPrettifier
