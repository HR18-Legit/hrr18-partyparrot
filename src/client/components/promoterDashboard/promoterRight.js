import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';

export default class PromoterRight extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const styles = {
      padding: 100,
      margin: 10,
      display: 'inline-block',
      fontSize: '32',
      textAlign: 'center',
      right: 200,
      left: 'auto',
      top: 120,
      position: 'fixed'
    }

    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Card style={styles}>


{console.log(this.props.data.eventsPromoting.length > 0 && this.props.data.eventsPromoting[0].gPoint)}
     
          <CardText>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </CardText>
        </Card>   
      </MuiThemeProvider>
      )
  }
}


