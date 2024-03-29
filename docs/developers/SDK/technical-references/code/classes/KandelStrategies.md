---
id: "KandelStrategies"
title: "Class: KandelStrategies"
sidebar_label: "KandelStrategies"
sidebar_position: 0
custom_edit_url: null
---

Entrypoint for the Kandel strategies. Kandel is an Automated Market Making strategy that uses on-chain order flow to repost offers instantly, without any latency. Within a market and price range you select, Kandel automatically posts bids and asks. Its main goal is to buy low and sell high - profits are made through accumulated spread.

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new KandelStrategies**(`mgv`): [`KandelStrategies`](KandelStrategies.md)

Constructor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mgv` | [`Mangrove`](Mangrove.md) | The Mangrove to interact with. |

#### Returns

[`KandelStrategies`](KandelStrategies.md)

#### Defined in

@mangrovedao/mangrove.js/src/kandelStrategies.ts:34

## Properties

### <a id="seeder" name="seeder"></a> seeder

• **seeder**: [`KandelSeeder`](KandelSeeder.md)

Seeder for creating Kandel instances on-chain.

#### Defined in

@mangrovedao/mangrove.js/src/kandelStrategies.ts:20

___

### <a id="farm" name="farm"></a> farm

• **farm**: [`KandelFarm`](KandelFarm.md)

Repository for Kandel instances.

#### Defined in

@mangrovedao/mangrove.js/src/kandelStrategies.ts:23

___

### <a id="mgv" name="mgv"></a> mgv

• **mgv**: [`Mangrove`](Mangrove.md)

The Mangrove to interact with.

#### Defined in

@mangrovedao/mangrove.js/src/kandelStrategies.ts:26

___

### <a id="configuration" name="configuration"></a> configuration

• **configuration**: [`KandelConfiguration`](KandelConfiguration.md)

The default configuration values to use for Kandel.

#### Defined in

@mangrovedao/mangrove.js/src/kandelStrategies.ts:29

## Methods

### <a id="instance" name="instance"></a> instance

▸ **instance**(`params`): `Promise`<[`GeometricKandelInstance`](GeometricKandelInstance.md)\>

Creates a KandelInstance object to interact with a Kandel strategy on Mangrove.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | The parameters for creating the KandelInstance. |
| `params.address` | `string` | The address of the Kandel strategy. |
| `params.market` | [`Market`](Market.md) \| (`baseAddress`: `string`, `quoteAddress`: `string`, `tickSpacing`: `number`) => `Promise`<[`Market`](Market.md)\> | The market used by the Kandel instance or a factory function to create the market. |

#### Returns

`Promise`<[`GeometricKandelInstance`](GeometricKandelInstance.md)\>

A new KandelInstance.

**`Dev`**

If a factory function is provided for the market, then remember to disconnect market when no longer needed.

#### Defined in

@mangrovedao/mangrove.js/src/kandelStrategies.ts:48

___

### <a id="generator" name="generator"></a> generator

▸ **generator**(`market`): [`GeometricKandelDistributionGenerator`](GeometricKandelDistributionGenerator.md)

Creates a generator for generating Kandel distributions for the given market.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `market` | [`Market`](Market.md) | The market to calculate for. |

#### Returns

[`GeometricKandelDistributionGenerator`](GeometricKandelDistributionGenerator.md)

A new KandelDistributionGenerator.

#### Defined in

@mangrovedao/mangrove.js/src/kandelStrategies.ts:93
