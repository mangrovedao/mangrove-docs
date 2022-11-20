---
id: "LiquidityProvider"
title: "Class: LiquidityProvider"
sidebar_label: "LiquidityProvider"
sidebar_position: 0
custom_edit_url: null
---

The LiquidityProvider class connects an offerLogic (or an EOA) to a market.
It posts onchain offers.

## Properties

### <a id="mgv" name="mgv"></a> mgv

• **mgv**: [`Mangrove`](Mangrove.md)

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:54

___

### <a id="logic" name="logic"></a> logic

• `Optional` **logic**: [`OfferLogic`](OfferLogic.md)

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:55

___

### <a id="eoa" name="eoa"></a> eoa

• `Optional` **eoa**: `string`

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:56

___

### <a id="market" name="market"></a> market

• **market**: [`Market`](Market.md)

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:57

___

### <a id="prettyp" name="prettyp"></a> prettyP

• **prettyP**: `PrettyPrint`

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:58

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new LiquidityProvider**(`p`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | [`ConstructionParams`](../namespaces/LiquidityProvider-1.md#constructionparams) |

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:60

## Methods

### <a id="computeofferprovision" name="computeofferprovision"></a> computeOfferProvision

▸ **computeOfferProvision**(`ba`, `opts?`): `Promise`<`Big`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ba` | [`BA`](../namespaces/Market-1.md#ba) |
| `opts` | `Object` |
| `opts.id?` | `number` |
| `opts.gasreq?` | `number` |
| `opts.gasprice?` | `number` |

#### Returns

`Promise`<`Big`\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:73

___

### <a id="computebidprovision" name="computebidprovision"></a> computeBidProvision

▸ **computeBidProvision**(`opts?`): `Promise`<`Big`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.id?` | `number` |
| `opts.gasreq?` | `number` |
| `opts.gasprice?` | `number` |

#### Returns

`Promise`<`Big`\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:80

___

### <a id="computeaskprovision" name="computeaskprovision"></a> computeAskProvision

▸ **computeAskProvision**(`opts?`): `Promise`<`Big`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `opts` | `Object` |
| `opts.id?` | `number` |
| `opts.gasreq?` | `number` |
| `opts.gasprice?` | `number` |

#### Returns

`Promise`<`Big`\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:86

___

### <a id="getbidpivotid" name="getbidpivotid"></a> getBidPivotId

▸ **getBidPivotId**(`price`): `Promise`<`number`\>

Given a price, find the id of the immediately-better offer in the
semibook. If there is no offer with a better price, `undefined` is returned.

#### Parameters

| Name | Type |
| :------ | :------ |
| `price` | `any` |

#### Returns

`Promise`<`number`\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:95

___

### <a id="getaskpivotid" name="getaskpivotid"></a> getAskPivotId

▸ **getAskPivotId**(`price`): `Promise`<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `price` | `any` |

#### Returns

`Promise`<`number`\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:100

___

### <a id="asks" name="asks"></a> asks

▸ **asks**(): [`Offer`](../namespaces/Market-1.md#offer)[]

List all of the maker's asks in the cache

#### Returns

[`Offer`](../namespaces/Market-1.md#offer)[]

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:106

___

### <a id="bids" name="bids"></a> bids

▸ **bids**(): [`Offer`](../namespaces/Market-1.md#offer)[]

List all of the maker's bids in the cache

#### Returns

[`Offer`](../namespaces/Market-1.md#offer)[]

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:116

___

### <a id="consoleasks" name="consoleasks"></a> consoleAsks

▸ **consoleAsks**(`filter?`): `void`

Pretty prints the current state of the asks for the maker

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter?` | `prettyPrintFilter` |

#### Returns

`void`

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:126

___

### <a id="consolebids" name="consolebids"></a> consoleBids

▸ **consoleBids**(`filter?`): `void`

Pretty prints the current state of the bids for the maker

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter?` | `prettyPrintFilter` |

#### Returns

`void`

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:131

___

### <a id="newask" name="newask"></a> newAsk

▸ **newAsk**(`p`, `overrides?`): `Promise`<{ `id`: `number` ; `event`: `Log`  }\>

Post a new ask

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | [`OfferParams`](../namespaces/LiquidityProvider-1.md#offerparams) |
| `overrides` | `Overrides` |

#### Returns

`Promise`<{ `id`: `number` ; `event`: `Log`  }\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:202

___

### <a id="newbid" name="newbid"></a> newBid

▸ **newBid**(`p`, `overrides?`): `Promise`<{ `id`: `number` ; `event`: `Log`  }\>

Post a new bid

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | [`OfferParams`](../namespaces/LiquidityProvider-1.md#offerparams) |
| `overrides` | `Overrides` |

#### Returns

`Promise`<{ `id`: `number` ; `event`: `Log`  }\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:210

___

### <a id="mangroveallowance" name="mangroveallowance"></a> mangroveAllowance

▸ **mangroveAllowance**(`tokenName`): `Promise`<`Big`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenName` | `string` |

#### Returns

`Promise`<`Big`\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:218

___

### <a id="fundmangrove" name="fundmangrove"></a> fundMangrove

▸ **fundMangrove**(`amount`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `any` |
| `overrides` | `Overrides` |

#### Returns

`Promise`<`ContractTransaction`\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:226

___

### <a id="parseevents" name="parseevents"></a> parseEvents

▸ **parseEvents**(`receipt`, `contractInterface`, `eventName`): `any`[]

#### Parameters

| Name | Type |
| :------ | :------ |
| `receipt` | `ContractReceipt` |
| `contractInterface` | `any` |
| `eventName` | `string` |

#### Returns

`any`[]

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:253

___

### <a id="newoffer" name="newoffer"></a> newOffer

▸ **newOffer**(`p`, `overrides?`): `Promise`<{ `id`: `number` ; `pivot`: `number` ; `event`: `Log`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `p` | `Object` |
| `overrides` | `Overrides` |

#### Returns

`Promise`<{ `id`: `number` ; `pivot`: `number` ; `event`: `Log`  }\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:288

___

### <a id="updateask" name="updateask"></a> updateAsk

▸ **updateAsk**(`id`, `p`, `overrides?`): `Promise`<{ `event`: `Log`  }\>

to change volume and price of the offer, and update its gas requirement and fund 0.01 ether to maker balance

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `p` | [`OfferParams`](../namespaces/LiquidityProvider-1.md#offerparams) |
| `overrides` | `PayableOverrides` |

#### Returns

`Promise`<{ `event`: `Log`  }\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:341

___

### <a id="updatebid" name="updatebid"></a> updateBid

▸ **updateBid**(`id`, `p`, `overrides?`): `Promise`<{ `event`: `Log`  }\>

Update an existing offer

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `p` | [`OfferParams`](../namespaces/LiquidityProvider-1.md#offerparams) |
| `overrides` | `PayableOverrides` |

#### Returns

`Promise`<{ `event`: `Log`  }\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:350

___

### <a id="updateoffer" name="updateoffer"></a> updateOffer

▸ **updateOffer**(`id`, `p`, `overrides?`): `Promise`<{ `event`: `Log`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `number` |
| `p` | `Object` |
| `overrides` | `PayableOverrides` |

#### Returns

`Promise`<{ `event`: `Log`  }\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:362

___

### <a id="retractask" name="retractask"></a> retractAsk

▸ **retractAsk**(`id`, `deprovision?`, `overrides?`): `Promise`<`void`\>

Cancel an ask. If deprovision is true, will return the offer's provision to the maker balance at Mangrove.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `number` | `undefined` |
| `deprovision` | `boolean` | `false` |
| `overrides` | `Overrides` | `{}` |

#### Returns

`Promise`<`void`\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:424

___

### <a id="retractbid" name="retractbid"></a> retractBid

▸ **retractBid**(`id`, `deprovision?`, `overrides?`): `Promise`<`void`\>

Cancel a bid. If deprovision is true, will return the offer's provision to the maker balance at Mangrove.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `id` | `number` | `undefined` |
| `deprovision` | `boolean` | `false` |
| `overrides` | `Overrides` | `{}` |

#### Returns

`Promise`<`void`\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:433

___

### <a id="retractoffer" name="retractoffer"></a> retractOffer

▸ **retractOffer**(`ba`, `id`, `deprovision?`, `overrides?`): `Promise`<`void`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `ba` | [`BA`](../namespaces/Market-1.md#ba) | `undefined` |
| `id` | `number` | `undefined` |
| `deprovision` | `boolean` | `false` |
| `overrides` | `Overrides` | `{}` |

#### Returns

`Promise`<`void`\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:442

___

### <a id="balanceonmangrove" name="balanceonmangrove"></a> balanceOnMangrove

▸ **balanceOnMangrove**(`arg?`, `overrides?`): `Promise`<`Big`\>

**`Note`**

Get the current balance the liquidity provider has on Mangrove
If this liquidity provider has a multi user underlying logic, the balance corresponds to the sum of all offers' available balances

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `Object` |
| `arg.owner?` | `string` |
| `overrides` | `Overrides` |

#### Returns

`Promise`<`Big`\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:485

___

### <a id="tokenbalance" name="tokenbalance"></a> tokenBalance

▸ **tokenBalance**(`tokenName`, `overrides?`): `Promise`<`Big`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `tokenName` | `string` |
| `overrides` | `Overrides` |

#### Returns

`Promise`<`Big`\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:499

___

### <a id="withdrawfrommangrove" name="withdrawfrommangrove"></a> withdrawFromMangrove

▸ **withdrawFromMangrove**(`amount`, `overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `any` |
| `overrides` | `Overrides` |

#### Returns

`Promise`<`ContractTransaction`\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:511

___

### <a id="approveasks" name="approveasks"></a> approveAsks

▸ **approveAsks**(`overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides` | `Overrides` |

#### Returns

`Promise`<`ContractTransaction`\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:537

___

### <a id="approvebids" name="approvebids"></a> approveBids

▸ **approveBids**(`overrides?`): `Promise`<`ContractTransaction`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `overrides` | `Overrides` |

#### Returns

`Promise`<`ContractTransaction`\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:542

___

### <a id="getmissingprovision" name="getmissingprovision"></a> getMissingProvision

▸ **getMissingProvision**(`ba`, `opts?`): `Promise`<`Big`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ba` | [`BA`](../namespaces/Market-1.md#ba) |
| `opts` | `Object` |
| `opts.id?` | `number` |
| `opts.gasreq?` | `number` |
| `opts.gasprice?` | `number` |

#### Returns

`Promise`<`Big`\>

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:549