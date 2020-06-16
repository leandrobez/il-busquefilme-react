export const plans = [
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
];

const listPlans = (name) => {
  const plan = plans.filter((element) => element.name === name);
  return plan[0];
};

export default listPlans;
