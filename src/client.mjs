import { get } from 'node:http';
import { Writable, Transform } from 'node:stream';

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
  .pipe(
    Writable({
      objectMode: true,
      write(chunk, enc, cb) {
        console.log(JSON.parse(chunk));

        return cb();
      }
    })
  );