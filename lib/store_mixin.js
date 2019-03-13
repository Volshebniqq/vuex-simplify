import { getMutationName } from './mutations';

export default {
    methods: {
        moduleExists(module_name) { return !!this.$store.state[ module_name ]; },
        _state(m, p, v) {
            if (!m) return;
            if (v) {
                this.$store.commit(`${m}/${getMutationName(p)}`, v);
            } else if (p && !!this.$store._modules.root._children[m]) {
                return this.$store.state[m][p];
            } else if (p) {
                this.$store.commit(getMutationName(m), p);
            } else {
                return this.$store.state[m];
            }
        },
        _action(name, val) { return this.$store.dispatch(name, val); },
        _actionFm(module, name, val) {
            if (!this.moduleExists(module)) return;
            return this._action(`${ module }/${ name }`, val);
        },
        _getter(name, params) {
            return (typeof this.$store.getters[ name ] === 'function')
                   ? this.$store.getters[ name ](params)
                   : this.$store.getters[ name ];
        },
        _getterFm(module, name, param) {
            if (!this.moduleExists(module)) return;
            return this._getter(`${ module }/${ name }`, param);
        }
    }
};
