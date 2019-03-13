export const createMutations = ({ store, naming = 'underscored' }) => {
    if (!store) return false;
    Object.keys(store._modules.root._children).forEach(module_name => {
        store.unregisterModule(module_name);
        let module = store._modules.root._children[module_name]._rawModule;
        if (!module) return;
        Object.keys(module.state).forEach(prop => {
            const mutation_name = getMutationName(prop);
            module.mutations[mutation_name] = (state, val) => { state[prop] = val; };
        });
        store.registerModule('shop', module);
    });
};

export const getMutationName = (prop) => {
    if (!prop.length) return false;
    let naming = prop.includes('_') ? 'underscored' : 'camel';
    switch (naming) {
        case 'underscored': {
            return (
                '_set' +
                `${ prop }`
                    .split('_')
                    .map(item => item.charAt(0).toLocaleUpperCase() + item.slice(1))
                    .join('')
            );
        } break;
        case 'camel': {
            prop = prop.charAt(0).toLocaleUpperCase() + prop.slice(1);
            return '_set' + prop;
        }
    }
    return false;
};

