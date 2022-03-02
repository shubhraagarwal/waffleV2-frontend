import { useEffect } from 'react'
import useAuth from './useAuth'
// const ConnectorNames =  {
//   Injected : "injected",
//   WalletConnect : "walletconnect",
//   BSC : "bsc"
// }
const useEagerConnect = () => {
  const { login } = useAuth()
  useEffect(() => {
    const item = localStorage.getItem("flag")
    if (item === 'true') {
      login("injected")
    }
    login("injected")
  }, [login])
}

export default useEagerConnect
