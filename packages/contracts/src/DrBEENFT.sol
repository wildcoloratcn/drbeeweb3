// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract DrBEENFT is ERC721URIStorage, Ownable, ReentrancyGuard {
    IERC20 public immutable BEE_TOKEN;
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public totalMinted;
    uint256 public nextTokenId = 1;
    uint256 public mintPrice = 10 * 1e18;

    // 存 12 个 metadata.json 地址
    string[] public tokenURIs;

    event Minted(address indexed minter, uint256 indexed tokenId, string tokenUri);

    // pass in uris, and the owner is the deployer
    constructor(address beeToken_, string[] memory uris)
        ERC721("DrBEE NFT", "BEEN")
        Ownable(msg.sender)
    {
        BEE_TOKEN = IERC20(beeToken_);

        require(uris.length > 0, "Need at least 1 URI");
        tokenURIs = uris;
    }

    modifier canMint() {
        require(totalMinted < MAX_SUPPLY, "Max supply reached");
        _;
    }

    function mint() external canMint nonReentrant {
        // 用户支付 BEE
        ERC20Burnable(address(BEE_TOKEN)).burnFrom(msg.sender, mintPrice);

        uint256 tokenId = nextTokenId++;

        // 取一个 URI（循环使用）
        uint256 index = (tokenId - 1) % tokenURIs.length;
        string memory chosenUri = tokenURIs[index];

        // 铸造 NFT
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, chosenUri); // 绑定 JSON 地址

        totalMinted += 1;

        emit Minted(msg.sender, tokenId, chosenUri);
    }

    /// @notice 允许 Owner 更新某个 JSON 地址（可选功能）
    function updateTokenURI(uint256 index, string calldata newUri) external onlyOwner {
        require(index < tokenURIs.length, "Index out of range");
        tokenURIs[index] = newUri;
    }
}
