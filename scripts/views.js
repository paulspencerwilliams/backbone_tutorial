

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

        var firstnameField = $('input[name=firstname]');
        var lastnameField = $('input[name=lastname]');
        var newContact = new Contact ({firstname: firstnameField.val(), lastname: lastnameField.val()});
			
        this.addressBook.create(newContact);


        firstnameField.val('');
        lastnameField.val('');
		router.navigate('', true);
    },

    render: function() {
        var template = _.template($('#addTemplate').html());
        $(this.el).html(template);
        return this;
    }
});