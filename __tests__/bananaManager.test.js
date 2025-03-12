/* eslint-disable no-undef */
// Используем require для CommonJS
import { bananaManager } from '../bananaManager.js';


describe('bananaManager', () => {
  let manager;

  beforeEach(() => {
    manager = bananaManager();
  });

  test('добавление банана', () => {
    manager.addBanana(7);
    const bananas = manager.getBananas();
    expect(bananas.length).toBe(1);
    expect(bananas[0].freshness).toBe(7);
  });

  test('удаление банана', () => {
    manager.addBanana(5);
    const banana = manager.getBananas()[0];
    manager.removeBanana(banana.id);
    expect(manager.getBananas().length).toBe(0);
  });

  test('распределение бананов', () => {
    manager.addBanana(8);
    manager.addBanana(6);
    const users = ['Alice', 'Bob'];
    const distribution = manager.distributeBananas(users);
    expect(distribution.length).toBe(2);
    expect(distribution[0].user).toBe('Alice');
    expect(distribution[1].user).toBe('Bob');
  });

  test('сортировка бананов по свежести', () => {
    manager.addBanana(5);
    manager.addBanana(9);
    manager.sortBananasByFreshness();
    const bananas = manager.getBananas();
    expect(bananas[0].freshness).toBe(9);
  });

  test('удаление испорченных бананов', () => {
    manager.addBanana(0);
    manager.addBanana(3);
    const removed = manager.removeSpoiledBananas();
    expect(removed.length).toBe(1);
    expect(manager.getBananas().length).toBe(1);
  });

  test('получение статистики', () => {
    manager.addBanana(6);
    manager.addBanana(4);
    const stats = manager.getBananaStatistics();
    expect(stats.total).toBe(2);
    expect(stats.averageFreshness).toBe(5);
  });

  test('лог действий', () => {
    manager.addBanana(7);
    manager.removeBanana(manager.getBananas()[0].id);
    const log = manager.getActionsLog();
    expect(log.length).toBe(2);
    expect(log[0].type).toBe('ADD');
    expect(log[1].type).toBe('REMOVE');
  });
});
