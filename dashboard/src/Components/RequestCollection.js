import React, { Component } from 'react';

import RequestItem from './RequestItem';

// Material-UI
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = (props) => {

}


class RequestCollection extends Component {
  constructor() {
    super();
  }
  
  reqListFactory = (req_map) => {
    return req_map.map((req) => <RequestItem request={req} />);
  }


  render() {
    
    return (
      <div>
        <h3> Active Requests </h3>
        {
          this.props.requests &&
          this.reqListFactory(this.props.requests)
        }
      </div>
    );
  }
}

RequestCollection.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(RequestCollection);
