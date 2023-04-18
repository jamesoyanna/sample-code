/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useTranslation } from 'react-i18next';
import {
  BiCheckCircle, BiLeftArrowAlt, BiRightArrowAlt
} from 'react-icons/bi';
import { useRequestByTrx } from '../../data/useRequests';
import checkoutRequest from '../../lib/checkoutRequest';
import Loader from '../Loader';

// Define a component for a single step of the checkout process
const CheckoutStep = ({ step, setStep, trx }) => {
  // Initialize state for the action loader
  const [actionLoader, setActionLoader] = useState(false);

  // Fetch transaction data and loading state using a custom hook
  const { data, loading } = useRequestByTrx(trx);

  // Initialize translation function
  const { t } = useTranslation();

  // Define function to handle form submission
  const handleSubmit = () => {
    checkoutRequest({
      trxIdCheckout: trx,
    }, setActionLoader, setStep);
  };

  // Show loading spinner if data is still being fetched
  if (loading) {
    return <Loader />;
  }

  // If transaction status is not pending, show error message
  if (!(data?.status === 'pending')) {
    return (
      <>
        <div className="transaction-review">
          <p>{t('This transaction is not valid')}</p>
        </div>
      </>
    );
  }

  // If current step is 2, show transaction details and pay button
  if (step === 2) {
    return (
      <>
        <div className="transaction-review">
          <h2>{data?.merchant?.name}</h2>
          <p>{data?.merchant?.address}</p>
          <Table striped hover responsive className="dark-color">
            <tbody>
              <tr>
                <td>{t('Merchant ID')}</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {data?.merchant?.merId}
                </td>
              </tr>
              <tr>
                <td>{t('TRX ID')}</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {data?.trxId}
                </td>
              </tr>
              <tr>
                <td>{t('Amount')}</td>
                <td style={{ color: 'white', fontWeight: 'bold' }}>
                  {data?.amount}
                  {' '}
                  {data?.currency}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="bttns mt-30">
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="bttn-mid btn-grey mr-10"
          >
            <BiLeftArrowAlt />
            {t('Back')}
          </button>
          {/* Show pay button with spinner if payment is being processed */}
          <button
            type="button"
            onClick={() => handleSubmit()}
            className="bttn-mid btn-ylo"
            disabled={actionLoader}
          >
            {actionLoader ? (
              <>
                <Spinner animation="border" role="status" size="sm" />
                {' '}
                {t('Processing')}
              </>
            ) : (
              <>
                <BiRightArrowAlt />
                {t('Pay')}
              </>
            )}
          </button>
          <p className="mt-10 mb-0">
            {t('For any query please contact at')}
            :
            {' '}
            <a href={`mailto:${data?.merchant?.email}`}>{data?.merchant?.email}</a>
          </p>
        </div>
      </>
    );
  } if (step === 3) {
    return (
      <div className="transaction-success">
        <BiCheckCircle color="green" size={70} />
        <h2>
          {t('Payment Successful')}
        </h2>
        <p>
          {data?.amount}
          {' '}
          {data?.currency}
          {' '}
          {t('sent to')}
          {' '}
          {data?.merchant?.name}
        </p>
      </div>
    );
  }
  return <></>;
};

export default CheckoutStep;