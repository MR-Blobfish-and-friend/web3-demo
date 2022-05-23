import React from 'react'
import { Card, Input, Text } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

type Props = {
  balance: number,
  onTransfer: () => void,
  onInputChange: (key: string, value: string) => void,
  transferInput: any
}

function ReentrancyUser({balance, onTransfer, transferInput, onInputChange}: Props) {
  return (
    <Card className="md:w-auto w-full bg-[#251D3A] p-5 w-fit mx-auto">
      <Text h3 weight="bold" size={20} transform="uppercase" color="#FF7700" className='text-center'>
        User balance in Contract
      </Text>
      <Text h2 weight="extrabold" size={40} color="#FF7700" className='text-center'>
          {balance} Wei
      </Text>
      <Input className='input-overflow' label="Number of receiver" type="number" placeholder="1" onChange={(e) => {onInputChange('cnt', e.target.value)}} value={transferInput.cnt}/>
      <Input className='input-overflow' label="Amount to transfer" type="number" placeholder="ETH" onChange={(e) => {onInputChange('_value', e.target.value)}} value={transferInput._value}/>
      <Button onClick={onTransfer} className='bg-[#FF7700] mt-2'>Transfer</Button>
    </Card>
  )
}

export default ReentrancyUser