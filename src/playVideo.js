function playVideo(stream,videoid){
					console.log(videoid)
				const audio = document.getElementById(videoid);
				audio.srcObject = stream;
				audio.onloadedmetadata = function(e) {
				audio.play();
			};
}
module.exports=playVideo;