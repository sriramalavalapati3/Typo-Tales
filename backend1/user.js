const users = [];

function User(id, username, roomvalue) {
  const user = { id, username, roomvalue, userSet: new Set() };
  users.push(user);
  console.log(users);
  return user;
}

function update_word_function(socketID, typedText) {
  let one_user = users.filter((el, ind) => {
    if (el.id == socketID) {
      if (!el.userSet.has(typedText)) {
        el.userSet.add(typedText);
        el.wordCount = el.userSet.size;
      }
      return el;
    }
  });

  // console.log(one_user);
  // console.log(users);
  return one_user;
}

// console.log(one_user);

module.exports = { User, update_word_function };
