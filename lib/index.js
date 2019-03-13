import store_mixin from './store_mixin';
import { createMutations } from './mutations';

export default {
    install: (Vue, options) => {
        createMutations(options)
        Vue.mixin(store_mixin);
    }
}
