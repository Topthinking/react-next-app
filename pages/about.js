import React from 'react'
import Link from 'next/link'
import PageHoc from '../hoc/Page'
import Layout from '../components/MyLayout'
import { classNames, stylesheet } from '../style/about.scss'

class About extends React.Component {
  render () {
    const { name: { name } } = this.context
    // const bg = require('../style/images/coupon.png')
    // console.log(bg)
    // const bg = require('../static/coupon.png')
    // console.log(bg)

    console.log(classNames)
    console.log(stylesheet)

    return (
      <Layout>
        <h1 className={classNames['home']} />
        <h1>您好,{name}</h1>
        <Link href='/detail'><a>点击跳转</a></Link>
        {/* <img src={bg} /> */}
        <img src='/style/images/coupon.png' />
        <style>{`
            ${stylesheet}
            {'':''}
        `}</style>
      </Layout>
    )
  }

  componentDidMount () {
    document.body.hidden = false
  }
}

About.contextTypes = {
  name: React.PropTypes.object
}

export default PageHoc(About)
