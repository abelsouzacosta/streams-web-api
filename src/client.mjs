import { get } from 'node:http';

const URL = `http://localhost:8080`;

const getHttpStream = () => new Promise(resolve => get(URL, response => resolve(response)));

const stream = await getHttpStream();

stream  
  .pipe(process.stdout);