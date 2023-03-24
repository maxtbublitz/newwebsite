var $projectGalleryHolder = $('.grid').isotope({
    itemSelector: '.projectContainer',
    masonry: {
      columnWidth: '.grid-sizer',
      gutter: '.gutter-sizer'
    }
});

var $checkboxes = $('#filterUI input');
// console.log($checkboxes);

$checkboxes.click( function() {
  // map input values to an array
  var inclusives = [];
  // inclusive filters from checkboxes
  $checkboxes.each( function( i, elem ) {
    // if checkbox, use value if checked
    if ( elem.checked == false ) {
      inclusives.push( elem.value );
    }
  });

  // combine inclusive filters
  var filterValue = inclusives.length ? inclusives.join(', ') : '*';
  console.log(filterValue)

  $projectGalleryHolder.isotope({ filter: filterValue })
});