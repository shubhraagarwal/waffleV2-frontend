import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import useWeb3 from './useWeb3'
import { getContractStake, TokenContract, getPoolContract2, getPoolTier } from '../utils/contractHelpers.js'
import { getFullDisplayBalance, getBalanceNumber } from '../utils/formatBalance'
import Environment from '../utils/Environment';
import { ClickAwayListener } from '@material-ui/core'

const stakeContract = Environment.contractAddress;
const tokenContract = Environment.tokenAddress;


const StakedPoolAmount = () => {
    const [balance, setBalance] = useState()
    const web3 = useWeb3()
    const { account } = useWeb3React();
    const contract = getContractStake(stakeContract, web3);
    useEffect(async () => {
        try {
            if (!account) {
                setBalance(0);
                return;
            }
            // console.log("&&&&&&&&&&&&&&&&&")
            const tallow = await contract.methods.userInfo(0, account).call()
            await setBalance(tallow.amount / 10 ** 18)
            //    await console.log("stacked amount we have ",stackedamount)
        }
        catch (err) {
            setBalance(0)
        }

    }, [account, contract])
    return balance
}

const UserTier = () => {
    // const [stackedaount, setstackedaount] = useState(''
    const web3 = useWeb3()

    const { account } = useWeb3React();
    const Tier = useCallback(async (addr, stacked) => {
        // console.log("contract deployed address", addr)
        const contract = getPoolContract2(addr, web3);
        try {
            const tallow1 = await contract.methods.amountRequiredTier1().call();
            const tallow2 = await contract.methods.amountRequiredTier2().call();
            const tallow3 = await contract.methods.amountRequiredTier3().call();
            const tallow4 = await contract.methods.amountRequiredTier4().call();
            const tallow5 = await contract.methods.amountRequiredTier5().call();
            const tallow6 = await contract.methods.amountRequiredTier6().call();
            const t1 = tallow1 / (10 ** 18)
            const t2 = tallow2 / (10 ** 18)
            const t3 = tallow3 / (10 ** 18)
            const t4 = tallow4 / (10 ** 18)
            const t5 = tallow5 / (10 ** 18)
            const t6 = tallow6 / (10 ** 18)
            console.log("tier", t1)
            console.log("tier", t2)
            console.log("tier", t3)
            console.log("tier", t4)
            console.log("tier", t5)
            console.log("tier", t6)
            if (stacked >= t6 && stacked < t5) {
                let tier1 = 1
                return tier1;
            } else if (stacked >= t5 && stacked < t4) {
                let tier2 = 2
                return tier2;
            }
            else if (stacked >= t4 && stacked < t3) {
                let tier3 = 3
                return tier3;
            }
            else if (stacked >= t3 && stacked < t2) {
                let tier4 = 4
                return tier4;
            }
            else if (stacked >= t2 && stacked < t1) {
                let tier5 = 5
                return tier5;
            }
            else if (stacked >= t1) {
                let tier6 = 6
                return tier6;
            }
            else {
                return 0;
            }
        } catch (err) {
            console.log("tier error", err)
            throw err
        }
    }, [account])
    return { Tier }
}


// const UserTier = (addr, stacked) => {
//     console.log("-------------------", addr, stacked)
//     const [stackedaount, setstackedaount] = useState()
//     const web3 = useWeb3()
//     const { account } = useWeb3React();
//     const contract = getPoolContract2(addr, web3);
//     useEffect(async () => {
//         try {
//             if (!account) {
//                 setstackedaount(200);
//                 return;
//             }
//             const tallow1 = await contract.methods.amountRequiredTier1().call();
//             const tallow2 = await contract.methods.amountRequiredTier2().call();
//             const tallow3 = await contract.methods.amountRequiredTier3().call();
//             const tallow4 = await contract.methods.amountRequiredTier4().call();
//             const tallow5 = await contract.methods.amountRequiredTier5().call();
//             const tallow6 = await contract.methods.amountRequiredTier6().call();
//             const t1 = await tallow1 / (10 ** 18)
//             const t2 = await tallow2 / (10 ** 18)
//             const t3 = await tallow3 / (10 ** 18)
//             const t4 = await tallow4 / (10 ** 18)
//             const t5 = await tallow5 / (10 ** 18)
//             const t6 = await tallow6 / (10 ** 18)
//             if (stacked >= t1 && stacked < t2) {
//                 let tier1 = 1
//                 setstackedaount(tier1)
//             } else if (stacked >= t2 && stacked < t3) {
//                 let tier2 = 2
//                 setstackedaount(tier2)
//             }
//             else if (stacked >= t3 && stacked < t4) {
//                 let tier3 = 3
//                 setstackedaount(tier3)
//             }
//             else if (stacked >= t4 && stacked < t5) {
//                 let tier4 = 4
//                 setstackedaount(tier4)
//             }
//             else if (stacked >= t5 && stacked < t6) {
//                 let tier5 = 5
//                 setstackedaount(tier5)
//             }
//             else if (stacked >= t6) {
//                 let tier6 = 6
//                 setstackedaount(tier6)
//             }
//             else {
//                 setstackedaount(0);
//             }
//         }
//         catch (err) {
//             setstackedaount(300)
//         }

//     }, [account,contract])
//     return stackedaount
// }

const Swapped = () => {
    const web3 = useWeb3()
    const { account } = useWeb3React();
    const TierSwap = useCallback(async (addr, Tier) => {
        let URL
        let Tier1 = Tier.toString()
        if (Tier1 == '6') {
            URL = 'buyInOneTier';
        } else if (Tier1 == '5') {
            URL = 'buyInTwoTier';
        } else if (Tier1 == '4') {
            URL = 'buyInThreeTier';
        } else if (Tier1 == '3') {
            URL = 'buyInFourTier';
        } else if (Tier1 == '2') {
            URL = 'buyInFiveTier';
        } else if (Tier1 == '1') {
            URL = 'buyInSixTier';
        }

        console.log("urllll maaaa", URL)
        const contract = getPoolContract2(addr, web3);
        try {
            const tallow = await contract.methods[`${URL}`](account).call()
            console.log("swapped amount", tallow)
            return tallow;

        } catch (err) {
            console.log("swapped error", err)
            throw err
        }
    })
    return { TierSwap }
}

const RemainingAllocation = () => {
    const web3 = useWeb3()
    const { account } = useWeb3React();
    const RAllocation = useCallback(async (addr, Tier) => {
        const contract = getPoolContract2(addr, web3);
        let URL
        let Tier1 = Tier.toString()
        if (Tier1 == '1') {
            URL = 'maxAllocaPerUserTierOne';
        } else if (Tier1 == '2') {
            URL = 'maxAllocaPerUserTierTwo';
        } else if (Tier1 == '3') {
            URL = 'maxAllocaPerUserTierThree';
        } else if (Tier1 == '4') {
            URL = 'maxAllocaPerUserTierFour';
        } else if (Tier1 == '5') {
            URL = 'maxAllocaPerUserTierFive';
        } else if (Tier1 == '6') {
            URL = 'maxAllocaPerUserTierSix';
        }
        // await console.log("addrrrrrrrrrrrrrrrrrrrrr11111", addr)
        try {
            const tallow = await contract.methods[`${URL}`]().call()
            return tallow;
        } catch (err) {
            console.log("remaing error", err)
            throw err
        }
    })
    return { RAllocation }

}

const BusdInAllTier = () => {
    const web3 = useWeb3()
    const { account } = useWeb3React();
    const TotalBusdInAllTier = useCallback(async (addr) => {
        const contract = getPoolContract2(addr, web3);
        // await console.log("addrrrrrrrrrrrrrrrrrrrrr11111", addr)
        try {
            const tallow = await contract.methods.totalBUSDReceivedInAllTier().call()
            return tallow;
        } catch (err) {
            // console.log("TotalBusdInAllTier error", err)
            throw err
        }
    })
    return { TotalBusdInAllTier }
}

const ClaimToken = () => {
    const web3 = useWeb3()
    const { account } = useWeb3React();
    const ClaimCall = useCallback(async (addr) => {
        const contract = getPoolContract2(addr, web3);
        // await console.log("addrrrrrrrrrrrrrrrrrrrrr11111", addr)
        try {
            const tallow = await contract.methods.claim().send({ from: account });
            return tallow;
        } catch (err) {
            // console.log("ClaimToken error", err)
            throw err
        }
    })
    return { ClaimCall }
}


const TotalMaxCap = () => {
    const web3 = useWeb3()
    const { account } = useWeb3React();
    const Maxcap = useCallback(async (addr) => {
        const contract = getPoolContract2(addr, web3);
        // await console.log("addrrrrrrrrrrrrrrrrrrrrr11111", addr)
        try {
            const tallow = await contract.methods.numberOfIdoTokensToSell().call()
            return tallow;
        } catch (err) {
            // console.log("Maxcap error", err)
            throw err
        }
    })
    return { Maxcap }
}

const PresaleStart = () => {
    const web3 = useWeb3()
    const { account } = useWeb3React();
    const Time = useCallback((addr) => {
        const contract = getPoolContract2(addr, web3);

        try {
            const tallow = contract.methods.saleStartTime().call()
            // console.log("timmer we get hee", tallow)
            return tallow;

        } catch (err) {
            // console.log("Maxcap error", err)
            throw err
        }
    })
    return { Time }
}

const PresaleStartEnd = () => {
    const web3 = useWeb3()
    const { account } = useWeb3React();
    const Time = useCallback((addr) => {
        const contract = getPoolContract2(addr, web3);
        try {
            const tallow = contract.methods.saleEndTime().call()
            // console.log("timmer we get hee", tallow)
            return tallow;

        } catch (err) {
            // console.log("Maxcap error", err)
            throw err
        }
    })
    return { Time }
}

const TokenPriceBUSD = () => {
    const web3 = useWeb3()
    const { account } = useWeb3React();
    const Price = useCallback(async (addr) => {
        const contract = getPoolContract2(addr, web3);
        // await console.log("addrrrrrrrrrrrrrrrrrrrrr11111", addr)
        try {
            const tallow = await contract.methods.tokenPriceInBUSD().call()
            return tallow;
        } catch (err) {
            // console.log("Maxcap error", err)
            throw err
        }
    })
    return { Price }
}

const TotalBusdalltier = () => {
    const web3 = useWeb3()
    const { account } = useWeb3React();
    const Altierbusd = useCallback(async (addr) => {
        const contract = getPoolContract2(addr, web3);
        // await console.log("addrrrrrrrrrrrrrrrrrrrrr11111", addr)
        try {
            const tallow = await contract.methods.totalBUSDReceivedInAllTier().call()
            return tallow;
        } catch (err) {
            // console.log("Total Busd error", err)
            throw err
        }
    })
    return { Altierbusd }
}

const CheckPoolAllowance = (addr) => {
    const [balance, setBalance] = useState(0)
    const { account } = useWeb3React()
    const web3 = useWeb3()
    const contract = TokenContract(tokenContract, web3)
    useEffect(() => {
        const fetchBalance = async () => {
            let tallow = await contract.methods.allowance(account, Environment.deployerContractAddress).call()
            let allowance = getBalanceNumber(parseInt(tallow), 18)
            // setBalance(new BigNumber(balance))
            await setBalance(allowance)
        }
        if (account) {
            fetchBalance()
        }
    }, [account, contract])
    return balance
}

const TotalSupply = () => {
    const web3 = useWeb3()
    const [balance, setBalance] = useState()
    const { account } = useWeb3React();


    useEffect(async () => {
        try {
            if (!account) {
                setBalance(0);
                return;
            }
            const contract = getContractStake(Environment.contractAddress, web3);
            const tallow = await contract.methods.totalSupply().call()
            setBalance(tallow / 10 ** 18);
        } catch (err) {
            // console.log("Total totalsupply error", err)
            setBalance(0)
        }
    }, [web3]);
    return balance
}

const GetTotalStakersha = () => {
    const web3 = useWeb3()
    const [balance, setBalance] = useState(0);
    const { account } = useWeb3React();

    useEffect(async () => {
        try {
            if (!account) {
                setBalance(0);
                return;
            }
            const contract = getContractStake(Environment.contractAddress, web3);
            const tallow = await contract.methods.gettotalStakers().call()
            setBalance(tallow);
        } catch (err) {
            // console.log("Total TotalStakers error", err)
            setBalance(0);
        }
    }, [web3])
    return balance
}

const Finilzeee = () => {
    const web3 = useWeb3()
    const { account } = useWeb3React();
    const FSale = useCallback(async (addr) => {
        const contract = getPoolContract2(addr, web3);
        // await console.log("addrrrrrrrrrrrrrrrrrrrrr11111", addr)
        try {
            const tallow = await contract.methods.finalizeSale().send({ from: account });
            return tallow;
        } catch (err) {
            // console.log("ClaimToken error", err)
            throw err
        }
    })
    return { FSale }
}

export { UserTier, Swapped, CheckPoolAllowance, StakedPoolAmount, RemainingAllocation, BusdInAllTier, TotalMaxCap, TokenPriceBUSD, PresaleStart, PresaleStartEnd, TotalBusdalltier, Finilzeee, TotalSupply, GetTotalStakersha, ClaimToken };
