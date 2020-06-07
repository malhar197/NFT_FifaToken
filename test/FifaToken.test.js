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

describe('ERC 165 compliance', async() => {
	it('Checks if Token is ERC 165 compliant', async() => {
		const ERC165test = await contract.supportsInterface.call('0x01ffc9a7'); //0x01ffc9a7 is ERC165 interface ID.
		assert.equal(ERC165test,true,'Token is ERC165 compliant');
	})

})

describe('mint function test', async() => {
	it('creates a new token', async () => {
		const player1 = {
			name: "Messi",
			position: "Striker",
			club: "FC Barcelona",
			country: "Argentina"
		};
		const result = await contract.mint(player1);
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

describe('balanceOf function test', async() => {
	it('checks if balance of minter increases, and balance of non-minter stays the same', async() => {
		//Minter Balance = 1 due to previous test.
		const balanceOf1 = contract.balanceOf.call(accounts[0]);
		assert(balanceOf1,1,'Balance has been updated');

		//Non-Minter balance should be 0.
		const balanceof2 = contract.balanceOf.call(accounts[1]);
		assert(balanceof2,0,'Balance is zero');
	})
})
})