import {NextPage} from 'next'
import React, {Suspense} from 'react'
import {ModalProvider} from '@caredoc/utils-web'
import {Loading} from '@caredoc/templates-web'
import Layout from '../../../templates/layouts/Layout'
import ReceptionsBillingsView from '../../../views/receptions-billings'
import useReceptionIdFromRouterQuery from '../../../hooks/use-reception-id-from-router-query'

const ReceptionsBillingsPage: NextPage = () => {
  const receptionId = useReceptionIdFromRouterQuery()

  return (
    <ModalProvider>
      <Layout currentPage="RECEPTION">
        <Suspense fallback={<Loading />}>
          <ReceptionsBillingsView receptionId={receptionId} />
        </Suspense>
      </Layout>
    </ModalProvider>
  )
}

export default ReceptionsBillingsPage
