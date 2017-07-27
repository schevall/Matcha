const socketGate = users => (socket) => {
  const { username } = socket.decoded_token;
  const socketId = socket.id;
  if (!username) console.log('Trouble maker', socket.decoded_token);
  if (username) users.push({ socketUser: username, socketId });
  console.log(`user connected : ${username}, id : ${socketId}`);
  console.log('current array', users);

  socket.on('disconnect', () => {
    console.log(`user disconnected : ${username}, id : ${socketId}`);
    users.splice(users.indexOf(username), 1);
  });

  socket.on('login', (socketUser) => {
    const msg = `${socketUser} is now connected !`;
    socket.broadcast.emit('logged', msg);
  });
};

export default socketGate;
