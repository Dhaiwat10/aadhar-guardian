/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  IAnonAadhaarVerifier,
  IAnonAadhaarVerifierInterface,
} from "../../interfaces/IAnonAadhaarVerifier";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "_pA",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[2][2]",
        name: "_pB",
        type: "uint256[2][2]",
      },
      {
        internalType: "uint256[2]",
        name: "_pC",
        type: "uint256[2]",
      },
      {
        internalType: "uint256[34]",
        name: "_pubSignals",
        type: "uint256[34]",
      },
    ],
    name: "verifyProof",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export class IAnonAadhaarVerifier__factory {
  static readonly abi = _abi;
  static createInterface(): IAnonAadhaarVerifierInterface {
    return new Interface(_abi) as IAnonAadhaarVerifierInterface;
  }
  static connect(
    address: string,
    runner?: ContractRunner | null
  ): IAnonAadhaarVerifier {
    return new Contract(
      address,
      _abi,
      runner
    ) as unknown as IAnonAadhaarVerifier;
  }
}
