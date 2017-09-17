import React from 'react'

class Layout extends React.Component {

    getChildContext(){
        console.log(this.props)
    }

    render(){
        console.log(this.props)
        return (
            <div>
                <p>hello world</p>
                {this.props.children}
            </div>
        )
    }
}

export default Layout