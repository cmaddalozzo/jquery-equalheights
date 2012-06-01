/*
 * jQuery Equal Heights 1.0
 *
 * A simple plugin to resize a set of elements to the same height as the tallest
 * element.
 *
 */
;(function($){
    var window_loaded = false;
    $.fn.equalHeights = function( options ) {

      // Create some defaults, extending them with any options that were provided
      var settings = $.extend( {
        // The number of elements in a row. All element in a row will get the same
        // height. A row height of 0 will give all elements the same height.
        'rowSize'       : 0,
        // Specifies whether or not we should wait for the images to load. If yes
        // the function will be called in the window load listener. This should be
        // used when calling equalHeights from the document ready listener on elements
        // that contain images.
        'waitForImages'    : true,
        // Specifies whether or not existing height definitions should be removed
        // before resizing. This only removes height definitions declared in the
        // style tag. This is useful when calling equalHeights on a set of elements
        // that have been resized by equalHeights previously.
        'removeExistingHeight' : true
      }, options);
      //We need to know when the window has finished loading so we can decide
      //whether or not we need to bind to the load event.
      $(window).load(function(){
        window_loaded = true;
      });
      //Create our function then immediately invoke it
      return (function(target) {
        // Make a copy of the target array
        var rows = target.slice(0);
        //Remove existing heights if need be
        if(settings.removeExistingHeight){
          rows.css('height', '');
        }
        // Create a function so we can call it on window load if waitForImages is
        // true, otherwise we'll call it right way
        var resize = function(){
          while(rows.size()){
            //Take rowSize items off of the rows array
            var row = $(rows.splice(0, settings.rowSize > 0 ? settings.rowSize : rows.size()));
            var tallest = 0;
            row.each(function(){
              if($(this).height() > tallest){
                tallest = $(this).height()
              }
            });
            // Set all of the images in the row to the same height as the tallest
            // item
            row.height(tallest + 'px');
          }
        }
        // If we need to wait for images and the window isn't already done loading,
        // call the function in the window load listener.
        if(settings.waitForImages && !window_loaded){
          $(window).load(function () {
            resize();
          });
        // Otherwise call it now
        }else{
          resize();
        }
        // Return the original target to maintain chainability
        return target;
      })(this);
    };
})( jQuery );
