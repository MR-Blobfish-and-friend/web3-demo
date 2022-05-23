import { Container, Text } from '@nextui-org/react'
import { ethers, utils } from 'ethers'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ContractBalanceCard from '../components/ContractBalanceCard'
import ReentrancyAttacker from '../components/ReentrancyAttacker'
import abi_atk from "../contracts/abi-reentrancy-atk.json";
import abi_vuln from "../contracts/abi-reentrancy-vuln.json";

type Props = {}

function reentrancy({}: Props) {
  const router = useRouter();
  const [attackerBalance, setAttackerBalance] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);

  useEffect(() => {
    initContract();
    fetchContractBalance();
    fetchAttackerBalance();
  }, []);

  let contract_vuln: any;
  let contract_att: any;
  let provider: ethers.providers.Web3Provider;

  const initContract = async () => {
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);

      contract_vuln = new ethers.Contract(
        "0xf3E0e3f53c313bA17529C617B61C826d71dEE2A1",
        abi_vuln,
        provider.getSigner()
      );

      contract_att = new ethers.Contract(
        "0xC0e1992B2A86DEbaFa9aae4978e6316292D666a7",
        abi_atk,
        provider.getSigner()
      );
    }
  };

  const fetchContractBalance = async () => {
    setContractBalance((await provider.getBalance("0xf3E0e3f53c313bA17529C617B61C826d71dEE2A1")).toNumber())
  }

  const fetchAttackerBalance = async () => {
    setAttackerBalance((await provider.getBalance("0xC0e1992B2A86DEbaFa9aae4978e6316292D666a7")).toNumber())
  }

  const topUpVulnContract = async () => {
    const tx = await contract_vuln.deposit({ value: 2000 });
    console.log("tx", tx);

    //txHash.value = tx.hash
    await tx.wait();
  }

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
                <ContractBalanceCard balance={contractBalance} topup={topUpVulnContract} />
            </div>
            <div className='flex items-center'>
                <ReentrancyAttacker balance={attackerBalance} />
            </div>
        </Container>
      </div>
    </div>
  )
}

export default reentrancy