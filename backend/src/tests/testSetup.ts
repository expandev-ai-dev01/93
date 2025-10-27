/**
 * @summary
 * Global test environment setup
 *
 * @module tests
 *
 * @description
 * Configures the global test environment for all test files.
 * Sets up common test utilities, mocks, and configurations.
 */

// Set test environment
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';

// Global test setup
beforeAll(() => {
  console.log('🧪 Test environment initialized');
});

afterAll(() => {
  console.log('✅ Test environment cleanup complete');
});
