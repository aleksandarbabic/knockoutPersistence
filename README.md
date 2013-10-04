#knockoutPersistence

knockout.js persistence for nested viewModel JS object structure

Plugin extends the solution made by Jim Hoskins.
https://github.com/jimrhoskins/knockout.localStorage/blob/master/knockout.localStorage.js


#Usage

    var viewModel = new ViewModel();

    function ViewModel() {
        this.persons = ko.observableArray([],{persist: 'VM_persons'});
        this.city = ko.observable(null,{persist: 'VM_city'});
    }

    function Person(ord){
      ord = ord ? ord : '';
      this.objectNameID = 'Person';
      this.orderNumberID = ko.observable(ord,{persist: 'Person_orderNumberId'+ord;});
      this.name = ko.observable(null,{persist: 'Person_name'+ord});
    }

    function City(ord){
      ord = ord ? ord : '';
      this.objectNameID = 'City';
      this.orderNumberID = ko.observable(ord,{persist: 'City_orderNumberId'+ord;});
      this.name = ko.observable(null,{persist: 'City_name'+ord});
    }

    ko.applyBindings( viewModel );
