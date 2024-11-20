import os from "os";
import path from "path";

export const getChromePath = ({ pathStep = 0, isChromiumMode = true } = {}) => {
  const platform = os.platform();
  if (platform === "win32") {
    if (isChromiumMode) {
      return path.join(
        os.homedir(),
        "AppData",
        "Local",
        "Chromium",
        "Application",
        "chrome.exe",
      );
    }

    if (pathStep === 0) {
      // Windows
      return path.join(
        "C:",
        "Program Files",
        "Google",
        "Chrome",
        "Application",
        "chrome.exe",
      );
    }
    // Windows Chrome
    return path.join(
      os.homedir(),
      "AppData",
      "Local",
      "Google",
      "Chrome",
      "Application",
      "chrome.exe",
    );

    // chromiumPath = await getChromePath();
  }
  if (platform === "darwin") {
    // Mac
    return "/Applications/Chromium.app/Contents/MacOS/Chromium"; // updateBanner this to your actual path
  }
  // Other platforms (such as Linux)
  return "/usr/bin/chromium-browser"; // updateBanner this to your actual path
};
