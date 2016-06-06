/* jshint expr:true */
import { expect } from 'chai';
import {
  describeComponent,
  it
} from 'ember-mocha';
import hbs from 'htmlbars-inline-precompile';
import { beforeEach, describe } from 'mocha';
import sinon from 'sinon';

describeComponent(
  'not-select',
  'Integration: NotSelectComponent',
  {
    integration: true,
  },
  function () {
    beforeEach(function () {
      this.set('testLabel', 'Example Label');
      this.set('testOptions', [
        { value: 1, name: 'Display name' },
        { value: 2, name: 'Second name' },
      ]);
      this.set('onAction', sinon.spy());
      this.render(hbs`{{not-select label=testLabel options=testOptions action=onAction}}`);
    });

    it('renders', function () {
      expect(this.$()).to.have.length(1);
    });

    it('has label', function () {
      expect(this.$('.spec-not-select-label').text()).to.equal('Example Label');
    });

    it('has options', function () {
      expect(this.$('.spec-not-select-option')).to.have.length(2);
      expect(this.$('.spec-not-select-option:first').text()).to.equal('Display name');
    });

    it('does not have any selected by default', function () {
      expect(this.$('.spec-not-selected-checkbox:checked')).to.have.length(0);
    });

    describe('selecting option', function () {
      beforeEach(function () {
        this.$('.spec-not-select-option:first').click();
      });

      it('checks the option input', function () {
        expect(this.$('.spec-not-selected-checkbox:first').prop('checked')).to.equal(true);
      });

      it('fires the action on first element', function () {
        expect(this.get('onAction').calledWith(1)).to.equal(true);
        expect(this.$('.spec-not-selected-checkbox:checked')).to.have.length(1);
      });

      describe('selecting a new option', function () {
        beforeEach(function () {
          this.$('.spec-not-select-option:last').click();
        });

        it('fires the change state action twice', function () {
          expect(this.get('onAction').calledWith(2)).to.equal(true);
        });

        it('checks the new option', function () {
          expect(this.$('.spec-not-selected-checkbox:last').prop('checked')).to.equal(true);
        });

        it('unselects the original option', function () {
          expect(this.$('.spec-not-selected-checkbox:first').prop('checked')).to.equal(false);
        });
      });
    });
  }
);
