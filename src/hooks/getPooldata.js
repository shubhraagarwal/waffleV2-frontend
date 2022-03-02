import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "./useWeb3";
import environment from "../utils/Environment";
import { getPoolContract } from "../utils/contractHelpers";

export const GetApprovedTok = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const deployerAddress = environment.deployerContractAddress;
  
  const contract = getPoolContract(deployerAddress, web3);
  const getApproved = useCallback(
    async () => {
        // contractAddress
      const appr = await contract.methods.softCapInAllTiers().call();
      return appr;
    },
    [account, contract]
  );
  return { getApproved: getApproved };
};

export default GetApprovedTok;
