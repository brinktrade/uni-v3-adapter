// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity =0.8.10;
pragma abicoder v1;

import '../token/IERC20.sol';
import '../token/IWETH.sol';

/// @title Brink UniV3Adapter02
/// @notice Deployed once and used by Brink executors to fulfill swaps. Uses V3SwapRouter from Uniswap.
contract UniV3Adapter02 {
  IWETH public weth;
  bool public initialized;

  /// @dev Contract Address of the Uniswap V3SwapRouter
  address constant V3_SWAP_ROUTER_ADDRESS = 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45;

  /// @dev Max uint
  uint256 MAX_INT = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

  /// @dev Adapter Owner
  address payable ADAPTER_OWNER = payable(0x71795b2d53Ffbe5b1805FE725538E4f8fBD29e26);

  /// @dev Ethereum address representations
  IERC20 private constant _ETH_ADDRESS = IERC20(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);
  IERC20 private constant _ZERO_ADDRESS = IERC20(0x0000000000000000000000000000000000000000);

  error NotEnoughETH();
  error NotEnoughTokenIn(uint amount);
  error NotEnoughTokenOut(uint amount);

  /// @dev initialize the contract with WETH address
  /// @param _weth Address of weth
  function initialize (IWETH _weth) external {
    require(!initialized, 'INITIALIZED');
    initialized = true;
    weth = _weth;
  }

  /// @dev Makes a call to the Uniswap V3SwapRouter with swap byte data
  /// @dev returns the requested tokenOutAmount to Account and keeps the rest
  /// @param data swap byte data for Uniswap V3SwapRouter
  /// @param tokenIn Address of the token to be swapped
  /// @param tokenOut Address of the token to be returned from the swap
  /// @param tokenOutAmount Amount of tokenOut to transfer to account
  /// @param account Address of the account to receive the tokenOut
  /// @param minTokenInArb Minimum amount of tokenIn arbitrage revenue remaining for ADAPTER_OWNER
  /// @param minTokenOutArb Minimum amount of tokenOut arbitrage revenue remaining for ADAPTER_OWNER
  function uniV3Swap(bytes memory data, IERC20 tokenIn, IERC20 tokenOut, uint tokenOutAmount, address payable account, uint minTokenInArb, uint minTokenOutArb) external payable {
    if (isETH(tokenIn)) {
      tokenIn = IERC20(address(weth));
      weth.deposit{ value: address(this).balance }();
    }
    _routerApproveMax(tokenIn);

    assembly {
      let result := call(gas(), V3_SWAP_ROUTER_ADDRESS, 0, add(data, 0x20), mload(data), 0, 0)
      if eq(result, 0) {
        returndatacopy(0, 0, returndatasize())
        revert(0, returndatasize())
      }
    }

    if (isETH(tokenOut)) {
      uint wethBal = weth.balanceOf(address(this));
      weth.withdraw(wethBal);
      if (wethBal < tokenOutAmount) {
        revert NotEnoughETH();
      }
      account.transfer(tokenOutAmount);
      uint ethBalRemaining = address(this).balance;
      if (ethBalRemaining < minTokenOutArb) {
        revert NotEnoughTokenOut(ethBalRemaining);
      }
      ADAPTER_OWNER.transfer(ethBalRemaining);
    } else {
      tokenOut.transfer(account, tokenOutAmount);
      uint tokenOutBalRemaining = tokenOut.balanceOf(address(this));
      if (tokenOutBalRemaining < minTokenOutArb) {
        revert NotEnoughTokenOut(tokenOutBalRemaining);
      }
      tokenOut.transfer(ADAPTER_OWNER, tokenOutBalRemaining);
    }

    uint tokenInBalRemaining = tokenIn.balanceOf(address(this));
    if (tokenInBalRemaining < minTokenInArb) {
      revert NotEnoughTokenIn(tokenInBalRemaining);
    } else if (tokenInBalRemaining > 0) {
      tokenIn.transfer(ADAPTER_OWNER, tokenInBalRemaining);
    }
  }

  function _routerApproveMax(IERC20 token) internal {
    if (token.allowance(address(this), V3_SWAP_ROUTER_ADDRESS) < MAX_INT) {
      token.approve(V3_SWAP_ROUTER_ADDRESS, MAX_INT);
    }
  }

  /// @dev Checks if IERC20 token address is an ETH representation
  /// @param token address of a token
  function isETH(IERC20 token) internal pure returns (bool) {
    return (token == _ZERO_ADDRESS || token == _ETH_ADDRESS);
  }

  receive() external payable { }
}