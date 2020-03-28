Vue.component('todo-list', {
   template: '<li>this is a todo list</li>',
});

var app = new Vue({
   el: '#app',
   data: {
      car: [
         {
          mycar: 'Tesla',
          myModel: "Model Y",
          maxSpeed: "246 km/h"
         },
         {
            mycar: 'BMW',
            myModel: "M3",
            maxSpeed: "260 km/h"
         },
         {
            mycar: 'Mercedes',
            myModel: "GLC",
            maxSpeed: "214 km/h"
         },
      ],
      showCars: true,
      message: 'Hi Kostas',
      hover: "Asta na pane2",
      bindMessage: "",
   },
   
   methods: {
      shide: function(){
         this.showCars = !this.showCars;
         console.log(this.showCars);
      },
   },
}); 