import React from 'react'
import { Card, Text } from "@nextui-org/react";
type Props = {
  balance: number
}

function ContractBalanceCard({balance}: Props) {
  return (
    <Card className="md:w-fit w-full bg-[#EAEFC4] p-5 mx-auto">
      <Text h3 weight="bold" size={20} transform="uppercase" color="#346473aa" className='text-center'>
          Balance in smart Contracts
      </Text>
      <Text h2 weight="extrabold" size={40} color="#346473" className='text-center'>
          {balance} ETH
      </Text>
    </Card>
  )
}

export default ContractBalanceCard