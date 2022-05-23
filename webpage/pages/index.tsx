import type { NextPage } from "next";
import { Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { ethers, utils } from "ethers";

import abi from "../contracts/abi.json";
const Home: NextPage = () => {
  // router
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
    <div className="flex flex-col w-screen h-screen md:flex-row">
      <div
        onClick={() => router.push("/overflow")}
        className="bg-[#251D3A] homepage-card"
      >
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
      <div
        onClick={() => router.push("/reentrancy")}
        className="bg-[#346473] homepage-card"
      >
        <Text
          h1
          size={60}
          css={{
            textGradient: "45deg, #9BDF46 , #EAEFC4 50%",
          }}
          weight="bold"
          className="mx-auto"
        >
          Reentrancy
        </Text>
        <button onClick={deposit}>TESTME</button>
      </div>
    </div>
  );
};

export default Home;
