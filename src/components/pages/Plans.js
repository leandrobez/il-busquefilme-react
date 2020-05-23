import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Plans extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plans: [
        {
          id: 1,
          title: 'Vip',
          description:
            'Esse plano é válido por 1 ano (12 meses) a contar da confirmação do pagamento. A cobrança será feita mensalment no valor de R$ 80,00.',
          subTitle: 'Tenha acesso completo',
          price: 80,
          path: '/vip',
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
            'Esse plano é válido por 1 ano (12 meses) a contar da confirmação do pagamento. A cobrança será feita mensalment no valor de R$ 45,00.',
          subTitle: 'Tenha acesso parcial',
          price: 45,
          path: '/fashion',
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
          path: '/light',
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
    };
  }

  /*lightBox = () => {
    var s = document.createElement('script');
    s.type = 'text/javascript';
    var v = parseInt(Math.random() * 1000000);
    s.src =
      'https://sandbox.gerencianet.com.br/v1/cdn/lightbox/b73a1b070c537a1010c3cca1d6df7092/' +
      v;
    s.async = false;
    s.id = 'b73a1b070c537a1010c3cca1d6df7092';
    if (!document.getElementById('b73a1b070c537a1010c3cca1d6df7092')) {
      document.getElementsByTagName('head')[0].appendChild(s);
    }
    $gn = {
      validForm: true,
      processed: false,
      done: {},
      ready: function(fn) {
        $gn.done = fn;
      }
    };
  };*/
  /* 
  pay = async (register) => {
    const tenDaysFromNow = moment()
      .add(10, 'days')
      .format('YYYY-MM-DD 00:00:00');

    let params = {
        id: this.state.gerencianet.subscription.subscription_id
          ? this.state.gerencianet.subscription.subscription_id
          : 0, // informe o subscription_id
      },
      bodyPayBillet = {
        payment: {
          banking_billet: {
            expire_at: tenDaysFromNow,
            customer: {
              name: register.name,
              email: register.email,
              cpf: register.cpf,
              birth: register.dnasc,
              phone_number: register.clr,
            },
          },
        },
      },
      bodyPayCard = {
        payment: {
          credit_card: {
            payment_token: getPayToken(),
            billing_address: {
              street: register.address.rua_av,
              number: register.address.nr,
              neighborhood: register.address.suburb,
              zipcode: register.address.postcode,
              city: register.address.city,
              state: register.address.uf,
            },
            customer: {
              name: register.name,
              email: register.email,
              cpf: register.cpf,
              birth: register.dnasc,
              phone_number: register.clr,
            },
          },
        },
      },
      endPointPay = 'gerencianet/plan/subscription/pay';
    let newPay, dataPay;
    if (register.pay === 'banking_billet') {
      dataPay = bodyPayBillet;
    } else {
      dataPay = bodyPayCard;
    }
    console.log(dataPay);
    try {
      newPay = api
        .post(apiUrl + endPointPay, { params, dataPay })
        .then((res) => {
          if (res.status === 200) {
            if (!res.error) {
              console.log(res.data);
              return res.data;
            } else {
              return res;
            }
          } else {
            return {
              error: true,
              message: res.message,
            };
          }
        });
      console.log(newPay);
    } catch (error) {}
  };

  subscription = async (plan_id, plan) => {
    const value = plan.price.replace(',00', '') * 100;
    const params = {
      id: plan_id,
    };
    const items = [
      {
        name: 'Inscrição no plano ' + plan.title,
        amount: 1,
        value: value,
      },
    ];
    const metadata = {
      custom_id: this.state.gerencianet.user
        ? this.state.gerencianet.user.id
        : '',
      notification_url: 'http://localhost:3000/gerencianet/plan/notification',
    };
    const endPointSubscription = 'gerencianet/plan/subscription';
    const bodyAssigned = {
      params,
      items,
      metadata,
    };
    let subsc;

    try {
      subsc = await api
        .post(apiUrl + endPointSubscription, bodyAssigned)
        .then((res) => {
          if (res.status === 200) {
            if (!res.error) {
              return res.data;
            }
          }
        });
    } catch (error) {
      return error.message;
    }
    return subsc;
  };

  assigned = async (e, id) => {
    e.preventDefault();
    let _token = '',
      newPlan;
    if (isAuthenticated()) {
      _token = getToken();
    }
    const plan = this.state.plans.find((plan) => plan.id === id),
      bodyPlan = {
        name: plan.title,
        repeats: null,
        interval: 1,
      },
      endPointPlan = 'gerencianet/plan';
    if (_token) {
      try {
        newPlan = await api
          .post(apiUrl + endPointPlan, bodyPlan)
          .then((res) => {
            if (res.status === 200) {
              if (!res.error) {
                return res.data;
              } else {
                return res;
              }
            } else {
              return {
                error: true,
                message: res.message,
              };
            }
          });
      } catch (error) {
        const strWindowFeatures =
          'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';

        setTimeout(() => {
          window.alert('Você precisa se logar ou cadastraar-se. Aguarde...');
          window.open('http://localhost:3000/login', '_top', strWindowFeatures);
        }, 2000);
      }
      //error false
      if (newPlan && !newPlan.error) {
        window.alert(
          'Preencha o formulário a seguir e escolha uma forma de pagamento para continuar.'
        );
        //request subscription
        let subscription = await this.subscription(newPlan.data.plan_id, plan);
        //setState
        let user = getUserAuthenticated();
        this.setState({
          showForm: true,
          gerencianet: {
            user: {
              id: user.id,
              name: user.name,
            },
            plan: newPlan.data,
            subscription: subscription.data,
            register: {
              user_id: user.id,
              name: user.name,
              email: user.email,
              cpf: '',
              dnasc: '',
              ativo: true,
              pay: '',
              address: {
                rua_av: '',
                nr: '',
                complement: '',
                suburb: '',
                postcode: '',
                city: '',
                UF: '',
                fone: '',
                clr: '',
              },
            },
          },
        });
      }
    } else {
      const strWindowFeatures =
        'menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes';

      setTimeout(() => {
        window.alert('faça o login ou se cadastre');
        window.open('http://localhost:3000/login', '_top', strWindowFeatures);
      }, 3000);
    }
  }; */

  plans = () => {
    return this.state.plans.map((plan) => (
      <div className="il-plan--item" key={'plan-' + plan.id}>
        <div className="il-plan--header">
          <h4 className="il-text-color--light">{plan.title}</h4>
          <h6 className="il-text-color--light">{plan.subTitle}</h6>
        </div>
        <div className="il-plan--body">
          <span className="il-price">{plan.price}</span>
          <p>{plan.description}</p>
        </div>
        <div className="il-plan--footer">
          <Link
            to={'/agreement' + plan.path}
            className="il-btn il-btn--plan"
            title={plan.title}
          >
            Assinar
          </Link>
        </div>
      </div>
    ));
  };

  render() {
    return (
      <section className="il-section">
        <h2 className="il-section--title il-text-color--medium-dark">Plans</h2>
        <div className="il-plans">{this.plans()}</div>
      </section>
    );
  }
}
