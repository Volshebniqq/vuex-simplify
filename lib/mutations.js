export const createMutations = ({ store }) => {
    if (!store) return false;
    const root = store._modules.root._rawModule;;
    generateForModule(root);
};

function generateForModule(module) {
    Object.keys(module.state).forEach(prop => {
        const mutation_name = getMutationName(prop);
        module.mutations[mutation_name] = (state, val) => { state[prop] = val; };
    });
    if (module.modules) {
        const child_modules = Object.keys(module.modules);
        child_modules.forEach(module_name => generateForModule(module.modules[module_name]));
    }
}

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
