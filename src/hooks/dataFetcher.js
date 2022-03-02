import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import useWeb3 from "./useWeb3";
import {
  getContractStake,
  TokenContract,
  getSeed,
} from "../utils/contractHelpers.js";
import {
  getFullDisplayBalance,
  getBalanceNumber,
} from "../utils/formatBalance";
import useRefresh from "./useRefresh";
import Environment from "../utils/Environment";

import axios from "axios";

let stakeContract = Environment.contractAddress;
const tokenContract = Environment.tokenAddress;

const test = {
  nameOfProject: "init",
  _saleStartTime: 1644394020,
  _saleEndTime: 1644437220,
  _projectOwner: "0x53780eDC8E2a5236aD7aeBA183C60672C602438A",
  _tokenSender: "0x53780eDC8E2a5236aD7aeBA183C60672C602438A",
  maxAllocTierOne: "400000000000000000000",
  maxAllocTierTwo: "400000000000000000000",
  maxAllocTierThree: "400000000000000000000",
  minAllocTierOne: "1",
  minAllocTierTwo: "1",
  minAllocTierThree: "1",
  minBUSDvalue_TierOne: 1,
  minBUSDvalue_TierTwo: 1,
  minBUSDvalue_TierThree: 1,
  tokenToIDO: "0xb7809ada6ef0cb220886c8a8d997eab72becbe4d",
  tokenDecimals: 18,
  _numberOfIdoTokensToSell: "90000000000000000000000",
  _tokenPriceInBUSD: 1,
  _tierOneMaxCap: "10000000000000000000000",
  _tierTwoMaxCap: "30000000000000000000000",
  _tierThreeMaxCap: "50000000000000000000000",
  _softCapPercentage: "1",
  _numberOfVestings: "1",
  _vestingPercentages: [50],
  _vestingUnlockTimes: [1644437881],
};

const useApprove = () => {
  const web3 = useWeb3();
  try {
    const ApproveTokens = useCallback(async (account) => {
      const contract = TokenContract(tokenContract, web3);
      const approved = await contract.methods
        .approve(
          stakeContract,
          web3.utils.toWei("100000000000000000000", "ether")
        )
        .send({ from: account })
        .on("transactionHash", (tx) => {
          return tx.transactionHash;
        });
      return approved;
    });
    return { ApproveTokens };
  } catch (err) {
    console.log("approve err", err);
    throw err;
  }
};

const CheckAllowance = () => {
  const [balance, setBalance] = useState();
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const contract = TokenContract(tokenContract, web3);
  useEffect(() => {
    const fetchBalance = async () => {
      if (!account) {
        setBalance(0);
        return;
      }
      let tallow = await contract.methods
        .allowance(account, stakeContract)
        .call();
      let allowance = getBalanceNumber(parseInt(tallow), 18);
      // setBalance(new BigNumber(balance))
      await setBalance(allowance);
    };
    if (account) {
      fetchBalance();
    }
  }, [account, contract]);
  return balance;
};

const StakedAmount = () => {
  const web3 = useWeb3();
  const [balance, setBalance] = useState(0);
  const contract = getContractStake(stakeContract, web3);
  const { account } = useWeb3React();
  useEffect(async () => {
    try {
      if (!account) {
        setBalance(0);
        return;
      }
      const tallow = await contract.methods.userInfo(0, account).call();
      setBalance((tallow.amount / 10 ** 18).toFixed(3));
    } catch (err) {
      setBalance(0);
    }
  }, [account, contract]);
  return balance;
};

const GetPartApprove = () => {
  const web3 = useWeb3();
  try {
    const userPartApprove = useCallback(async (account, value, tier) => {
      const contractApp = TokenContract("0xb883C5E72AC27c5f0B8A5233C6b9c8cf034C5371", web3);
      const approved = await contractApp.methods
        .approve(
          Environment.seedContractAddress,
          web3.utils.toWei(web3.utils.toWei(value.toString()), "ether")
        )
        .send({ from: account }).on("transactionHash", (tx) => {
          return tx.transactionHash;
        })
        .catch((err) => {
          return err;
        });
      return approved;
    });
    return { userPartApprove };
  } catch (err) {
    console.log("approve err", err);
    throw err;
  }
};

const GetParticipated = () => {
  const web3 = useWeb3();
  const contractAddress = Environment.seedContractAddress;
  const contract = getSeed(contractAddress, web3);
  try {
    const userParticipating = useCallback(async (account, value, tier) => {
      console.log("we have value",value)
      // console.log("value", value)
      const approved = await contract.methods
        .participateAndPay(web3.utils.toWei(value.toString(), "ether"), tier)
        .send({
          from: account,
        })
        .on("transactionHash", (tx) => {
          return tx.transactionHash;
        })
        .catch((err) => {
          return err;
        });
      return approved;
    });
    return { userParticipating };
  } catch (err) {
    console.log("approve err", err);
    throw err;
  }
};

const UserPackages = () => {
  const web3 = useWeb3();
  const seedContract = Environment.seedContractAddress;
  const contract = getSeed(seedContract, web3);
  const CheckPackages = useCallback(
    async (account) => {
      const tallow = await contract.methods.buyInOneTier(account).call();
      const tallow1 = await contract.methods.buyInTwoTier(account).call();
      const tallow2 = await contract.methods.buyInThreeTier(account).call();
      let dumVal = {
        package1: parseInt(tallow),
        package2: parseInt(tallow1),
        package3: parseInt(tallow2),
      };
      return dumVal;
    },
    [contract]
  );
  return { CheckPack: CheckPackages };
};

const StakedAmountReward = () => {
  const web3 = useWeb3();
  const [balance, setBalance] = useState(0);
  const contract = getContractStake(stakeContract, web3);
  const { account } = useWeb3React();
  useEffect(async () => {
    try {
      if (!account) {
        setBalance(0);
        return;
      }
      const tallow = await contract.methods.userInfo(0, account).call();
      console.log("rewardddddddd", tallow);
      setBalance(tallow.totalReward / 10 ** 18);
    } catch (err) {
      setBalance(0);
    }
  }, [account, contract]);
  return balance;
};

// export default StakedAmount;

const UnStakedAmount = () => {
  const web3 = useWeb3();
  const [balance, setBalance] = useState(0);
  const contract = getContractStake(stakeContract, web3);
  const { account } = useWeb3React();
  useEffect(async () => {
    try {
      if (!account) {
        setBalance(0);
        return;
      }
      const tallow = await contract.methods.claimInfo(0, account).call();
      setBalance((tallow.amount / 10 ** 18).toFixed(3));
    } catch (error) {
      setBalance(0);
    }
  }, [account, contract]);
  return balance;
};
// React.useEffect(() => {
//     if (stakeContract) {
//         UnStakedAmount();
//         // getStakedbalance();
//     }
// }, [stakeContract]);
// export default UnStakedAmount;

const UseTokenBalance = () => {
  const [balance, setBalance] = useState(0);
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const contract = TokenContract(tokenContract, web3);
  useEffect(() => {
    if (!account) {
      setBalance(0);
      return;
    }
    const fetchBalance = async () => {
      try {
        let balance = await contract.methods.balanceOf(account).call();
        setBalance(parseInt(balance) / 10 ** 18);
      } catch (error) {
        setBalance(0);
      }
    };
    // if (account) {
    fetchBalance();
    // }
  }, [account, contract]);
  return balance;
};

const useStake = (amount) => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const contract = getContractStake(stakeContract, web3);
  // const ammnt= amount.toString()
  // const amount1 = web3.utils.toWei(amount,'ether');
  // const amount1 = new BigNumber(amount).multipliedBy(
  //     new BigNumber(10).pow(18)
  //   );
  // const amount1 = (amount * (10 ** 18))
  // console.log("amounnnttt", amount, account)
  const StakePsr = useCallback(async () => {
    try {
      const approved = await contract.methods
        .enterStaking(web3.utils.toWei(amount.toString(), "ether"))
        .send({ from: account })
        .on("transactionHash", (tx) => {
          return tx.transactionHash;
        })
        .on("error", () => {
          return false;
        });
      return approved;
    } catch (error) {
      console.log("error:÷:::::", error);
      throw error;
    }
  }, [account, amount]);

  return { Stake: StakePsr };
};
const useUnStake = (amount) => {
  const { account } = useWeb3React();
  const web3 = useWeb3();
  const contract = getContractStake(stakeContract, web3);
  const UnStakePsr = useCallback(async () => {
    try {
      const approved = await contract.methods
        .leaveStaking(web3.utils.toWei(amount.toString(), "ether"))
        .send({ from: account })
        .on("transactionHash", (tx) => {
          return tx.transactionHash;
        });
      return approved;
    } catch (error) {
      console.log("error::::::", error);
      throw error;
    }
  }, [account, amount]);
  return { UnStakeToken: UnStakePsr };
};
// export default UseTokenBalance

export {
  useStake,
  useUnStake,
  useApprove,
  CheckAllowance,
  UnStakedAmount,
  StakedAmount,
  UseTokenBalance,
  StakedAmountReward,
  UserPackages,
  GetParticipated,
  GetPartApprove
};
