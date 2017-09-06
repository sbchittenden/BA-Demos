(function() {
  'use strict';

  const content = document.querySelector('.mc-content-wrapper');

  var albumData;
  var albumReq = new XMLHttpRequest();
  albumReq.onload = function(e) {
    albumData = JSON.parse(this.responseText);
    console.log(albumData.dataset);
    openDatabase(albumData);
  };
  albumReq.open('GET', 'https://freemusicarchive.org/api/get/albums.json?api_key=PRQ3ST2NXDB573EO&limit=28');
  albumReq.send();

  function openDatabase(data) {
    if ('indexedDB' in window) {
      var openDBReq = window.indexedDB.open('music', 1);

      openDBReq.onerror = function(e) {
        console.log('Uh Oh: ' + e.errorCode);
      };

      openDBReq.onsuccess = function(e) {
        console.log('success!');
        var db = e.target.result; // store database instance
        var trans = db.transaction(['albums'], 'readonly');
        var objStore = trans.objectStore('albums');
        var getReq = objStore.getAll();

        trans.oncomplete = function(e) {
          var albumList = getReq.result;
          console.log('success here are the albums: ', albumList);
          if (albumList.length !== 0) {
            populatePage(albumList);
          }
        };

      };

      openDBReq.onupgradeneeded = function(e) {
        console.log('upgrading...');
        var db = e.target.result; // store database instance
        var objStore = db.createObjectStore('albums', { autoIncrement: true, keyPath: 'album_handle' });

        objStore.transaction.oncomplete = function(e) {
          console.log('complete!');
          var trans = db.transaction('albums', 'readwrite');
          var objStore = trans.objectStore('albums');
          // var dataset = albumData.dataset;
          var dataset = data.dataset;
          console.log('dataset', dataset);
          console.log(objStore);
          for (var x in dataset) {
            objStore.add(dataset[x]);
          }

          populatePage(dataset);

        };

      };

    }
  }

  function populatePage(dataset) {
    content.innerHTML = '';
    let albumCard = document.querySelector('#album-card'); //template
    let cardContent = albumCard.content; //template content
    let albumImage = cardContent.querySelector('.album-image > img');
    let albumName = cardContent.querySelector('.album-info > h1');
    let artistName = cardContent.querySelector('.album-info > h2');
    let albumTracks = cardContent.querySelector('.album-info > h4 span');
    dataset.forEach(function(item) {
      albumImage.src = item.album_image_file;
      albumName.innerHTML = item.album_handle.replace(/\_/gi, ' ');
      artistName.innerHTML = item.artist_name;
      albumTracks.innerHTML = item.album_tracks;
      let clone = document.importNode(cardContent, true);
      content.appendChild(clone);
    });

  }

})();
