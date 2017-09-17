import React from 'react'
import Page from '../hoc/Page'
import DetailComponent from '../components/Detail'

class Detail extends React.Component{

    render(){
        return (
            <div>
                <h1>这里是详细页面</h1>
                <DetailComponent />
            </div>
        )
    }

    componentDidMount() { 
        document.title = "详情页面"
    }
}

export default Page(Detail)