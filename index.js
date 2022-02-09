module.exports = {
  "UniV3Adapter": {
    "address": "0x338e89eeE89fCb4937Fe401214Cee5C538823EaF",
    "abi": [
      {
        "inputs": [
          {
            "internalType": "contract IWETH",
            "name": "_weth",
            "type": "address"
          }
        ],
        "name": "initialize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "initialized",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          },
          {
            "internalType": "contract IERC20",
            "name": "tokenIn",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenInAmount",
            "type": "uint256"
          },
          {
            "internalType": "contract IERC20",
            "name": "tokenOut",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "tokenOutAmount",
            "type": "uint256"
          },
          {
            "internalType": "address payable",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "uniV3Swap",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "weth",
        "outputs": [
          {
            "internalType": "contract IWETH",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "stateMutability": "payable",
        "type": "receive"
      }
    ],
    "bytecode": "0x6080604052600019600155600280546001600160a01b0319167371795b2d53ffbe5b1805fe725538e4f8fbd29e2617905534801561003c57600080fd5b506107b48061004c6000396000f3fe6080604052600436106100435760003560e01c8063158ef93e1461004f578063278485bf146100845780633fc8cef314610150578063c4d66de81461018c57600080fd5b3661004a57005b600080fd5b34801561005b57600080fd5b5060005461007090600160a01b900460ff1681565b604080519115158252519081900360200190f35b61014e600480360360c081101561009a57600080fd5b8101906020810181356401000000008111156100b557600080fd5b8201836020820111156100c757600080fd5b803590602001918460018302840111640100000000831117156100e957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550506001600160a01b038335811694506020840135936040810135821693506060810135925060800135166101bf565b005b34801561015c57600080fd5b50600054610170906001600160a01b031681565b604080516001600160a01b039092168252519081900360200190f35b34801561019857600080fd5b5061014e600480360360208110156101af57600080fd5b50356001600160a01b03166106cd565b6101c88561076d565b1561034a5760005460408051636eb1769f60e11b81523060048201527368b3465833fb72a70ecdf485e0e4c7bd8665fc456024820152905186926001600160a01b03169163dd62ed3e9160448083019260209291908290030181865afa158015610236573d6000803e3d6000fd5b505050506040513d602081101561024c57600080fd5b505110156102de57600080546001546040805163095ea7b360e01b81527368b3465833fb72a70ecdf485e0e4c7bd8665fc4560048201526024810192909252516001600160a01b039092169263095ea7b39260448084019360209390839003909101908290875af11580156102c5573d6000803e3d6000fd5b505050506040513d60208110156102db57600080fd5b50505b60008054906101000a90046001600160a01b03166001600160a01b031663d0e30db0346040518263ffffffff1660e01b81526004016000604051808303818588803b15801561032c57600080fd5b505af1158015610340573d6000803e3d6000fd5b5050505050610454565b60408051636eb1769f60e11b81523060048201527368b3465833fb72a70ecdf485e0e4c7bd8665fc456024820152905185916001600160a01b0388169163dd62ed3e916044808201926020929091908290030181865afa1580156103b2573d6000803e3d6000fd5b505050506040513d60208110156103c857600080fd5b50511015610454576001546040805163095ea7b360e01b81527368b3465833fb72a70ecdf485e0e4c7bd8665fc4560048201526024810192909252516001600160a01b0387169163095ea7b391604480830192602092919082900301816000875af115801561043b573d6000803e3d6000fd5b505050506040513d602081101561045157600080fd5b50505b60008087516020890160007368b3465833fb72a70ecdf485e0e4c7bd8665fc455af1506104808361076d565b1561055a576000805460408051632e1a7d4d60e01b815247600482015290516001600160a01b0390921692632e1a7d4d9260248084019382900301818387803b1580156104cc57600080fd5b505af11580156104e0573d6000803e3d6000fd5b50506040516001600160a01b038416925084156108fc02915084906000818181858888f1935050505015801561051a573d6000803e3d6000fd5b506002546040516001600160a01b03909116904780156108fc02916000818181858888f19350505050158015610554573d6000803e3d6000fd5b506106c5565b826001600160a01b031663a9059cbb82846040518363ffffffff1660e01b815260040180836001600160a01b03168152602001828152602001925050506020604051808303816000875af11580156105b6573d6000803e3d6000fd5b505050506040513d60208110156105cc57600080fd5b5050600254604080516370a0823160e01b815230600482015290516001600160a01b038087169363a9059cbb9391169184916370a082319160248083019260209291908290030181865afa158015610628573d6000803e3d6000fd5b505050506040513d602081101561063e57600080fd5b5051604080517fffffffff0000000000000000000000000000000000000000000000000000000060e086901b1681526001600160a01b039093166004840152602483019190915251604480830192602092919082900301816000875af11580156106ac573d6000803e3d6000fd5b505050506040513d60208110156106c257600080fd5b50505b505050505050565b600054600160a01b900460ff161561072c576040805162461bcd60e51b815260206004820152600b60248201527f494e495449414c495a4544000000000000000000000000000000000000000000604482015290519081900360640190fd5b600080546001600160a01b039092167fffffffffffffffffffffff00000000000000000000000000000000000000000090921691909117600160a01b179055565b60006001600160a01b03821615806107a157506001600160a01b03821673eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee145b9291505056fea164736f6c634300080a000a",
    "deployedBytecode": "0x6080604052600436106100435760003560e01c8063158ef93e1461004f578063278485bf146100845780633fc8cef314610150578063c4d66de81461018c57600080fd5b3661004a57005b600080fd5b34801561005b57600080fd5b5060005461007090600160a01b900460ff1681565b604080519115158252519081900360200190f35b61014e600480360360c081101561009a57600080fd5b8101906020810181356401000000008111156100b557600080fd5b8201836020820111156100c757600080fd5b803590602001918460018302840111640100000000831117156100e957600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600092019190915250929550506001600160a01b038335811694506020840135936040810135821693506060810135925060800135166101bf565b005b34801561015c57600080fd5b50600054610170906001600160a01b031681565b604080516001600160a01b039092168252519081900360200190f35b34801561019857600080fd5b5061014e600480360360208110156101af57600080fd5b50356001600160a01b03166106cd565b6101c88561076d565b1561034a5760005460408051636eb1769f60e11b81523060048201527368b3465833fb72a70ecdf485e0e4c7bd8665fc456024820152905186926001600160a01b03169163dd62ed3e9160448083019260209291908290030181865afa158015610236573d6000803e3d6000fd5b505050506040513d602081101561024c57600080fd5b505110156102de57600080546001546040805163095ea7b360e01b81527368b3465833fb72a70ecdf485e0e4c7bd8665fc4560048201526024810192909252516001600160a01b039092169263095ea7b39260448084019360209390839003909101908290875af11580156102c5573d6000803e3d6000fd5b505050506040513d60208110156102db57600080fd5b50505b60008054906101000a90046001600160a01b03166001600160a01b031663d0e30db0346040518263ffffffff1660e01b81526004016000604051808303818588803b15801561032c57600080fd5b505af1158015610340573d6000803e3d6000fd5b5050505050610454565b60408051636eb1769f60e11b81523060048201527368b3465833fb72a70ecdf485e0e4c7bd8665fc456024820152905185916001600160a01b0388169163dd62ed3e916044808201926020929091908290030181865afa1580156103b2573d6000803e3d6000fd5b505050506040513d60208110156103c857600080fd5b50511015610454576001546040805163095ea7b360e01b81527368b3465833fb72a70ecdf485e0e4c7bd8665fc4560048201526024810192909252516001600160a01b0387169163095ea7b391604480830192602092919082900301816000875af115801561043b573d6000803e3d6000fd5b505050506040513d602081101561045157600080fd5b50505b60008087516020890160007368b3465833fb72a70ecdf485e0e4c7bd8665fc455af1506104808361076d565b1561055a576000805460408051632e1a7d4d60e01b815247600482015290516001600160a01b0390921692632e1a7d4d9260248084019382900301818387803b1580156104cc57600080fd5b505af11580156104e0573d6000803e3d6000fd5b50506040516001600160a01b038416925084156108fc02915084906000818181858888f1935050505015801561051a573d6000803e3d6000fd5b506002546040516001600160a01b03909116904780156108fc02916000818181858888f19350505050158015610554573d6000803e3d6000fd5b506106c5565b826001600160a01b031663a9059cbb82846040518363ffffffff1660e01b815260040180836001600160a01b03168152602001828152602001925050506020604051808303816000875af11580156105b6573d6000803e3d6000fd5b505050506040513d60208110156105cc57600080fd5b5050600254604080516370a0823160e01b815230600482015290516001600160a01b038087169363a9059cbb9391169184916370a082319160248083019260209291908290030181865afa158015610628573d6000803e3d6000fd5b505050506040513d602081101561063e57600080fd5b5051604080517fffffffff0000000000000000000000000000000000000000000000000000000060e086901b1681526001600160a01b039093166004840152602483019190915251604480830192602092919082900301816000875af11580156106ac573d6000803e3d6000fd5b505050506040513d60208110156106c257600080fd5b50505b505050505050565b600054600160a01b900460ff161561072c576040805162461bcd60e51b815260206004820152600b60248201527f494e495449414c495a4544000000000000000000000000000000000000000000604482015290519081900360640190fd5b600080546001600160a01b039092167fffffffffffffffffffffff00000000000000000000000000000000000000000090921691909117600160a01b179055565b60006001600160a01b03821615806107a157506001600160a01b03821673eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee145b9291505056fea164736f6c634300080a000a"
  }
}
