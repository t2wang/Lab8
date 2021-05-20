/**
 * @jest-environment jsdom
 */
 import { pushToHistory } from '../scripts/router.js';

 describe('pushToHistory', () => {
    test('settings length', () => {
        expect(pushToHistory('settings').length).toBe(2);
    });
  
    test('settings object', () => {
        expect(pushToHistory('settings').state).toStrictEqual({"page": "settings"});
    });

    test('entry length', () => {
        expect(pushToHistory('entry', 1).length).toBe(4);
    });
  
    test('entry object', () => {
        expect(pushToHistory('entry', 1).state).toStrictEqual({"page": "entry1"});
    });

    test('index length', () => {
        expect(pushToHistory('').length).toBe(6);
    });
  
    test('index object', () => {
        expect(pushToHistory('').state).toStrictEqual({});
    });
});
