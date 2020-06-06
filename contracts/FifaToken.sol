// SPDX-License-Identifier:

pragma solidity ^0.6.0;

import "./ERC721.sol";

contract FifaToken is ERC721 {
	string _name;
	string _symbol;

	constructor () ERC721("FifaToken","FT") public {

	}
}