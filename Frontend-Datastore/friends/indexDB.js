(function() {
  'use strict';



  var delBtn = document.getElementById('deleteBtn');
  var editBtn = document.getElementById('editBtn');

  var listOfFriends = document.querySelector('.friends');
  console.log(listOfFriends);

  delBtn.addEventListener('click', deleteFriend);
  editBtn.addEventListener('click', editFriend);

  if ('indexedDB' in window) {
    console.log('started');
    var openDB = window.indexedDB.open('friendsDB', 1);

    openDB.onsuccess = function(e) {
      var database = e.target.result;
      var readTrans = database.transaction(['friends'], 'readonly');
      var objStore = readTrans.objectStore('friends');
      var getReq = objStore.getAll();

      readTrans.oncomplete = function(e) {
        var friendList = getReq.result;
        console.log('success! here are your friends: ', getReq.result);
        friendList.forEach(function(item) {
          var listItem = document.createElement('li');
          listItem.innerHTML = item.name;
          listOfFriends.appendChild(listItem);
        });
      };
    };

    openDB.onupgradeneeded = function(e) {
      console.log('upgrading');
      var database = e.target.result;
      var objStore = database.createObjectStore('friends', { autoIncrement: true, keyPath: 'name' });
      console.log('objStore', objStore);

      objStore.createIndex('name', 'name');

      objStore.transaction.oncomplete = function(e) {
        var trans = database.transaction('friends', 'readwrite');
        var transObjStore = trans.objectStore('friends');
        var friendData = [
          { name: "Mr. Meowgi", email: "meowgi@sensei.net", phone: "565-2736" },
          { name: "Cat Morita", email: "cat@dojo.com", phone: "565-2889" },
          { name: "Danny Larusso", email: "hero@karatekid.com", phone: "565-1908" },
          { name: "Cobra Kai", email: "jerks@rivals.net", phone: "565-3822" },
          { name: "Johnny Lawrence", email: "antagonist@script.com", phone: "565-9388" }
        ];

        for (var x in friendData) {
          transObjStore.add(friendData[x]);
        }
      };

    };

  }

  function deleteFriend() {
    console.log('deleteFriend called');


    var req = window.indexedDB.open('friendsDB');

    req.onerror = function(e) {
      console.log('Oh Nos!:' + e.target.errorCode);
    };

    req.onsuccess = function(e) {
      var toDelete = document.getElementById('toDelete').value;
      var db = e.target.result;
      var trans = db.transaction(['friends'], 'readwrite');
      var objStore = trans.objectStore('friends');
      var delReq = objStore.delete(toDelete);

      delReq.onsuccess = function(e) {
        console.log('It has been done.');
      };
    };
  }

  function editFriend() {
    console.log('editFriend called');

    var req = window.indexedDB.open('friendsDB');

    req.onerror = function(e) {
      console.log('Oh Nos!:' + e.target.errorCode);
    };

    req.onsuccess = function(e) {
      var nameToEdit = document.getElementById('nameToEdit').value;
      console.log(nameToEdit);

      var db = e.target.result;
      var trans = db.transaction(['friends'], 'readwrite');
      var objStore = trans.objectStore('friends');
      var getReq = objStore.get(nameToEdit);
      var delReq = objStore.delete(nameToEdit);

      getReq.onerror = function(e) {
        conosole.log('Whoops!' + e.target.errorCode);
      };

      getReq.onsuccess = function(e) {
        var entry = e.target.result;
        console.log(entry);
        var editedName = document.getElementById('editedName').value;
        entry.name = editedName;

        var updateReq = objStore.put(entry);
        updateReq.onerror = function(e) {
          console.log('Nope. No update.');
        };
        updateReq.onsuccess = function(e) {
          console.log('Updated!');
        };
      };

    };

  }



})();

