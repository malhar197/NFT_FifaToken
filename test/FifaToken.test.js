const FifaToken = artifacts.require('./FifaToken.sol');
require('chai')
	.use(require('chai-as-promised'))
	.should()

contract('FifaToken',(accounts) => {
	let contract;

	before(async () => {
		contract = await FifaToken.deployed();
	})

describe('deployment',async() => {
	it('deploys successfully', async () => {
		contract = await FifaToken.deployed();
		const address = contract.address;
		console.log(address);
		assert.notEqual(address, '');
		assert.notEqual(address, 0x0);
		assert.notEqual(address, null);
		assert.notEqual(address, undefined);
	})

	it('has a name', async () => {
		const name = await contract.name();
		assert.equal(name, 'FifaToken');
	})

	it('has a symbol', async () => {
		const symbol = await contract.symbol();
		assert.equal(symbol, 'FT');
	})
})

})