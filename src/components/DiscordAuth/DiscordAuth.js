import React, { useEffect } from "react";
import DiscordOauth2 from "discord-oauth2";
import axios from "axios";
import { toast } from "react-toastify";
import { useWeb3React } from "@web3-react/core";
import { API_URL_RAFFLE } from "../../utils/ApiURL";
function DiscordAuth() {
  const [discord, setDiscord] = React.useState();
  const getuser = () => {
    axios
      .post(
        `${API_URL_RAFFLE}/api/v1/users/getUser`,
        { walletAddress: localStorage.getItem("wallet") },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        setDiscord(response.data[0].discord_id);
      })
      .catch((err) => {
        console.log(err, "err");
        return false;
      });
  };
  useEffect(() => {
    getuser();
    const url = window.location.href;
    const code = url.split("?code=")[1];
    if (code) {
      const oauth = new DiscordOauth2();
      oauth
        .tokenRequest({
          clientId: "969956585545809930",
          clientSecret: "_lcUX2w0JR3rDOzJ1FUe2fpkIp8TJn4V",
          code: code,
          scope: "identify guilds",
          grantType: "authorization_code",
          redirectUri: "http://localhost:3000/raffle",
        })
        .then((res) => {
          oauth.getUser(res.access_token).then((res) => {
            console.log(res);

            axios
              .post(`${API_URL_RAFFLE}/api/v1/users/addDiscordId`, {
                walletAddress: localStorage.getItem("wallet").toString(),
                discordid: `${res.username}#${res.discriminator}`,
              })
              .then((response) => {
                console.log(response.data);
                setDiscord(response.data.id);
                if (response.data.code === "200") {
                  toast.success("Successfully Added Discord ID", {
                    position: "top-right",
                    autoClose: 8000,
                  });
                } else {
                  toast.warning(
                    "This ID is already linked to another account",
                    {
                      position: "top-right",
                      autoClose: 3000,
                    }
                  );
                }
              })
              .catch((err) => {
                toast.warning("This ID is already linked to another account", {
                  position: "top-right",
                  autoClose: 3000,
                });
                return false;
              });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div>
      {discord ? (
        discord
      ) : (
        <a href="https://discord.com/oauth2/authorize?response_type=code&client_id=969956585545809930&scope=identify%20guilds.join&redirect_uri=http%3A%2F%2Flocalhost:3000/raffle">
          <button className="blue-gradient" data-aos="fade">
            <svg
              width="31"
              height="24"
              viewBox="0 0 31 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M26.215 2.00165C24.1902 1.05428 22.0482 0.381129 19.8455 0C19.5711 0.49604 19.2505 1.16322 19.0295 1.69399C16.6546 1.33688 14.3015 1.33688 11.9702 1.69399C11.7493 1.16334 11.4215 0.49604 11.1446 0C8.9397 0.381305 6.79582 1.05617 4.7701 2.00659C0.739063 8.09813 -0.353721 14.0382 0.192611 19.8942C2.86626 21.8908 5.4573 23.1037 8.00467 23.8974C8.63776 23.0268 9.1974 22.105 9.6778 21.1417C8.76318 20.7935 7.88145 20.3644 7.04311 19.8595C7.26372 19.6959 7.47915 19.5255 7.68906 19.3485C12.7691 21.7246 18.2889 21.7246 23.3084 19.3485C23.5192 19.5243 23.7345 19.6947 23.9542 19.8595C23.1145 20.3657 22.2311 20.7957 21.3147 21.1442C21.7978 22.1115 22.3564 23.0341 22.9878 23.8998C25.5376 23.1062 28.131 21.8933 30.8047 19.8942C31.4458 13.1057 29.7096 7.22002 26.215 2.00153V2.00165ZM10.3699 16.2929C8.84491 16.2929 7.59426 14.8691 7.59426 13.1355C7.59426 11.4018 8.81826 9.97568 10.3699 9.97568C11.9217 9.97568 13.1723 11.3993 13.1456 13.1355C13.148 14.8691 11.9217 16.2929 10.3699 16.2929ZM20.6273 16.2929C19.1023 16.2929 17.8518 14.8691 17.8518 13.1355C17.8518 11.4018 19.0757 9.97568 20.6273 9.97568C22.1791 9.97568 23.4297 11.3993 23.403 13.1355C23.403 14.8691 22.1791 16.2929 20.6273 16.2929Z"
                fill="white"
              />
            </svg>
            <p
              style={{
                width: "14rem",
              }}
            >
              Login with discord
            </p>
          </button>
        </a>
      )}
    </div>
  );
}

export default DiscordAuth;
