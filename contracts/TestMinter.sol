pragma solidity ^0.6.2;

import '@openzeppelin/contracts/presets/ERC20PresetMinterPauser.sol';

contract TestMinter is ERC20PresetMinterPauser {
    
    modifier onlyDuring() {
        uint256 secondsOfWeek = now % 7 days;
        require(secondsOfWeek >= 64800 && secondsOfWeek <= 75600, "You can only request tokens during certain hours");
        _;
    }

    modifier onlyMinter() {
        require(hasRole(MINTER_ROLE, _msgSender()), "ERC20PresetMinterPauser: must have minter role to mint");
        _;
    }
    
    struct Voter {
        uint256 lastRequest;
    }
    
    mapping(address => Voter) public voters;
    uint256 cooldownPeriod = 24 hours;
    
    
    constructor () public ERC20PresetMinterPauser("Token", "TKN") {
        _setupRole(MINTER_ROLE, address(this));
    }

    function mint(address to, uint256 amount) override public virtual {
        require(msg.sender == address(this));
        _mint(to, amount);
    }

    function weeklyMint() onlyMinter public returns(string memory) {
        _mint(msg.sender, 100000000000000000000);
        require(now - voters[msg.sender].lastRequest > cooldownPeriod, "cooldown active");
        voters[msg.sender].lastRequest = now;
    }

}