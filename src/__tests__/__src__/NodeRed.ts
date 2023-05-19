// @ts-ignore
import memory from '@node-red/runtime/lib/nodes/context/memory';
import fs from 'fs';
import Mock = jest.Mock;

const haGlobal = JSON.parse(fs.readFileSync('src/__tests__/__src__/ha.json').toString());
const global = memory(haGlobal);
global.data = { global: haGlobal };
export const nodeRed = {
  __node__: {
    mock: null as unknown as Mock,
    reset() {
      return (this.mock = jest.fn());
    },
    warn(value: any) {
      this.mock(value);
    },
  },
  global: {
    data: global,
    get(key: string) {
      return this.data.get('global', key);
    },
    set(key: string, value: any): void {
      return this.data.set('global', key, value);
    },
    keys() {
      // to be implemented
    },
  },
};
