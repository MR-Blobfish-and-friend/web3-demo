import React from 'react'
import { Card, Text } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

type Props = {}

function ContractBalanceCard({}: Props) {
  return (
    <Card className="md:w-auto w-full bg-[#EAEFC4] p-5 w-fit mx-auto">
      <Text h3 weight="bold" size={20} transform="uppercase" color="#346473aa" className='text-center'>
        Balance in Attacker wallet
      </Text>
      <Text h2 weight="extrabold" size={40} color="#346473" className='text-center'>
          100 ETH
      </Text>
      <Button className='bg-[#25A55F]'>Attack</Button>
    </Card>
  )
}

export default ContractBalanceCard