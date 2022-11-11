---
description: Offer List specific governance parameters
---

# Local variables

### Taker fees
:::info **Taker fee**
**Taker fee** is defined in basis points (i.e. in percents of a percent) of the total amount of outbound tokens received by taker. 
It is capped by the protocol to 5%. Collected fees accrue in the procol's vault that is [Governance controlled](./global-variables#other-governance-controlled-setters).
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
    <TabItem value="signature" label="Signature" default>

```solidity
// Governance sets the fee for the `(outbound_tkn, inbound_tkn)` offer list
function setFee(address outbound_tkn, address inbound_tkn, uint fee) public;

```

</TabItem>
<TabItem value="events" label="Events">

```solidity
event SetFee(address outbound_tkn, address inbound_tkn, uint fee); // emitted when fee is set
```

</TabItem>
</Tabs>

### Offer gas base
:::info **Offer gas base**
**Offer gas base** is an over-approximation of the gas overhead associated with processing one offer. 
The Mangrove considers that a failed offer has used at least this amount of gas. 
The parameter is offer list specific since the costs of calling outbound and inbound `transferFrom` are part of the **offer gasbase**. 
:::

:::warning **offer gas base update**
Offer gas base needs to be updated when ERC20 contracts managing inbound or outbound tokens change or when opcode prices are updated.  
This parameter may aslo be used to increase/decrease [bounty](../taking-and-making-offers/reactive-offer/offer-provision.md#bounty) of failing offers in a specific offer list. 
:::

<Tabs>
    <TabItem value="signature" label="Signature" default>

```solidity
// Governance sets the gas overhead for the `(outbound_tkn, inbound_tkn)` offer list
function setGasbase(address outbound_tkn, address inbound_tkn, uint offer_gasbase) public;

```

</TabItem>
<TabItem value="events" label="Events">

```solidity
event setGasbase(address outbound_tkn, address inbound_tkn, uint offer_gasbase); // emitted when gasbase is set
```

</TabItem>
</Tabs>

### Density
:::info **Density**
**Density** is expressed in amount of outbound tokens delivered per gas units.
The offer list's **density** corresponds to a "dust" parameter, which constraints the volume of outbound tokens an offer must deliver w.r.t the gas it requires to be executed. 
An offer cannot be posted on an offer list if its density is below the offer list's density.
:::
The **density** of an offer in a `(outbound, inbound)` offer list with an [offer gasbase](./local-variables#offer-gas-base) set to $\beta$ is defined as:
$$
\delta = \frac{V}{\beta + \gamma}
$$
where $V$ is the volume of outbound tokens given by the offer and $\gamma$ is the gas required by the offer.

<Tabs>
<TabItem value="signature" label="Signature" default>

```solidity
// Governance sets density for the `(outbound_tkn, inbound_tkn)` offer list
function setDensity(address outbound_tkn, address inbound_tkn, uint density) public;

```
</TabItem>
<TabItem value="events" label="Events">

```solidity
event SetDensity(address outbound_tkn, address inbound_tkn, uint density); // emitted when density is set
```
</TabItem>
</Tabs>

A rationale to define density is to set it such that the gas required by an offer is negligible in front of the volume delivered. 
For instance setting offer list density $\Delta$ with the formula:
$$
\Delta := \frac{C*\Gamma}{p_{out}}
$$
with $p_{out}$ being the unit price of outbound tokens in ETH and $C\geq 1$ insuring that the amount delivered per gas unit is $C$ times greater than $\Gamma$, a realistic gas price.

### (De)activating an Offer List
:::info **(De)Activating offer lists**
An `(outbound_tkn,inbound_tkn)` offer list is inactive by default, but may be activated/deactivated by governance. Only offer removals (and deprovision) are possible on innactive offer lists.
:::

<Tabs>
<TabItem value="signature" label="Signature" default>

```solidity
// Governance activates the `(outbound_tkn, inbound_tkn)` offer list
function activate(address outbound_tkn, address inbound_tkn) public;
// Governance deactivates the `(outbound_tkn, inbound_tkn)` offer list
function deactivate(address outbound_tkn, address inbound_tkn) public;

```
</TabItem>
<TabItem value="events" label="Events">

```solidity
event SetActive(address outbound_tkn, address inbound_tkn, bool isActive); // emitted when activation status changes
```
</TabItem>
</Tabs>

