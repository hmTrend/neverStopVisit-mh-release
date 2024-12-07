import { PuppeteerEngine } from "../PuppeteerEngine";

export const networkRouterEduPlayer = async () => {
  await playwrightEngineStart();
};

async function playwrightEngineStart() {
  const engine = new PuppeteerEngine();
  await engine.initialize({
    url: "http://192.168.8.1/index.html#login",
    cookie: "",
  });
}

networkRouterEduPlayer();
