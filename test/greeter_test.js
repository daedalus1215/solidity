const { writeContracts } = require("truffle");

const GreeterContract = artifacts.require('../contracts/Greeter');

contract("Greeter", () => {
    describe('deploy', () => {
        it('has been deployed successfully', async () => {
            const greeter = await GreeterContract.deployed();
            assert(greeter, 'contract was no deployed');
        });
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

contract("Greeter: update greeting", () => {
    describe('setGreeting(string)', () => {
        it('sets greeting to passed in string', async () => {
            const greeter = await GreeterContract.deployed();
            const expected = 'Hi there!';

            await greeter.setGreeting(expected);
            const actual = await greeter.greet();
            
            assert(actual, expected);
        })
    });
});