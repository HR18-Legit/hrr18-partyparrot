import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin';
import PromoterLeft from './promoterLeft'


export default class Promoters extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      photo: '',
      eventsPromoting: []
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount () {
    const user = localStorage.getItem('username')
    const url = `/user/${user}`

    this.serverRequest = $.get(url, function (promoter) {
      this.setState({
        firstName: promoter.firstName,
        lastName: promoter.lastName,
        photo: promoter.photo,
        eventsPromoting: promoter.eventsPromoting
      })
    }.bind(this))
  }

  componentWillUnmount () {
    this.serverRequest.abort()
  }

  render () {
    return (
      <PromoterLeft data={this.state} />
     )
  }
}
