import { Container, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import OverflowUser from '../components/OverflowUser'
import ReentrancyAttacker from '../components/ReentrancyAttacker'
import StateInContractCard from '../components/StateInContractCard'
import { ethers, utils } from "ethers";
import abi from "../contracts/abi.json";

type Props = {}

function overflow({}: Props) {
  const router = useRouter();
  
  useEffect(() => {
    initContract();
  }, []);

  let contract: any;
  const initContract = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const account = await provider.getSigner().getAddress();

      contract = new ethers.Contract(
        "0x07dE81c28f0E2ab03e02719B46DE527AEDA1C997",
        abi,
        provider.getSigner()
      );
      console.log("receiver", await contract.balance);
    }
  };

  const deposit = async () => {
    const tx = await contract.deposit({ value: 1000 });
    console.log("tx", tx);

    //txHash.value = tx.hash
    await tx.wait();
    console.log("balance", await contract.balance);
    console.log("balance", await contract);
    // window.location.reload()
  };

  return (
    <div className='flex h-screen'>
      <div onClick={() => {router.push('/')}} className='back-to-home bg-[#2A2550]'>
        <div className='mx-auto text-[#E04D01]'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <br />
          <Text weight="bold" color='#E04D01'>Back to home</Text>
        </div>
      </div>
      <div className='bg-[#251D3A] w-full h-screen overflow-y-hidden'>
        <Text h1 weight="bold" size={46} transform="uppercase" color="#EAEFC4" className='text-center'>
          Integer Overflow / Underflow
        </Text>
        <Container className='grid grid-cols-1 md:grid-cols-2' style={{height: '-webkit-fill-available'}}>
            <div className='flex items-center'>
                <StateInContractCard />
            </div>
            <div className='flex items-center'>
                <OverflowUser />
            </div>
        </Container>
      </div>
    </div>
  )
}

export default overflow