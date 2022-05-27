import { get } from 'node:http';
import { Writable, Transform } from 'node:stream';
import { createWriteStream } from 'node:fs';

const url = `http://localhost:8080`;

const getHttpStream = () => new Promise(resolve => get(url, response => resolve(response)));

const httpStream = await getHttpStream();

httpStream
  .pipe(
    Transform({
      objectMode: true,
      transform(chunk, enc, cb) {
        const object = JSON.parse(chunk);

        object.totalAmountToPay = object.totalAccount -= object.totalAccount * 0.25;

        cb(null, JSON.stringify(object));
      }
    })
  )
  .map(chunk => chunk + "\n")
  .pipe(
    createWriteStream('response.csv', { flags: 'a' })
  );