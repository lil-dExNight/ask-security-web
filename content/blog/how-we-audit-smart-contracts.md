---
title: "How We Audit Smart Contracts: A Walkthrough of Our Process"
date: "2026-08-20"
excerpt: "From threat modeling to the final report — a transparent look at the five phases every ASK Security audit goes through."
draft: true
tags: ["audits", "solidity", "methodology"]
---

A smart contract audit is not a bug bounty with a fixed scope. Done properly, it is an adversarial review of a system's economic design, its code, and everything in between. Here is how we run one.

## Phase 1: Threat modeling before code

Before we read a single line of Solidity, we map the system's trust assumptions:

- Who can upgrade what, and through which timelock?
- Which oracles are trusted, and what happens when they lie?
- Where does value enter, where does it leave, and who profits at each step?

Most critical findings we report are design flaws, not typos. A reentrancy guard cannot save a protocol whose price oracle can be manipulated within a single block.

## Phase 2: Manual review, line by line

Every line of in-scope code is read by at least two auditors independently. We annotate invariants directly in the source:

```solidity
// invariant: totalShares == 0 iff totalAssets == 0
function deposit(uint256 assets) external returns (uint256 shares) {
    shares = convertToShares(assets);
    _mint(msg.sender, shares);
    asset.safeTransferFrom(msg.sender, address(this), assets);
}
```

Two readers catch different classes of bugs. One tends to follow control flow; the other follows the money.

## Phase 3: Tooling, then verification of every hit

We run static analyzers and fuzzers, but we treat them as lead generators, not verdicts:

| Tool | What it is good at | What it misses |
| ---- | ------------------ | -------------- |
| Slither | cheap detector patterns | cross-contract logic |
| Echidna | invariant fuzzing | needs well-written properties |
| Foundry fork tests | real mainnet state | only as good as the scenario |
| Manual review | economic attacks | slow, expensive |

Every automated hit is either reproduced as a proof of concept or explicitly dismissed with a written rationale.

## Phase 4: Adversarial proof of concepts

A finding without a PoC is a hypothesis. For each medium-or-higher issue we write a runnable exploit:

```bash
forge test --match-test test_oracle_manipulation -vvv --fork-url $MAINNET_RPC
```

If we cannot exploit it, we say so and downgrade the severity. Theoretical severity inflation helps no one.

## Phase 5: Report, remediation, re-review

The report is delivered as a structured document — severity, impact, likelihood, affected code, recommended fix. After the team remediates, we re-review every patch. Roughly a third of the fixes we verify introduce new, smaller issues; that loop is normal and it is why the re-review is not optional.

## What this means for you

If you are scoping an audit, budget for the re-review and for the design discussion in week one. The earlier we see the architecture, the cheaper your critical findings become.

Want the full checklist we use internally? Reach out on [Telegram](https://t.me/asksecurity) — we share it with every client.
