function Song(songId, songName, songUrl, songImage){
    this.songId = songId;
    this.songName = songName;
    this.songUrl = songUrl;
    this.songImage = songImage;
    this.delete = false;
}

const object = {
    playlist : [],
    addSong(songId, songName, songUrl, songImage){
        var song = new Song(songId, songName, songUrl, songImage);
        this.playlist.push(song);
    },
    deleteSong(id){
        console.log(object);
        console.log(this.playlist);
        var toDelete = this.playlist.filter((object)=>{
            console.log(object);
            return object.songId == id;
            console.log(toDelete);
        })
    
        toDelete[0].delete = true;
        console.log("to delete is", toDelete);
    
        this.playlist = this.playlist.filter(function(object){
            return object.delete === false;
        });
       
        // console.log("playlist is ", playlist);
    },
    deleteAll(){
        this.playlist = "";
    },
    searchSong(name){
        this.playlist = this.playlist.filter(object=>{
            // console.log("object is ",object);
            return object.songName.includes(name);
        })
    },
   
 
   
   
}