const socketGate = users => (socket) => {
  const { username } = socket.decoded_token;
  const socketId = socket.id;
  if (!username) console.log('Trouble maker', socket.decoded_token);
  console.log(`user connected : ${username}, id : ${socketId}`);

  console.log('current array', users);
  if (username) {
    users.push({ socketUser: username, socketId });
  }
  console.log('next array', users);

  socket.on('disconnect', () => {
    console.log(`user disconnected : ${username}, id : ${socketId}`);
    let index = users.findIndex(user => (user.socketUser === username));
    while (index !== -1) {
      users.splice(index, 1);
      index = users.findIndex(user => (user.socketUser === username));
    }
  });

  socket.on('visit', (target) => {
    console.log(`${username} has visited ${target}`);
    users.forEach((user) => {
      if (user.socketUser === target) {
        socket.to(user.socketId).emit('visit', username);
      }
    });
  });

  socket.on('like', (target) => {

    console.log(`${username} has liked ${target}`);
    users.forEach((user) => {
      if (user.socketUser === target) {
        socket.to(user.socketId).emit('like', username);
      }
    });
  });

  socket.on('unlike', (target) => {
    console.log(`${username} has unliked ${target}`);
    users.forEach((user) => {
      if (user.socketUser === target) {
        socket.to(user.socketId).emit('unlike', username);
      }
    });
  });

  socket.on('match', (target) => {
    console.log(`${username} has matched with ${target}`);
    users.forEach((user) => {
      if (user.socketUser === target) {
        socket.to(user.socketId).emit('match', username);
      }
    });
  });

  socket.on('unmatch', (target) => {
    console.log(`${username} has unmatched with ${target}`);
    users.forEach((user) => {
      if (user.socketUser === target) {
        socket.to(user.socketId).emit('unmatch', username);
      }
    });
  });
};

export default socketGate;
