// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity =0.8.10;
pragma abicoder v1;

import '../token/IERC20.sol';
import '../token/IWETH.sol';
import '../access/Withdrawable.sol';

/// @title Brink UniV3Adapter
/// @notice Deployed once and used by Brink executors to fulfill swaps. Uses V3SwapRouter from Uniswap.
contract UniV3Adapter is Withdrawable {
  IWETH public weth;
  bool public initialized;

  /// @dev Contract Address of the Uniswap V3SwapRouter
  address constant V3_SWAP_ROUTER_ADDRESS = 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45;

  /// @dev Max uint
  uint256 MAX_INT = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

  /// @dev Ethereum address representations
  IERC20 private constant _ETH_ADDRESS = IERC20(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);
  IERC20 private constant _ZERO_ADDRESS = IERC20(0x0000000000000000000000000000000000000000);

  /// @dev initialize the contract with WETH address
  /// @param _weth Address of weth
  function initialize (IWETH _weth) external onlyOwner {
    require(!initialized, 'INITIALIZED');
    initialized = true;
    weth = _weth;
  }

  /// @dev Makes a call to the Uniswap V3SwapRouter with swap byte data
  /// @dev returns the requested tokenOutAmount to Account and keeps the rest
  /// @param data swap byte data for Uniswap V3SwapRouter
  /// @param tokenIn Address of the token to be swapped
  /// @param tokenInAmount Token amount deposited
  /// @param tokenOut Address of the token to be returned from the swap
  /// @param tokenOutAmount Token amount deposited
  /// @param account Address of the account to receive the tokenOut
  function uniV3Swap(bytes memory data, IERC20 tokenIn, uint tokenInAmount, IERC20 tokenOut, uint tokenOutAmount, address payable account) external payable {
    if (isETH(tokenIn)) {
      if (weth.allowance(address(this), V3_SWAP_ROUTER_ADDRESS) < tokenInAmount) {
        weth.approve(V3_SWAP_ROUTER_ADDRESS, MAX_INT);
      }
      weth.deposit{ value: msg.value }();
    } else {
      if (tokenIn.allowance(address(this), V3_SWAP_ROUTER_ADDRESS) < tokenInAmount) {
        tokenIn.approve(V3_SWAP_ROUTER_ADDRESS, MAX_INT);
      }
    }
    assembly {
      let result := call(gas(), V3_SWAP_ROUTER_ADDRESS, callvalue(), add(data, 0x20), mload(data), 0, 0)
      returndatacopy(0, 0, returndatasize())
      switch result
      case 0 {
        revert(0, returndatasize())
      }
    }

    if (isETH(tokenOut)) {
      weth.withdraw(tokenOutAmount);
      account.transfer(tokenOutAmount);
    } else {
      tokenOut.transfer(account, tokenOutAmount);
    }
  }

  /// @dev Checks if IERC20 token address is an ETH representation
  /// @param token address of a token
  function isETH(IERC20 token) internal pure returns (bool) {
    return (token == _ZERO_ADDRESS || token == _ETH_ADDRESS);
  }

  receive() external payable { }
}