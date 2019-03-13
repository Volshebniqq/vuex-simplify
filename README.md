# vuex-simplify
Plugin to simplify work with Vuex.

Use simple functions to access store state, getters and dispatch actions.

You don't even need to create mutations.

## Installation

```
$ npm install vuex-simplify
```

## How to use

In your main.js file
```js
import VuexSimplify from 'vuex-simplify';
import store from './store';
Vue.use(VuexSimplify, { store });
```

Now you can access simplified functions from any component.

store.js
```js
import Vue from 'vue'
import Vuex from 'vuex'
import shop from './modules/shop';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      first_name: 'John',
      last_name: 'Doe'
  },
  actions: {
      myAction({ state }, payload) {
          // do something very important
      }
  },
  getters: {
      helloGetter: state => {
          return 'Hello, ' + state.first_name + ' ' + state.last_name
      }
  },
  modules: {shop}
})

```

Shop module shop.js

```js
export default {
    namespaced: true,
    state: {
        products: [
            {
                title: "product1",
                price: 12
            },
            {
                title: "product2",
                price: 58
            }
        ]
    },
    actions: {
        checkout({ state }, payload) {
            // very important checkout function here
        }
    },
    getters: {
        summary: state => state.products.reduce((sum, item) => sum + item.price, 0)
    }
}

```

AnyComponent.vue

```vue
<template>
    <p>My awesome component</p>
</template>

<script>
    export default {
        name: 'AnyComponent',
        created() {
            const first_name = this._state('first_name'); // get first_name from root store
            this._state('last_name', 'Smith'); // set last_name to 'Smith' in root store
            this._action('myAction', { some: 'payload' }); // dispatch root action with payload
            const hello_message = this._getter('helloGetter', 'optionalParamsHere') // use getter from root
            
            const products = this._state('shop', 'products'); // get products from shop module
            this._state('shop', 'products', []); // make products an empty array
            this._actionFm('shop', 'checkout', { some: 'payload' }); // dispatch action checkout from shop module
            const summary = this._getterFm('shop', 'summary', 'optionalParams'); // use getter from shop module
        }
    }
</script>

```

## Contributions

Thanks [@IngvarLosev](https://github.com/IngvarLosev) for idea and early realization
