

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