import axios from "axios";
import qs from "qs";

export async function networkRouterEdu({
  isTest = false,
}: {
  isTest?: boolean;
} = {}) {
  if (isTest) {
  }
  try {
    await setZLockBand();
  } catch (e) {
    console.error(`networkRouterEdu > ${e.message}`);
  }
}

// networkRouterEdu();

async function setZLockBand() {
  try {
    const data = qs.stringify({
      isTest: "false",
      goformId: "set_zlockband",
      bandtype: "70",
      lockband_mode: "auto",
    });
    const config = setConfig({ data });
    const response = await axios.request(config);
    const responseResult = JSON.stringify(response.data);
    return (async () => {
      if (responseResult.includes("failure")) {
        console.log("this is failure");
        await setLogin();
        await setZLockBand();
      }
    })();
  } catch (error) {
    console.error(`setZLockBand > ${error.message}`);
  }
}

async function setLogin() {
  try {
    const data = qs.stringify({
      isTest: "false",
      goformId: "LOGIN",
      password: "MTIzNDU2Nzg=",
    });
    const config = setConfig({ data });
    const response = await axios.request(config);
    const result = JSON.stringify(response.data);
    if (result.includes("0")) {
      console.log("this is logged in");
      return;
    }
    throw Error(`setLogin > this is NOT logged in`);
  } catch (error) {
    console.error(`setLogin > ${error.message}`);
  }
}

function setConfig({ data }) {
  return {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://192.168.8.1/reqproc/proc_post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": "axios/1.0.0",
      Pragma: "no-cache",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
    insecureHTTPParser: true,
    data,
  };
}

// setLogin();
