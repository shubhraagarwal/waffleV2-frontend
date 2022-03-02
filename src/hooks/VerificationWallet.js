import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import { LoginProfile, AddProfile } from "../services/services";
import { getLibraryForSign } from "../utils/web3React";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Web3 from 'web3';
import { useDispatch } from 'react-redux'
// import { Auth } from "../redux/action";
export const Signature = (data) => {
  const { account } = useWeb3React();
  const library = getLibraryForSign(Web3.givenProvider)
  const sign = useCallback(async () => {
    if ((library && account)) {
      let signing = library
        .getSigner(account);
      try {
        let signature = await signing.signMessage(
         `Welcome to Project Starter!
          Click "Sign" to sign in. No password needed!
          This request will not trigger a blockchain transaction or cost any gas fees.
          Your authentication status will be reset after 24 hours.
          I accept the Project Starter Terms of Service:
          Wallet address:
            ${data}`
        );
        toast.success(`${signature.substring(0, 6)}...${signature.substring(signature.length - 4)}`, {
          position: "top-right",
          autoClose: 2000,
        });
        return signature;
      }
      catch (error) {
        console.log("error", error)
        toast.error("User Not Register!", {
          autoClose: 2000,
        });
        return error;
      }
    }
  }, [account, library, data])
  return { userSign: sign }
}
export default Signature