import { useCallback } from "react";
import { useWeb3React } from "@web3-react/core";
import useWeb3 from "./useWeb3";
import environment from "../utils/Environment";
import { getContractStake } from '../utils/contractHelpers.js'

export const ClaimWithdrawal = () => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const contractAddress = environment.contractAddress;

  const contract = getContractStake(contractAddress, web3)
  const Withdraw = useCallback(
    async (amount) => {
      const details = await contract.methods
        .claimStaking(amount * 1000000000)
        .send({ from: account })
        .on('transactionHash', (tx) => { return tx.transactionHash })
        .catch((err)=>{
          return err;
        });
      return details;
    },
    [account, contract]
  );
  return { Withdraw: Withdraw };
};

export default ClaimWithdrawal;
