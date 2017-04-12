/*!
 * Dandomain Filter
 * https://github.com/loevgaard/dandomain-filter
 *
 * Copyright 2017 Joachim Loevgaard
 * Released under the MIT license
 */
;(function(window){
    "use strict";

    var queue = {};

    function main() {
        var obj = {};

        obj.events = {};
        obj.events.filteredListLoadedFirstTime      = 'filteredListLoadedFirstTime';
        obj.events.beforeFilteredListLoaded         = 'beforeFilteredListLoaded';
        obj.events.filteredListLoadedAfterRender    = 'filteredListLoadedAfterRender';
        obj.events.filteredListLoaded               = 'filteredListLoaded';

        for(var event in obj.events) {
            window[event] = function () {
                callQueue(event);
            };
        }

        /**
         * @param {String} event
         * @param {function} fn
         * @return {{}}
         */
        obj.on = function (event, fn) {
            // check if event is valid
            var valid = false;
            for(var i in obj.events) {
                if(i == event) {
                    valid = true;
                    break;
                }
            }

            if(!valid) {
                console.log("Event: '" + event + "' is not a valid event. Too see valid events, write 'dandomainFilter.events' in the console.");
            }

            if(!queue.hasOwnProperty(event)) {
                queue[event] = [];
            }

            queue[event].push(fn);
        };


        return obj;
    }

    function callQueue(event) {
        if(!queue.hasOwnProperty(event)) {
            return;
        }

        queue[event].forEach(function (fn) {
            fn.apply();
        });
    }

    if(typeof(window.dandomainFilter) === 'undefined'){
        window.dandomainFilter = main();
    }
})(window);