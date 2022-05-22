import type { NextPage } from 'next'
import { Text } from "@nextui-org/react";
import { useRouter } from 'next/router';
const Home: NextPage = () => {

  // router
  const router = useRouter()
  
  return (
    <div className='flex md:flex-row flex-col w-screen h-screen'>
      <div onClick={() => router.push('/overflow')} className='bg-[#251D3A] homepage-card'>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, #E04D01 , #FF7700 50%",
          }}
          weight="bold"
          className="mx-auto"
        >
          Integer Overflow/Underflow
        </Text>
      </div>
      <div onClick={() => router.push('/reentrancy')} className='bg-[#346473] homepage-card'>
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, #9BDF46 , #EAEFC4 50%",
          }}
          weight="bold"
          className='mx-auto'
        >
          Reentrancy
        </Text>
      </div>
    </div>
  )
}

export default Home
