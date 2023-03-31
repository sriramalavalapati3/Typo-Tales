const users = [];

function User(id, username, roomvalue) {
  const user = { id, username, roomvalue };
  users.push(user);
  console.log(users);
  return user;
}

function user_details(id, totalWordsCount) {
  let i = 0;
  const filtered_user = users.filter((element, index) => {
    if (element.id == id) {
      i = index;
      return element;
    }
  });
  filtered_user[0].wordCount = totalWordsCount;
  users[i] = filtered_user[0];
}

module.exports = { User, user_details };
