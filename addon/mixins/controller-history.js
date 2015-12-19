import Ember from 'ember';

export default Ember.Mixin.create({
	
	actions: {
		backButton(context) {
			this.send('goBack', context);
		}
  }

});
