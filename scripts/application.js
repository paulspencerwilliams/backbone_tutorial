var ApplicationRouter = Backbone.Router.extend({
    initialize: function(el) {
        this.el = el;
        this.addressBook = new AddressBook;
        this.listView = new AddressBookView(this.addressBook);
        this.addView = new AddView(this.addressBook);


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
            this.currentView.remove();
        }
        this.el.html(view.el);
        view.render();
        this.currentView = view;
    },
    list: function() {
        this.switchView(this.listView);
    },
    add: function() {
        this.switchView(this.addView);
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

var AddressBookView = Backbone.View.extend({
    initialize: function(addressBook) {

        this.addressBook = addressBook;
    },
    render: function() {
        var variables = {
            addressBook: this.addressBook
        };

        var template = _.template($('#listTemplate').html(), variables);
        $(this.el).html(template);
        return this;
    }
});

var AddView = Backbone.View.extend({
    events: {
        "submit #addForm": "handleNewContact"
    },
    initialize: function(addressBook) {

        this.addressBook = addressBook;
    },

    handleNewContact: function(data) {

        var inputField = $('input[name=name]');

        var newContact = new Contact;
        newContact.name = inputField.val();
        this.addressBook.add(newContact);

        inputField.val('');
		router.navigate('', true);
    },

    render: function() {
        var template = _.template($('#addTemplate').html());
        $(this.el).html(template);
        return this;
    }
});



var AddressBook = Backbone.Collection.extend({
    model: Contact
});

var Contact = Backbone.Model.extend({

});











