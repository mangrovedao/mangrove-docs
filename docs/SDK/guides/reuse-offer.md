---
description: Create fill or kill order using mangrove.js
sidebar_position: 4
---

# Reuse Offer

## Intro

In this section we will go through how to reuse an offer, that has been taken or has failed. When an offer is taken, the offer still exists in Mangrove. This means that a previous offer made, can be reused again by the same maker. The same applies for an offer that failed when it was taken. The reason for keeping the offers around, is that cleaning up old/dead offers costs gas and by reusing a existing offer we save gas vs posting a completely new offer. This means that when we post an offer, we should always try and save the offer id used for that offer, in case we ever want to reuse it, when it no longer live.

### Update existing offer

In order to update an offer that is no longer live, we need an offer that has been taken or failed. In this case we are going to use a offer id of 5573. If you do not have an offer that has been taken, you can either snipe an existing offer that you already own or simply post a completely new offer and then snipe it. This way you can insure that you have an offer that exists but is not longer live. The [script](https://github.com/mangrovedao/mangrove-ts/blob/de55575801c9da7cecd618f2dc8dc00985028c24/packages/mangrove.js/examples/how-tos/reuse-offer.js) has some out-commented sections that helps with creating a dead offer.

When we have a dead offer, then we can figure out how much %%provision|provision%% is needed in order to update it. This is done by using the [`computeAskProvision`](../technical-references/code/classes/LiquidityProvider#-computeaskprovision) given the offer id, we are going to update. We now know the offer id we want to update and the provision need to do it. The last thing we need is to give a wants and a gives for the offer. In this case we are going to use `wants:1000.5` and `gives: 1000.4`.

If we look at the asks before and after we have updated the offer, we now see that our offer has been updated and is on top of the order book.

<!-- TODO: add better return info description, when this issue is fixed  https://github.com/mangrovedao/mangrove-ts/issues/866 -->

```js reference
https://github.com/mangrovedao/mangrove-ts/blob/de55575801c9da7cecd618f2dc8dc00985028c24/packages/mangrove.js/examples/how-tos/reuse-offer.js#L61-L74
```

```js title="Asks before update"x
> market.consoleAsks();
┌─────────┬──────┬──────────────────────────────────────────────┬────────────────────┬────────────────────────┐
│ (index) │  id  │                    maker                     │       volume       │         price          │
├─────────┼──────┼──────────────────────────────────────────────┼────────────────────┼────────────────────────┤
│    0    │ 1173 │ '0x4326Ab97823d7509C1f0CB3bF68151081B26c970' │ 844.0536473037303  │ 1.00354291069746851135 │
│    1    │ 3003 │ '0x2CB51201CD176CcEa67a9c0B64391aE34e50C058' │ 280.69589368327456 │ 1.00354551434175376498 │
│    2    │ 967  │ '0x4326Ab97823d7509C1f0CB3bF68151081B26c970' │ 578.3096271867598  │ 1.00355019649807276339 │
```

```js title="Asks after update"
> market.consoleAsks();
┌─────────┬──────┬──────────────────────────────────────────────┬────────────────────┬────────────────────────┐
│ (index) │  id  │                    maker                     │       volume       │         price          │
├─────────┼──────┼──────────────────────────────────────────────┼────────────────────┼────────────────────────┤
│    0    │ 5573 │ '0xA4C7c59EB3D4Ab5CA4E6fB012CeD9c8F9A5Ecdd8' │       1000.4       │ 1.00009996001599360256 │
│    1    │ 1173 │ '0x4326Ab97823d7509C1f0CB3bF68151081B26c970' │ 844.0536473037303  │ 1.00354291069746851135 │
│    2    │ 3003 │ '0x2CB51201CD176CcEa67a9c0B64391aE34e50C058' │ 280.69589368327456 │ 1.00354551434175376498 │
```