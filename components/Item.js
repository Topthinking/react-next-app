import React from 'react'

class Item extends React.Component { 
    render() { 
        const { item: { name }, list: { names } } = this.props
        
        console.log(this.props)

        let lists = names

        return (
            <div>
                <h1>{name}</h1>
                {
                    lists.map(item => { 
                        return <p key={item.name}>{item.name}</p>
                    })
                }
            </div>
           
        )
    }

    // react@6.0.0 之后版本
    componentDidCatch(error, info) {
        const { errorInfo: { func } } = this.context
        func(error)
    }
    // react@6.0.0 之前版本
    unstable_handleError(error, info) {
        const { errorInfo: { func } } = this.context        
        func(error)
    }
}

Item.contextTypes = {
    errorInfo:React.PropTypes.object
}

export default Item