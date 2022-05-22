import React from 'react'
import { Card, Text } from "@nextui-org/react";
type Props = {}

function ContractBalanceCard({}: Props) {
  return (
    <Card className="md:w-auto w-full bg-[#251D3A] p-5 mx-auto">
      <Text h3 weight="bold" size={20} transform="uppercase" color="#FF7700" className='text-center'>
          State In Contract
      </Text>
      <div className='px-2'>
        <Card className='shadow-none my-2' css={{minWidth: "400px", w: "100%"}}>
          <p>A basic card.</p>
        </Card>
        <Card className='shadow-none my-2' css={{minWidth: "400px", w: "100%"}}>
          <p>A basic card.</p>
        </Card>
        <Card className='shadow-none my-2' css={{minWidth: "400px", w: "100%"}}>
          <p>A basic card.</p>
        </Card>
      </div>
    </Card>
  )
}

export default ContractBalanceCard