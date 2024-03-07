/* eslint-disable no-magic-numbers */
import {NextApiRequest, NextApiResponse} from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({message: 'Server is running'})
}

export default handler
