const gerencianetSDK = require('gn-api-sdk-node');

const optionsSDK = {
  client_id: process.env.REACT_APP_GNCLIENT_ID,
  client_secret: process.env.REACT_APP_GNCLIENT_SECRET,
  sandbox: true
};

const GerenciaNet = new gerencianetSDK(optionsSDK);

export const create = async body => {
  const plan = await GerenciaNet.createPlan({}, body)
    .then(res => {
      return res;
    })
    .catch(err => {
      console.log(err);
    });

  return plan;
};
