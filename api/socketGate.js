const findUser = (users, username) => {
  let found = false;
  for (let i = 0; i < users.length; i += 1) {
    if (users[i].socketUser === username) {
      found = true;
      break;
    }
  }
  return found;
};

const socketGate = users => (socket) => {
  const { username } = socket.decoded_token;
  const socketId = socket.id;
  if (!username) console.log('Trouble maker', socket.decoded_token);
  console.log(`user connected : ${username}, id : ${socketId}`);
  console.log('current array', users);
  if (!findUser(users, username)) {
    users.push({ socketUser: username, socketId });
  }
  console.log('next array', users);

  socket.on('disconnect', () => {
    console.log(`user disconnected : ${username}, id : ${socketId}`);
    const index = users.findIndex(user => (user.socketUser === username));
    users.splice(index, 1);
  });

  socket.on('isUserLogged', (target) => {
    const statement = users.some(el => el.socketUser === target);
    socket.emit(`userIsLogged/${target}`, statement, target);
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
        socket.to(user.socketId).emit(`match/${username}`);
        socket.to(user.socketId).emit('match', username);
      }
    });
  });

  socket.on('unmatch', (target) => {
    console.log(`${username} has unmatched with ${target}`);
    users.forEach((user) => {
      if (user.socketUser === target) {
        socket.to(user.socketId).emit(`unmatch/${username}`);
        socket.to(user.socketId).emit('unmatch', username);
      }
    });
  });
  socket.on('block', (target) => {
    console.log(`${username} has blocked ${target}`);
    users.forEach((user) => {
      if (user.socketUser === target) {
        socket.to(user.socketId).emit(`block/${username}`);
        socket.to(user.socketId).emit('block', username);
      }
    });
  });

  socket.on('unblock', (target) => {
    console.log(`${username} has unblocked ${target}`);
    users.forEach((user) => {
      if (user.socketUser === target) {
        socket.to(user.socketId).emit(`unblock/${username}`);
        socket.to(user.socketId).emit('unblock', username);
      }
    });
  });

  socket.on('message', (target, input) => {
    console.log(`${username} has sent a message to ${target} : ${input}`);
    users.forEach((user) => {
      if (user.socketUser === target) {
        const newMessage = { author: username, date: Date.now(), message: input };
        socket.to(user.socketId).emit(`message/${username}`, newMessage);
        socket.to(user.socketId).emit('message', username);
      }
    });
  });
};

export default socketGate;
