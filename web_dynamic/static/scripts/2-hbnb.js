#!/usr/bin/node

$(document).ready(function () {
  let dict = {};
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

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
});
