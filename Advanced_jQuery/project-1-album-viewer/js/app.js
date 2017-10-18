'use strict';

;
(function ($) {

  var defaults = {
    // set defaults
    albumsURL: 'https://jsonplaceholder.typicode.com/albums',
    photosURL: 'https://jsonplaceholder.typicode.com/photos',
    albumData: {},
    currentAlbums: { albums: [], photos: [] },
    albumsPerPage: 20,
    currentAlbumIndex: 0
  };

  function AlbumGrid(element, options) {
    this.config = $.extend({}, defaults, options);
    this.element = element;
    this.init();
  }

  // plugin definition
  AlbumGrid.prototype.init = function () {
    // plugin logic goes here...

    this._getAlbums();
    this._getPhotos();
    // console.log(this.config.albumData);
    this._populateAlbumGrid();
  };

  AlbumGrid.prototype._getAlbums = function () {
    var _this = this;

    $.ajax({
      url: this.config.albumsURL,
      method: 'GET'
    }).done(function (data) {
      _this.config.albumData.albums = data;
    }, function () {
      console.log('_getAlbums GET has failed');
    });
  };

  AlbumGrid.prototype._getPhotos = function () {
    var _this2 = this;

    $.ajax({
      url: this.config.photosURL,
      method: 'GET'
    }).done(function (data) {
      _this2.config.albumData.photos = data;
    }, function () {
      console.log('_getPhotos GET has failed');
    });
  };

  AlbumGrid.prototype._populateAlbumGrid = function () {
    var _this3 = this;

    $(document).ajaxStop(function () {
      var grid = _this3.config;
      // fade out the preloader
      $('.preloader').fadeOut(3000);

      // get first 20 albums
      for (var i = 0; i < grid.albumsPerPage; i++) {
        grid.currentAlbums.albums.push(grid.albumData.albums[i]);
      }
      // get associated photo sets
      grid.currentAlbums.photos = grid.albumData.photos.filter(function (photo) {
        return photo.albumId <= grid.albumsPerPage;
      });
      // set currentAlbumIndex
      grid.currentAlbumIndex = grid.albumsPerPage;

      var albumData = grid.template(grid.currentAlbums);
      _this3.element.html(albumData);

      // call lightbox plugin
      _this3.element.lightbox({
        photos: grid.currentAlbums.photos,
        galleryTemplate: grid.galleryTemplate
      });

      _this3._makeNextButton();

      // const albumData = this.config.template(this.config.albumData);
      // this.element.html(albumData);
    });
  };

  AlbumGrid.prototype._makeNextButton = function () {
    var _this4 = this;

    this.element.after('<div class="page-controls"><div class="button">show more albums</div></div>');
    $('.page-controls').on('click', function () {
      _this4._getNextPage();
    });
  };

  AlbumGrid.prototype._getNextPage = function () {
    var _this5 = this;

    var grid = this.config;

    // reset currentAlbums
    grid.currentAlbums.albums.length = 0;
    //reset associated photos
    grid.currentAlbums.photos.length = 0;

    this.element.fadeOut(200);

    $('.preloader').fadeIn(300);
    setTimeout(function () {
      $('body').scrollTop(0);
      // don't grab albums that aren't there...
      if (grid.currentAlbumIndex <= grid.albumData.albums.length - grid.albumsPerPage) {
        // get next 20 albums
        for (var i = 0; i < grid.albumsPerPage; i++) {
          grid.currentAlbums.albums.push(grid.albumData.albums[i + grid.currentAlbumIndex]);
        }
        // get associated photo sets
        grid.currentAlbums.photos = grid.albumData.photos.filter(function (photo) {
          return photo.albumId > grid.currentAlbumIndex && photo.albumId <= grid.currentAlbumIndex + grid.albumsPerPage;
        });

        var photos = grid.currentAlbums.photos;

        // call lightbox plugin
        _this5.element.lightbox({
          photos: grid.currentAlbums.photos,
          galleryTemplate: grid.galleryTemplate
        });

        // adjust currentAlbumIndex
        grid.currentAlbumIndex += grid.albumsPerPage;

        var albumData = grid.template(grid.currentAlbums);
        _this5.element.html(albumData);

        _this5.element.fadeIn(200);
        $('.preloader').fadeOut(3000);
      } else {
        $('.page-controls > .button').html('that\'s all folks!');
        _this5.element.fadeIn(200);
        $('.preloader').fadeOut(1000);
        console.log('that\'s all folks!');
      }
    }, 1000);
  };

  $.fn.albumGrid = function (options) {
    new AlbumGrid(this, options);
    return this;
  };
})(jQuery);
'use strict';

;
(function ($) {

    $.fn.buildGrid = function (rootURL) {
        return this.each(function () {
            var projectData = {
                'albums': null,
                'photos': null
                // $.extend(projectData);
            };$.ajax({
                url: rootURL + '/albums',
                method: 'GET'
            }).then(function (data) {
                console.log('album data', data);
                projectData.albums = data;
            }).then($.get(rootURL + '/photos', function (data) {
                console.log('photos data', data);
                projectData.photos = data;
                initGrid();
            }));

            function initGrid() {
                console.log(projectData);
            }
        });
    };
})(jQuery);
'use strict';

;(function ($) {

  var defaults = {
    // set defaults
  };

  var albumData = {};

  function Lightbox(element, options) {
    this.config = $.extend({}, defaults, options);
    this.element = element;
    albumData = this.config;
    this.init();
  }

  Lightbox.prototype.init = function () {
    // plugin logic goes here...
    var template = this.config.galleryTemplate;
    var photosArray = this.config.photos;
    var dataObj = { photos: photosArray, galleryTemplate: template };
    this.element.on('click', '.album', albumData, this._openLightbox);
    // this.element.on('click', '.album', {photos: photosArray, galleryTemplate: template}, this._openLightbox);
  };

  Lightbox.prototype._openLightbox = function (event) {
    var albumId = parseInt(event.currentTarget.dataset.albumId);
    var albumImages = {};
    albumImages.photos = albumData.photos.filter(function (photo) {
      return photo.albumId === albumId;
    });

    // pass albumImages to gallery template
    var galleryThumbs = albumData.galleryTemplate(albumImages);

    // insert gallery into DOM
    var gallery = $('.lightbox-modal');
    gallery.html(galleryThumbs);

    // set source of first full-sized image
    var initialSrc = albumImages.photos[0].url;
    var initTitle = albumImages.photos[0].title;
    $('.current-image > img').attr({ src: initialSrc });
    $('.current-image > p').html(initTitle);

    // show gallery modal
    gallery.addClass('--is-visible');

    _setListeners();
  };

  // Lightbox.prototype._showClickedPhoto = function(event) {
  //   console.log('thumb clicked');
  // };

  function _setListeners(event) {
    // on thumb click big image is set
    $('.photo-gallery__list').on('click', '.photo-gallery__thumb', function (event) {
      var lgSrc = event.target.dataset.largeImageUrl;
      var title = '' + event.target.dataset.title;
      $('.current-image').removeClass('--is-current').addClass('--is-shrinking').on('animationend', function () {
        $('.current-image > img').attr({ src: lgSrc });
        $('.current-image > p').html(title);
        $(this).addClass('--is-current').removeClass('--is-shrinking');
      });
    });

    // close lightbox listener
    $('.close-lightbox').on('click', function (event) {
      $('.lightbox-modal').removeClass('--is-visible');
    });
  }

  $.fn.lightbox = function (options) {
    new Lightbox(this, options);
    return this;
  };
})(jQuery);
'use strict';

(function ($, Handlebars) {

  var albumTemplate = $('#album-grid-template').html();
  var compiledAlbumTemplate = Handlebars.compile(albumTemplate);
  var galleryTemplate = $('#photo-gallery-template').html();
  var compiledGalleryTemplate = Handlebars.compile(galleryTemplate);

  $('.album-grid').albumGrid({
    template: compiledAlbumTemplate,
    galleryTemplate: compiledGalleryTemplate
  });

  Handlebars.registerHelper('albumCover', function (context, options) {
    var photos = options.data.root.photos;
    var random = Math.round(Math.random() * 99);
    for (var i = 0; i < photos.length; i++) {
      if (photos[i].albumId === context) {
        return photos[random].thumbnailUrl;
      }
    }
  });
})(jQuery, Handlebars);