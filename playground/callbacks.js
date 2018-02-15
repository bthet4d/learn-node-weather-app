var getUser = (id, callback) => {
  var user = {
    name: 'Bryan',
    id: id
  }
  setTimeout(() =>{
    callback(user);
  }, 3000)
}

getUser(31, (user) => {
  console.log(user);
});
