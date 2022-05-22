import { Container, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React from 'react'
import ContractBalanceCard from '../components/ContractBalanceCard'
import ReentrancyAttacker from '../components/ReentrancyAttacker'

type Props = {}

function reentrancy({}: Props) {
  const router = useRouter();
  
  return (
    <div className='flex h-screen'>
      <div onClick={() => {router.push('/')}} className='back-to-home bg-[#9BDF46]'>
        <div className='mx-auto text-[#346473]'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <br />
          <Text weight="bold" color='#346473'>Back to home</Text>
        </div>
      </div>
      <div className='bg-[#346473] w-full h-screen overflow-y-hidden'>
        <Text h1 weight="bold" size={46} transform="uppercase" color="#EAEFC4" className='text-center'>
          Reentrancy
        </Text>
        <Container className='grid grid-cols-1 md:grid-cols-2' style={{height: '-webkit-fill-available'}}>
            <div className='flex items-center'>
                <ContractBalanceCard />
            </div>
            <div className='flex items-center'>
                <ReentrancyAttacker />
            </div>
        </Container>
      </div>
    </div>
  )
}

export default reentrancy