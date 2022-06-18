<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center " style="font-size: 2vw; width: 200px;">
        <h1 class="text-center">title</h1>
      </div>

      <v-spacer></v-spacer>

      
        <ul class="d-flex container px-4 px-3 py-3" style="list-style: none">
         <li class="col mx-3"><a style="color: white;">項目</a></li>  
         <li class="col mx-3" ><a style="color: white;">項目</a></li>
         <li class="col mx-3" ><a style="color: white;">項目</a></li>
        </ul>
      
        
      
    </v-app-bar>

    <v-main>
      <HelloWorld2/>
    </v-main>
   <v-footer>
    <div style="width: 100%; text-align: center;">
      <small class="text-center">@名前</small>
    </div>

     
    
   </v-footer>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import HelloWorld2 from './components/HelloWorld2';
import { getHoliday } from "./logic";


export default {
  name: 'App',

  components: {
    HelloWorld2,
  },

  data: () => ({
    //
  }),
  mounted(){
    getHoliday();
    // getDayOfWeekOnHoliday();
    // getDayOfWeekOnHoliday("2017", "05", "03");
    // getDayOfWeekOnHoliday("2017", "05", "04");
    // getDayOfWeekOnHoliday("2017", "05", "05");
    // byGoldenWeek();
    // countHoliday();
    // countHoliday(2021);
  },
};
</script>
