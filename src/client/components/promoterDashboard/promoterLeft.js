import React from 'react'
export default class PromoterLeft extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
      {console.log(this.props.data)}
        <h2> {this.props.data.firstName} {this.props.data.lastName} </h2>
      </div>
      )
  }
}
