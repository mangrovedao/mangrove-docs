---
id: "KandelSeeder"
title: "Class: KandelSeeder"
sidebar_label: "KandelSeeder"
sidebar_position: 0
custom_edit_url: null
---

Seeder for creating Kandel instances on-chain.

## Properties

### <a id="mgv" name="mgv"></a> mgv

• **mgv**: [`Mangrove`](Mangrove.md)

#### Defined in

@mangrovedao/mangrove.js/src/kandel/kandelSeeder.ts:34

___

### <a id="tradeeventmanagement" name="tradeeventmanagement"></a> tradeEventManagement

• **tradeEventManagement**: `TradeEventManagement`

#### Defined in

@mangrovedao/mangrove.js/src/kandel/kandelSeeder.ts:35

___

### <a id="aavekandelseeder" name="aavekandelseeder"></a> aaveKandelSeeder

• **aaveKandelSeeder**: `AaveKandelSeeder`

#### Defined in

@mangrovedao/mangrove.js/src/kandel/kandelSeeder.ts:37

___

### <a id="kandelseeder" name="kandelseeder"></a> kandelSeeder

• **kandelSeeder**: `KandelSeeder`

#### Defined in

@mangrovedao/mangrove.js/src/kandel/kandelSeeder.ts:38

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new KandelSeeder**(`mgv`)

Constructor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mgv` | [`Mangrove`](Mangrove.md) | The Mangrove to deploy to. |

#### Defined in

@mangrovedao/mangrove.js/src/kandel/kandelSeeder.ts:43

## Methods

### <a id="sow" name="sow"></a> sow

▸ **sow**(`seed`, `overrides?`): `Promise`<{ `response`: `Promise`<`ContractTransaction`\> ; `kandelPromise`: `Promise`<[`KandelInstance`](KandelInstance.md)\>  }\>

Create a new Kandel instance.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | `KandelSeed` | The parameters for sowing the Kandel instance. |
| `overrides` | `Overrides` | - |

#### Returns

`Promise`<{ `response`: `Promise`<`ContractTransaction`\> ; `kandelPromise`: `Promise`<[`KandelInstance`](KandelInstance.md)\>  }\>

#### Defined in

@mangrovedao/mangrove.js/src/kandel/kandelSeeder.ts:68

___

### <a id="getkandelfromreceipt" name="getkandelfromreceipt"></a> getKandelFromReceipt

▸ **getKandelFromReceipt**(`params`): `Promise`<[`KandelInstance`](KandelInstance.md)\>

Gets the Kandel instance created in a transaction via sow.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | The parameters. |
| `params.receipt` | `ContractReceipt` | The receipt of the transaction. |
| `params.onAave` | `boolean` | Whether the Kandel is an AaveKandel. |
| `params.market` | [`Market`](Market.md) | The market the Kandel is for. |

#### Returns

`Promise`<[`KandelInstance`](KandelInstance.md)\>

The Kandel instance created in the transaction.

#### Defined in

@mangrovedao/mangrove.js/src/kandel/kandelSeeder.ts:103

___

### <a id="getdefaultgasreq" name="getdefaultgasreq"></a> getDefaultGasreq

▸ **getDefaultGasreq**(`onAave`): `Promise`<`number`\>

Retrieves the default gasreq for the Kandel type.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `onAave` | `boolean` | Whether to get the gasreq for an AaveKandel or a standard Kandel. |

#### Returns

`Promise`<`number`\>

The gasreq for the Kandel type.

#### Defined in

@mangrovedao/mangrove.js/src/kandel/kandelSeeder.ts:143

___

### <a id="getbufferedgasprice" name="getbufferedgasprice"></a> getBufferedGasprice

▸ **getBufferedGasprice**(`seed`): `Promise`<`number`\>

Retrieves the gasprice for the Kandel type multiplied by the buffer factor.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | `KandelSeed` | The parameters for sowing the Kandel instance. |

#### Returns

`Promise`<`number`\>

The gasprice for the Kandel type multiplied by the buffer factor.

#### Defined in

@mangrovedao/mangrove.js/src/kandel/kandelSeeder.ts:160

___

### <a id="getrequiredprovision" name="getrequiredprovision"></a> getRequiredProvision

▸ **getRequiredProvision**(`seed`, `distribution`): `Promise`<`any`\>

Determines the required provision for the distribution prior to sowing.

**`Remarks`**

This takes into account that each price point can become both an ask and a bid which both require provision.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `seed` | `KandelSeed` | The parameters for sowing the Kandel instance. |
| `distribution` | [`KandelDistribution`](KandelDistribution.md) | The distribution to determine the provision for. |

#### Returns

`Promise`<`any`\>

The provision required for the distribution.

#### Defined in

@mangrovedao/mangrove.js/src/kandel/kandelSeeder.ts:173