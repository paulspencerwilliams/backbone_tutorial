var Contact = Backbone.Model.extend({

    });

var AddressBook = Backbone.Collection.extend({
    model: Contact,
    localStorage: new Store("addressBook")
    // url: http://theserver.com/api/AddressBook
});

