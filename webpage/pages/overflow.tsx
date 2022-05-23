import { Container, Text } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import OverflowUser from '../components/OverflowUser'
import ReentrancyAttacker from '../components/ReentrancyAttacker'
import StateInContractCard from '../components/StateInContractCard'
import { ethers, utils } from "ethers";
import Loader from "../components/Loader";
import abi from "../contracts/abi.json";

type Props = {}

function overflow({}: Props) {
  const router = useRouter();
  const [receiverBalance, setReceiverBalance] = useState<any>(0);
  const [senderBalance, setSenderBalance] = useState<any>(0);
  const [contract, setContract] = useState<any>();
  const [transferInput, setTransferInput] = useState<any>({
    cnt: '',
    _value: ''
  });
  const [amount, setAmount] = useState<number>(0);
  const [expectedAmount, setExpectedAmount] = useState<number>(0);
  const [isProcess, setIsProcess] = useState<boolean>(false);
  
  useEffect(() => {
    initContract();
    
  }, []);

  const initContract = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const account = await provider.getSigner().getAddress();
      
      const cont = new ethers.Contract(
        "0xF72769Bf924B9B266b94bC0f9CC28dA952027deC",
        abi,
        provider.getSigner()
      );

      const tempBaraSender = await cont.balances(account)
      setSenderBalance(tempBaraSender.toNumber());

      const tempBaraReceiver = await cont.balances("0x3D4C1dC19fFAC9D07A541b6F01B1d0Cd150C1626")
      setReceiverBalance(tempBaraReceiver.toNumber());
      
      setContract(cont as any);
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

  const getReceiverBalance = async () => {
    const tempBara = await contract.balances("0x3D4C1dC19fFAC9D07A541b6F01B1d0Cd150C1626")
    setReceiverBalance(tempBara.toNumber());
    //console.log("balances ", tempBara.toNumber());
  }

  const getSenderBalance = async () => {
    getActualAmount();
  }

  const getActualAmount = async () => {
    const amount = await contract.amount();
    console.log("AMOUNT", amount);
    
    setAmount(amount);
  }

  const batchTransfer = async (cnt:number, _value:number) => {
    console.log("cnt", cnt, _value);
    setIsProcess(true);
    const amount = await contract.batchTransfer(cnt, _value);
    await amount.wait();
    getActualAmount();
    calculateAmount();
    console.log("return amount", amount);
    setIsProcess(false);
  }

  const onChangeTransferInput = (key: string, value: string) => {
    setTransferInput({
      ...transferInput,
      [key]: value
    });
  }

  const calculateAmount = () => {
    setExpectedAmount(Number(transferInput.cnt) * Number(transferInput._value));
  }

  return (
    <div className='flex h-screen'>
      {
        isProcess? <Loader /> : <></>
      }
      <div onClick={() => {router.push('/')}} className='back-to-home bg-[#2A2550]'>
        <div className='mx-auto text-[#E04D01]'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <br />
          <Text weight="bold" color='#E04D01'>Back to home</Text>
        </div>
      </div>
      <div className='bg-[#251D3A] w-full h-screen overflow-y-hidden ml-[60px'>
        <Text h1 weight="bold" size={46} transform="uppercase" color="#EAEFC4" className='text-center'>
          Integer Overflow / Underflow
        </Text>
        <Container className='grid grid-cols-1 md:grid-cols-2' style={{height: '-webkit-fill-available'}}>
            <div className='flex items-center'>
                <StateInContractCard balance={receiverBalance} amount={amount} expectedAmount={expectedAmount}/>
            </div>
            <div className='flex items-center'>
                <OverflowUser transferInput={transferInput} onInputChange={onChangeTransferInput} onTransfer={() => {batchTransfer(transferInput.cnt, transferInput._value)}} balance={senderBalance}/>
            </div>
            <button onClick={deposit} >TEST DEPOSIT</button>
            <button onClick={getReceiverBalance} >TEST RECEIVER</button>
            <button onClick={getSenderBalance} >TEST SENDER</button>
        </Container>
      </div>
    </div>
  )
}

export default overflow