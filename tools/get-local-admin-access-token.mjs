import { $ } from 'zx';
import axios from 'axios';
import { Command } from 'commander/esm.mjs';
import { argv } from 'process';

$.verbose = false;

let token;
try {
  token = (
    await axios.post('http://localhost:3000/api/login', {
      email: 'admin@traxion.com',
      password: 'password',
    })
  ).data.accessToken;
} catch (e) {
  console.log('Fail to authenticate the admin user against the api');
  process.exit(1);
}

console.log('Access Token:');
console.log(token);

const program = new Command();

program.option(
  '-e, --endpoint <endpoint>',
  'get the value of the specified endpoint',
  '',
);
program.parse(argv);

const options = program.opts();
const { endpoint } = options;

if (endpoint) {
  console.log();
  console.log('Endpoint ' + endpoint + ':');
  const res = (
    await axios.get('http://localhost:3000/api/' + endpoint, {
      headers: { Authorization: 'Bearer ' + token },
    })
  ).data;
  console.log(res);
}
