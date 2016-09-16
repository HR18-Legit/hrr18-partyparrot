import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
      categories: [],
      selectedEvent: {}
    }
  }

  render () {
    const childrenWithProps = React.Children.map(this.props.children,
      (child) => React.cloneElement(child, {
        getEvents: this.getEvents.bind(this),
        categories: this.state.categories,
        event: this.state.selectedEvent,
        handler: this.handler.bind(this)
      })
    );

    return (
      <div className="app">
        <NavBar />
        {childrenWithProps}
        <Footer />
      </div>
    )
  }

  getEvents() {
    $.ajax({
      url: '/events',
      type: 'GET',
      success: function(events) {
        this.setState({
          events: events
        })
        this.createCategoryList();
      }.bind(this)
    })
  }

createCategoryList() {
    var categories = [];
    var done = [];
    this.state.events.map(event => {
      var category_id = event.eventbrite.category_id;
      if (category_id) {
        $.ajax({
          url: `https://www.eventbriteapi.com/v3/categories/${category_id}/?token=YZO3HZ5MJZYKY6QU64H2`,
          type: 'GET',
          success: function(category) {
            if (!done.includes(category.id)) {
              categories.push({
                id: categories[categories.length-1] ? categories[categories.length-1].id + 1 : 1,
                title: category.name,
                categoryId: category.id,
                imgUrl: 'http://www.miamiandbeaches.com/~/media/images/miamiandbeaches/plan-your-trip/gettingaround/miami-from-ft-lauderdale/causeway-miami-skyline-612x338.jpg'
              });
              done.push(category.id)
              this.setState({
                categories: categories
              })
            }
          }.bind(this)
        })
      }
    })
  }

  handler(event) {
    this.setState({
      selectedEvent: event
    });
    this.context.router.push('/EventDetails');
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

