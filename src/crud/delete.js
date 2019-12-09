import React from 'react';
import { useHistory } from 'react-router-dom';

export const Delete = props => {
  const { promise, onSuccess = () => null } = props;

  const onClick = a => {
    promise.then(x => {
      return onSuccess(x)
    })
  }

  return <button type="button" className="btn btn-danger" onClick={onClick}>Danger</button>;
}

export const DeleteWRedirect = props => {
  let history = useHistory();
  const { promise, link } = props;

  const onSuccess = x => {
    return history.push(link)
  };

  return <Delete promise={promise} onSuccess={onSuccess}/>
}