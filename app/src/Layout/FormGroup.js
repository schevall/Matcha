import React from 'react';
import { Col, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';

const MyFormGroup = (props) => {
  const { text, value, id, type, placeholder, message, error } = props;
  const margin = message ? '0px' : '15px';
  const valid = error ? 'error' : null;
  return (
    <div>
      <FormGroup style={{ marginBottom: margin }} validationState={valid}>
        {
        !text ? null :
        <Col componentClass="ControlLabel" sm={4}>
          {text}
        </Col>
        }
        {
        !id ? null :
        <Col sm={8}>
          <FormControl
            id={id}
            type={type}
            placeholder={placeholder}
            defaultValue={value}
          />
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

export default MyFormGroup;
