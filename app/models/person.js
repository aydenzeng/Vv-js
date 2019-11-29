var Person = db.define('person', {
    name    : String,
    surname : String
}, {
    methods: {
        fullName: function () {
            return this.name + ' ' + this.surname;
        }
    }
});