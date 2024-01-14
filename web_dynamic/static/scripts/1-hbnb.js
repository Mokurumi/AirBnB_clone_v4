#!/usr/bin/node

/**
 * Listen for changes on each input checkbox tag:
 * if the checkbox is checked, you must store the Amenity ID in a
 * variable (dictionary or list)
 * if the checkbox is unchecked, you must remove the Amenity ID
 * from the variable
 * update the h4 tag inside the div Amenities with the list of
 * Amenities checked
 */

$(document).ready(function () {
  const dict = {};
  $('input[type=checkbox]').click(function () {
    if ($(this).is(':checked')) {
      dict[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete dict[$(this).attr('data-id')];
    }
    const list = Object.values(dict);
    if (list.length > 0) {
      $('div.amenities > h4').text(list.join(', '));
    } else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });
});