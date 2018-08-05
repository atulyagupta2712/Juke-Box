window.addEventListener("load", init);


var audio;
var togglePlayButton;
var slider;
var togglePlay = false;

function init(){

    audio = document.querySelector('#audio');
    togglePlayButton = document.querySelector('#playPause');
    togglePlayButton.addEventListener("click", toggleSong);
    slider = document.querySelector('#slider');
    slider.addEventListener("click", seekSong);
    document.querySelector('#stopSong').addEventListener("click", stopSong);
    document.querySelector('#savePlaylist').addEventListener("click", savePlaylist);
    document.querySelector('#deletePlaylist').addEventListener("click", deletePlaylist);
    document.querySelector('#searchPlaylist').addEventListener("keyup", searchPlaylist);
    document.querySelector('#nextSong').addEventListener("click", nextSong);
    document.querySelector('#previousSong').addEventListener("click", previousSong);
    var ul = document.getElementById('songs');
    var english = document.getElementById('english');
    var punjabi = document.querySelector('#punjabi')
    for(let i=0; i<12; i++){
     var li = document.createElement('li');
     var span = document.createElement('span');
     var image = document.createElement('img');
     var button = document.createElement('button');
    var playIcon = document.createElement('button');
   
     span.innerHTML = songsArray[i].songName;
     span.setAttribute('title', songsArray[i].songId);
     span.className = 'spanSize';
     span.addEventListener("click", setSongName);
     image.setAttribute('src', songsArray[i].songImage);
     image.className = 'image';
     button.innerHTML = 'Add to Playlist';
     button.className = 'btn btn-primary';
     playIcon.className = 'playButton';
     li.appendChild(image);
     li.appendChild(playIcon);
     li.appendChild(span);
     li.appendChild(button);
     playIcon.addEventListener("click", setSongName);
     button.addEventListener("click", addToPlaylist);
     console.log(songsArray[i].songUrl);
     ul.appendChild(li);
    }
    for(let i=12; i<20; i++){
        var li = document.createElement('li');
        var span = document.createElement('span');
        var image = document.createElement('img');
        var button = document.createElement('button');
       var playIcon = document.createElement('button');
      
        span.innerHTML = songsArray[i].songName;
        span.setAttribute('title', songsArray[i].songId);
        span.className = 'spanSize';
        span.addEventListener("click", setSongName);
        image.setAttribute('src', songsArray[i].songImage);
        image.className = 'image';
        button.innerHTML = 'Add to Playlist';
        button.className = 'btn btn-primary';
        playIcon.className = 'playButton';
        li.appendChild(image);
        li.appendChild(playIcon);
        li.appendChild(span);
        li.appendChild(button);
        playIcon.addEventListener("click", setSongName);
        button.addEventListener("click", addToPlaylist);
        console.log(songsArray[i].songUrl);
        english.appendChild(li);
       }
       for(let i=20; i<32; i++){
        var li = document.createElement('li');
        var span = document.createElement('span');
        var image = document.createElement('img');
        var button = document.createElement('button');
       var playIcon = document.createElement('button');
      
        span.innerHTML = songsArray[i].songName;
        span.setAttribute('title', songsArray[i].songId);
        span.className = 'spanSize';
        span.addEventListener("click", setSongName);
        image.setAttribute('src', songsArray[i].songImage);
        image.className = 'image';
        button.innerHTML = 'Add to Playlist';
        button.className = 'btn btn-primary';
        playIcon.className = 'playButton';
        li.appendChild(image);
        li.appendChild(playIcon);
        li.appendChild(span);
        li.appendChild(button);
        playIcon.addEventListener("click", setSongName);
        button.addEventListener("click", addToPlaylist);
        console.log(songsArray[i].songUrl);
        punjabi.appendChild(li);
       }
    loadPlaylist();
}

function setSongName(){
    // var songName = event.srcElement.parentElement;
    var songName = event.srcElement.parentElement.childNodes[2].innerText;
    console.log(songName);
    playSong(songName);
}

function playSong(songName){
    var songUrl;
    for(i=0; i<songsArray.length; i++){
        if(songsArray[i].songName == songName){
            songUrl = songsArray[i].songUrl;
            audio.title = songsArray[i].songId;
        }

    }
    togglePlayButton.innerHTML = '<i class = " fas fa-pause "></i>'
    audio.src = songUrl;
    audio.play();
    setInterval(function(){
        slider.value = audio.currentTime;
    }, 550);
    setTimeout(function(){
        var duration = audio.duration;
        slider.max = duration;
    }, 250);
}

function toggleSong(){
    console.log("toggleSong");
        if(togglePlay){
        audio.play();
        togglePlayButton.innerHTML = '<i class = " fas fa-pause "></i>';
        togglePlay = false;
    }
    else{
        audio.pause();
        togglePlayButton.innerHTML = '<i class = "fas fa-play"></i>';
        togglePlay = "true";
    }
}

function seekSong(){
   audio.currentTime = slider.value;
}

function stopSong(){
    audio.currentTime = 0;
    audio.pause();
    togglePlayButton.innerHTML = '<i class = "fas fa-play"></i>';
    togglePlay = "true";
}

function addToPlaylist(){
  var songId = event.srcElement.parentElement.childNodes[2].title;
    console.log("add to playlist");
  for(let i=0; i<songsArray.length; i++){
      if(songId == songsArray[i].songId){
          object.addSong(songsArray[i].songId, songsArray[i].songName, songsArray[i].songUrl, songsArray[i].songImage);
      }
  }
  showPlaylist();
}

function showPlaylist(){
    
    var ul = document.querySelector('#playlist');
    ul.innerHTML= "";
    if(object.playlist){
        object.playlist.forEach(element => {
   
            var li = document.createElement('li');
            var span = document.createElement('span');
            var image = document.createElement('img');
            var button = document.createElement('button');
           var playIcon = document.createElement('button');
           span.innerHTML = element.songName;
           span.className = 'spanSize';
           span.setAttribute('title', element.songId);
           image.src = element.songImage;
           button.innerHTML = 'X';
           button.className = 'btn btn-primary'
           playIcon.className= 'playButton';
           span.addEventListener("click", setSongName);
           playIcon.addEventListener("click", setSongName);
           playIcon.className = 'playButton';
           image.className = 'image';
           button.addEventListener("click", deleteSong);
           li.appendChild(image);
           li.appendChild(playIcon);
           li.appendChild(span);
           li.appendChild(button);
           ul.appendChild(li);
    
        });
    }

}

function deleteSong(){
    // console.log($(this).parentsUntil('li'));
    
        var toDelete = event.srcElement.parentElement;
        console.log(toDelete.childNodes[2].title);
        object.deleteSong(toDelete.childNodes[2].title)
       //  toDelete.style.display = 'none';
       showPlaylist();
    
  

}

function savePlaylist(){
    if(window.localStorage){
        var json = JSON.stringify(object.playlist);
        console.log(json);
        localStorage.setItem('myPlaylist', json);
        alert("Your playlist is saved..")
    }
    else{
        alert("Local storage not supported");
    }
}

function loadPlaylist(){
    if(localStorage.myPlaylist){
        var data = localStorage.getItem('myPlaylist');
        object.playlist = JSON.parse(data);
        showPlaylist();
    }
}

function searchPlaylist(){
    var toSearch = event.srcElement.value;
    if(toSearch == "")
    {
        loadPlaylist();
    }
    object.searchSong(toSearch);
    showPlaylist();
}

function deletePlaylist(){
    object.deleteAll();
    showPlaylist();
}

function nextSong(){
    var songId = audio.title;
    var n_song = parseInt(songId)+1;
    var songName;
    for(let i=0; i<songsArray.length; i++){
        if(n_song == songsArray[i].songId){
            songName = songsArray[i].songName;
        }
    }
   playSong(songName);
}

function previousSong(){
    var songId = audio.title;
    var p_song = parseInt(songId)-1;
    console.log(p_song);
    var songName;
    for(let i=0; i<songsArray.length; i++){
        if(p_song == songsArray[i].songId){
            songName = songsArray[i].songName;
            console.log(songName);
            
        }
    }
    playSong(songName);
   
}