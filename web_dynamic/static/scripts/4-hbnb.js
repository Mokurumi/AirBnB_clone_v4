#!/usr/bin/node

$(document).ready(function () {
  const $checkboxes = $('input[type="checkbox"]');
  const $amenities = $('div.amenities h4');
  const $apiStatus = $('div#api_status');
  const $places = $('section.places');

  let checked = [];

  $checkboxes.change(function () {
    if (this.checked) {
      checked.push($(this).attr('data-id'));
    } else {
      checked.splice(checked.indexOf($(this).attr('data-id')), 1);
    }
    if (checked.length > 0) {
      $amenities.text(checked.join(', '));
    } else {
      $amenities.html('&nbsp;');
    }
  });

  $.getJSON('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status === 'OK') {
      $apiStatus.addClass('available');
    } else {
      $apiStatus.removeClass('available');
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
        $places.append(html);
      }
    }
  });

  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ amenities: checked }),
      success: function (data) {
        $places.empty();
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
          $places.append(html);
        }
      }
    });
  });
});
