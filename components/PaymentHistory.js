import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Pagination from 'react-js-pagination';
import usePayments from '../../data/usePayments';
import statusColor from '../../utils/statusColor';

const PaymentHistory = () => {
  const [page, setPage] = useState(1); // Set default page number to 1
  const { data } = usePayments(page, 10); // Fetch payments data with page and limit parameters
  const { t } = useTranslation(); // Get translation function from react-i18next

  return (
    <>
      {/* Render payment history table */}
      <Table striped hover className="dark-color" responsive>
        <thead>
          <tr>
            <th scope="col">{t('Date')}</th>
            <th scope="col">{t('Status')}</th>
            <th scope="col">{t('Merchant')}</th>
            <th scope="col">{t('Trx ID')}</th>
            <th scope="col">{t('Amount')}</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((history) => (
            <tr key={history?.id}>
              {/* Render payment date */}
              <td><span>{dayjs(history?.createdAt).format('DD/MM/YYYY')}</span></td>
              {/* Render payment status */}
              <td>
                <strong
                  style={{ textTransform: 'capitalize' }}
                  className={`status ${statusColor(history?.status)}`}
                >
                  {t(history?.status)}
                </strong>
              </td>
              {/* Render payment merchant */}
              <td>
                <strong>
                  {history?.merchant}
                </strong>
              </td>
              {/* Render payment transaction ID */}
              <td>
                <strong>
                  {history?.trxId}
                </strong>
              </td>
              {/* Render payment amount */}
              <td>
                <strong className="cl-red">
                  -
                  {history?.amount}
                  {' '}
                  {history?.currency}
                </strong>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Render pagination component */}
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={data?.count || 10} // Use default value of 10 if data.count is not available
        pageRangeDisplayed={10}
        onChange={(pageNumber) => setPage(pageNumber)}
        itemClass="page-item"
        linkClass="page-link"
      />
    </>
  );
};

export default PaymentHistory;
