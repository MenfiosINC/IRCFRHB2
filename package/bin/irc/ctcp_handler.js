// Generated by CoffeeScript 1.4.0
(function() {
  "use strict";
  var CTCPHandler, exports, _ref,
    __slice = [].slice;

  var exports = (_ref = window.irc) != null ? _ref : window.irc = {};

  /*
   * Handles CTCP requests such as VERSION, PING, etc.
  */


  CTCPHandler = (function() {

    CTCPHandler.DELIMITER = '\u0001';

    function CTCPHandler() {
      /*
           * TODO: Respond with this message when an unknown query is seen.
      */
      this._error = "" + CTCPHandler.DELIMITER + "ERRMSG" + CTCPHandler.DELIMITER;
    }

    CTCPHandler.prototype.isCTCPRequest = function(msg) {
      if (!/\u0001[\w\s]*\u0001/.test(msg)) {
        return false;
      }
      return this.getResponses(msg).length > 0;
    };

    CTCPHandler.prototype.getReadableName = function(msg) {
      var args, type, _ref1;
      _ref1 = this._parseMessage(msg), type = _ref1[0], args = _ref1[1];
      return type;
    };

    CTCPHandler.prototype.getResponses = function(msg) {
      var args, response, responses, type, _i, _len, _ref1, _results;
      _ref1 = this._parseMessage(msg), type = _ref1[0], args = _ref1[1];
      responses = this._getResponseText(type, args);
      _results = [];
      for (_i = 0, _len = responses.length; _i < _len; _i++) {
        response = responses[_i];
        _results.push(this._createCTCPResponse(type, response));
      }
      return _results;
    };

    /*
       * Parses the type and arguments from a CTCP request.
       * @param {string} msg CTCP message in the format: '\0001TYPE ARG1 ARG2\0001'.
       *     Note: \0001 is a single character.
       * @return {string, Array.<string>} Returns the type and the args.
    */


    CTCPHandler.prototype._parseMessage = function(msg) {
      var args, type, _ref1;
      msg = msg.slice(1, +(msg.length - 2) + 1 || 9e9);
      _ref1 = msg.split(' '), type = _ref1[0], args = 2 <= _ref1.length ? __slice.call(_ref1, 1) : [];
      return [type, args];
    };

    /*
       * @return {Array.<string>} Returns the unformatted responses to a CTCP
       *     request.
    */


    CTCPHandler.prototype._getResponseText = function(type, args) {
      /*
           * TODO support the o ther types found here:
           * http://www.irchelp.org/irchelp/rfc/ctcpspec.html
      */

      var environment, name;
      switch (type) {
        case 'VERSION':
          name = 'IRCFRHB2';
          environment = 'Chrome';
          return [' ' + [name, globals.VERSION, environment].join(' ')];
        case 'SOURCE':
          return [' https://github.com/MenfiosINC/IRCFRHB2/'];
        case 'PING':
          return [' ' + args[0]];
        case 'TIME':
          var d = new Date();
          return [' ' + d.toUTCString()];
        default:
          return [];
      }
    };

    /*
       * @return {string} Returns a correctly formatted response to a CTCP request.
    */


    CTCPHandler.prototype._createCTCPResponse = function(type, response) {
      return "" + CTCPHandler.DELIMITER + type + response + CTCPHandler.DELIMITER;
    };

    return CTCPHandler;

  })();

  exports.CTCPHandler = CTCPHandler;

}).call(this);
