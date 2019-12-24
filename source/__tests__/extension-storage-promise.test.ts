import sinon from 'sinon';
import { expect } from 'chai';

import storage from '../extension-storage-promise';
import {
  getResult, mockStorage, mockThrow, mockLastError,
} from './storage.mock';

async function expectThrowAsync(asyncFunction: Function): Promise<Error> {
  try {
    await asyncFunction();
  } catch (e) {
    return e;
  }

  throw new Error('Expected to throw');
}

describe('Utils', () => {
  beforeEach(() => {
    mockStorage();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should wrap local & sync storage', () => {
    expect(storage.sync).to.be.an('object');
    expect(storage.local).to.be.an('object');
  });

  it('should get all records', async () => {
    const result = await storage.sync.getAllRecords();

    expect((chrome.storage.sync.get as any).calledOnceWith(null)).to.be.equal(true);
    expect(result).to.be.equal(getResult);
  });

  it('should get records', async () => {
    const keys = ['key'];

    const result = await storage.sync.getRecords(keys);

    expect((chrome.storage.sync.get as any).calledOnceWith(keys)).to.be.equal(true);
    expect(result).to.be.equal(getResult);
  });

  it('should get one record', async () => {
    const key = 'key';

    const result = await storage.sync.getOneRecord(key);

    expect((chrome.storage.sync.get as any).calledOnceWith(key)).to.be.equal(true);
    expect(result).to.be.equal(getResult.key);
  });

  it('should set one record', async () => {
    const key = 'key';
    const value = 'value';

    await storage.sync.setOneRecord(key, value);

    expect((chrome.storage.sync.set as any).calledOnceWith({ [key]: value })).to.be.equal(true);
  });

  it('should set records', async () => {
    const key = 'key';
    const value = 'value';

    await storage.sync.setRecords({ [key]: value });

    expect((chrome.storage.sync.set as any).calledOnceWith({ [key]: value })).to.be.equal(true);
  });

  it('should remove one record', async () => {
    const key = 'key';

    await storage.sync.removeOneRecord(key);

    expect((chrome.storage.sync.remove as any).calledOnceWith(key)).to.be.equal(true);
  });

  it('should remove records', async () => {
    const key = ['key'];

    await storage.sync.removeRecords(key);

    expect((chrome.storage.sync.remove as any).calledOnceWith(key)).to.be.equal(true);
  });

  it('should clear all records', async () => {
    await storage.sync.clearRecords();

    expect((chrome.storage.sync.clear as any).calledOnce).to.be.equal(true);
  });

  it('should reject when chrome api throws', async () => {
    mockThrow();
    const errs = [];

    errs.push(await expectThrowAsync(() => storage.sync.getAllRecords()));
    errs.push(await expectThrowAsync(() => storage.sync.getRecords([])));
    errs.push(await expectThrowAsync(() => storage.sync.getOneRecord('')));
    errs.push(await expectThrowAsync(() => storage.sync.setOneRecord('', '')));
    errs.push(await expectThrowAsync(() => storage.sync.setRecords({})));
    errs.push(await expectThrowAsync(() => storage.sync.removeOneRecord('')));
    errs.push(await expectThrowAsync(() => storage.sync.removeRecords([])));
    errs.push(await expectThrowAsync(() => storage.sync.clearRecords()));

    errs.forEach((err) => {
      expect(err).to.be.an('Error');
      expect(err.message).to.be.equal('error');
    });
  });

  it('should reject when chrome runtime lastError', async () => {
    mockLastError();
    const errs = [];

    errs.push(await expectThrowAsync(() => storage.sync.getAllRecords()));
    errs.push(await expectThrowAsync(() => storage.sync.getRecords([])));
    errs.push(await expectThrowAsync(() => storage.sync.getOneRecord('')));
    errs.push(await expectThrowAsync(() => storage.sync.setOneRecord('', '')));
    errs.push(await expectThrowAsync(() => storage.sync.setRecords({})));
    errs.push(await expectThrowAsync(() => storage.sync.removeOneRecord('')));
    errs.push(await expectThrowAsync(() => storage.sync.removeRecords([])));
    errs.push(await expectThrowAsync(() => storage.sync.clearRecords()));

    errs.forEach((err) => {
      expect(err).to.be.an('Error');
      expect(err.message).to.be.equal('lastError');
    });
  });
});
