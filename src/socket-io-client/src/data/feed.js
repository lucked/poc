import socketIOClient from "socket.io-client";

var feed = (function () {
    
    const endpoint = "http://127.0.0.1:4001";
    const socket = socketIOClient(endpoint);
    
      return {
          onChange: function(callback) {
              socket.on('stock', callback);
          },
          watch: function(symbols) {
              socket.emit('join', symbols);
          },
          unwatch: function(symbol) {
              socket.emit('leave', symbol);
          }
      };
    
    }());

    
export default feed;