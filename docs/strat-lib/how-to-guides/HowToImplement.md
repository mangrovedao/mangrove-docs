---
sidebar_position: 1
---

# How to implement a safe offer logic

## Gatekeeping
Verify external function's caller. Tricky public function that might be called during offer logic's execution.

## Token amounts
%%Outbound|outbound%% and %%inbound|inbound%% tokens may have different decimals. Mangrove always use raw amounts.

## Which part of your %%Maker contract|makerContract%% should not be in the %%offer logic|offerLogic%%?
Functions in offer logic are automatically executed by Mangrove, who is then `msg.sender`. Beware that taker is not necessarily `tx.origin`, as a contract could be acting as a taker. If your logic is exploitable by price manipulation, this can be dangerous (lastLook is there to protect). Dangers are: oracle manipulation, or liquiditation. Better have risky moves being admin controlled.

## How to factor your offer logic between %%`makerExecute`|makerExecute%% and %%`makerPosthook`|makerPosthook%%.

**Must** be in maker execute: 
* decision to renege on trade
* every moves that are needed to bring liquidity promised to the taker. 

The offer logic in `makerExecute` **should** be gas bounded since an out-of-gas exception will lead to Mangrove transfering your whole %%provision|provision%% to the taker as a %%bounty|bounty%%.

**Must** be in `makerPoshtook`:
* any write action to the %%offer list|offerList%% to which the currently executed offer belongs.
* any logging of a revert reason raised during `makerExecute`. The (truncated to a bytes32) reason is passed to `makerPosthook` in the `makerData` field.

**Should** be in `makerPosthook`:
* actions that are not gas bounded, such as posting or updating an offer on Mangrove (unless you have a clear %%pivotId|pivotId%%).
* in general, calls which may raise an exception that should not cause the current trade execution to fail.

## Keepers as krankers
An offer that fails should not come from a bug in your offer logic, but rather be a feature of it. Raising an exception during `makerExecute` is the proper way to cancel a trade if your logic deems it necessary. You should customize the `lastLook` %%hook|hook%% for this, in order to fail early in the trade and save you money. For instance, if your logic relies on funds being on a lender, and a price oracle as a relative protection against arbitrage, you should check the oracle before redeeming the funds from the lender.