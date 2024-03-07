import {NextPage} from 'next'
import React, {Suspense} from 'react'
import {ModalProvider} from '@caredoc/utils-web'
import {Loading} from '@caredoc/templates-web'
import Layout from '../../../templates/layouts/Layout'
import ReceptionsDetailView from '../../../views/receptions-detail'
import useReceptionIdFromRouterQuery from '../../../hooks/use-reception-id-from-router-query'

const ReceptionsDetailPage: NextPage = () => {
  const receptionId = useReceptionIdFromRouterQuery()

  return (
    <ModalProvider>
      <Layout currentPage="RECEPTION">
        <Suspense fallback={<Loading />}>
          <ReceptionsDetailView receptionId={receptionId} />
        </Suspense>
      </Layout>
    </ModalProvider>
  )
}

export default ReceptionsDetailPage
