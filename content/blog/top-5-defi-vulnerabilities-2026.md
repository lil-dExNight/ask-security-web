---
title: "Top 5 DeFi Vulnerabilities We Keep Seeing in 2026"
date: "2026-09-02"
excerpt: "Reentrancy is old news. The bugs draining protocols this year are subtler: oracle games, cross-chain replay, and accounting drift."
draft: true
tags: ["defi", "vulnerabilities", "research"]
---

The classics — reentrancy, integer overflow, missing access control — still appear, but modern tooling catches most of them. The exploits that actually drain treasuries in 2026 look different. These are the five patterns we flag most often.

## 1. Oracle manipulation via "just-in-time" liquidity

Spot-price oracles remain the single largest loss category. The twist this year: attackers seed thin pools on the same L2 moments before a lending market reads the price.

```solidity
// vulnerable: spot price from a single pool
uint256 price = pool.slot0().sqrtPriceX96;
uint256 collateralValue = (uint256(price) * amount) / Q96;
```

**Mitigation:** TWAP with a sufficiently long window, or a median across independent sources. If your oracle fits in one `slot0()` call, assume it is manipulable.

## 2. Cross-chain message replay

Bridge adapters that do not bind messages to `(sourceChainId, nonce, target)` tuples let a valid message be replayed on a second chain. We saw this twice in Q2 alone.

- Always include the chain ID in the signed payload.
- Track consumed nonces per source chain, not globally.

## 3. Share inflation on first deposit

The classic ERC-4626 first-depositor attack keeps resurfacing in forked vault codebases:

1. Attacker deposits 1 wei, receives 1 share.
2. Attacker donates a large amount directly to the vault.
3. Next depositor's shares round down to zero; attacker redeems everything.

**Mitigation:** mint dead shares at deployment, or use virtual shares/assets offsets as in the current OpenZeppelin implementation.

## 4. Accounting drift between modules

Protocols that track the same balance in two places — a vault and its strategy, a pool and its rewarder — drift apart over time as rounding accumulates:

| Component | Tracks | Drift source |
| --------- | ------ | ------------ |
| Vault | shares -> assets | rounding on withdraw |
| Strategy | assets deployed | harvest timing |
| Rewarder | accrued rewards | block timestamp vs. epoch |

The drift is usually worth cents — until an attacker finds the withdrawal order that amplifies it.

## 5. Governance-timelock gaps

Upgrade paths that require a timelock *except* for "emergency" multisig actions are an emergency-only rug vector. If a 2-of-5 can pause withdrawals *and* upgrade the implementation atomically, the timelock is decorative.

## The pattern

Every item on this list is a **system** bug, not a line bug. None of them survive a serious threat-modeling session. If your audit starts at the code, it starts too late.
