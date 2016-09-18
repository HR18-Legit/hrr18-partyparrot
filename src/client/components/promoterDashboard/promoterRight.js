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
      fontFamily: 'monospace',
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
       
 

          {console.log(this.props.data)}
     
          <CardText expandable={true}>
           Lorem ipsum dolor sit amet, consectetur adipiscing elit.
           Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
           Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
           Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>   
      </MuiThemeProvider>
      )
  }
}


