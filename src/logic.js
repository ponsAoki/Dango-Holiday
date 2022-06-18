import axios from "axios";

// 変数名要相談
// 一時的にyearの値をデフォルトで代入している
export const getHoliday = (year = "2017") => {
  /*
  params:
    year: string

  return:
    void
  */

  axios.get(`https://date.nager.at/api/v3/publicholidays/${year}/JP`)
    .then((res) => {
      const holidays = res.data;
      const goldenWeek = [];
      holidays.map((holiday) => { // sliceの引数は年-月-日("〇〇〇〇-〇〇-〇〇")の月の部分に当たる
        if (holiday.date.slice(5,7) === "04" || holiday.date.slice(5,7) === "05") {
          goldenWeek.push(holiday);
        }
      })
      // console.log(goldenWeek);
      console.log(goldenWeek);
    })
    .catch((err) => {
      console.log(err);
    })
}

export const getDayOfWeekOnHoliday = (year = "2017", month = "05", day = "02") => {
  /*
  params:
    year: string,
    month: string,
    day: string

  return:
    void
  */

  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  let date = new Date(year, month, day);
  console.log(dayOfWeek[date.getDay()] + '曜日');
}

// goldenWeek: Array<{
//   date: string, localName: string, name: string, countryCode: string


export const byGoldenWeek = () => {
  let today = new Date();
  let targetDay = new Date("2030/06/14"); // ゴールデンウィーク始まりの日に変更する
  let countdown = Math.ceil((targetDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  console.log(countdown);
}

// yearの値を一時的に割り当て
export const countHoliday = (year = 2017) => {
  /*
  params:
    year: string
  */
  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"]; // 重複
  let date = new Date(year, "05", "03");
  const vacationPeriod = ["4", "5", "3", "5", "4", "3" ,"3"]; // dayOfWeekのインデックスに対応
  console.log(vacationPeriod[date.getDay()]);
}
