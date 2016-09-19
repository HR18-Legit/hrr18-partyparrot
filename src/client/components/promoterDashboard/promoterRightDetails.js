import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';
import { FacebookButton, FacebookCount } from "react-social";
import SocialShare from 'material-ui/svg-icons/social/share'
import ActionGrade from 'material-ui/svg-icons/action/grade'
import {red500, deepOrange900, amber600, grey500} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog'
import injectTapEventPlugin from 'react-tap-event-plugin'
import axios from 'axios'

export default class PromoterRightDetails extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
      

}


/*

 <FacebookButton element='a' url={event.bitlyLink} appId={appId}>
          <SocialShare color={red500} />
          <FacebookCount url={event.bitlyLink} />   
        </FacebookButton>
        <h6> {event.name} </h6>
        <ActionGrade color={amber600} />
         {event.gPoint}
        <ActionGrade color={grey500} />
         {event.sPoint}
        <ActionGrade color={deepOrange900} />
         {event.bPoint}
        <h6> Total Score </h6>


*/
