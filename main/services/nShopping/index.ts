import { PuppeteerEngine } from "../commons/PuppeteerEngine";

export class NShopping extends PuppeteerEngine {
  async start(): Promise<void> {
    super.initialize();
  }
}

const xxx = new NShopping();
xxx.start();
