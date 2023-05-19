# Node-RED Programming Tools (NRPT)
Tools to simplify the integration between Home Assistant and Node-Red

## Todo
- Improve and move installing IntelliSense (d.ts files) to separate package. Load d.ts files from Node-Red config.
- Add functionalities:
  - Retrieval of entities
  - Enum for each service
- Add better error/exception handling:
  - Catch errors
  - Logging of exceptions
  - Send exceptions to for example twitter
- Improve documentation
- Call service from entity example

## Install package

#### Caution:
This package is only tested with the hassio addon (https://github.com/hassio-addons/addon-node-red)

### Installation
To install this package in Node-Red you can import the following nodes. 

It calls a function node each time Node-Red restarts or deploys. The function retrieves the NRPT package and saves the package in the Tools constant. After this node installs IntelliSense data in Node-Red.

```json
[{"id":"aab650160f7d9808","type":"inject","z":"2f4d204a142d188b","name":"","props":[{"p":"payload"},{"p":"topic","vt":"str"}],"repeat":"","crontab":"","once":true,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":110,"y":480,"wires":[["ddbfeababe97e8e1"]]},{"id":"ddbfeababe97e8e1","type":"function","z":"2f4d204a142d188b","name":"Install IntelliSense","func":"Tools.InstallIntelliSense.install();","outputs":1,"noerr":0,"initialize":"","finalize":"","libs":[{"var":"Tools","module":"node-red-programming-tools"}],"x":270,"y":480,"wires":[[]]}]
```

## Update package
- In Home Assistant, navigate to the file editor.
- In the editor navigate to `/config/node-red/package.json` and update the version to the desired version number of the NRPT  package.
- Save the file.
- Restart the Node-Red container to update the package and the IntelliSense.

## How to use the package in Node-Red

### Initialization of the object
To retrieve the tool object, you can either use the create function or instantiate it yourself. 
```javascript
const tool = Tools.create(this); // Function
const tool = new Tools.Tool(this); // Instantiation
```

### How to handle entity data

#### Retrieve data of an entity:
```javascript
const entity = tool.entities.getEntity('sun.sun');
```

#### Retrieve multiple entities:
Call with array
```javascript
tool.entities.getEntities([
    'sun.sun',
    'sensor.hacs'
])

// Outputs: 
Collection([
    {
        key: 'sun.sun',
        entityId: 'sun.sun',
        // Other data
    },
    {
        key: 'sensor.hacs',
        entityId: 'sensor.hacs',
        // Other data
    }
])

// Retrieve an entity
entities.getByKey('sun.sun');
```
Call with object
```javascript
tool.entities.getEntities({
    sun: 'sun.sun',
    hacs: 'sensor.hacs'
})

// Outputs: 
const entities = Collection([
    {
        key: 'sun',
        entityId: 'sun.sun',
        // Other data
    },
    {
        key: 'hacs',
        entityId: 'sensor.hacs',
        // Other data
    }
]);

// Retrieve an entity
entities.getByKey('sun');
```
The collection object is from the package: https://www.npmjs.com/package/collect.js

### How to work with outputs

#### Single call service output:
Connect the `function` node to a `call service` node to call a service.
```javascript
return tool.output
    .callService((cs) => {
        cs
            .setEntityId('switch.switch1')
            .setService(Tools.Enums.Service.Switch.TURN_ON)
    })
    .output();
```

#### Get all entities of a certain domain
```javascript
// Get all entities in een domain "switch"
tool.entities.getEntitiesByDomain('switch');
```

#### Get all entities of a certain domain
```javascript
// Get all entities in domain switch except "switch.switch1".
tool.entities.getEntitiesByDomainExcept('switch', [
    'switch.switch1'
]);
```

### Multiple call service output:
Connect the `function` node to a `call service` node to call a service.
```javascript
return tool.output
    .callMultipleServices((cs) => {
        cs.createPayload((cb) => {
            cb
                .setEntityId('switch.switch1')
                .setService(Tools.Enums.Service.Switch.TURN_ON)
        });
        cs.createPayload((cb) => {
            cb
                .setEntityId('switch.switch2')
                .setService(Tools.Enums.Service.Switch.TOGGLE)
        });
    })
    .output();
```

### How to log data
#### Log data to the debug console:
```javascript
tool.logger.log(any);
```
#### Log data of an entity:
```javascript
tool.entities.logEntityData('sun.sun');
```

### How to create a collection
This project heavily relies on the collect.js collection. It is inspired by the Laravel collection and tries to imitate
the same behavior in javascript. The following code is an example to create a collection in a Node-Red function node.
```javascript
Tools.collect([
  {value: 'one'}, 
  {value: 'two'}, 
  {value: 'three'},
]).pluck('value').toArray();

// Output:
['one', 'two', 'three']
```