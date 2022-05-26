import http from 'node:http';
import { Readable } from 'node:stream';
import { randomUUID } from 'node:crypto';
import casual from 'casual';

// generator function
function * run() {
  for (let index = 0; index <= 5; index += 1) {
    const data = {
      id: randomUUID(),
      name: `${casual.full_name}`,
      age: `${Math.floor(Math.random() * 100 + 10)}`,
      totalAccount: Math.floor(Math.random() * 5000 + 250)
    }
    yield data
  }
}

function handler(request, response) {
  let readableStream = Readable({
    read() {
      for (let data of run()) {
        this.push(JSON.stringify(data).concat('\n'))
      }

      this.push(null);
    }
  });

  readableStream.pipe(response);
}

let server = http.createServer(handler);

server.listen(8080);

server.on('listening', () => console.log(`Server is running on port 8080`));