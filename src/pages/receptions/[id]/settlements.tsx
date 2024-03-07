import {NextPage} from 'next'
import React, {Suspense} from 'react'
import {ModalProvider} from '@caredoc/utils-web'
import {Loading} from '@caredoc/templates-web'
import Layout from '../../../templates/layouts/Layout'
import ReceptionsSettlementsView from '../../../views/receptions-settlements'
import useReceptionIdFromRouterQuery from '../../../hooks/use-reception-id-from-router-query'

const ReceptionsSettlementsPage: NextPage = () => {
  const receptionId = useReceptionIdFromRouterQuery()

  return (
    <ModalProvider>
      <Layout currentPage="RECEPTION">
        <Suspense fallback={<Loading />}>
          <ReceptionsSettlementsView receptionId={receptionId} />
        </Suspense>
      </Layout>
    </ModalProvider>
  )
}

export default ReceptionsSettlementsPage
