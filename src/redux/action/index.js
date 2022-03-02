import axios from "axios";
import { API_URL } from "../../utils/ApiURL";

export const ContarctAction =
  (Useraccount, txiContract, amount, recipt) => async (dispatch) => {
    txiContract.methods
      .balanceOf(Useraccount)
      .call()
      .then((balance) => {
        // console.log("balance",balance);
        dispatch({
          type: "BALANCE",
          payload: balance,
        });
      });
    txiContract.methods
      .calculateBNBReward(Useraccount)
      .call()
      .then((reward) => {
        // console.log("reward",reward);
        dispatch({
          type: "USER_REWARD",
          payload: reward,
        });
      });

    // txiContract.methods.disruptiveTransfer(amount,recipt).send(
    //   {
    //   from: Useraccount,
    //   amount,
    //   recipt
    // }).then((amount)=>{
    //   dispatch({
    //     type: "",
    //     payload: amount,
    //   })
    // })
  };

export const userTheme = (theme) => async (dispatch) => {
  dispatch({
    type: "USER_THEME",
    payload: theme,
  });
};

export const GetStatus = (account) => async (dispatch) => {
  if (account) {
    var data = JSON.stringify({
      walletAddress: account,
    });

    var config = {
      method: "post",
      url: `${API_URL}/v1/Kyc/getKycOfUser`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        if (response.data.data.statusOfApplication) {
          dispatch({
            type: "GET_USER",
            payload: response.data.data.statusOfApplication,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        dispatch({
          type: "GET_USER",
          payload: null,
        });
      });
  } else {
    dispatch({
      type: "GET_USER",
      payload: null,
    });
  }
};
