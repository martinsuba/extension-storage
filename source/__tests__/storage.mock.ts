import sinon from 'sinon';

export const getResult = {
  key: 'value',
};

export function mockStorage(): void {
  (window.chrome as any) = {
    storage: {
      sync: {
        get: sinon.stub().callsFake((keys, callback) => {
          callback(getResult);
        }),
        set: sinon.stub().callsFake((keys, callback) => {
          callback();
        }),
        remove: sinon.stub().callsFake((keys, callback) => {
          callback(getResult);
        }),
        clear: sinon.stub().callsFake((callback) => {
          callback(getResult);
        }),
      },
      local: {
        get: sinon.stub().callsFake((keys, callback) => {
          callback(getResult);
        }),
        set: sinon.stub().callsFake((keys, callback) => {
          callback();
        }),
        remove: sinon.stub().callsFake((keys, callback) => {
          callback(getResult);
        }),
        clear: sinon.stub().callsFake((callback) => {
          callback(getResult);
        }),
      },
    },
    runtime: {
      lastError: undefined,
    },
  };
}

export function mockThrow(): void {
  (window.chrome as any) = {
    storage: {
      sync: {
        get: sinon.stub().throws(new Error('error')),
        set: sinon.stub().throws(new Error('error')),
        remove: sinon.stub().throws(new Error('error')),
        clear: sinon.stub().throws(new Error('error')),
      },
      local: {
        get: sinon.stub().throws(new Error('error')),
        set: sinon.stub().throws(new Error('error')),
        remove: sinon.stub().throws(new Error('error')),
        clear: sinon.stub().throws(new Error('error')),
      },
    },
    runtime: {
      lastError: undefined,
    },
  };
}

export function mockLastError(): void {
  (window.chrome as any) = {
    storage: {
      sync: {
        get: sinon.stub().callsFake((keys, callback) => {
          callback(getResult);
        }),
        set: sinon.stub().callsFake((keys, callback) => {
          callback();
        }),
        remove: sinon.stub().callsFake((keys, callback) => {
          callback(getResult);
        }),
        clear: sinon.stub().callsFake((callback) => {
          callback(getResult);
        }),
      },
      local: {
        get: sinon.stub().callsFake((keys, callback) => {
          callback(getResult);
        }),
        set: sinon.stub().callsFake((keys, callback) => {
          callback();
        }),
        remove: sinon.stub().callsFake((keys, callback) => {
          callback(getResult);
        }),
        clear: sinon.stub().callsFake((callback) => {
          callback(getResult);
        }),
      },
    },
    runtime: {
      lastError: new Error('lastError'),
    },
  };
}
