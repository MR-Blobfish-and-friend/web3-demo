import React from 'react'
import { Button, Card, Text } from "@nextui-org/react";
type Props = {
  balance: number
  topup: any,
  isInitSuccess: boolean
}

function ContractBalanceCard({balance, topup, isInitSuccess}: Props) {
  return (
    <Card className="md:w-fit w-full bg-[#EAEFC4] p-5 mx-auto">
      <Text h3 weight="bold" size={20} transform="uppercase" color="#346473aa" className='text-center'>
          Balance in smart Contracts
      </Text>
      <Text h2 weight="extrabold" size={40} color="#346473" className='text-center'>
          {balance} Wei
      </Text>
      <Button className='bg-[#25A55F]' onPress={() => topup()} disabled={!isInitSuccess}>TopUp</Button>
    </Card>
  )
}

export default ContractBalanceCard