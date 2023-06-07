const { NodeVM } = require('vm2');
const assert = require('assert');

const vm = new NodeVM({
    timeout: 1000,
    allowAsync: false,
    sandbox: {}
});

function main() {
    let code = `
        function add2(a, b) {
            return a + b;
        }

        function add(a, b) {
            return a + b;
        }
        `;

    const funcName = 'add';
    const input = [1, 1];
    const output = 3;

    let result;
    try {
        let functionInSandbox = vm.run(` ${code}  \n module.exports =${funcName};`);
        result = functionInSandbox(...input);

        assert.equal(result, output);

        console.error('Assertion succeed');
        return 0;
    } catch (err) {
        console.error('Assertion failed:', err);
    }

    return 1;
}

main()

