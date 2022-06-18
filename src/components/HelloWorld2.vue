<template>
  <div class="mx-16 my-8">
    <!-- ここからinput -->
    <v-sheet class="d-flex justify-center">
      <v-col cols="12" md="6" sm="6">
        <v-autocomplete
          :items="years"
          outlined
          dense
          v-model="year"
          @change="yearChange()"
        >
        </v-autocomplete>
      </v-col>
    </v-sheet>
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
        :events="holidays"
        :event-color="getHolidayColor"
        :type="type"
        locale="ja-jp"
      ></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "HelloWorld2",

  data: () => ({
    years: [2020, 2021, 2022, 2023, 2024],
    year: "",

    value: moment().format("yyyy-MM-DD"), // 現在日時

    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ], //「休み」表記の色選べる
  }),

  mounted() {
    this.getHoliday();
  },

  computed: {
    //読み込み時に現在の日付を取得
    title() {
      return moment(this.value).format("yyyy年 M月"); // 表示用文字列を返す
    },
  },

  methods: {
    //yearが変更したとき
    yearChange() {
      this.value = `${this.year}` + "-04-01";
    },

    //「休み」の表記をする関数
    //試しに5/3~5/6まで休みにしてみる
    getHoliday() {
      const holidays = [
        {
          name: "休み",
          start: moment("2022-05-03").toDate(),
          end: moment("2022-05-06").toDate(),
          color: "blue",
        },
      ];
      this.holidays = holidays;
      return this.holiday;
    },

    //「休み」の日を色付け
    getHolidayColor(holiday) {
      return holiday.color;
    },
  },
};
</script>
