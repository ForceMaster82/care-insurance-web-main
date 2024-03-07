/* eslint-disable no-alert */
import {NextPage} from 'next'
import React from 'react'
import {useRouter} from 'next/router'
import {SubmitErrorHandler, SubmitHandler} from 'react-hook-form'
import {useQueryClient} from '@tanstack/react-query'
import ReceptionsRegistrationView from '../../views/receptions-registration'
import useReceptionCreate from '../../hooks/api/reception/use-reception-create'
import useCoverageList from '../../hooks/api/coverage/use-coverage-list'
import {getInternalCaregivingManagerIdFromToken} from '../../utils/manage-token'
import useReceptionApplicationCreate from '../../hooks/api/reception/use-reception-application-create'
import {RECEPTIONS_PATH} from '../../constants/route-paths'
import Layout from '~templates/layouts/Layout'
import {ReceptionCreateData} from '~types/form'
import {getFirstFormError} from '~utils/form'
import ReceptionCreateInput from '~models/dto/reception/CreateInput'

const ReceptionsRegistrationPage: NextPage = () => {
  const router = useRouter()

  const {mutate: registerReception} = useReceptionCreate()
  const {mutate: uploadApplicationFile} = useReceptionApplicationCreate()
  const coverages = useCoverageList()

  const queryClient = useQueryClient()

  const handleOnSubmit =
    (applicationFile?: File | null): SubmitHandler<ReceptionCreateData> =>
    (data) => {
      const input = new ReceptionCreateInput()
      input.data = {
        ...data,
        registerManagerInfo: {
          ...input.data.registerManagerInfo,
          managingUserId: getInternalCaregivingManagerIdFromToken(),
        },
      }

      registerReception(
        {
          payload: input.input,
        },
        {
          onSuccess: (response) => {
            const location = response.headers.get('Location') || ''
            const receptionId = location
              .split(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/receptions/`)
              .at(1)

            if (applicationFile && receptionId) {
              const formData = new FormData()

              formData.append(
                'reception-application-file',
                applicationFile,
                applicationFile.name,
              )

              uploadApplicationFile(
                {
                  pathParams: {receptionId},
                  payload: formData,
                },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: ['reception-modification', {receptionId}],
                    })
                  },
                },
              )
            }

            receptionId && router.push(RECEPTIONS_PATH.DETAIL(receptionId))
          },
        },
      )
    }

  const handleOnSubmitError: SubmitErrorHandler<ReceptionCreateData> = (
    errors,
  ): void => {
    const firstError = getFirstFormError(errors)
    if (firstError) {
      firstError?.ref?.focus?.()
      const errorMessage = firstError.message
      alert(errorMessage)
    }
  }

  const handleOnCancel = (isFormDirty: boolean): void => {
    let cancelRequested = false

    if (isFormDirty) {
      cancelRequested = confirm('작성 중인 내용이 있습니다.\n취소하시겠습니까?')
    }

    if (!isFormDirty || cancelRequested) {
      router.back()
    }
  }

  return (
    <Layout currentPage="RECEPTION">
      <ReceptionsRegistrationView
        coverages={coverages}
        onCancel={handleOnCancel}
        onInvalid={handleOnSubmitError}
        onValid={handleOnSubmit}
      />
    </Layout>
  )
}

export default ReceptionsRegistrationPage
