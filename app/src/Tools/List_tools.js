import React from 'react';

class ListTools extends React.Component {

  makeArray = (data, field) => {
    const array = [];
    data.forEach((item) => {
      array.push({ field: item.field });
    });
    return array;
  }

  showList = (data, field) => {
    const array = this.makeArray(data, field);
    const listItem = array.map(item =>
      <li key={item.toString()}>{item}</li>,
    );
    return listItem;
  }
}

export default { ListTools };
