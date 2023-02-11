"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBooking = exports.updateBooking = exports.addBooking = exports.getOneBooking = exports.getBookings = void 0;
const uuid_1 = require("uuid");
const database_helpers_1 = require("../database-helpers");
const _db = new database_helpers_1.DatabaseHelper();
//Get booking Details
const getBookings = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookings = yield (yield _db.exec("getFlights")).recordset;
        res.status(200).json(bookings);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getBookings = getBookings;
//Get one booking
const getOneBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const booking = yield (yield _db.exec("getFlightBookings", { id })).recordset[0];
        if (!booking) {
            res.status(404).json({ error: "Booking Not Found" });
        }
        res.status(200).json(booking);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.getOneBooking = getOneBooking;
function addBooking(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = (0, uuid_1.v4)();
            const { Name, Email, TravelDate, Destination } = req.body;
            console.log(req.body);
            // if(error){
            //   return res.status(422).json(error.details[0].message)
            // }
            _db.exec("InsertOrUpdate", {
                id,
                name: Name,
                email: Email,
                destination: Destination,
                date: TravelDate,
            });
            return res.status(201).json({ message: "Booking Added" });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    });
}
exports.addBooking = addBooking;
//Update Booking
function updateBooking(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { Name, Email, TravelDate, Destination } = req.body;
            const booking = yield (yield _db.exec("getFlightBookings", { id: req.params.id })).recordset[0];
            if (booking) {
                yield _db.exec("InsertOrUpdate", {
                    id: req.params.id,
                    name: Name,
                    email: Email,
                    destination: Destination,
                    date: TravelDate,
                });
                return res.status(200).json({ message: "Updated" });
            }
            return res.status(404).json({ error: "Booking Not Found" });
        }
        catch (error) {
            res.status(500).json(error.message);
        }
    });
}
exports.updateBooking = updateBooking;
//delete
const cancelBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const booking = yield (yield _db.exec("getFlightBookings", { id: req.params.id })).recordset[0];
        if (booking) {
            yield _db.exec("deleteFlightBookings", { id: req.params.id });
            return res.status(200).json({ message: "Deleted" });
        }
        return res.status(404).json({ error: "Booking Not Found" });
    }
    catch (error) {
        res.status(500).json(error.message);
    }
});
exports.cancelBooking = cancelBooking;
