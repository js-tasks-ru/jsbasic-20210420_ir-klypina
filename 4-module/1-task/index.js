function makeFriendsList(friends) {
  let list = document.createElement('ul');

  for (const friend of friends) {
    let element = document.createElement('li');
    element.innerText = `${friend.firstName} ${friend.lastName}`
    list.append(element);
  }

  return list;
}
