import React from 'react'

export default function Page(Component) {

  let showError = false

  class HocPage extends React.Component {
    getChildContext() {
      const { name, age, list, context, errorInfo } = this.props

      errorInfo.func = (err) => {
        this.collectError(err)
      }
      return { name, age, context, errorInfo,list }
    }

    constructor() {
      super()
      this.state = {
        showError: false
      }

      this.showError = false
    }

    static getInitialProps(context) {
      const { pathname, query, asPath } = context
      return {
        showError: false,
        name: [{ name: 'top' }, { name: 'sunny' }],
        list: {names: [{ name: "top" }, {name:'sunny'}]},
        age: 28,
        context: {

        },
        errorInfo: {
        }
      }
    }

    collectError(err) {
      this.showError = true
      document.title = "内容出错了:("
      document.getElementById('__next-react-error').style.display = 'block'
      console.log('捕获错误了', err)
    }

    render() {
      const { name, age, context } = this.props
      
      if (this.showError) {
        if (typeof document != 'undefined') {
          document.getElementById('__next-react-error').style.display = 'block'      
        }
        return null
      } else {
        if (typeof document != 'undefined') {
          document.getElementById('__next-react-error').style.display = 'none'      
        }
        return (
          <Component />
        )
      }
    }

    // react@6.0.0 之后版本
    componentDidCatch(error, info) {

    }
    // react@6.0.0 之前版本
    unstable_handleError(error, info) {
      
    }

    componentDidMount() {
      document.body.hidden = false
    }
  }

  HocPage.childContextTypes = {
    name: React.PropTypes.array,
    age: React.PropTypes.number,
    context: React.PropTypes.object,
    errorInfo: React.PropTypes.object,
    list: React.PropTypes.object
  }

  return HocPage
}
