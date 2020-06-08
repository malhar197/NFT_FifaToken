const FifaToken = artifacts.require('./FifaToken.sol');
require('chai')
	.use(require('chai-as-promised'))
	.should()
const truffleAssert = require('truffle-assertions');

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
		const checkBalance = await contract.balanceOf.call(accounts[0]);
		assert.equal(checkBalance,0,'Account balance is zero');
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
		const balanceOf1 = await contract.balanceOf.call(accounts[0]);
		assert.equal(balanceOf1,1,'Balance has been updated');

		//Non-Minter balance should be 0.
		const balanceof2 = await contract.balanceOf(accounts[1]);
		assert.equal(balanceof2,0,'Balance is zero');
	})
})

describe('ownerOf function test', async() => {
	it('checks if correct owner is returned for a token ID', async() => {
		const ownerOf = await contract.ownerOf.call(0);
		assert.equal(ownerOf,accounts[0],'Correct owner identified');
	})
})

describe('approve function test', async() => {
	it('Ensures whether approved using approve function',async() => {
	const approve = await contract.approve(accounts[1],0, {from: accounts[0]});
	const approvedAddress = await contract.getApproved.call(0);
	assert.equal(approvedAddress,accounts[1],'Transaction approved');
	})

	it('Ensures whether event emitted for setApprovalForAll',async() => {
		const setApprovalForAll = await contract.setApprovalForAll(accounts[1],true);

		truffleAssert.eventEmitted(setApprovalForAll, 'ApprovalForAll');
	})

	it('Ensures whether getApproved function works', async() => {
		const getApproved = await contract.getApproved(0);

		assert.equal(getApproved,accounts[1],'correct address returned');
	})

	it('Checks whether isApprovedForAll function returns correct output', async() => {
		const isApprovedForAll = await contract.isApprovedForAll.call(accounts[0],accounts[1]);
		assert.equal(isApprovedForAll,true,'correct output returned');
	})
})

describe('transferFrom and safeTransferFrom function test', async() => {
	it('Ensures token transfer via safeTransferFrom method by checking balances', async() => {

		const ownerOf1 = await contract.ownerOf.call(0);

		assert.equal(ownerOf1,accounts[0],'Token owner verified');

		const safeTX = await contract.safeTransferFrom(accounts[0],accounts[1],0);
		
		const ownerOf2 = await contract.ownerOf.call(0);
		assert.equal(ownerOf2,accounts[1],'Token successfully transferred');
	})
	it('Verifies safeTransferFrom with data', async() =>{

		await contract.mint({
			name: "Ronaldo",
			position: "Winger",
			club: "Juventus",
			country: "Portugal"
		});

		const checkBalance = await contract.balanceOf.call(accounts[0]);

		assert.equal(checkBalance,1,'Balance verified');

		await contract.safeTransferFrom(accounts[0],accounts[1], 1, '0x987123');

		const ownerOf = await contract.ownerOf.call(1);

		assert.equal(ownerOf,accounts[1],'Owner verified');
	})
	it('tests the transferFrom function', async() => {

		await contract.mint({
			name: "Salah",
			position: "Winger",
			club: "Liverpool",
			country: "Egypt"
		});

		await contract.transferFrom(accounts[0],accounts[1],2);

		const ownerOf = await contract.ownerOf.call(2);

		assert.equal(ownerOf,accounts[1],'Owner verified');
	})
})

// describe('Event tests', async() => {
// 	it('')
// })
})