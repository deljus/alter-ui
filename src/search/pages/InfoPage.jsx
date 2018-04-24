import React from 'react';
import axios from 'axios';

const auth = () => {
  axios.post('http://localhost/api/jobs/auth', {
    user: 'musindelus@gmail.com',
    password: '84848b9b',
  });
}

const InfoPage = () => (<div>
  <h2>Info</h2>
  <h3>Не забудь заполнить страничку мяу)))</h3>
  <button onClick={auth}>auth</button>
</div>);

export default InfoPage;
