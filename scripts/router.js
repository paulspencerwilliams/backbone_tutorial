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