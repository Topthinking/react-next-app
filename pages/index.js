import React from 'react'
import Link from 'next/link'
import Page from '../hoc/Page'

class Main extends React.Component {
  render() {
    return (
      <div>
        <Link href="/detail">
          <a><h1>查看详情</h1></a>
        </Link>
      </div>)
  }

  componentDidMount() { 
    document.title = "首页"
  }
}

export default Page(Main)
