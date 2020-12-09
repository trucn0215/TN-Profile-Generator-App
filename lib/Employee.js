// TODO: Write code to define and export the Employee class
class Employee{

    constructor(name, id, email){

        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName(name) {
        return this.name;
    }

    getId() {
        return this.id;
    }
}
module.exports = Employee;