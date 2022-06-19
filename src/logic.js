import axios from "axios";

// 変数名要相談
// 一時的にyearの値をデフォルトで代入している

// export const getHoliday = (year = "2021") => {
//   /*
//   params:
//     year: string

//   return:
//     void
//   */

//   axios.get(`https://date.nager.at/api/v3/publicholidays/${year}/JP`)
//     .then((res) => {
//       const holidays = res.data;
//       const goldenWeek = [];
//       holidays.map((holiday) => { // sliceの引数は年-月-日("〇〇〇〇-〇〇-〇〇")の月の部分に当たる
//         if (holiday.date.slice(5,7) === "04" || holiday.date.slice(5,7) === "05") {
//           goldenWeek.push(holiday);
//         }
//       })
//       // console.log(goldenWeek);
//       console.log(goldenWeek);
//     })
//     .catch((err) => {
//       console.log(err);
//     })
// }

export const getDayOfWeekOnHoliday = (year = "2021", month = "05", day = "03") => {
  /*
  params:
    year: string,
    month: string,
    day: string

  return:
    date.getDay(): number型で0~6の範囲を取り、日曜～土曜に対応
  */

  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  let date = new Date(`${year}/${month}/${day}`);
  console.log(dayOfWeek[date.getDay()] + '曜日');
  return date.getDay();
}

// goldenWeek: Array<{
//   date: string, localName: string, name: string, countryCode: string


export const byGoldenWeek = () => {
  /**
   * return:
   *  countdown: number
   */
  let today = new Date();
  let targetDay = new Date("2030/06/14"); // ゴールデンウィーク始まりの日に変更する
  let countdown = Math.ceil((targetDay.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  console.log(countdown);
}

// yearの値を一時的に割り当て
export const countHoliday = (year = 2022) => {
  /*
  params:
    year: string
  */
  const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"]; // 重複
  // let date = new Date(year, "05", "03");
  let date = new Date(`${year}/05/03`);
  const vacationPeriod = ["4", "5", "3", "5", "4", "3" ,"3"]; // dayOfWeekのインデックスに対応
  console.log(dayOfWeek[date.getDay()] + '曜日');
  console.log(vacationPeriod[date.getDay()]);
}

export const getHoliday = (year = "2021") => {
  /*
  params:
    year: string

  return:
    void
  */

  axios.get(`https://holidays-jp.github.io/api/v1/${year}/date.json`)
    .then((res) => {
      const holidays = Object.keys(res.data);
      let goldenWeek = [];
      holidays.map((holiday) => { // sliceの引数は年-月-日("〇〇〇〇-〇〇-〇〇")の月の部分に当たる
        if (holiday.slice(5,7) === "05") {
          holiday = holiday.replace(/-/g, "/");
          goldenWeek.push(holiday);
        }
      })
      if (getDayOfWeekOnHoliday(year, "05", "03") === 0) {
        goldenWeek.push(`${year}/05/02`);
      } else if (getDayOfWeekOnHoliday(year, "05", "03") === 1) {
        goldenWeek.push(`${year}/05/01`);
        goldenWeek.push(`${year}/05/02`);
      } else if (getDayOfWeekOnHoliday(year, "05", "03") === 2) {
        goldenWeek.push(`${year}/05/01`);
        goldenWeek.push(`${year}/05/07`);
      } else if (getDayOfWeekOnHoliday(year, "05", "03") === 3) {
        goldenWeek.push(`${year}/05/06`);
        goldenWeek.push(`${year}/05/07`);
      } else if (getDayOfWeekOnHoliday(year, "05", "03") === 4) {
        goldenWeek.push(`${year}/05/06`);
      } else if (getDayOfWeekOnHoliday(year, "05", "03") === 5) {
        //
      } else if (getDayOfWeekOnHoliday(year, "05", "03") === 6) {
        //
      }
      const goldenWeekSorted = goldenWeek.sort((a, b) => new Date(a) - new Date(b))
      return goldenWeekSorted;
    })
    .catch((err) => {
      console.log(err);
    })
}
