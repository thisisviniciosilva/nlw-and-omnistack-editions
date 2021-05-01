const generateUniqueId = require('../../src/utils/generateUniqueId');

describe('Generate Unique ID', () => {
  it('should generate unique ID', () => {
    expect(generateUniqueId()).toHaveLength(8);
  });
});
