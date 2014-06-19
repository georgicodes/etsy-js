(function() {
  var Address, util;

  util = require('util');

  Address = (function() {
    function Address(userId, client) {
      this.userId = userId;
      this.client = client;
    }

    Address.prototype.findAll = function(cb) {
      return this.client.get("/users/" + this.userId + "/addresses", function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Final all user addresses error'));
        } else {
          return cb(null, body, headers);
        }
      });
    };

    Address.prototype.create = function(address, cb) {
      return this.client.post("/users/" + this.userId + "/addresses", address, function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Create a new user address error'));
        } else {
          return cb(null, body, headers);
        }
      });
    };

    Address.prototype["delete"] = function(addressId, cb) {
      return this.client["delete"]("/users/" + this.userId + "/addresses/" + addressId, function(err, status, body, headers) {
        if (err) {
          return cb(err);
        }
        if (status !== 200) {
          return cb(new Error('Delete an address error'));
        } else {
          return cb(null, body, headers);
        }
      });
    };

    return Address;

  })();

  module.exports = Address;

}).call(this);
