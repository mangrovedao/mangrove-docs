---
description: The Mangrove is an on-chain, orderbook-based exchange where offers are code.
sidebar_position: 1
---

# Mangrove developer documentation

## Who is this documentation for?

* This documentation is targeted at readers who want to learn technical details about the Mangrove for instance to interact with it through code on-chain or off-chain.
* For a higher-level intro to Mangrove, check out [mangrove.exchange](https://mangrove.exchange).
* Strategy builders or market makers should check out the [contracts](README.md) documentation on how to write offers as code or post offers on-chain.
* Off-chain builders writing, e.g., bots or UI, should check out the [Mangrove API](../mangrove-js/).
* If you want to modify and improve the core of Mangrove, [read the annotated code](https://code.mangrove.exchange/MgvDoc.html) and head to the [GitHub repository](https://github.com/mangrovedao/mangrove-core).
* All GitHub repositories can be found in the [mangrovedao](https://github.com/mangrovedao).

![A bird's-eye view of the Mangrove ecosystem.](../../static/img/assets/contactMap.png)

## Who interacts with Mangrove

There are 3 types of actors in play:

* Offer makers add [liquidity promises](mangrove-core/explanations/offer-maker/README.md) to Mangrove. They own offers in [offer lists](te/takin/../../technical-references/taking-and-making-offers/market.md) and must manage contracts that react to [offer execution](mangrove-core/technical-references/taking-and-making-offers/reactive-offer/offer-data-structures.md).
* Takers go to Mangrove to [find liquidity](mangrove-core/explanations/offer-taker.md) by executing offers already in Mangrove.
* [Governance](technical-references/governance-parameters/README.md) adjusts Mangrove parameters, opens new pairs, sets fees, etc.