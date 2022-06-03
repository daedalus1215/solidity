const { writeContracts } = require("truffle");

const GreeterContract = artifacts.require('../contracts/Greeter');

contract("Greeter", (accounts) => {
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

    describe('owner()', () => {
        it("returns the address of the owner", async () => {
            const greeter = await GreeterContract.deployed();
            const owner = await greeter.owner();
            assert(owner, "the current owner");
        });
        it("matches the address that originally deployed the contract", async () => {
            const greeter = await GreeterContract.deployed();
            const owner = await greeter.owner();
            const expected = accounts[0];

            assert(owner, expected);
        });
    });
});

contract("Greeter: update greeting", (accounts) => {
    describe('setGreeting(string)', () => {
        describe('when message is sent by the owner', () => {
            it('sets greeting to passed in string', async () => {
                const greeter = await GreeterContract.deployed();
                const expected = 'Hi there!';

                await greeter.setGreeting(expected);
                const actual = await greeter.greet();

                assert(actual, expected);
            });
        });
        describe('when message is sent by another account', () => {
            it('does not set the greeting', async () => {
                const greeter = await GreeterContract.deployed();

                const expected = await greeter.greet();
                try {
                    await greeter.setGreeting("Not the owner", { from: accounts[1] })
                } catch (err) {
                    const errorMessage = "Ownable: caller is not the owner"
                    assert(err.reason, errorMessage);
                    return;
                }

                assert(false, "greeting should not update");
            });
        });
    });
});