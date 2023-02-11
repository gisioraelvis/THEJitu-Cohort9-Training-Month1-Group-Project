"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Booking = void 0;
class Booking {
    constructor(Id, Name, Email, Destination, TravelDate) {
        this.Id = Id;
        this.Name = Name;
        this.Email = Email;
        this.Destination = Destination;
        this.TravelDate = TravelDate;
    }
}
exports.Booking = Booking;
class User {
    constructor(Id, Name, Email, Password, Role) {
        this.Id = Id;
        this.Name = Name;
        this.Email = Email;
        this.Password = Password;
        this.Role = Role;
    }
}
exports.User = User;
