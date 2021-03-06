import { A as emberArray } from '@ember/array';
import { run } from '@ember/runloop';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | {{slice}}', function(hooks) {
  setupRenderingTest(hooks);

  test('It slices an array with positional params', async function(assert) {
    this.set('array', emberArray([2, 4, 6]));

    await render(hbs`
      {{slice 1 3 array}}
    `);

    assert.equal(find('*').textContent.trim(), '4,6', 'sliced values');
  });

  test('It slices when only 2 params are passed', async function(assert) {
    this.set('array', emberArray([2, 4, 6]));

    await render(hbs`
      {{slice 1 array}}
    `);

    assert.equal(find('*').textContent.trim(), '4,6', 'sliced values');
  });

  test('It recomputes the slice if an item in the array changes', async function(assert) {
    let array = emberArray([2, 4, 6]);
    this.set('array', array);

    await render(hbs`
      {{slice 1 3 array}}
    `);

    assert.equal(find('*').textContent.trim(), '4,6', 'sliced values');

    run(() => array.replace(2, 1, [5]));

    assert.equal(find('*').textContent.trim(), '4,5', 'sliced values');
  });

  test('it allows null array', async function(assert) {
    this.set('array', null);

    await render(hbs`
      this is all that will render
      {{#each (slice 1 2 array) as |value|}}
        {{value}}
      {{/each}}
    `);

    assert.equal(find('*').textContent.trim(), 'this is all that will render', 'no error is thrown');
  });
});
