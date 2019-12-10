import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';

import { storiesOf } from '@storybook/react';

function MyToast(props) {
  const { title, small, children, isShow } = props;

  const [show, setShow] = useState(isShow);

  // this is required (to update state while props change)
  useEffect(() => {
    setShow(isShow);
  }, [isShow])

  return <Toast
    onClose={() => setShow(false)} show={show} delay={3000} autohide>
    <Toast.Header>
      <img
        src="holder.js/20x20?text=%20"
        className="rounded mr-2"
        alt=""
      />
      <strong className="mr-auto">{title}</strong>
      <small>{small}</small>
    </Toast.Header>
    <Toast.Body>{children}</Toast.Body>
  </Toast>
}

function Example() {
  //return 'a'
  const [show, setShow] = useState(false);
  const [list, setList] = useState([]);

  return (<React.Fragment>
    <div
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'relative',
        minHeight: '100px',
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
      }}
      >
      {list.map(l => {
        return <MyToast title="my title" isShow={true} small="now">body bodybodybodybodybodybodybodybody bodybodybodybodybodybodybodybodybo dybodybodybodybodybodybodybodybo dybodybodybodybodybodybodybody bodybodybodybodybodybodybodybody</MyToast>
      })}
      </div>
    </div>
    <Container>
   
    <Row>
      <Col xs="6">sdf</Col>
      <Col xs={6}>
      df df df df df df df df df df df df df df df dhf df df df df df df df df df df df df df df df df df df df df df df df df
        
      </Col>
      <Col xs={6}>
        <Button onClick={() => setList([...list, 'a'])}>Show Toast</Button>
      </Col>
    </Row>
    </Container>
    </React.Fragment>
  );
}


storiesOf('Components', module)
  .add('Toast', () => <Example/>);
 
