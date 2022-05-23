import { Loading, Text } from '@nextui-org/react'
import React from 'react'

type Props = {}

function Loader({}: Props) {
  return (
    <div className='load-overlay'>
      <Loading />
      <Text h3 className='text-white'>Processing</Text>
    </div>
  )
}

export default Loader