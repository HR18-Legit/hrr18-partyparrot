import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Avatar from 'material-ui/Avatar';


export default class PromoterLeft extends React.Component {
  constructor (props) {
    super(props)
  }
  render () {
    const cardstyles = {
      padding: 100,
      margin: 10,
      display: 'inline-block',
      fontSize: '32',
      textAlign: 'center',
      right: 'auto',
      left: 200,
      top: 120,
      position: 'fixed'
    }

    const avatarstyles = {
      right: 100
    }


    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <Card style={cardstyles}>
          <CardHeader
            title={this.props.data.firstName}
            subtitle={this.props.data.lastName}
            avatar={this.props.data.photo}
           />
        </Card>
      </MuiThemeProvider>
      )
  }
}
