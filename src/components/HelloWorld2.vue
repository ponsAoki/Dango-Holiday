<template>
  <div class="mx-16 my-8">
    <!-- ここからinput -->
    <v-sheet class="d-flex justify-center">
      <v-col cols="12" md="6" sm="6">
        <v-autocomplete
          :items="years"
          outlined
          dense
          label="年を入力してください"
          v-model="year"
          @change="yearChange()"
        >
        </v-autocomplete>
      </v-col>
    </v-sheet>
    <v-alert border="top" color="blue lighten-2" dark
      >GWまで、あと{{ countdown }}日</v-alert
    >
    <v-divider></v-divider>
    <!-- ここからカレンダー -->
    <v-sheet tile height="54" class="d-flex">
      <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon class="ma-2" @click="$refs.calendar.next()">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-toolbar-title class="ma-3">{{ title }}</v-toolbar-title>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :events="holidayevents"
        :event-color="getVacationColor"
        locale="ja-jp"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import moment from "moment";
import { getHoliday } from "../logic copy";
// import { getDayOfWeekOnHoliday } from "../logic";
// import { getDaysOfWeekOnHolidayLike } from "../logic";

export default {
  name: "HelloWorld2",

  data: () => ({
    years: [],
    year: "",

    countdown: 365,

    today: moment().format("yyyy-MM-DD"),
    value: moment().format("yyyy-MM-DD"), // 現在日時

    holidays: [],
    holidayevents: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ], //休み表記の色選べる

    holidayLen: "",
  }),

  //初回読み込み時の年を取得
  mounted() {
    this.year = this.value.split("-")[0];
    const y = parseInt(this.year);
    this.years.push(y - 2, y - 1, y, y + 1);
    // getHoliday();
    // const genzai = new Date();
    // console.log(genzai.getDay());
  },

  //初回読み込み時にyearに値が入ると実行
  watch: {
    year() {
      this.holidays = getHoliday(this.year);
      this.getVacation();
    },
  },

  computed: {
    //読み込み時に、カレンダーのタイトルに現在の年月を表示
    title() {
      const res = moment(this.value).format("yyyy年 M月");
      return res;
    },
  },

  methods: {
    //yearを初回から変更したとき
    yearChange() {
      this.holidays = getHoliday(this.year);
      console.log(this.holidays);
      this.value = `${this.year}` + "-05-01";
      this.getVacation();
    },

    //休みの表記をする関数
    getVacation() {
      console.log(this.year);
      //   const vacationLen = 3 + parseInt(this.holidayLen) - 1;
      //   console.log(vacationLen);
      const holidays = [
        // {
        //   name: "祝日休み",
        //   start: moment(`${this.year}` + "-05-03").toDate(),
        //   end: moment(`${this.year}` + "-05-5").toDate(),
        //   color: "blue",
        // },
        {
          name: "連休",
          start: moment(this.holidays[1]).toDate(),
          end: moment(this.holidays[3]).toDate(),
          color: "blue",
        },
      ];
      this.holidayevents = holidays;
      return this.holiday;
    },

    //休みの日を色付け
    getVacationColor(holiday) {
      return holiday.color;
    },
  },
};
</script>
