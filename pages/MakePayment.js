// Import dependencies
import Head from 'next/head';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiErrorCircle, BiWallet } from 'react-icons/bi';
import PaymentHistory from '../components/payment/PaymentHistory';
import PaymentStep from '../components/payment/PaymentStep';
import Sidebar from '../components/Sidebar';
import TabModule from '../components/tabs/TabModule';
import UserTab from '../components/tabs/UserTab';
import TransactionSteps from '../components/TransactionSteps';
import UserHeader from '../components/UserHeader';
import withAuth from '../hoc/withAuth';

// Define the MakePayment component
const MakePayment = ({ userData, settings }) => {
  // Define the state variable for the payment step
  const [step, setStep] = useState(1);

  // Initialize the i18n translation hook
  const { t } = useTranslation();

  return (
    <>
      {/* Head component for SEO */}
      <Head>
        <title>
          {t('Payment')}
          {' '}
          -
          {' '}
          {settings?.site?.param1}
        </title>
        <link rel="icon" href={`${settings?.apiUrl?.param1}/public/${settings?.logo?.param2}`} />
      </Head>
      
      {/* UserHeader component */}
      <UserHeader />
      
      {/* Sidebar component */}
      <Sidebar userData={userData} settings={settings} />
      
      {/* Main content body */}
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              {/* UserTab component for tabs */}
              <UserTab
                title={t('Make Payment')}
                description={t('Make payment to different merchants')}
              >
                {/* TabModule for Make Payment */}
                <TabModule icon={<BiWallet />} name={t('Make Payment')}>
                  <div className="deposit-box basic-card">
                    {/* TransactionSteps component for the payment process */}
                    <TransactionSteps step={step} />
                    {/* PaymentStep component for payment step */}
                    <PaymentStep step={step} setStep={setStep} />
                  </div>
                </TabModule>
                {/* TabModule for Payment Logs */}
                <TabModule icon={<BiErrorCircle />} name={t('Payment Logs')}>
                  <div className="basic-card">
                    <h4 className="box-title">{t('Payment Logs')}</h4>
                    {/* PaymentHistory component for payment history */}
                    <PaymentHistory />
                  </div>
                </TabModule>
              </UserTab>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Export the component wrapped with the withAuth higher-order component
export default withAuth(MakePayment);
