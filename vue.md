<h1 style="text-align: center;"> VUE Documentation </h1>

- String Interpolation ist data Binding bei benutyung der Mustache Syntax:
   <span>The Message ***{{ msg }}***</span>
- To String Interpolation, παρουσιάζει μόνο Plain Text και όχι HTML. Για να δείξω HTML μπορώ να χρησιμοποιήσω το ***v-html***
- Εντος των html-attributes δεν μπορούν να χρησιμοποιηθούν τα Mustaches. Σε αυτές τις περιπτώσεις χρησιμοποιούμε το ***v-bind*** 
   ```
   <div v-bind:id="dynamicId"></div>
   ``` 
- Directives are special attributes with the ***v-*** prefix
- Some directives can take an **“argument”**, denoted by a **colon** after the directive name. For example, the ***v-bind directive*** is used to reactively update an HTML attribute
   ```
   <a v-bind:href="url"> ... </a>
   ```
- Another example is the ***v-on*** directive, which listens to DOM events
   ```
   <a v-on:click="doSomething"> ... </a>
   ```
- When using *in-DOM templates* (templates directly written in an HTML file), you should also ***avoid naming keys*** with **uppercase characters**, as browsers will coerce attribute names into lowercase:
   ```
   <!--
      This will be converted to v-bind:[someattr] in in-DOM templates.
      Unless you have a "someattr" property in your instance, your code won't work.
   -->
   <a v-bind:[someAttr]="value"> ... </a>
   ```
--
### Shorthands

-  The **v- prefix** serves as a visual cue for identifying Vue-specific attributes in your templates.  Vue provides special **shorthands** for two of the most often used directives, ***v-bind and v-on***
   ```
   <!-- full syntax -->
   <a v-bind:href="url"> ... </a>
   <!-- shorthand -->
   <a :href="url"> ... </a>
   
   <!-- full syntax -->
   <a v-on:click="doSomething"> ... </a>
   <!-- shorthand -->
   <a @click="doSomething"> ... </a>

   ```
- Instead of a ***computed property***, we can define the same function as a ***method***. For the end result, the two approaches are indeed exactly the same. However, the difference is that computed properties are cached based on their reactive dependencies. ***A computed property will only re-evaluate when some of its reactive dependencies have changed.*** This means as long as message has not changed, multiple access to the reversedMessage computed property will immediately return the previously computed result without having to run the function again.
- Vue Forum 
   https://forum.vuejs.org/top/weekly
  
### Computed vs Watched Property
-  Vue does provide a more generic way to observe and react to data changes on a Vue instance: ***watch properties***. However, it is often a better idea to use a ***computed property*** rather than an imperative watch callback.
```
<div id="demo">{{ fullName }}</div>

var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar',
    fullName: 'Foo Bar'
  },
  watch: {
    firstName: function (val) {
      this.fullName = val + ' ' + this.lastName
    },
    lastName: function (val) {
      this.fullName = this.firstName + ' ' + val
    }
  }
```
vs:
```
var vm = new Vue({
  el: '#demo',
  data: {
    firstName: 'Foo',
    lastName: 'Bar'
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  }
})
```
Much better, isn’t it?

### Computed Setter
- Computed properties are by default getter-only, but you can also provide a setter when you need it:
```
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```
- Now when you run vm.fullName = 'John Doe', the setter will be invoked and vm.firstName and vm.lastName will be updated accordingly.

