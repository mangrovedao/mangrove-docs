---
id: "LiquidityProvider-1"
title: "Namespace: LiquidityProvider"
sidebar_label: "LiquidityProvider"
sidebar_position: 0
custom_edit_url: null
---

## Type Aliases

### <a id="constructionparams" name="constructionparams"></a> ConstructionParams

Ƭ **ConstructionParams**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `mgv` | [`Mangrove`](../classes/Mangrove.md) |
| `logic?` | [`OfferLogic`](../classes/OfferLogic.md) |
| `eoa?` | `string` |
| `market` | [`Market`](../classes/Market.md) |

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:21

___

### <a id="offerparams" name="offerparams"></a> OfferParams

Ƭ **OfferParams**: { `price`: `Bigish` ; `volume`: `Bigish`  } & `OptParams` \| { `wants`: `Bigish` ; `gives`: `Bigish`  } & `OptParams`

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:34

___

### <a id="offeractionresult" name="offeractionresult"></a> OfferActionResult

Ƭ **OfferActionResult**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `offerType` | [`BA`](Market-1.md#ba) |
| `market` | `string` |
| `txReceipt` | `ethers.ContractReceipt` |
| `id` | `number` |
| `gasprice?` | `number` |
| `gasreq?` | `number` |
| `refund?` | `Big` |

#### Defined in

@mangrovedao/mangrove.js/src/liquidityProvider.ts:38