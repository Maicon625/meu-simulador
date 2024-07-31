const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { ticker } = event.queryStringParameters;
  const API_KEY = process.env.FINNHUB_API_KEY;
  try {
    const response = await fetch(`https://finnhub.io/api/v1/quote?symbol=${ticker}&token=${cq290e1r01ql95nckn9gcq290e1r01ql95nckna0}`);
    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error fetching stock price',
    };
  }
};
