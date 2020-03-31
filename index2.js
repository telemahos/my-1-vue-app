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
     rawHtml: '<span style="color:red">This is red</span>',
     href: 'http://www.google.com',
     revMsg: "hi kostas!",
   },
   created() {
      //console.log(a + ":: " + this.b);
   },
   methods: {
      resMsgFnc: function() {
         console.log("test");
         //return this.revMsg.split('').reverse().join('');
      }
   },
   computed: {
      resMsgFnc2() {
         console.log(this.revMsg);
         return this.revMsg.split('').reverse().join('');
      }
   },
   
      
});

var app3 = new Vue({
   el: "#app3",
   data: {
      person: {
         name: "Kostas",
         lastname: "kakoulis",
      },
      testt: "a testing string",
      emptyStr: "",
      passType: false,
      username: true,
      parentMsg: "parent",
      shopList: [
         { name: 'sugar' },
         { name: 'coffee' },
         { name: 'tee' },
      ],
   },
   computed: {
      thefullname() {
         return this.person.name + " " + this.person.lastname;
      },
   },
   methods: {
      toggleTemp() {
         this.passType = !this.passType;
         console.log('test toggleTemp function' + this.passType);
      },
   },
});