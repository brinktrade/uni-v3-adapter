// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity =0.8.10;
pragma abicoder v1;

import '../token/IERC20.sol';
import '../access/Withdrawable.sol';

/// @title Brink UniV3Adapter
/// @notice Deployed once and used by Brink executors to fulfill swaps. Uses V3SwapRouter from Uniswap.
contract UniV3Adapter is Withdrawable {

  /// @dev Contract Address of the Uniswap V3SwapRouter
  address constant V3_SWAP_ROUTER_ADDRESS = 0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45;

  /// @dev Max uint
  uint256 MAX_INT = 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;

  /// @dev Makes a call to the Uniswap V3SwapRouter with swap byte data
  /// @dev returns the requested tokenOutAmount to Account and keeps the rest
  /// @param data swap byte data for Uniswap V3SwapRouter
  /// @param tokenIn Address of the token to be swapped
  /// @param tokenInAmount Token amount deposited
  /// @param tokenOut Address of the token to be returned from the swap
  /// @param tokenOutAmount Token amount deposited
  /// @param account Address of the account to receive the tokenOut
  function uniV3Swap(bytes memory data, IERC20 tokenIn, uint tokenInAmount, IERC20 tokenOut, uint tokenOutAmount, address payable account) external payable {
    if (tokenIn.allowance(address(this), V3_SWAP_ROUTER_ADDRESS) < tokenInAmount) {
      tokenIn.approve(V3_SWAP_ROUTER_ADDRESS, MAX_INT);
    }
    assembly {
      let result := call(gas(), V3_SWAP_ROUTER_ADDRESS, callvalue(), add(data, 0x20), mload(data), 0, 0)
      returndatacopy(0, 0, returndatasize())
      switch result
      case 0 {
        revert(0, returndatasize())
      }
    }
    tokenOut.transfer(account, tokenOutAmount);
  }

  receive() external payable { }
}