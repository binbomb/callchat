//const Peer= require('simple-peer')
const Peer= require('peerjs')
const playVideo=require('./playVideo')
const $ =require('jquery')
const uid= require('uid')

const adapter=require('webrtc-adapter');


var cfice;

$.ajax ({
             url: "https://global.xirsys.net/_turn/MyFirstApp/",
             type: "PUT",
             async: false,
             headers: {
               "Authorization": "Basic " + btoa("binbomb:351ef78a-f83d-11e8-9547-0242ac110003")
             },
             success: function (res){
              // console.log("ICE List: "+JSON.stringify( res.v.iceServers));
			   cfice=res.v.iceServers
             }
         });
		 console.log(cfice)
const config={host:'callchatbb.herokuapp.com',port:443,secure:true,key:'peerjs',config:cfice}
		 
const peer= new Peer(getpeer(),config)
console.log(peer)
function getpeer(){
	var id=uid(10)
	$('#data').append(id)
	return id
}

/*
const peer= new Peer(getPeer(),config)
console.log(peer)

if (adapter.browserDetails.browser == 'chrome') {
  adapter.browserShim.shimGetDisplayMedia(window, function() {
    return new Promise((resolve, reject) => {
      if (!sessionStorage.getScreenMediaJSExtensionId) { // need to install extension
        var err = new Error('extension required for getDisplayMedia');
        err.name = 'ExtensionRequired'; // custom error name you need to check for later
		console.log("loi 1")  
        return Promise.reject(err);
      }
      chrome.runtime.sendMessage(sessionStorage.getScreenMediaJSExtensionId,
        {type: 'getScreen', id: 1}, null,
        function (data) {
          if (!data || data.sourceId == '') { // user canceled
            var error = new Error('NavigatorUserMediaError');
            error.name = 'NotAllowedError';
			console.log("asdad")  
            reject(error);
          } else {
			 
            resolve(data.sourceId);
          }
      })
    })
  })
}*/

var objectStream=navigator.mediaDevices.getUserMedia({audio:true,video: false}) 
	navigator.mediaDevices.getUserMedia({audio:true,video: true})
		.then(()=>{
			objectStream=navigator.mediaDevices.getUserMedia({audio:true,video: true}) 
		})
		.catch(function(err) {
					console.log('ko co webcam ' + err);
				  /* handle the error 		var audio = document.getElementById('videostream');
					  audio.srcObject = stream;
					  audio.onloadedmetadata = function(e) {
					  audio.play();}*/
		});
	objectStream=navigator.getDisplayMedia({video: true, audio: false})
if ('getDisplayMedia' in window.navigator) {
  // use it.
  console.log("ok")
		  try {
		 //navigator.mediaDevices.getUserMedia({audio:true,  video: { width: 400, height: 300 }})
			//navigator.mediaDevices.getUserMedia({audio:true,video: false})
			objectStream.then(function(stream) {
				
				$('#connectBtn').click(()=>{
					
					const idother=$('#tokenstream').val()
					//console.log(idother)
					//console.log(dataother)
					playVideo(stream,'videostream')
					const call= peer.call(idother,stream)
					call.on('stream',remotestream=> playVideo(remotestream,'dataother'))
				});

				
			  /* use the stream 
				//console.log(playVideo)
				 playVideo(stream,'videostream')
				var p = new Peer({ initiator: location.hash === '#1', trickle: false,stream })
				p.on('signal', function (data) {
				  console.log('SIGNAL', JSON.stringify(data))
				  document.querySelector('#data').textContent = JSON.stringify(data)
				  
				})
				$('#connectBtn').click(()=>{
					
					const dataother=JSON.parse($('#tokenstream').val())
					//console.log(dataother)
					p.signal(dataother)	
				});
				p.on('stream',streamother => playVideo(streamother,'dataother'))	
				p.on('connect',()=>{
						setInterval(()=>p.send(Math.random()), 3000)
					})
				
				p.on('data',(data)=>{
						console.log(data)
					})	
					
					*/
			})
			.catch(function(err) {
				console.log('Unable to acquire screen capture: ' + err);
			  /* handle the error 		var audio = document.getElementById('videostream');
				  audio.srcObject = stream;
				  audio.onloadedmetadata = function(e) {
				  audio.play();}*/
			});
		 
		} catch (e) {
		  console.log('Unable to acquire screen capture: ' + e);
		}
} else {
  // fall back to extension way
  console.log("false")
}

 //navigator.getDisplayMedia({video: true, audio: false}, function(stream) {
		peer.on('call', function(call) {
		console.log("nhna dc cuoc goi")
		//navigator.mediaDevices.getUserMedia({video: false, audio: true})
		objectStream.then(function(stream) {
		console.log(stream)
		playVideo(stream,'videostream')
		call.answer(stream); // Answer the call with an A/V stream.
		
		call.on('stream',remotestream=> playVideo(remotestream,'dataother'))
		
	  }).catch(function(err) {
				console.log('Unable to acquire screen capture: ' + err);
			  /* handle the error 		var audio = document.getElementById('videostream');
				  audio.srcObject = stream;
				  audio.onloadedmetadata = function(e) {
				  audio.play();}*/
			});
	});




/*

*/