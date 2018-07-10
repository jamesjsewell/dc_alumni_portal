import Backbone from "backbone";
import { API_URL } from "../../util/util.js"

export const Grad = Backbone.Model.extend({
	urlRoot: `${API_URL}/grads`,
	idAttribute: "_id",
	// defaults: function() {
		
	// }
});

export const GradCollection = Backbone.Collection.extend({
	comparator: function (mod) {
		return new Date(mod.get("createdAt")).getTime() * -1;
	},
	fetch: function (options) {
		
		if (options.data) {

			options.type = 'POST';
			options.url = `${API_URL}/grads/filter`

		}
		else{
			options.url = `${API_URL}/grads`
		}
	
		Backbone.Collection.prototype.fetch.call(this, options);
	},
	parse: function (response) {
		
		return response

	},
	model: Grad
});