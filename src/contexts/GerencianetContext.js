import React, { createContext, Component } from 'react';

/**services Gerencianet*/
import GerencianetAPI from '../services/GerencianetAPI';
import PayTokenGN from '../services/PayTokenGn';
import { apiURL, initCheckout } from '../services/GerencianetAPI';
const moment = require('moment');
export const GerencianetContext = createContext();

class GerencianetContextProvider extends Component {
  state = {
    customer: {},
    register: {},
    repeats: null,
    plans: [
      {
        id: 1,
        title: 'Vip',
        description:
          'Esse plano é válido por 1 ano (12 meses) a contar da confirmação do pagamento. A cobrança será feita mensalment no valor de R$ 25,00.',
        subTitle: 'Tenha acesso completo',
        price: '25,00',
        feature: [
          'Até 200 resultados por busca',
          'Até 200 resultados de filmes por categoria',
          'Todos Atores a disposição',
          '15 papéis de parede e 15 posters',
          'Ouça mais de 30 trilhas no spotify',
        ],
        banner: '/images/banners/plan-luxo.svg',
      },
      {
        id: 2,
        title: 'Fashion',
        description:
          'Esse plano é válido por 1 ano (12 meses) a contar da confirmação do pagamento. A cobrança será feita mensalment no valor de R$ 15,00.',
        subTitle: 'Tenha acesso parcial',
        price: '15,00',
        feature: [
          'Até 100 resultados por busca',
          'Até 100 resultados de filmes por categoria',
          '10 Atores',
          '10 papéis de parede e 10 posters',
          'Ouça até 30 trilhas no spotify',
        ],
        banner: '/images/banners/plan-vip.svg',
      },
      {
        id: 3,
        title: 'Light',
        description:
          'Para você sentir o gostinho do que Busqu=Filme pode lhe proporcionar. Faça buscas, veja os atores e baixe porster e papéis de parede. Aroveite!',
        subTitle: 'Aproveite',
        price: 'Grátis',
        feature: [
          'Até 20 resultados por busca',
          'Até 20 resultados por categoria',
          'Até 3 Atores',
          '2 papéis de parede e 3 posters',
          'Ouça até 20 trilhas no spotify',
        ],
        banner: '/images/banners/plan-free.svg',
      },
    ],
    subscription: {},
    plan: {},
    pay: {},
    alert: {
      error: false,
      message: {
        type: null,
        value: null,
      },
    },
  };
  getPayToken = async () => {
    return await PayTokenGN();
  };

  getPlan = (name) => {
    const plan = this.state.plans.filter((element) => element.name === name);
    return plan[0];
  };
  
  register = (register, repeats) => {
    //first register client and then make proccess
    const endPointRegister = 'customer/register';
    try {
      return GerencianetAPI.post(apiURL + endPointRegister, register)
        .then((res) => {
          if (!res.data.error) {
            this.setState({
              customer: res.data.customer,
              repeats: repeats,
            });
          } else {
            if (res.data.customer) {
              this.setState({
                customer: res.data.customer,
                repeats: repeats,
              });
            } else {
              return {
                error: true,
                message: res.data.message,
              };
            }
          }
          console.log(res.data);
          return res.data;
        })
        .then((value) => {
          return value;
        });
    } catch (error) {
      return {
        error: true,
        message: {
          type: 'warning',
          value: error.message,
        },
      };
    }
  };

  checkout = async (plan_name, typePay) => {
    const payBody = this.getPayBody(typePay),
      currentPlan = this.getPlan(plan_name),
      { createPlan, createSubscription, createPay } = initCheckout();
    return await createPlan(currentPlan)
      .then((res) => {
        if (res.status === 200) {
          if (!res.data.error) {
            const newPlan = res.data.data;
            this.setState({
              plan: newPlan,
            });
            return {
              error: false,
            };
          } else {
            return {
              error: true,
            };
          }
        }
      })
      .then((status) => {
        if (!status.error) {
          return createSubscription(
            this.state.plan.name,
            this.state.plan.plan_id,
            currentPlan,
            this.state.customer._id
          )
            .then((res) => {
              if (res.status === 200) {
                if (!res.data.error) {
                  const newSub = res.data.data;
                  this.setState({
                    subscription: newSub,
                  });
                  return {
                    error: false,
                  };
                } else {
                  return {
                    error: true,
                  };
                }
              }
            })
            .then((status) => {
              if (!status.error) {
                return createPay(
                  payBody,
                  this.state.subscription.subscription_id
                ).then((res) => {
                  /**
                   * 
                   data:
                      data:
                      barcode: "00000.00000 00000.000000 00000.000000 0 00000000000000"
                      charge: {id: 1036769, status: "waiting", parcel: 1, total: 30000}
                      expire_at: "2020-05-24"
                      first_execution: "14/05/2020"
                      link: "https://visualizacaosandbox.gerencianet.com.br/emissao/13195_13_CORLE9/A4XB-13195-755315-BOXI4"
                      payment: "banking_billet"
                      pdf: {charge: "https://download.gerencianet.com.br/13195_13_CORLE9/13195-755315-BOXI4.pdf?sandbox=true"}
                      plan: {id: 6464, interval: 1, repeats: null}
                      status: "active"
                      subscription_id: 42405
                      total: 30000
                      error: false
                   */
                  if (res.status === 200) {
                    if (!res.data.error) {
                      const newPay = res.data.data;
                      this.setState({
                        pay: newPay,
                      });
                      return {
                        error: false,
                        data: res.data.data,
                      };
                    }
                  }
                });
              }
            });
        }
      });
  };

  //verif form payment
  getPayBody = (typePay) => {
    if (typePay === 'banking_billet') {
      return {
        payment: {
          banking_billet: {
            expire_at: moment().add(10, 'days').format('YYYY-MM-DD'),
            customer: {
              name: this.state.customer.name,
              email: this.state.customer.email,
              cpf: this.state.customer.cpf,
              birth: this.state.customer.birth,
              phone_number: this.state.customer.phone_number,
            },
          },
        },
      };
    } else {
      const paymentToken = JSON.parse(
        window.localStorage.getItem('cardConfig')
      );
      return {
        payment: {
          credit_card: {
            payment_token: paymentToken._token,
            billing_address: this.state.customer.address,
            customer: {
              name: this.state.customer.name,
              email: this.state.customer.email,
              cpf: this.state.customer.cpf,
              birth: this.state.customer.birth,
              phone_number: this.state.customer.phone_number,
            },
          },
        },
      };
    }
  };

  /*  */
  render() {
    return (
      <GerencianetContext.Provider
        value={{
          ...this.state,
          register: this.register,
          getPlan: this.getPlan,
          getPayToken: this.getPayToken,
          checkout: this.checkout,
        }}
      >
        {this.props.children}
      </GerencianetContext.Provider>
    );
  }
}

export default GerencianetContextProvider;
