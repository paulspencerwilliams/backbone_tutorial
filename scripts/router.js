var ApplicationRouter = Backbone.Router.extend({
    initialize: function(el) {
        this.el = el;
        this.addressBook = new AddressBook;
        this.listView = new AddressBookView(this.addressBook);
        this.addView = new AddView(this.addressBook);
        this.addressBook.fetch();
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