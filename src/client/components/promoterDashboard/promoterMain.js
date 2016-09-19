import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin'
import PromoterLeft from './promoterLeft'
import PromoterRight from './promoterRight'
import axios from 'axios'
import _ from 'lodash'

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
    const that = this
    const events = []
    const user = localStorage.getItem('username')
    const url = `/user/${user}`
    this.serverRequest = axios.get(url).then(function (promoter) {
      that.setState({
        firstName: promoter.data.firstName,
        lastName: promoter.data.lastName,
        photo: promoter.data.photo
      })
      _.each(promoter.data.eventsPromoting, function (event) {
        const url = `/events/${event.eventId}`
        axios.get(url).then(function (event) {
          events.push(event)
        })
      })
    }).then(
      that.setState({
        eventsPromoting: events
      })
     )
  }
  componentWillUnmount () {
    this.serverRequest.abort()
  }
  render () {
    return (
      <div>
        <PromoterLeft data={this.state} />
        <PromoterRight data={this.state} />
      </div>
     )
  }
}
