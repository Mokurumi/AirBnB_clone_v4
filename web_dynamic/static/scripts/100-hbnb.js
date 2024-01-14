#!/usr/bin/node

$(document).ready(function () {
  const amenitiesHeader = $('.amenities h4');
  const locationsHeader = $('.locations h4');
  const placesSection = $('section.places');

  let ls_amen = {};
  let ls_cities = {};
  let ls_states = {};

  $('. amenities input[type="checkbox"]').click(function () {
    if (this.checked) {
      ls_amen[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete ls_amen[$(this).attr('data-id')];
    }
    amenitiesHeader.text(Object.values(ls_amen).join(', '));
  });

  $('.locations ul.popover li h2 input[type="checkbox"]').click(function () {
    if (this.checked) {
      ls_states[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete ls_states[$(this).attr('data-id')];
    }
    locationsHeader.text(Object.values(ls_states).concat(Object.values(ls_cities)).join(', '));
  });

  $('.locations ul.popover li ul li input[type="checkbox"]').click(function () {
    if (this.checked) {
      ls_cities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete ls_cities[$(this).attr('data-id')];
    }
    locationsHeader.text(Object.values(ls_states).concat(Object.values(ls_cities)).join(', '));
  });

  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/status/',
    type: 'GET',
    success: function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      } else {
        $('#api_status').removeClass('available');
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
        placesSection.append(html);
      }
    }
  });

  $('button').click(function () {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ amenities: Object.keys(ls_amen), states: Object.keys(ls_states), cities: Object.keys(ls_cities) }),
      success: function (data) {
        placesSection.empty();
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
          placesSection.append(html);
        }
      }
    });
  });
});
