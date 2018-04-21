function list() {
  return fetch('/api/v1/songs').then((response)  => {
    return response.json().then((body) => {
      // if (response.status !== 200) throw Error(body.message);
      return body;
    });
  }).catch((err) => {

    console.log('error');
  })

}

module.exports = {
  list
}
