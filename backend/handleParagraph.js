let groups = {};

function handleParagraph(groupID) {
  if (groups[groupID]) {
    return true;
  } else {
    return false;
  }
}

// function deleteRoooID(roupID) {
//   if (groups[groups].member.length === 3) {
//     delete groups[roupID];
//   }
//   return;
// }
module.exports = { groups, handleParagraph };
