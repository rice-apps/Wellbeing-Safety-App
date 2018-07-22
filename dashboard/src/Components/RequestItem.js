import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

// Material-UI
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

// Material=UI buttons
import LocationOn from '@material-ui/icons/LocationOn';

const styles = (props) => {
  
}

class RequestItem extends Component {

  

  render() {
    let id = this.props.request._id;
    let lat = this.props.request.latitude;
    let lng = this.props.request.longitude;
    let timestamp = this.props.request.timestamp;

    const { classes } = this.props;

    // console.log("Props.Req", this.props.request);

    return (
      <div className={classes.wrapper}>
        <ListItem button>
          <ListItemAvatar>
            <Avatar>
              <IconButton>
                <LocationOn />
              </IconButton>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={"(" + lat + ", " + lng + ")"}
            secondary={id + ", " + timestamp}
          />
        </ListItem>
      </div>
    );
  }
}

RequestItem.propTypes = {
  classes: PropTypes.object.isRequired
}


export default withStyles(styles)(RequestItem);
