//this will come from an external file

var catalogos = [

  {

    "titulo": 'Catálogo de Productos CISA, Visalock, Vulkan',

    "directorio": "CAT_LOCKEY",

    "sufijo": "CAT_LOCKEY-",

    "totalpags": 182,

    "pageoffset": 0,

    "menuJson": 'menu-json-1.js'

  },

  {

    "titulo": 'Productos Ferreteros',

    "directorio": "CATF_LOCKEY",

    "sufijo": "CATF_LOCKEY",

    "totalpags": 198,

    "pageoffset": 0,

    "menuJson": 'menu-json-2.js'

  },
  {

    "titulo": 'Visalock Soluciones para Hoteles',

    "directorio": "SOL_HOTELERAS",

    "sufijo": "SOLUCIONES_HOTELERAS-",

    "totalpags": 8,

    "pageoffset": 0,

    "menuJson": 'menu-json-3.js'

  },
  {

    "titulo": 'Visalock Soluciones Residenciales',

    "directorio": "SOL_RESIDENCIALES",

    "sufijo": "CATF_LOCKEY",

    "totalpags": 7,

    "pageoffset": 0,

    "menuJson": 'menu-json-4.js'

  }

]



var pluginDir = from_php.dirUrl;

var viewportWidth = jQuery(window).width();

var viewportHeight = jQuery(window).height();

var pageOffset = 1; //offset of page numbers to not count cover. Usually just 1.

var catId = 1

//TODO: 

//feed this list from READING a directory with PHP

var directorio = pluginDir+"/imagenes"; //directory where img files will be uploaded

console.log("from_shortcode ?=> " + from_php.from_shortcode.doc_id);

var catId = from_php.from_shortcode.doc_id;

var totalpags = catalogos[catId].totalpags;

directorio = directorio + "/" + catalogos[catId].directorio;

var prename = catalogos[catId].sufijo;

var pageoffset = 0; //why is this repeated??

var zoomActivado = false; //

var modal = document.getElementById('zoomModal');

var clicking = false;

var previousX;

var previousY;







function toggleMenuBut() {

  jQuery("#submenucont").toggle("fast");

  jQuery("i", "#menuopener").toggleClass("fa fa-list");

  jQuery("i", "#menuopener").toggleClass("fa fa-times");

}



function toggleZoomBut() {

  jQuery("i", "#activatezoom").toggleClass("fa fa-search-plus");

  jQuery("i", "#activatezoom").toggleClass("fa fa-search-minus");

}

function addTitle() {

  jQuery("#titulo-doc").append(catalogos[catId].titulo);  

}

function makeMenu(menuObj) {

  menustr = JSON.stringify(menuObj);

  var obj = jQuery.parseJSON(menustr);

  jQuery.each(obj, function () {

    classnivel = "niv1";

    ira = this['index'];

    if (this['nivel'] == 2) {

      classnivel = "niv2";

    }

    jQuery("#submenu").append('<li class="' + classnivel + '"><a href="#" data-slide="' + ira + '">' + this['texto'] + '</a></li>');

  });

}

function createPages() {

  paginas = [];

  for (i = pageoffset; i < totalpags + 1; i++) {

   // paginas[i] = directorio + "/" + prename + i + ".jpg";

    paginas[i] = "http://avae.com.ve/lockeycolombia/pdf_catalogos/"+ catalogos[catId].directorio + "/" + prename + i + ".jpg";

    

  }

  console.log(paginas);



  for (i = pageoffset; i < paginas.length - 1 + pageoffset; i++) {

    parimpar = i % 2 == 0 ? "impar" : "par";

    lapag = paginas[i];

    console.log(lapag);

    jQuery("#viewer").append('<div><div class="innerslide ' + parimpar + '" ><img data-lazy="' + lapag + '" class="img-pag ' + parimpar + ' thumby" id="pag-' + i + '"></div></div>');

  }



}

function closeModal(){

  document.getElementById('zoomModal').style.display = "none";

  jQuery("#dragme").css({

    'left': jQuery("#dragme").data('originalLeft'),

    'top': jQuery("#dragme").data('origionalTop')

  });

  jQuery(".img-modal").remove();

  jQuery("#zoomModal").removeClass('noscroll');

  jQuery("body").removeClass('noscroll');

}

function init() {

  addTitle();

  var jqxhr = jQuery.getJSON(pluginDir+"assets/js/"+ catalogos[catId].menuJson +"", function (datos) {

    makeMenu(datos);

  })

    .done(function () {

      console.log("second success");

    })

    .fail(function () {

      console.log("error");

    })

    .always(function () {

      console.log("complete");

    });

  createPages();



}



jQuery(document).ready(function () {

  init();

  jQuery('img').bind('contextmenu', function(e) {

    return false;

  });  

  jQuery("body").on("contextmenu", "img", function (e) {

    //return false;

  });



  jQuery(window).resize(function () {

    var viewportWidth = jQuery(window).width();

    var viewportHeight = jQuery(window).height();

  });



  jQuery("#scroll").css('cursor', 'move');

  jQuery("#dragme").data({

    'originalLeft': jQuery("#dragme").css('left'),

    'origionalTop': jQuery("#dragme").css('top')

  });



  jQuery("#scroll").mousedown(function (e) {

    e.preventDefault();

    jQuery(".img-modal").css('cursor', 'move');

    previousX = e.clientX;

    previousY = e.clientY;

    clicking = true;

  });



  jQuery(document).mouseup(function () {

    clicking = false;

  });



  jQuery("#scroll").mousemove(function (e) {

    if (clicking) {

      e.preventDefault();

      jQuery("#scroll").scrollLeft(jQuery("#scroll").scrollLeft() + (previousX - e.clientX));

      jQuery("#scroll").scrollTop(jQuery("#scroll").scrollTop() + (previousY - e.clientY));

      previousX = e.clientX;

      previousY = e.clientY;

    }

  });



  jQuery("#scroll").mouseleave(function (e) {

    clicking = false;

  });

  jQuery("#dragme").mousedown(function (e) {

    e.preventDefault();

    previousX = e.clientX;

    previousY = e.clientY;

    clicking = true;

  });

  jQuery(document).mouseup(function () {

    clicking = false;

  });

  jQuery("#dragme").mousemove(function (e) {

    console.log("clickiado" + clicking);

    if (clicking) {

      e.preventDefault();

      var directionX = (previousX - e.clientX) > 0 ? 1 : -1;

      var directionY = (previousY - e.clientY) > 0 ? 1 : -1;

      console.log("pos" + directionX + " -- " + e.clientX);

      //jQuery("#scroll").scrollLeft(jQuery("#scroll").scrollLeft() + 10 * directionX);

      //jQuery("#scroll").scrollTop(jQuery("#scroll").scrollTop() + 10 * directionY);

      jQuery("#dragme").scrollLeft(jQuery("#dragme").scrollLeft() + (previousX - e.clientX));

      jQuery("#dragme").scrollTop(jQuery("#dragme").scrollTop() + (previousY - e.clientY));

      previousX = e.clientX;

      previousY = e.clientY;

    }

  });

  jQuery("#dragme").mouseleave(function (e) {

    clicking = false;

  });

  jQuery("#activatezoom").click(function () {

    toggleZoomBut();

    zoomActivado = !zoomActivado;

    if (zoomActivado === true) {

      jQuery('.slick-slide').css('cursor', 'zoom-in');

      jQuery(this).css('color', 'gray');

    }

    else {

      jQuery('.slick-slide').css('cursor', 'default');

      jQuery(this).css('color', '#444');

    }

    jQuery('.slick-slide').removeClass("touch_mode_grabbing")

  });



  jQuery(document).on('click', function (evt) {

    if (zoomActivado) {

      if (evt.target.classList.contains('thumby')) {

        jQuery("#submenucont").hide("fast");

        modal.style.display = "block";

        jQuery("#zoomModal").addClass('noscroll');

        jQuery("body").addClass('noscroll');

        jQuery(evt.target).clone()

          .removeClass('thumby')

          .addClass('img-modal')

          .removeClass('img-pag')

          .removeClass('impar')

          .removeClass('par')

          .appendTo(jQuery("#dragme"))

          .appendTo(jQuery("#scroll"))

          .css({ left: 0, top: 0 });

      }

    }

  });



  jQuery(document).keydown(function(event) { 

    if (event.keyCode == 27) { 

      closeModal();

    }

});



  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal

  span.onclick = function () {

    closeModal();

  }

  jQuery('#zoomModal').onclick = function () {

    document.getElementById('zoomModal').style.display = "none";

    jQuery("#dragme").css({

      'left': jQuery("#dragme").data('originalLeft'),

      'top': jQuery("#dragme").data('origionalTop')

    });

    jQuery(".img-modal").remove();

  }

  jQuery("#menuopener").click(function () {

    toggleMenuBut();

  });

  jQuery('#progressbar1').LineProgressbar({

    percentage: 0.01,

    duration: 1

  });

  //activate menu links

  jQuery(document).on('click', 'a[data-slide]', function (e) {

    e.preventDefault();

    var slideno = jQuery(this).data('slide') + pageOffset;

    toggleMenuBut();

    slider.slick('slickGoTo', slideno);

  });

  //init slider

  var slider = jQuery('.slideshow');

  slider.slick({

    slidesToShow: 2,

    lazyLoad: 'ondemand',

    infinite: false,

    slidesToScroll: 2,

    adaptiveHeight: true,

    variableWidth: false,

    responsive: [

      {

        breakpoint: 800,

        settings: {

          slidesToShow: 1,

          /* verticalSwiping: true,

           vertical: true,*/

          slidesToScroll: 1,

          infinite: false,

          adaptiveHeight: false,

          lazyLoad: 'ondemand'

        }

      }

    ]

  });

  slider

    /*.on('init', function (event, slick) {

    })*/

    .on('beforeChange', function (event, slick, currentSlide, nextSlide) {

    })

    .on('afterChange', function (event, slick, currentSlide, nextSlide) {

      if (currentSlide > paginas.length - 2) {

        progreso = 100;

      } else {

        progreso = Math.ceil((currentSlide * 100) / paginas.length);

      }

      jQuery('#progressbar1').LineProgressbar({

        percentage: progreso,

        duration: 1,

        ShowProgressCount: false

      });

    });

  if (viewportWidth < 800) {

    slider.slick('slickGoTo', 1);

  }

  else {

    slider.slick('slickGoTo', 0);

  }

});

