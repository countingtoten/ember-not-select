import Ember from 'ember';

export default Ember.Controller.extend({
  options: [
    { value: 1, name: 'Display name' },
    { value: 2, name: 'Second name' },
  ],
});
