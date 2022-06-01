const { writeContracts } = require("truffle");

const GreeterContract = artifacts.require('../contracts/Greeter');

contract("Greeter", () => {
    it('has been deployed successfully', async () => {
        const greeter = await GreeterContract.deployed();
        assert(greeter, 'contract was no deployed');
    });

    describe('greet()', () => {
        it("returns 'Hello World!'", async () => {
            const greeter = await GreeterContract.deployed();
            const expected = 'Hello World!';
            const actual = await greeter.greet();

            assert(actual, expected);
        })
    });
});