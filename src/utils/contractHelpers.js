import web3NoAccount from './web3'
import tokenAbi from './tokenAbi.json'
import PrjtStrterAbi from './PrjtStrterAbi.json'
import poolContract from './poolContarct.json'
import IERC20Abi from './IERC20Abi.json'
import PoolAbi from './poolsAbi.json'
import TierAbi from './tierAbi.json'
import SeedAbi from "./seedAbi.json"

const getContract = (abi, address, web3) => {
    const _web3 = web3 ?? web3NoAccount;
    // console.log('_web3',_web3);
    return new _web3.eth.Contract(abi, address)
}

export const TokenContract = (address, web3) => {
    return getContract(tokenAbi, address, web3)
}

export const getContractStake= (address, web3) => {
    return getContract(PrjtStrterAbi, address, web3)
}

export const getPoolContract= (address, web3) => {
    return getContract(poolContract, address, web3)
}

export const getIERC20Contract= (address, web3) => {
    return getContract(IERC20Abi, address, web3)
}

export const getPoolContract2 = (address, web3) => {
    return getContract(PoolAbi, address, web3)
}

export const getPoolTier = (address, web3) => {
    return getContract(TierAbi, address, web3)
}
// export default TokenContract;

export const getSeed = (address, web3) => {
    return getContract(SeedAbi, address, web3)
}