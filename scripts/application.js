var ApplicationRouter = Backbone.Router.extend({
    initialize: function(el) {
        this.el = el;
		this.addressBook = new AddressBook;
        this.listView = new ContentView('#list', this.addressBook);


		var paul = new Contact;
		paul.name = "Paul";
		this.addressBook.add(paul);
		
		var james = new Contact;
		james.name = "James";
		this.addressBook.add(james);
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

    add: function() {
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
    initialize: function(view, addressBook) {
        this.view = view;
		this.addressBook = addressBook;
    },

    /*
	 * Get the template content and render it into a new div-element
	 */
    render: function() {
		var variables = {
            addressBook: this.addressBook
        };
		
		var template = _.template($(this.view).html(), variables);
		$(this.el).html(template);

        return this;

    }
});



var AddressBook = Backbone.Collection.extend({
    model: Contact
});

var Contact = Backbone.Model.extend({
    initialize: function() {


        }
});











