import { Callsite } from '../src';

describe('callsite', () => {
  it('should create callsite', (done) => {
    const callsite = Callsite.get()[0];
    expect(callsite).toBeTruthy();
    expect(typeof callsite.source).toBe('string');
    expect(typeof callsite.line).toBe('number');
    expect(typeof callsite.column).toBe('number');
    done();
  });

  it('should create callsites parallel', (done) => {
    const callsites: Callsite[] = [];

    for (let i = 0; i < 10000; i++) {
      process.nextTick(() => {
        callsites.push(...Callsite.get());
      });
    }

    process.nextTick(() => {
      for (const callsite of callsites) {
        expect(callsite).toBeTruthy();
        expect(typeof callsite.source).toBe('string');
        expect(typeof callsite.line).toBe('number');
        expect(typeof callsite.column).toBe('number');
      }

      done();
    });
  });
});
