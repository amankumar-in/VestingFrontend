import tokenAbi from "./tokenAbi.json";
import vestingAbi from "./vestingAbi.json";
import { tokenAddress, vestingAddress } from "./environment";

import { readContract, writeContract } from "wagmi/actions";
import { waitForTransaction } from "@wagmi/core";

export const tokenReadFunction = async (functionName, args) => {
  const data = await readContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName,
    args,
  });
  return data;
};

export const vestingReadFunction = async (functionName, args) => {
  const data = await readContract({
    address: vestingAddress,
    abi: vestingAbi,
    functionName,
    args,
  });
  return data;
};

/// write functions
export const tokenWriteFunction = async (functionName, args) => {
  const { hash } = await writeContract({
    address: tokenAddress,
    abi: tokenAbi,
    functionName,
    args,
  });
  console.log(hash, "hash");
  const receipt = await waitForTransaction({ hash });
  console.log(receipt, "receipt");
  return receipt;
};

export const vestingWriteFunction = async (functionName, args, value) => {
  const { hash } = await writeContract({
    address: vestingAddress,
    abi: vestingAbi,
    functionName,
    args,
    value,
  });
  const receipt = await waitForTransaction({ hash });
  return receipt;
};
