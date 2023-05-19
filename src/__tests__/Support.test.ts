import { Collection } from 'collect.js';
import { CollectionExtender } from '../Support/CollectionExtender';

describe('Support methods test', () => {
  it('can install the getByKey method in collect.js', () => {
    expect(Collection.prototype.hasOwnProperty('getByKey')).toBeFalsy();

    CollectionExtender.install();
    expect(Collection.prototype.hasOwnProperty('getByKey')).toBeTruthy();

    const testObject = { key: 'key' };
    const collection = new Collection([testObject]);
    expect(collection.getByKey('key')).toEqual(testObject);
    expect(collection.getByKey('does.not.exist', 'indeed')).toEqual('indeed');
  });
});
