let customerAddress = {};
const urlCorreio = 'https://viacep.com.br/ws';

export const UserAddress = async (code) => {
  return await fetch(`${urlCorreio}/${code}/json/`).then((res) => {
    if (res.status === 200 && res.statusText === 'OK') {
      return res.json().then((address) => {
        customerAddress.suburb = address.bairro;
        customerAddress.street = address.logradouro;
        customerAddress.city = address.localidade;
        customerAddress.state = address.uf;
        return customerAddress;
      });
    }
  });
};
