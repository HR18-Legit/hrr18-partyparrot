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
      events: []
    }
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount () {
    const that = this
    const user = localStorage.getItem('username')
    const url = `/user/${user}`
    this.serverRequest = axios.get(url).then(function (promoter) {
    //  console.log(promoter)
      that.setState({
        firstName: promoter.data.firstName,
        lastName: promoter.data.lastName,
        photo: promoter.data.photo,
        events: promoter.data.eventsPromoting
      })
    })
  
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
