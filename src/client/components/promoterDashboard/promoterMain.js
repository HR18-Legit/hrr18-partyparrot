import React from 'react'
import injectTapEventPlugin from 'react-tap-event-plugin';
import PromoterLeft from './promoterLeft'
import PromoterRight from './promoterRight'
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
    const user = localStorage.getItem('username')
    const url = `/user/${user}`

    this.serverRequest = $.get(url, function (promoter) {

console.log(promoter.eventsPromoting)

_.each(promoter.eventsPromoting, function(event){
  console.log(event.eventId)
   const url = `/event/${event.eventId}`
    $.get(url, function (event) {
      console.log(event)
    })


})


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
      <div>
        <PromoterLeft data={this.state} />
        <PromoterRight data={this.state} />
      </div>
     )
  }
}
