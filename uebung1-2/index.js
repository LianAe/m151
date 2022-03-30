import { createServer } from 'http';
import data from './data.js';
import { deleteAddress } from './delete.js';
import { getList } from './list.js';

createServer((request, response) => {
  const urlParts = request.url.split('/');
  if (urlParts.includes('delete')) {
    data.addresses = deleteAddress(data.addresses, urlParts[2]);
    redirect(response, '/');
  } else if (urlParts.includes('new')) {
    send(response, getForm());
  } else if (urlParts.includes('edit')) {
    send(response, getForm(data.addresses, urlParts[2]));
  } else {
    send(response, getList(data.addresses));
  }
}).listen(8080, () =>
  console.log('Server erreichbar unter http://localhost:8080')
);

function send(response, responseBody) {
  response.writeHead(200, { 'content-type': 'text/html' });
  response.end(responseBody);
}

function redirect(response, to) {
  response.writeHead(302, { location: '/', 'content-type': 'text/plain' });
  response.end('302 Redirecting to /');
}