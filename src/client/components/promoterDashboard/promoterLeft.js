import React from 'react'
export default class PromoterLeft extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
      {console.log(this.props.data.firstName)}
        <h1> {this.props.data.firstName} {this.props.data.lastName} </h1>
      </div>
      )
  }
}
