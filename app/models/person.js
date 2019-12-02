module.exports.Person = db => {
   let Person = db.define('person', {
        name    : String,
        surname : String,
        age     : Number,
    }, 
    {
        methods: {
            fullName: function () {
                return this.name + ' ' + this.surname;
            }
        }
    });
    return Person
}
