(function(Handlebars) {
  const photosRequest = new XMLHttpRequest();
  const albumsRequest = new XMLHttpRequest();
  const data = {};
  const albumTemplate = document.getElementById('album-template').innerHTML;
  const modalTemplate = document.getElementById('modal-template').innerHTML;
  const albumWrapper = document.getElementById('album-wrapper');
  const modalWrapper = document.getElementById('modal');

  // event listener for album wrapper
  albumWrapper.addEventListener('click', openModal);

  // event listener for modal
  modalWrapper.addEventListener('click', closeModal);

  // load photo data
  photosRequest.onload = function() {
    const photoData = JSON.parse(photosRequest.response);
    // get 20 random photos and add to data object
    data.photos = randomPhoto().map(item => photoData[item]);
    // sort random photos by albumId
    albumSort(data.photos, 'albumId');
    const compiledAlbumTemplate = Handlebars.compile(albumTemplate);
    const albumData = compiledAlbumTemplate(data);
    albumWrapper.innerHTML = albumData;

    // const compiledModalTemplate = Handlebars.compile(modalTemplate);
    // const modalData = compiledModalTemplate(data.photos[0]);
    // modalWrapper.innerHTML = modalData;
  };
  photosRequest.open('GET', './photos.json');
  photosRequest.send();

  // load album data
  albumsRequest.onload = function() {
    // add albums to data object
    data.albums = JSON.parse(albumsRequest.response);
  };
  albumsRequest.open('GET', './albums.json');
  albumsRequest.send();

  function randomPhoto() {
    let photos = [];
    let i = 0;
    while (i < 20) {
      let num = Math.floor(Math.random() * 5000);
      if (photos.indexOf(num) === -1) {
        photos.push(num);
        i++;
      }
    }
    return photos;
  }

  function albumSort(arr, property) {
    return arr.sort((a, b) => a[property] - b[property]);
  }

  Handlebars.registerHelper('albumTitle', function(context, options) {
    let albumsList = options.data.root.albums;
    for (let i = 0; i < albumsList.length; i++) {
      if (albumsList[i].id === context) {
        return albumsList[i].title;
      }
    }
  });
  // find photo by id
  function pickPhoto(arr, photoId) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === Number(photoId)) {
        return arr[i];
      }
    }
  }

  // event handler for photo click
  function openModal(e) {
    let target = e.target;
    if (target.nodeName === 'IMG') {
      let id = target.parentElement.dataset.photoId;
      let photo = pickPhoto(data.photos, id);
      console.log(photo);
      let compiledModalTemplate = Handlebars.compile(modalTemplate);
      let modalData = compiledModalTemplate(photo);
      modalWrapper.innerHTML = modalData;
      modalWrapper.classList.add('--is-visible');
      albumWrapper.classList.add('--no-click');
    }
  }

  // close modal handler
  function closeModal() {
    modalWrapper.classList.remove('--is-visible');
    albumWrapper.classList.remove('--no-click');
  }
})(Handlebars);
