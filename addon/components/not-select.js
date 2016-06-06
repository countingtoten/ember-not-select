import Ember from 'ember';
import layout from '../templates/components/not-select';

export default Ember.Component.extend({
  layout,

  actions: {
    notifyOnChange(choiceState) {
      this.sendAction('action', choiceState.selection.value);
    },
  },
});
