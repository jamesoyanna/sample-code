import React from 'react';
import { useTranslation } from 'react-i18next';
import { BiCheck } from 'react-icons/bi';

// Destructure the "step" and "checkout" props
const TransactionSteps = ({ step, checkout }) => {
  // Destructure the "t" function from the useTranslation hook
  const { t } = useTranslation();

  // Render the transaction steps
  return (
    <div className="transaction-steps">
      {/* Only show the "Amount" step if "checkout" is false */}
      {!checkout && (
        <div className={`single-step ${step === 1 ? 'active' : ''}`}>
          {/* Show the checkmark icon if the step is complete */}
          {step === 1 ? <span /> : <span><BiCheck /></span>}
          {/* Translate the "Amount" text */}
          {t('Amount')}
        </div>
      )}

      {/* Show the "Review" step */}
      <div className={`single-step ${step === 2 ? 'active' : ''}`}>
        {/* Show the checkmark icon if the step is complete */}
        {step === 1 || step === 2 ? <span /> : <span><BiCheck /></span>}
        {/* Translate the "Review" text */}
        {t('Review')}
      </div>

      {/* Show the "Success" step */}
      <div className={`single-step ${step === 3 ? 'active' : ''}`}>
        {/* Show the checkmark icon if the step is complete */}
        {step === 3 ? <span><BiCheck /></span> : <span />}
        {/* Translate the "Success" text */}
        {t('Success')}
      </div>
    </div>
  );
};

// Export the TransactionSteps component
export default TransactionSteps;