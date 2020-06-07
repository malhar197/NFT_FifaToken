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

describe('minting', async() => {
	it('creates a new token', async () => {
		const result = await contract.mint({
			name: "Messi",
			position: "Striker",
			club: "FC Barcelona",
			country: "Argentina"
		});
		const totalSupply = await contract.totalSupply();
		//SUCCESS
		assert.equal(totalSupply,1);
		const event = result.logs[0].args;
		assert.equal(event.tokenId.toNumber(),0,'id is correct');
		assert.equal(event.from,'0x0000000000000000000000000000000000000000','from is correct');
		assert.equal(event.to,accounts[0],'to is correct');

		//FAILURE
		await contract.mint({
			name: "Messi",
			position: "Striker",
			club: "FC Barcelona",
			country: "Argentina"
		}).should.be.rejected;
	})
})

})