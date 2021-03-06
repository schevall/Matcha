import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import { connect } from 'react-redux';
import GeolocationModal from '../Components/GeolocationModal.js';
import AddressModal from '../Components/AddressModal.js';
import GetAddress from '../Components/GetAddress.js';
import secureAxios from '../../secureAxios.js';
import { logoutAuthError } from '../../Actions/Login/loginBound.js';

class MyGeo extends Component {

  constructor(props) {
    super(props);
    const { geo } = props;
    this.state = { geo, address: '' };
    this.style = {
      container: { display: 'flex' },
      button: { marginRight: '10px' },
    };
  }

  componentWillMount() {
    const { geo } = this.state;
    if (!geo) this.setState({ address: 'Not localized' });
    GetAddress(geo).then((address) => {
      this.setState({ address });
    });
  }


  SaveAddress = (geo, address) => {
    this.setState({ address, geo });
    const payload = { geo };
    secureAxios('/users/update/geo', 'POST', payload)
    .then(({ data }) => {
      if (data.error) {
        if (data.error === 'authControl') {
          this.props.dispatch(logoutAuthError('No token provided, to connect, please sign in'));
        }
      }
    });
  }

  render() {
    if (!this.state.address) return (<CircularProgress />);
    const { geo, address } = this.state;
    return (
      <div>
        <p>Current Address: <br />{address}</p>
        <div style={this.style.container}>
          <div style={this.style.button}>
            <GeolocationModal
              handleSave={this.SaveAddress}
            />
          </div>
          <AddressModal
            geo={geo}
            handleSave={this.SaveAddress}
          />
        </div>
      </div>
    );
  }
}

export default connect()(MyGeo);
