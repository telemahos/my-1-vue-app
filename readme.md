###  VUE Documentation 

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

vs


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

---
## Class and Style Bindings

### Binding HTML Classes
- Vue provides special enhancements when ***v-bind*** is used with ***class and style***. In addition to strings, the expressions can also evaluate to ***objects or arrays***.
  
```
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```

```
data: {
  isActive: true,
  hasError: false
}
==>
<div class="static active"></div>
```


- The bound object doesn’t have to be inline:


```
<div v-bind:class="classObject"></div>

data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```


- We can also bind to a ***computed property*** that returns an object.


```
<div v-bind:class="classObject"></div>

data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

### Array Syntax
- We can pass an ***array*** to v-bind:class to apply a list of classes:

```
<div v-bind:class="[activeClass, errorClass]"></div>

data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

- If you would like to also ***toggle a class*** in the list conditionally, you can do it with a ***ternary expression***:

```
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

This will always apply errorClass, but will only apply activeClass when isActive is truthy.

- However, this can be a bit verbose if you have multiple conditional classes. That’s why it’s also possible to use the object syntax inside array syntax:

```
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

### With Components

- When you use the class attribute on a custom component, those classes will be added to the component’s root element. Existing classes on this element will not be overwritten.

```
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})

<my-component class="baz boo"></my-component>

```

The rendered HTML will be:
```
<p class="foo bar baz boo">Hi</p>
```

### Binding Inline Styles
- The object syntax for v-bind:style is pretty straightforward - it looks almost like CSS, except it’s a JavaScript object. You can use either camelCase or kebab-case (use quotes with kebab-case) for the CSS property names:

```
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

data: {
  activeColor: 'red',
  fontSize: 30
}
```
---
## Conditional Rendering 
 ### v-if and v-else

- The directive ***v-if*** is used to conditionally render a block. The block will only be rendered if the ***directive’s expression returns a truthy*** value.
- It is also possible to add an “else block” with v-else:
  
```
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

### Conditional Groups with v-if on template
Because v-if is a directive, it has to be attached to a single element. But what if we want to toggle more than one element? In this case we can use v-if on a ***template element***, which serves as an invisible wrapper. The final rendered result will not include the ***template element***.

```
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### v-else-if
- The ***v-else-if***, as the name suggests, serves as an “else if block” for v-if. It can also be chained multiple times:

```
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>
```
Similar to v-else, a v-else-if element must immediately follow a v-if or a v-else-if element.

### v-show
Another option for conditionally displaying an element is the ***v-show directive***. The usage is largely the same:
```
<h1 v-show="ok">Hello!</h1>
```
The difference is that an element with v-show will always be rendered and remain in the DOM; v-show only toggles the display CSS property of the element.
> Note that ***v-show doesn’t support the template element***, nor does it work with v-else.

### v-if vs v-show
***v-if*** is “real” conditional rendering because it ensures that event listeners and child components inside the conditional block are properly destroyed and re-created during toggles.

In comparison, ***v-show*** is much simpler - the element is always rendered regardless of initial condition, with CSS-based toggling.

Generally speaking, **v-if** has higher toggle costs while ***v-show*** has higher initial render costs. So prefer v-show if you need to toggle something very often, and prefer v-if if the condition is unlikely to change at runtime.

### v-if with v-for
> Using ***v-if and v-for*** together is not recommended. When used together with v-if, v-for has a higher priority than v-if


## List Rendering
### Mapping an Array to Elements with v-for
We can use the v-for directive to render a list of items based on an array. The v-for directive requires a special syntax in the form of item in items, where items is the source data array and item is an alias for the array element being iterated on:

```
<ul id="example-1">
  <li v-for="item in items" :key="item.message">
    {{ item.message }}
  </li>
</ul>
```

```
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

Inside ***v-for*** blocks we have full access to ***parent scope*** properties. v-for also supports an optional second argument for the index of the current item.
```
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

```
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

You can also use ***of*** as the delimiter instead of in, so that it is closer to JavaScript’s syntax for iterators:
```
<div v-for="item of items"></div>
```

### v-for with an Object
You can also use v-for to iterate through the ***properties of an object***.
```
<ul id="v-for-object" class="demo">
  <li v-for="value in object">
    {{ value }}
  </li>
</ul>
```

```
new Vue({
  el: '#v-for-object',
  data: {
    object: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
})
```

You can also provide a ***second argument*** for the property’s name (a.k.a. key):
```
<div v-for="(value, name) in object">
  {{ name }}: {{ value }}
</div>
```

And another for the index:
```
<div v-for="(value, name, index) in object">
  {{ index }}. {{ name }}: {{ value }}
</div>
```