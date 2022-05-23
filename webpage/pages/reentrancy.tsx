import { Container, Text } from '@nextui-org/react'
import { Contract, ethers, utils } from 'ethers'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ContractBalanceCard from '../components/ContractBalanceCard'
import Loader from '../components/Loader'
import ReentrancyAttacker from '../components/ReentrancyAttacker'
import abi_atk from "../contracts/abi-reentrancy-atk.json";
import abi_vuln from "../contracts/abi-reentrancy-vuln.json";

type Props = {}

function reentrancy({}: Props) {
  const router = useRouter();
  const [attackerBalance, setAttackerBalance] = useState(0);
  const [contractBalance, setContractBalance] = useState(0);
  const [contractVuln, setContractVuln] = useState<Contract>();
  const [contractAtt, setContractAtt] = useState<Contract>();
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [isInitSuccess, setIsInitSuccess] = useState(false);
  const [isProcess, setIsProcess] = useState(false);

  useEffect(() => {
    initContract();
  }, []);
  useEffect(() => {
    fetchContractBalance();
    fetchAttackerBalance();
  }, [provider])

  let contract_att: Contract;

  const initContract = async () => {
    if (window.ethereum) {
      let temp_provider = new ethers.providers.Web3Provider(window.ethereum);
      await temp_provider.send("eth_requestAccounts", []);

      if(process.env.NEXT_PUBLIC_VUL_CONTRACT_ADDR){
        setContractVuln(
          new ethers.Contract(
            process.env.NEXT_PUBLIC_VUL_CONTRACT_ADDR,
            abi_vuln,
            temp_provider.getSigner()
          )
        )
      }

      if(process.env.NEXT_PUBLIC_ATTACKER_CONTRACT_ADDR){
        setContractAtt(
          new ethers.Contract(
            process.env.NEXT_PUBLIC_ATTACKER_CONTRACT_ADDR,
            abi_atk,
            temp_provider.getSigner()
          )
        )
      }

      // update init state
      setProvider(temp_provider);
      setIsInitSuccess(true);
    }
    else{
      console.log('Window.ethereum not found')
    }
  };

  const fetchContractBalance = async () => {
    if(provider !== undefined && process.env.NEXT_PUBLIC_VUL_CONTRACT_ADDR !== undefined){
      setContractBalance((await provider.getBalance(process.env.NEXT_PUBLIC_VUL_CONTRACT_ADDR)).toNumber())
    }
  }

  const fetchAttackerBalance = async () => {
    if(provider !== undefined && process.env.NEXT_PUBLIC_ATTACKER_CONTRACT_ADDR !== undefined){
      setAttackerBalance((await provider.getBalance(process.env.NEXT_PUBLIC_ATTACKER_CONTRACT_ADDR)).toNumber())
    }
  }

  const topUpVulnContract = async () => {
    try{
      if(contractVuln !== undefined){
        setIsProcess(true)
        const tx = await contractVuln.deposit({ value: 2000 });
        //txHash.value = tx.hash
        await tx.wait();
        await fetchContractBalance();
        await fetchAttackerBalance();
        setIsProcess(false)
      }
    }
    catch(e){
      setIsProcess(false)
      throw(e);
    }
  }

  const attack = async () => {
    try{
      if(contractAtt !== undefined){
        setIsProcess(true)
        const tx = await contractAtt.attack({value: 4000, gasLimit: 300000});
        //txHash.value = tx.hash
        await tx.wait();
        await fetchContractBalance();
        await fetchAttackerBalance();
        setIsProcess(false)
      }
    }
    catch(e){
      setIsProcess(false)
      throw(e);
    }
  }

  return (
    <div className='flex h-screen'>
      {
        isProcess? <Loader /> : <></>
      }

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
                <ContractBalanceCard balance={contractBalance} topup={topUpVulnContract} isInitSuccess={isInitSuccess}/>
            </div>
            <div className='flex items-center'>
                <ReentrancyAttacker balance={attackerBalance} isInitSuccess={isInitSuccess} attack={attack}/>
            </div>
        </Container>
      </div>
    </div>
  )
}

export default reentrancy