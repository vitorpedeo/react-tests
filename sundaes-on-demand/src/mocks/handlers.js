import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:3030/scoops', (request, response, context) => {
    return response(
      context.json([
        {
          name: 'Chocolate',
          imagePath: '/images/chocolate.png',
        },
        {
          name: 'Vanilla',
          imagePath: '/images/vanilla.png',
        },
      ]),
    );
  }),
  rest.get('http://localhost:3030/toppings', (request, response, context) => {
    return response(
      context.json([
        {
          name: 'Cherries',
          imagePath: '/images/cherries.png',
        },
        {
          name: 'M&Ms',
          imagePath: '/images/m-and-ms.png',
        },
        {
          name: 'Hot fudge',
          imagePath: '/images/hot-fudge.png',
        },
      ]),
    );
  }),
  rest.post('http://localhost:3030/order', (request, response, context) => {
    return response(
      context.json({
        orderNumber: Math.floor(Math.random() * 10000000000),
      }),
    );
  }),
];
