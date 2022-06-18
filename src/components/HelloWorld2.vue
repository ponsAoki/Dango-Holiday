<template>
  <div class="mx-16 my-8">
    <!-- <v-container fluid> -->
    <v-sheet class="d-flex justify-center">
      <v-col cols="12" md="6" sm="6">
        <v-autocomplete
          :items="years"
          outlined
          dense
          v-model="year"
          @change="func()"
        >
        </v-autocomplete>
      </v-col>
    </v-sheet>
    <v-divider></v-divider>
    <!-- </v-container> -->
    <v-sheet tile height="54" class="d-flex">
      <v-btn icon class="ma-2" @click="$refs.calendar.prev()">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <!-- <v-select
        v-model="type"
        :items="types"
        dense
        outlined
        hide-details
        class="ma-2"
        label="type"
      ></v-select> -->
      <!-- <v-select
        v-model="mode"
        :items="modes"
        dense
        outlined
        hide-details
        label="event-overlap-mode"
        class="ma-2"
      ></v-select>
      <v-select
        v-model="weekday"
        :items="weekdays"
        dense
        outlined
        hide-details
        label="weekdays"
        class="ma-2"
      ></v-select> -->
      <!-- <v-spacer></v-spacer> -->
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

    // type: "month",
    // types: ["month", "week", "day", "4day"],
    // mode: "stack",
    // modes: ["stack", "column"],
    // weekday: [0, 1, 2, 3, 4, 5, 6],
    // weekdays: [
    //   { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
    //   { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
    //   { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
    //   { text: "Mon, Wed, Fri", value: [1, 3, 5] },
    // ],
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    // names: [
    //   "Meeting",
    //   "Holiday",
    //   "PTO",
    //   "Travel",
    //   "Event",
    //   "Birthday",
    //   "Conference",
    //   "Party",
    // ],
  }),

  mounted() {
    //試しに5/3~5/6まで休みにしてみる
    this.getHoliday();
  },

  computed: {
    //読み込み時に現在の日付を取得
    title() {
      return moment(this.value).format("yyyy年 M月"); // 表示用文字列を返す
    },
  },

  methods: {
    func() {
      console.log(this.year);
      return this.year;
    },
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

    // getEvents({ start, end }) {
    //   const events = [];

    //   const min = new Date(`${start.date}T00:00:00`);
    //   const max = new Date(`${end.date}T23:59:59`);
    //   const days = (max.getTime() - min.getTime()) / 86400000;
    //   const eventCount = this.rnd(days, days + 20);

    //   for (let i = 0; i < eventCount; i++) {
    //     const allDay = this.rnd(0, 3) === 0;
    //     const firstTimestamp = this.rnd(min.getTime(), max.getTime());
    //     const first = new Date(firstTimestamp - (firstTimestamp % 900000));
    //     const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
    //     const second = new Date(first.getTime() + secondTimestamp);

    //     events.push({
    //       name: this.names[this.rnd(0, this.names.length - 1)],
    //       start: first,
    //       end: second,
    //       color: this.colors[this.rnd(0, this.colors.length - 1)],
    //       timed: !allDay,
    //     });
    //   }

    //   this.events = events;
    // },
    //「休み」の日を色付け
    getHolidayColor(holiday) {
      return holiday.color;
    },
    // rnd(a, b) {
    //   return Math.floor((b - a + 1) * Math.random()) + a;
    // },
  },
};
</script>
