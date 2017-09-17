import React from 'react'
import Item from './Item'

class Detail extends React.Component { 
    render() {
        const { name , errorInfo,list } = this.context

        let names = name

        return (
            <div>
                {names.map(item => { 
                    return <Item key={item.name} item={item} list={list}/>
                })}
            </div>
        )
    }

    // // react@6.0.0 之后版本
    // componentDidCatch(error, info) {
    //     const { errorInfo: { func } } = this.context
    //     func(error)
    // }
    // // react@6.0.0 之前版本
    // unstable_handleError(error, info) {
    //     const { errorInfo: { func } } = this.context        
    //     func(error)
    // }
}

Detail.contextTypes = {
    name: React.PropTypes.array,
    errorInfo: React.PropTypes.object,
    list:React.PropTypes.object
}


export default Detail