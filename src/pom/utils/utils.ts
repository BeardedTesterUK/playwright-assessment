import { Page } from "@playwright/test";

export const mockTime = async (page: Page, dateString: string) =>{
    const timestamp = new Date(dateString).getTime();
    await page.addInitScript((time) => {
      Date.now = () => time;
    }, timestamp);
  };

  export const advanceTime = async (page: Page, hours: number) =>{
    const futureTime = Date.now() + hours * 60 * 60 * 1000;
    await page.evaluate((newTime) => {
        Date.now = () => newTime;
    }, futureTime);
  };