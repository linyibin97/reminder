const cron = require("cron");
const sunCalc = require("suncalc");
const notifier = require("node-notifier");

// 计算日落时间并设置提醒
function setSunsetReminder() {
  console.log(">>> setSunsetReminder start >>>");
  try {
    // 深圳市的经纬度
    const latitude = 22.5431;
    const longitude = 114.0579;
    const sunset = sunCalc.getTimes(new Date(), latitude, longitude).sunset;
    const reminderTime = new Date(sunset.getTime() - 10 * 60 * 1000); // 日落前10分钟

    console.log("sunset:", sunset.toLocaleString());
    console.log("reminderTime:", reminderTime.toLocaleString());

    new cron.CronJob(
      reminderTime,
      () => {
        notifier.notify({
          title: "日落",
          message: "10分钟后",
        });
      },
      null,
      true
    );
  } catch (e) {
    console.log(e.toString());
  }
  console.log("<<< setSunsetReminder end  <<<");
}

// 每天上午6点创建一个定时任务
new cron.CronJob(
  "0 0 6 * * *", // cronTime
  () => {
    setSunsetReminder();
  }, // onTick
  null, // onComplete
  true // start
);

// 程序启动时立即创建一个定时任务
setSunsetReminder();
