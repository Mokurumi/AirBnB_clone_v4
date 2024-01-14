#!/usr/bin/node

$(document).ready(function () {
  let dict = {};
  $('input[type=checkbox]').click(function () {
    if ($(this).is(':checked')) {
      dict[$(this).attr('data-id')] = $(this).attr('data-name');
    }
    else {
      delete dict[$(this).attr('data-id')];
    }
    const list = Object.values(dict);
    if (list.length > 0) {
      $('div.amenities > h4').text(list.join(', '));
    }
    else {
      $('div.amenities > h4').html('&nbsp;');
    }
  });

  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ amenities: Object.keys(dict) }),
      success: function (data) {
        $('section.places').empty();
        for (const place of data) {
          const html = `<article>
                        <div class="title_box">
                          <h2>${place.name}</h2>
                          <div class="price_by_night">${place.price_by_night}</div>
                        </div>
                        <div class="information">
                          <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                          <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                          <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                        </div>
                        <div class="description">
                          ${place.description}
                        </div>
                      </article>`;
          $('section.places').append(html);
        }
      }
    });
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    success: function (data) {
      if (data.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    }
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: '{}',
    success: function (data) {
      for (const place of data) {
        const html = `<article>
                      <div class="title_box">
                        <h2>${place.name}</h2>
                        <div class="price_by_night">${place.price_by_night}</div>
                      </div>
                      <div class="information">
                        <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
                        <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
                        <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
                      </div>
                      <div class="description">
                        ${place.description}
                      </div>
                    </article>`;
        $('section.places').append(html);
      }
    }
  });
});
