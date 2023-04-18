import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CheckoutStep from '../components/payment/CheckoutStep';
import TransactionSteps from '../components/TransactionSteps';
import withAuth from '../hoc/withAuth';

const Checkout = () => {
  // initialize state for the checkout step
  const [step, setStep] = useState(2);

  // get the transaction ID from the router
  const router = useRouter();
  const { trx } = router.query;

  // initialize i18n translation hook
  const { t } = useTranslation();

  return (
    <>
      {/* set the page title */}
      <Head>
        <title>
          {t('Checkout')}
        </title>
      </Head>

      {/* render the checkout container */}
      <div className="checkout-cont">
        <div className="container">
          <div className="row">
            <div className="col">
              {/* render the transaction steps */}
              <div className="deposit-box basic-card">
                <TransactionSteps step={step} checkout />

                {/* render the checkout step */}
                <CheckoutStep step={step} setStep={setStep} trx={trx} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// wrap the Checkout component with the withAuth higher-order component
export default withAuth(Checkout);