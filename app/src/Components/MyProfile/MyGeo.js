import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import GeolocationModal from '../Geolocation/GeolocationModal.js';
import AddressModal from '../Geolocation/AddressModal.js';
import GetAddress from '../Geolocation/GetAddress.js';
import secureAxios from '../../secureAxios.js';

export default class MyGeo extends Component {

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
    secureAxios('/users/update/geo', 'POST', payload);
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
