import React from 'react';
import { Col, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

const MySelectFormGroup = (props) => {
  const { text, value, id, options, message, error, size } = props;
  const { sizeField, sizeText } = size;
  const margin = message ? '0px' : '15px';
  const valid = error ? 'error' : null;
  const optionsDisplay = options.map(el => (
    <option key={el.value} value={el.value}>
      {el.text}
    </option>
  ));
  return (
    <div>
      <FormGroup style={{ marginBottom: margin }} validationState={valid}>
        {
        !text ? null :
        <Col componentClass="ControlLabel" sm={sizeText[0]} md={sizeText[1]} lg={sizeText[2]}>
          {text}
        </Col>
        }
        {
        !id ? null :
        <Col sm={sizeField[0]} md={sizeField[1]} lg={sizeField[2]}>
          <FormControl
            id={id}
            componentClass="select"
            defaultValue={value}
          >
            {optionsDisplay}
          </FormControl>
        </Col>
        }
      </FormGroup>
      {!message ? null :
      <HelpBlock style={{ color: 'green' }}>{message}</HelpBlock>
      }
      {!error ? null :
      <HelpBlock style={{ color: 'red' }}>{error}</HelpBlock>
      }
    </div>
  );
};

export default MySelectFormGroup;
