import net from 'node:net';

const listenPort = 9000;
const targetPort = 80;
const targetHost = 'google.com';

const server = net.createServer((clientSocket) => {
  console.log(`[Proxy] Connection received from ${clientSocket.remoteAddress}`);
  
  const serverSocket = net.connect(targetPort, targetHost, () => {
    clientSocket.pipe(serverSocket);
    serverSocket.pipe(clientSocket);
  });
  
  clientSocket.on('error', (err) => console.log('Client socket error:', err.message));
  serverSocket.on('error', (err) => console.log('Server socket error:', err.message));
});

server.listen(listenPort, () => {
  console.log(`TCP Proxy listening on port ${listenPort} forwarding to ${targetHost}:${targetPort}`);
});
