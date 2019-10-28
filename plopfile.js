let d = new Date();
let time = d.getHours();
let greeting = 'Good morning!';
if (time > 12) {
    greeting = 'Good afternoon!';
}

module.exports = function (plop) {
    plop.setWelcomeMessage(greeting);
    plop.setGenerator('component', {
        description: 'add a component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'component name:',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/components/{{properCase name}}.tsx',
                templateFile: 'generators/component.hbs',
                skipIfExists: true,
            },
            {
                type: 'add',
                path: 'src/components/{{properCase name}}.test.tsx',
                templateFile: 'generators/component.test.hbs',
                skipIfExists: true,
            },
        ],
    });

    plop.setGenerator('hooks', {
        description: 'add a hook',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'hook name (use...):',
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/hooks/{{camelCase name}}.ts',
                templateFile: 'generators/hook.hbs',
                skipIfExists: true,
            },
            {
                type: 'add',
                path: 'src/hooks/{{camelCase name}}.test.ts',
                templateFile: 'generators/hook.test.hbs',
                skipIfExists: true,
            },
        ],
    });

};
