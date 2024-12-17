import macaddress from "macaddress";
import wait from "waait";
import axios from "axios";
import cheerio from "cheerio";

export const getGitHubReleaseLastDescription = () => {
  const repoName = "applepykim/yoodooDesktopRelease";

  axios
    .get(`https://api.github.com/repos/${repoName}/releases`)
    .then((response) => {
      console.log(response.data[0].body); // Prints the description of the latest release
    })
    .catch((error) => {
      console.error(error);
    });
};

export const formatBytes = (bytes, decimals = 0) => {
  if (bytes === 0) return "0 MB";

  const mb = 1024 * 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(mb));

  return parseFloat((bytes / Math.pow(mb, i)).toFixed(dm)) + " " + sizes[2];
};
export const getMacAddress = () => {
  const resultPromise = new Promise((resolve, reject) => {
    macaddress.one(function (err, mac) {
      if (err) {
        reject(err);
      } else {
        resolve(mac);
      }
    });
  });
  return resultPromise;
};

export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// export const getScrapeIp = async () => {
//   try {
//     await wait(1000);
//     const response = await axios.get("https://ip.pe.kr/");
//     const $ = cheerio.load(response.data);
//     return $("body > div:nth-child(2) > div:nth-child(2) > h1").text();
//   } catch (e) {
//     try {
//       await wait(1500);
//       const response = await axios.get(
//         "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=%EB%82%B4%EC%95%84%EC%9D%B4%ED%94%BC",
//       );
//       const $ = cheerio.load(response.data);
//       return $("#ct > section.sc.sp_nip > div > div.ip_info").text();
//     } catch (e) {
//       try {
//         await wait(1500);
//         const response = await axios.get("https://studio-jt.co.kr/my-ip/");
//         const $ = cheerio.load(response.data);
//         return $(
//           "#barba-wrapper > div > main > div > div.single_content_view > div.jt_my_ip > h2 > strong",
//         ).text();
//       } catch (e) {
//         try {
//           const response = await axios.get("http://ip-api.com/json/");
//           console.log(response.data.query);
//           return response.data.query;
//         } catch (e) {
//           try {
//             await delay(1500);
//             const response = await axios.get(
//               "https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=%EB%82%B4%EC%95%84%EC%9D%B4%ED%94%BC",
//             );
//             const html = response.data;
//             const $ = cheerio.load(html);
//             const ipInfo = $(".ip_info").text();
//             console.log(ipInfo);
//             return ipInfo;
//           } catch (e) {
//             try {
//               return fetchIp();
//             } catch (e) {
//               console.error(e);
//               return "IP XXXX";
//             }
//           }
//         }
//       }
//     }
//   }

// async function fetchIp() {
//   // 웹 사이트 페이지 HTML을 가져옵니다.
//   const response = await axios.get("https://www.findip.kr/");
//   const html = response.data;
//
//   // 가져온 HTML을 파싱합니다.
//   const $ = cheerio.load(html);
//   const text = $("body > header > h2").text();
//
//   // 텍스트에서 IP 주소를 추출합니다.
//   const ip = text.split(": ")[1];
//
//   console.log(ip); // IP 주소를 콘솔에 출력합니다.
//   return ip;
// }
// };
