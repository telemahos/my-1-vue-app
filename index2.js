Vue.component('my-kidz', {
   props: ['pkidz'],
   template: '<ul>{{ pkidz.id }}. {{ pkidz.name }}</ul>',
});

var a = "hi Kostas this is a!";

var app2 = new Vue({
   el:'#app2',
   data: {
      b: 22,
     kidz: [
         { id: 1, name: 'Evi' },
         { id: 2, name: 'Evi2' },
         { id: 3, name: 'Evi3' },
         { id: 56, name: 'Evi4' },
     ], 
   },
   created() {
      console.log(a + ":: " + this.b);
   },
});