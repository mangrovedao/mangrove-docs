---
description: How to write offers on Mangrove
---

# Creating & Updating offers

{% hint style="info" %}
**Editor's note**

For each function described below, we include the following tabs:

* Signature - the function's Solidity signature
* Events - possible Mangrove events emitted by calling this function
* Revert reasons - all possible strings returned after a revert
* Solidity - Solidity code example
* ethers.js - Javascript code example using [ethers.js](https://docs.ethers.io/v5/)
{% endhint %}

On Mangrove, an offer is an element of an [offer list](../data-structures/market.md), and a promise that an account (a [contract](maker-contract.md) or an [EOA](../offer-making-strategies/basic-offer.md)) is able to deliver a certain amount of **outbound tokens**, in return for a certain amount of **inbound tokens** when given a certain amount of gas.

### Posting a new offer

New offers should mostly posted by [contracts](maker-contract.md) able to source liquidity when asked to by Mangrove (although it [is possible](../offer-making-strategies/basic-offer.md) to post new offers from an EOA).

The code of `newOffer` is [available here](https://github.com/giry-dev/mangrove/blob/552ab35500c34e831f40a68fac81c8b3e6be7f5b/packages/mangrove-solidity/contracts/MgvOfferMaking.sol#L49).

{% tabs %}
{% tab title="Signature" %}
```solidity
function newOffer(
    address outboundTkn,
    address inboundTkn,
    uint wants, // amount of inbound Tokens
    uint gives, // amount of outbound Tokens
    uint gasreq,
    uint gasprice,
    uint pivotId
) external returns (uint offerId);
```
{% endtab %}

{% tab title="Events" %}
```solidity
// logging new offer's data 
event OfferWrite(
      address outboundTkn,
      address inboundTkn,
      address maker, // account that created the offer, will be called upon execution
      uint wants,
      uint gives,
      uint gasprice, // gasprice that was used to compute the offer bounty
      uint gasreq,
      uint offerId, // id of the new offer
      uint prev // offer id of the closest best offer at the time of insertion 
    );
 // `maker` (who is `msg.sender`) is debited of `amount` WEIs to provision the offer
 event DebitWei(address maker, uint amount);
```
{% endtab %}

{% tab title="Revert strings" %}
```javascript
// Gatekeeping
"mgv/dead" // Mangrove contract is terminated
"mgv/inactive" // Trying to post an offer in an inactive market

// Order book has reached its maximal number of orders (2**24)
"mgv/offerIdOverflow" // Unlikely as max offer id is 2**24

// Overflow
"mgv/writeOffer/gasprice/16bits"
"mgv/writeOffer/gives/96bits"
"mgv/writeOffer/wants/96bits"

// Invalid values
"mgv/writeOffer/gasreq/tooHigh" // gasreq above gasmax
"mgv/writeOffer/gives/tooLow"   // gives should be > 0
"mgv/writeOffer/density/tooLow" // wants / (gasreq + overhead) < density

// Insufficient provision
"mgv/insufficientProvision" // provision of `msg.sender` should cover offer bounty
```
{% endtab %}

{% tab title="Solidity" %}
{% code title="newOffer.sol" %}
```solidity
import "./Mangrove.sol";
import "./ERC20.sol";

// context of the call
address MGV;
address outTkn; // address offer's outbound token
address inbTkn; // address of offer's inbound token
address admin; // admin address of this contract
uint pivotId; // offer id whose price is the closest to this new offer (observed offchain)

// the following is a snippet of the contract that will manage the new offer
// i.e this contract SHOULD have the makerExecute() callback function somewhere.

// Approve Mangrove for outbound token transfer if not done already
ERC20(outTkn).approve(MGV, type(uint).max);
uint outDecimals = ERC20(outTkn).decimals();
uint inbDecimals = ERC20(inbTkn).decimals();

// calling mangrove with offerId as pivot (assuming price update will not change much the position of the offer)
Mangrove(MGV).newOffer(
        outTkn, // reposting on the same market
        inbTkn, 
        5.0*10**inbDecimals, // maker wants 5 inbound tokens
        7.0*10**outDecimals, // maker gives 7 outbound tokens
        500000, // maker requires 500_000 gas units to comply 
        0, // use mangrove's gasprice oracle  
        pivotId // heuristic: tries to insert this offer after pivotId
);

    
```
{% endcode %}
{% endtab %}
{% endtabs %}

**Inputs**

* `outbound_tkn` address of the [**outbound token**](broken-reference/) (that the offer will provide).
* `inbound_tkn` address of the [**inbound token**](broken-reference/) (that the offer will receive).
* `wants` amount of **inbound tokens** requested by the offer. **Must fit in a `uint96`**.
* `gives` amount of **outbound tokens** promised by the offer. **Must fit in a `uint96` and be strictly positive**.
* `gasreq` amount of gas that will be given to the offer's [account](maker-contract.md). **Must fit in a `uint24` and be lower than** [**gasmax**](../data-structures/mangrove-configuration.md#global-parameters). Should be sufficient to cover all calls to the [account](maker-contract.md) ([`makerExecute`](maker-contract.md#offer-execution) and [`makerPosthook`](maker-contract.md#offer-post-hook)).
* `gasprice` gas price override used to compute the order provision (see [offer bounties](offer-provision.md)). Any value lower than Mangrove's current [gasprice](../data-structures/mangrove-configuration.md#global-parameters) will be ignored (thus 0 means "use Mangrove's current [gasprice](../data-structures/mangrove-configuration.md#mgvlib-global)"). **Must fit in a `uint16`**.
* `pivotId` where to start the insertion process in the offer list. If `pivotId` is not in the offer list at the time the transaction is processed, the new offer will be inserted starting from the offer list's [best](reactive-offer.md#getting-current-best-offer-of-a-market) offer. Should be the id of the existing live offer with the price closest to the price of the offer being posted.

**Outputs**

* `offerId` the id of the newly created offer. Note that offer ids are scoped to [offer lists](broken-reference/), so many offers can share the same id.

{% hint style="danger" %}
**Provisioning**

Since offers can fail, Mangrove requires each offer to be [provisioned](offer-provision.md) in ETH. If an offer fails, part of that provision will be sent to the caller that executed the offer, as compensation.

Make sure that your offer is [well-provisioned](offer-provision.md#checking-an-account-balance) before calling `newOffer`, otherwise the call will fail. The easiest way to go is to send a comfortable amount of ETH to Mangrove from your offer-posting contract. Mangrove will remember your ETH balance and use it when necessary.
{% endhint %}

{% hint style="danger" %}
**Offer execution**

* If the offer account is a contract, it should implement the [IMaker](maker-contract.md) interface. At the very least, it must have a function with signature [`makerExecute(MgvLib.SingleOrder calldata order)`](maker-contract.md#offer-execution) or it will systematically revert when called by Mangrove.
* `gives` and `gasreq` are subject to [density](../data-structures/mangrove-configuration.md#local-parameters) constraints on the amount of _outbound_ token provided per gas spent. TODO: link to utility function to get max gas for a `gives` and min gives for a `gas`.
* The offer account will need to give Mangrove a high enough allowance in _outbound_ tokens since Mangrove will use the ERC20 standard's `transferFrom` function to source your tokens.
{% endhint %}

### Updating an existing offer

Offers are updated through the aptly-named `updateOffer` function described below (source code is [here](https://github.com/giry-dev/mangrove/blob/552ab35500c34e831f40a68fac81c8b3e6be7f5b/packages/mangrove-solidity/contracts/MgvOfferMaking.sol#L99)).

{% tabs %}
{% tab title="Signature" %}
```solidity
function updateOffer( 
    address outboundToken, 
    address inboundToken, 
    uint wants, 
    uint gives, 
    uint gasreq, 
    uint gasprice, 
    uint pivotId, 
    uint offerId
) external;
```
{% endtab %}

{% tab title="Events" %}
```solidity
event OfferWrite(
      address outboundToken,
      address inboundToken,
      address maker, // account that created the offer, will be called upon execution
      uint wants,
      uint gives,
      uint gasprice, // gasprice that was used to compute the offer bounty
      uint gasreq,
      uint offerId, // id of the updated offer
      uint prev // offer id of the closest best offer at the time of update
    );
// if old offer bounty is insufficient to cover the update, 
// `maker` is debited of `amount` WEIs to complement the bounty
 event DebitWei(address maker, uint amount);
 
// if old offer bounty is greater than the actual bounty, 
// `maker` is credited of the corresponding `amount`.
event CreditWei(address maker, uint amount);

 
```
{% endtab %}

{% tab title="Revert strings" %}
```javascript
// Gatekeeping
"mgv/dead" // Mangrove contract is terminated
"mgv/inactive" // Trying to update an offer in an inactive market

// Type error in the arguments
"mgv/writeOffer/gasprice/16bits"
"mgv/writeOffer/gives/96bits"
"mgv/writeOffer/wants/96bits"

// Invalid values
"mgv/writeOffer/gasreq/tooHigh" // gasreq above gasmax
"mgv/writeOffer/gives/tooLow"   // gives should be > 0
"mgv/writeOffer/density/tooLow" // wants / (gasreq + overhead) < density

// Invalid caller
"mgv/updateOffer/unauthorized" // caller must be the account that created the offer

// Insufficient provision
"mgv/insufficientProvision" // provision of caller no longer covers the offer bounty
```
{% endtab %}

{% tab title="Solidity" %}
{% code title="updateOffer.sol" %}
```solidity
import "./Mangrove.sol";

// context of the call
address MGV;
address outTkn; // address of market's base token
address inbTkn; // address of market's quote token
address admin; // admin address of this contract
uint gasreq; // gas required to execute the offer
...
...
// external function to update an offer
// assuming this contract has enough provision on Mangrove to repost the offer if need be 
function myUpdateOffer(
        uint wants, // new wants (raw amount in quote) 
        uint gives,  // new gives (raw amount in base)
        uint offerId // id of the the offer to be updated
) external {
        require(msg.sender == admin, "Invalid caller");
        // calling mangrove with offerId as pivot (assuming price update will not change much the position of the offer)
        Mangrove(MGV).updateOffer(
                outTkn, // reposting on the same market
                inbTkn, 
                wants, // new price 
                gives, 
                gasreq, 
                0, // use mangrove's gasprice oracle  
                offerId, // heuristic: use offer id as pivot. If offer is off the book, Mangrove will use best offer as pivot
                offerId // id of the offer to be updated
        );
}
...
...
```
{% endcode %}
{% endtab %}
{% endtabs %}

#### Inputs

* `offerId` is the offer id of the offer to be updated.
* For the other parameters, see [above](reactive-offer.md#posting-a-new-reactive-offer).

#### Outputs

None.

{% hint style="info" %}
**Offer updater**

An offer can only be updated if `msg.sender` is the [account](maker-contract.md) that created the offer.
{% endhint %}

{% hint style="warning" %}
**Reusing offers**

After being executed or [retracted](reactive-offer.md#retracting-an-offer), an offer is moved out of the offer list. It can still be updated and reinserted in the offer list. We recommend updating offers instead of creating new ones, as it costs much less gas.
{% endhint %}

### Retracting an offer

An offer can be withdrawn from the order book via the `retractOffer` function described below.

{% tabs %}
{% tab title="Signature" %}
```solidity
function retractOffer(
    address outboundToken,
    address inboundToken,
    uint offerId,
    bool deprovision
  ) external;
```
{% endtab %}

{% tab title="Events" %}
```solidity
// emitted on all successful retractions
event OfferRetract(
    address outboundToken, // address of the outbound token ERC of the offer
    address inboundToken, // address of the inbound token ERC of the offer
    uint offerId // the id of the offer that has been removed from the offer list
    );

// emitted if offer is deprovisioned
event Credit(
    address maker, // account being credited
    uint amount // amount (in wei) being credited to the account
); 
```
{% endtab %}

{% tab title="Revert strings" %}
```javascript
"mgv/retractOffer/unauthorized" // only the offer's Maker Contract may call.
```
{% endtab %}

{% tab title="Solidity" %}
{% code title="retractOffer.sol" %}
```solidity
import "./Mangrove.sol";

// context of the call
address MGV;
address outTkn; // address of market's base token
address inbTkn; // address of market's quote token
address admin; // admin address of this contract
...
...
// external function to update an offer
// assuming this contract has enough provision on Mangrove to repost the offer if need be 
function myRetractOffer(uint offerId) external {
        require(msg.sender == admin, "Invalid caller");
        // calling mangrove with offerId as pivot (assuming price update will not change much the position of the offer)
        Mangrove(MGV).retractOffer(
                outTkn, // reposting on the same market
                inbTkn, 
                offerId, // id of the offer to be updated
                false // do not deprovision offer, saves gas if one wishes to repost the offer later
        );
}
...
...
```
{% endcode %}
{% endtab %}
{% endtabs %}

#### Inputs

* `offerId` is the offer id of the offer to be updated.
* `deprovision` if true, will free the offer's ETH provision so that you can [withdraw](offer-provision.md#withdrawing) them. Otherwise, will leave the provision in the offer.
* For the other parameters, see [above](reactive-offer.md#posting-a-new-reactive-offer).

#### Outputs

None.
