---
id: "Token"
title: "Class: Token"
sidebar_label: "Token"
sidebar_position: 0
custom_edit_url: null
---

Calculates to and from units for a token based on decimals

## Hierarchy

- [`TokenCalculations`](TokenCalculations.md)

  ↳ **`Token`**

## Properties

### <a id="decimals" name="decimals"></a> decimals

• **decimals**: `number`

Number of decimals used by the token.

#### Inherited from

[TokenCalculations](TokenCalculations.md).[decimals](TokenCalculations.md#decimals)

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:65

___

### <a id="displayeddecimals" name="displayeddecimals"></a> displayedDecimals

• **displayedDecimals**: `number`

#### Inherited from

[TokenCalculations](TokenCalculations.md).[displayedDecimals](TokenCalculations.md#displayeddecimals)

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:66

___

### <a id="contract" name="contract"></a> contract

• **contract**: `TestToken`

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:130

___

### <a id="id" name="id"></a> id

• **id**: `string`

ID which should be unique within a network, but can be used across networks. Typically the id from the context-addresses package. May be the symbol if the symbol is unique. NB: This uniqueness is not enforced and duplicates will give undefined behavior.

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:144

___

### <a id="address" name="address"></a> address

• **address**: `string`

Address of the token contract.

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:145

___

### <a id="symbol" name="symbol"></a> symbol

• **symbol**: `undefined` \| `string`

Non-unique and optional symbol cf. ERC20.

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:146

___

### <a id="displayname" name="displayname"></a> displayName

• **displayName**: `undefined` \| `string`

Optional display name for the token.

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:148

___

### <a id="displayedaspricedecimals" name="displayedaspricedecimals"></a> displayedAsPriceDecimals

• **displayedAsPriceDecimals**: `number`

Number of decimals to display in the UI when showing a price.

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:150

___

### <a id="mgv" name="mgv"></a> mgv

• **mgv**: [`Mangrove`](Mangrove.md)

The Mangrove instance this token is associated with.

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:151

## Methods

### <a id="fromunits" name="fromunits"></a> fromUnits

▸ **fromUnits**(`amount`): `Big`

Convert base/quote from internal amount to public amount.
Uses each token's `decimals` parameter.

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `string` \| `number` \| `BigNumber` |

#### Returns

`Big`

**`Example`**

```
const usdc = await mgv.token("USDC");
token.fromUnits("1e7") // 10
const dai = await mgv.token("DAI")
market.fromUnits("1e18") // 1
```

#### Inherited from

[TokenCalculations](TokenCalculations.md).[fromUnits](TokenCalculations.md#fromunits)

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:81

___

### <a id="tounits" name="tounits"></a> toUnits

▸ **toUnits**(`amount`): `BigNumber`

Convert base/quote from public amount to internal contract amount.
Uses each token's `decimals` parameter.

If `bq` is `"base"`, will convert the base, the quote otherwise.

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `BigSource` |

#### Returns

`BigNumber`

**`Example`**

```
const usdc = await mgv.token("USDC");
token.toUnits(10) // 10e7 as ethers.BigNumber
const dai = await mgv.token("DAI")
market.toUnits(1) // 1e18 as ethers.BigNumber
```

#### Inherited from

[TokenCalculations](TokenCalculations.md).[toUnits](TokenCalculations.md#tounits)

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:98

___

### <a id="tofixed" name="tofixed"></a> toFixed

▸ **toFixed**(`amount`, `decimals?`): `string`

Convert human-readable amounts to a string with the given
number of decimal places. Defaults to the token's decimals places.

#### Parameters

| Name | Type |
| :------ | :------ |
| `amount` | `BigSource` |
| `decimals?` | `number` |

#### Returns

`string`

**`Example`**

```
token.toFixed("10.123"); // "10.12"
token.toFixed(token.fromUnits("1e7"));
```

#### Inherited from

[TokenCalculations](TokenCalculations.md).[toFixed](TokenCalculations.md#tofixed)

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:112

___

### <a id="round" name="round"></a> round

▸ **round**(`amount`): `Big`

Rounds an amount according to the token's decimals.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `Big` | The amount to round. |

#### Returns

`Big`

The rounded amount.

#### Inherited from

[TokenCalculations](TokenCalculations.md).[round](TokenCalculations.md#round)

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:123

___

### <a id="createtokenfromsymbolorid" name="createtokenfromsymbolorid"></a> createTokenFromSymbolOrId

▸ **createTokenFromSymbolOrId**(`symbolOrId`, `mgv`, `options?`): `Promise`<[`Token`](Token.md)\>

Create a Token instance, fetching data (decimals) from chain if needed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `symbolOrId` | `string` |
| `mgv` | [`Mangrove`](Mangrove.md) |
| `options?` | [`ConstructorOptions`](../namespaces/Token-1.md#constructoroptions) |

#### Returns

`Promise`<[`Token`](Token.md)\>

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:161

___

### <a id="createtokenfromsymbol" name="createtokenfromsymbol"></a> createTokenFromSymbol

▸ **createTokenFromSymbol**(`symbol`, `mgv`, `options?`): `Promise`<[`Token`](Token.md)\>

Create a Token instance, fetching data (decimals) from chain if needed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `symbol` | `string` |
| `mgv` | [`Mangrove`](Mangrove.md) |
| `options?` | [`ConstructorOptions`](../namespaces/Token-1.md#constructoroptions) |

#### Returns

`Promise`<[`Token`](Token.md)\>

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:174

___

### <a id="createtokenfromid" name="createtokenfromid"></a> createTokenFromId

▸ **createTokenFromId**(`id`, `mgv`, `options?`): `Promise`<[`Token`](Token.md)\>

Create a Token instance, fetching data (decimals) from chain if needed.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `mgv` | [`Mangrove`](Mangrove.md) |
| `options?` | [`ConstructorOptions`](../namespaces/Token-1.md#constructoroptions) |

#### Returns

`Promise`<[`Token`](Token.md)\>

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:189

___

### <a id="createtokenfromaddress" name="createtokenfromaddress"></a> createTokenFromAddress

▸ **createTokenFromAddress**(`address`, `mgv`): `Promise`<[`Token`](Token.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `address` | `string` |
| `mgv` | [`Mangrove`](Mangrove.md) |

#### Returns

`Promise`<[`Token`](Token.md)\>

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:223

___

### <a id="gettokenaddress" name="gettokenaddress"></a> getTokenAddress

▸ **getTokenAddress**(`symbolOrId`, `network`): `string`

Read a token address on the current network.

Note that this reads from the static `Mangrove` address registry which is shared across instances of this class.

#### Parameters

| Name | Type |
| :------ | :------ |
| `symbolOrId` | `string` |
| `network` | `string` |

#### Returns

`string`

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:252

___

### <a id="allowance" name="allowance"></a> allowance

▸ **allowance**(`params?`): `Promise`<`Big`\>

Return allowance of `owner` given to `spender`.
If `owner` is not specified, defaults to current signer.
If `spender` is not specified, defaults to Mangrove instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.owner?` | `string` |
| `params.spender?` | `string` |

#### Returns

`Promise`<`Big`\>

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:272

___

### <a id="allowanceinfinite" name="allowanceinfinite"></a> allowanceInfinite

▸ **allowanceInfinite**(`params?`): `Promise`<`boolean`\>

Returns whether allowance of `owner` given to `spender` is high enough to be considered infinite (above 2^200)
If `owner` is not specified, defaults to current signer.
If `spender` is not specified, defaults to Mangrove instance.

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | `Object` |
| `params.owner?` | `string` |
| `params.spender?` | `string` |

#### Returns

`Promise`<`boolean`\>

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:284

___

### <a id="approvemangrove" name="approvemangrove"></a> approveMangrove

▸ **approveMangrove**(`arg?`): `Promise`<`ContractTransaction`\>

Set approval for Mangrove to `amount`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | [`ApproveArgs`](../modules.md#approveargs) |

#### Returns

`Promise`<`ContractTransaction`\>

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:311

___

### <a id="approve" name="approve"></a> approve

▸ **approve**(`spender`, `arg?`): `Promise`<`ContractTransaction`\>

Set approval for `spender` to `amount`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `spender` | `string` |
| `arg` | [`ApproveArgs`](../modules.md#approveargs) |

#### Returns

`Promise`<`ContractTransaction`\>

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:318

___

### <a id="approveifnotinfinite" name="approveifnotinfinite"></a> approveIfNotInfinite

▸ **approveIfNotInfinite**(`spender`, `arg?`): `Promise`<`undefined` \| `ContractTransaction`\>

Sets the allowance for the spender if it is not infinite. Cannot be used to reduce from infinite.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `spender` | `string` | The spender to approve |
| `arg` | [`ApproveArgs`](../modules.md#approveargs) | The approval arguments |

#### Returns

`Promise`<`undefined` \| `ContractTransaction`\>

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:343

___

### <a id="approveifhigher" name="approveifhigher"></a> approveIfHigher

▸ **approveIfHigher**(`spender`, `arg?`): `Promise`<`undefined` \| `ContractTransaction`\>

Sets the allowance for the spender if it is not already enough.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `spender` | `string` | The spender to approve |
| `arg` | [`ApproveArgs`](../modules.md#approveargs) | The approval arguments |

#### Returns

`Promise`<`undefined` \| `ContractTransaction`\>

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:355

___

### <a id="increaseapproval" name="increaseapproval"></a> increaseApproval

▸ **increaseApproval**(`spender`, `arg?`): `Promise`<`undefined` \| `ContractTransaction`\>

Increases the allowance for the spender unless it is already considered infinite (above 2^200).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `spender` | `string` | The spender to approve |
| `arg` | [`ApproveArgs`](../modules.md#approveargs) | The approval arguments |

#### Returns

`Promise`<`undefined` \| `ContractTransaction`\>

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:368

___

### <a id="balanceof" name="balanceof"></a> balanceOf

▸ **balanceOf**(`account`, `overrides?`): `Promise`<`Big`\>

Returns the balance of `account`.

#### Parameters

| Name | Type |
| :------ | :------ |
| `account` | `string` |
| `overrides` | `Overrides` |

#### Returns

`Promise`<`Big`\>

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:385

___

### <a id="transfer" name="transfer"></a> transfer

▸ **transfer**(`to`, `value`, `overrides?`): `Promise`<`ContractTransaction`\>

Transfers `value` amount of tokens to address `to`

#### Parameters

| Name | Type |
| :------ | :------ |
| `to` | `string` |
| `value` | `BigSource` |
| `overrides` | `Overrides` |

#### Returns

`Promise`<`ContractTransaction`\>

#### Defined in

@mangrovedao/mangrove.js/src/token.ts:396
