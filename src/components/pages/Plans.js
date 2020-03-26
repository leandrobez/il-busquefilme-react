import React, { Component } from 'react';
import { create } from '../../services/gerencianetAPI';
export default class Plans extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
            'Ouça mais de 30 trilhas no spotify'
          ],
          banner: '/images/banners/plan-luxo.svg'
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
            'Ouça até 30 trilhas no spotify'
          ],
          banner: '/images/banners/plan-vip.svg'
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
            'Ouça até 20 trilhas no spotify'
          ],
          banner: '/images/banners/plan-free.svg'
        }
      ]
    };
  }

  assigned = (e, id) => {
    e.preventDefault();
    const plan = this.state.plans.find(plan => plan.id === id);

    const body = {
      name: plan.title,
      repeats: null,
      interval: 1
    };
    const newPlan = create(body);
    console.log(newPlan);
  };
  render() {
    const plans = () => {
      return this.state.plans.map(plan => (
        <div className="il-plan--item" key={'plan-' + plan.id}>
          <div
            className="il-plan--poster"
            style={{ backgroundImage: 'url(' + plan.banner + ')' }}
          ></div>
          <div className="il-plan--header">
            <h4 className="il-text-color--light">{plan.title}</h4>
            <h6 className="il-text-color--light">{plan.subTitle}</h6>
          </div>
          <div className="il-plan--body">
            <span className="il-price">{plan.price}</span>
            <p className="il-text-color--dark">{plan.description}</p>
            <h6>Benefícios</h6>
            <ul className="il-feature">
              {plan.feature.map((item, index) => (
                <li key={'feature-' + plan.id + '-' + index}>
                  <span className="il-text-color--dark">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="il-plan--footer">
            <button
              className="il-btn il-btn--card"
              onClick={e => this.assigned(e, plan.id)}
            >
              Assinar
            </button>
          </div>
        </div>
      ));
    };
    return (
      <section className="il-section">
        <h2 className="il-section--title il-text-color--medium-dark">Plans</h2>
        <div className="il-plans">{plans()}</div>
      </section>
    );
  }
}
