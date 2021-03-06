/*
  Script to a write a markdown file (at a given path) with relevant addresses for a Mangrove deployment. Requires a deployment-folder with hardhat deployment json files with addresses for Mangrove core contracts (which is hardwired, for now), a json file + key to look under for ERC20 addresses (which is hardwired, for now), and markdown templates for rendering new and previous addresses for core contracts, and ERC20 addresses.

Args:
  --deployment=<path to deployments folder for addresses>
  --ercAddresses=<path to json file with ERC20 addresses>
  --ercAddressesKey=<key in json file to look for ERC20 addresses>
  --template=<path to markdown template>
  --templatePrevious=<path to markdown template to render previous addresses>
  --output=<path to output markdown file>
  [--debug]

  Add --debug flag to get debug output.

Example (supposing mangrovedao/mangrove is checked in folder 'mangrove' alongside this repo):

  ts-node write-addresses-md --deployment ../../../../mangrove/packages/mangrove-solidity/deployments/mumbai --ercAddresses ../../../../mangrove/packages/mangrove.js/src/constants/addresses.json --ercAddressesKey maticmum --template ./contract-addresses-template.md --templatePrevious ./contract-previous-addresses-template.md --output ../../../contract-addresses.md
*/

import fs from 'fs';
import minimist from 'minimist';

import * as addressHandling from "./address-handling";

// define relevant contracts
const coreContracts = [ "Mangrove", "MgvCleaner", "MgvReader", "MgvOracle", "MangroveOrder", "MangroveOrderEnriched" ];

// define relevant ERC20
const relevantERC20 = [ "WETH", "DAI", "USDC" ];

// read args - and do minimal sanity checking
const stringArgs = [
  'deployment', 
  'ercAddresses', 
  'ercAddressesKey', 
  'template', 
  'templatePrevious',
  'output'];

const args = minimist(
  process.argv.slice(2), {
    string: stringArgs, 
    boolean: ["debug"], 
    unknown: (a) => {console.error(`Unexpected argument '${a}'- ignoring.`); return false; }
  });

let debug = false;
if(args.debug){
  debug = true;
}

if(debug){
  console.debug("Args:")
  console.debug(args);
}

let error = false;
for (let i = 0; i < stringArgs.length; i++) {
  const name = stringArgs[i];

  if(!(name in args)){
    console.error(`Error: Missing argument ${name}.`);
    error = true;
  }
}

if(error){
  process.exit(1);
}

const deploymentFolder = args['deployment'];
const ercAddressesFile = args['ercAddresses'];
const ercAddressesKey = args['ercAddressesKey'];
const templateFile = args['template'];
const templatePreviousFile = args['templatePrevious'];
const outputFile = args['output'];

// read deployment addresses for core contracts
let contractAddresses = addressHandling.readContractAddresses(deploymentFolder, coreContracts);

if(debug){
  console.debug(`Found current addresses:`)
  console.dir(contractAddresses);
}

// read old deployment addresses
let oldDeploymentAddresses = [];

let v = 1;
while (true) {
  const vAddresses = addressHandling.readContractAddresses(deploymentFolder, coreContracts, "-v" + v);

  // did we actually find any addresses?
  // (we do it in this manner to save the undefined addresses for treatment below)
  const nonExistingAddresses = 
    Object
      .entries(vAddresses)
      .filter(entry =>  (entry[1] === null || entry[1] === undefined));

  if(nonExistingAddresses.length === Object.values(vAddresses).length){
    break;
  }

  // prettify output
  nonExistingAddresses
    .forEach(entry => {
      Object.assign(vAddresses, {[ entry[0] ]: 'none'});
    });

  oldDeploymentAddresses.unshift(
    Object.assign(vAddresses, { "id": v })
  );
  v++;
}

if(debug){
  console.debug(`Found old deployment addresses:`)
  console.dir(oldDeploymentAddresses);
}

// read ERC20 addresses
//let ercAddresses: Record<string, string>;
try{
  const ercSourceJson : Record<string, string> = JSON.parse(fs.readFileSync(ercAddressesFile, 'utf8'))[ercAddressesKey];
  
  if(debug){
    console.debug(`Found ERC20 addresses:`)
  }

  // extend contractAddresses with found ERC20 addresses
  contractAddresses = relevantERC20.reduce(
    (prev, ercName) => {
      if(debug){
        console.dir(`${ercName}: ${ercSourceJson[ercName]}`);
      }
      
      return { ...prev, [ercName]: ercSourceJson[ercName] };
    }
    , contractAddresses);
} catch (error){
  console.error(error);
  process.exit(1);
}

// read templates
let template: string;
let prevTemplate: string;

try {
  template = fs.readFileSync(templateFile, 'utf8');
  prevTemplate = fs.readFileSync(templatePreviousFile, 'utf8');
} catch (error) {
  console.error(error);
  process.exit(1);
}

// helper func to replace {{ <var> }}'s with values in lookup
function replaceVars(vars: string[], lookup: Record<string,string>, replaceIn: string){
  return vars.reduce(
    (prev, v) => {
      const patt = new RegExp(`{{\\s*${v}\\s*}}`);
      return prev.replace(patt, lookup[v]);
    },
    replaceIn);
}

// replace {{ <contractname> }}'s in template
const newAddressesSection = replaceVars(coreContracts.concat(relevantERC20), contractAddresses, template);

if(debug){
  console.debug("Constructing section for core contract addresses...");
}

// for each entry in previous: 
// create a previous section by replacing {{ <contractname> }} and {{ id }} in prevTemplate

const idVarName = 'id';
const previousSection = oldDeploymentAddresses.reduce(
  (prev, oldAddrEntry) => {
    return prev.concat(replaceVars(coreContracts.concat(idVarName), oldAddrEntry, prevTemplate));
  },
  "");

if(debug){
  console.debug("Constructing section for previous deployment addresses...");
}

// write to file
const newContent = newAddressesSection.concat(previousSection);

if(debug){
  console.debug(`Constructed the following content, which will be written to file at ${outputFile}:`)
  console.debug(newContent);
}

fs.writeFileSync(outputFile, newContent);
