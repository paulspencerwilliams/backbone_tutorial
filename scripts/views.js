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
    renderContact: function(model) {

        var contactView = new ContactView({
            model: model
        });
        contactView.render();
        $('tbody').append(contactView.el);
    },
    render: function() {
        var template = _.template($('#listTemplate').html());
        $(this.el).html(template);
        this.addressBook.each(this.renderContact);
        return this;
    }
});

var ContactView = Backbone.View.extend({
	tagName: 'tr',
    initialize: function() {
        this.model.bind('destroy', this.remove, this);
    },

    events: {
        "click .delete": "onDeleteClicked"
    },

    render: function() {
        var template = _.template($('#contactTemplate').html(), this.model.toJSON());
        $(this.el).html(template);
        return this;
    },

    onDeleteClicked: function() {
        this.model.destroy();
    }
});


var AddView = Backbone.View.extend({
    events: {
        "submit #addForm": "handleNewContact",
        "click #cancel": "cancelNewContact"

    },
    initialize: function(addressBook) {

        this.addressBook = addressBook;
    },

    handleNewContact: function(data) {

        var firstnameField = $('input[name=firstname]');
        var lastnameField = $('input[name=lastname]');
        var newContact = new Contact({
            firstname: firstnameField.val(),
            lastname: lastnameField.val()
        });

        this.addressBook.create(newContact);


        firstnameField.val('');
        lastnameField.val('');
        router.navigate('', true);
    },
    cancelNewContact: function(data) {
        var firstnameField = $('input[name=firstname]');
        var lastnameField = $('input[name=lastname]');
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