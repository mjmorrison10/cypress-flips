import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: '2024-06-20' }) : null;

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  if (!stripe) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Stripe is not configured. Add STRIPE_SECRET_KEY in Netlify environment variables.' })
    };
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const productId = String(body.productId || 'unknown-product');
    const productTitle = String(body.productTitle || 'Cypress Flips Item');
    const productPrice = Number(body.productPrice || 0);
    const minDepositCents = Number(process.env.MIN_DEPOSIT_AMOUNT_CENTS || process.env.DEPOSIT_AMOUNT_CENTS || 1000);
    const depositRate = productPrice >= 500 ? 0.05 : productPrice > 250 ? 0.075 : 0.10;
    const percentageDepositCents = Math.ceil((productPrice * depositRate * 100) / 100) * 100;
    const depositCents = Math.max(minDepositCents, percentageDepositCents);
    const depositAmount = depositCents / 100;
    const origin = event.headers.origin || process.env.URL || 'https://cypressflips.com';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Deposit: ${productTitle}`,
              description: `Cypress Flips local pickup deposit. Item price: $${productPrice.toFixed(2)}. Deposit charged today: $${depositAmount.toFixed(2)}. Remaining balance due at pickup unless otherwise agreed.`
            },
            unit_amount: depositCents
          },
          quantity: 1
        }
      ],
      metadata: {
        productId,
        productTitle,
        productPrice: String(productPrice),
        depositAmount: String(depositAmount.toFixed(2)),
        depositRate: String(depositRate),
        depositType: 'local-pickup-hold'
      },
      success_url: `${origin}/index.html#product=${encodeURIComponent(productId)}&deposit=success`,
      cancel_url: `${origin}/index.html#product=${encodeURIComponent(productId)}&deposit=cancelled`
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: session.url })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Unable to create checkout session.' })
    };
  }
}
