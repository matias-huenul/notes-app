let model = {
	note: {
		request: function(method, data) {
			return $.ajax({
				url: "/notes",
				method,
				data
			});
		},
		create: function(content) {
			return this.request("POST", {content});
		},
		edit: function(id, content) {
			return this.request("PUT", {id, content});
		},
		getAll: function() {
			return this.request("GET");
		},
		getLast: function() {
			return this.request("GET", {limit: 1})
					   .then(result => result[0]);
		},
		delete: function(id) {
			return this.request("DELETE", {id});
		}
	}
};
