import $ from 'jquery';
window.jQuery = $;
window.$ = $;
import * as slick from 'slick-carousel';

// Products carousel
$(document).ready(function() {
    $('.carousel').slick({
        centerMode: true,
        centerPadding: '60px',
        slidesToShow: 3,
        arrows: true
      });
})