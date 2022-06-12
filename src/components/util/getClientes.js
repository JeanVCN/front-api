export function getClients(setClients) {
  fetch("https://facec-webapi-2022.herokuapp.com/clientes", {
    cache: "no-cache",
    method: "GET",
    mode: "cors",
  })
    .then(function (res) {
      console.log(res);
      return res.json();
    })
    .then((data) => {
      setClients(data);
    })
    .catch((err) => console.log(err));
}
