var ApplicationRouter = Backbone.Router.extend({
    initialize: function(el) {
        this.el = el;
        this.listView = new ContentView('#list');
    },

    routes: {
        "": "list",
		"add": "add"
    },

    currentView: null,

    switchView: function(view) {
        if (this.currentView) {
            // Detach the old view
            this.currentView.remove();
        }

        // Move the view element into the DOM (replacing the old content)
        this.el.html(view.el);

        // Render view after it is in the DOM (styles are applied)
        view.render();

        this.currentView = view;
    },



    list: function() {
        this.switchView(this.listView);
    },

	add: function () {
		alert('adding');
	}
});

// Override View.remove()'s default behavior
Backbone.View = Backbone.View.extend({
    remove: function() {
        // Empty the element and remove it from the DOM while preserving events
        $(this.el).empty().detach();

        return this;
    }
});

var ContentView = Backbone.View.extend({
    /*
	 * Initialize with the template-id
	 */
    initialize: function(view) {
        this.view = view;
    },

    /*
	 * Get the template content and render it into a new div-element
	 */
    render: function() {
        var template = $(this.view).html();
        $(this.el).html(template);

        return this;
    }
});





var Contact = Backbone.Model.extend({
    initialize: function() {


        }
});











