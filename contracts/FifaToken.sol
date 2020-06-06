// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

import "./ERC721.sol";

contract FifaToken is ERC721 {

	struct Player
	{
		string name;
		string position;
		string club;
		string country;
	}

	Player[] public players;

	mapping(string => bool) _playerExists;

	constructor () ERC721("FifaToken","FT") public {
	}

	function mint(Player memory _player) public {
		require(_playerExists[_player.name] = false, "Player token already exists");
		players.push(_player);
		uint _id = players.length - 1;
		_playerExists[_player.name] = true;
		_mint(msg.sender, _id);
		
		//Call the mint function
		//Track it
	}
}