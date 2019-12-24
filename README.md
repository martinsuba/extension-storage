[![Build Status](https://travis-ci.org/martinsuba/extension-storage.svg?branch=master)](https://travis-ci.org/martinsuba/extension-storage)
[![codecov](https://codecov.io/gh/martinsuba/extension-storage/branch/master/graph/badge.svg)](https://codecov.io/gh/martinsuba/extension-storage)
[![](https://badgen.net/npm/v/extension-storage-promise)](https://www.npmjs.com/package/extension-storage-promise)
[![](https://badgen.net/bundlephobia/minzip/extension-storage-promise)](https://bundlephobia.com/result?p=extension-storage-promise)

# extension-storage-promise

Promise-based wrapper around the [browser (chrome) extension storage api](https://developer.chrome.com/apps/storage) that makes working with browser storage easier. Works with both `sync` and `local` storageArea.

## Install

```
npm i -S extension-storage-promise
```

## Usage

Some examples of usage. Whole API can be found below.

```js
import storage from 'extension-storage-promise';
// or
// import { localStorage, syncStorage } from 'extension-storage';

// let's store a new record - an array - under 'newRecord' key
storage.sync.setOneRecord('newRecord', [1, 2, 3]);

// then get all records from storage
const record = await storage.sync.getAllRecords();
// returns { newRecord: [1, 2, 3] }

// or one specific record by key
const record = await storage.sync.getOneRecord('newRecord');
// returns [1, 2, 3]

// remove specific record from storage by key
await storage.sync.removeOneRecord('newRecord');

// clean whole storage
await storage.sync.cleanRecords();
```

## Methods

These methods can be used under both `sync` and `local` storageArea namespaces:

### getAllRecords(): Promise<Record<string, unknown>>
Example:
```js
const allRecords = await storage.sync.getAllRecords();
// resolves object { record1: 'value', record2: 'value2', ... }
```

### getRecords(keys: string[]): Promise<Record<string, unknown>>;
Example:
```js
const records = await storage.sync.getRecords(['record1', 'record2']);
// resolves object { record1: 'value', record2: 'value2' }
```

### getOneRecord(key: string): Promise<unknown>;
Example:
```js
const record = await storage.sync.getOneRecord('record2');
// resolves 'value2'
```

### setOneRecord(key: string, value: unknown): Promise<void>;
Example:
```js
await storage.sync.setOneRecord('record5', 'value5');
// adds new record with value 'value5' under key 'record5' to storage object
```

### setRecords(records: Record<string, unknown>): Promise<void>;
Example:
```js
await storage.sync.setRecords({ 'record5': 'value5', record6: 'value6', ... });
// adds multiple new records under given keys to storage object
```

### removeOneRecord(key: string): Promise<void>;
Example:
```js
await storage.sync.removeOneRecord('record3');
// removes record with key 'record3' from storage object
```

### removeRecords(keys: string[]): Promise<void>;
Example:
```js
await storage.sync.removeRecords(['record1', 'record2', 'record3']);
// removes records with keys 'record1', 'record2' and 'record3' from storage object
```

### clearRecords(): Promise<void>;
Example:
```js
await storage.sync.clearRecords();
// removes all records storage object
```
