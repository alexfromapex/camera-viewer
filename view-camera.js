document.addEventListener('readystatechange', (event) => {

	if(document.readyState === 'complete') {

		const constraints = {
			audio: false,
			video: {
             			facingMode: 'user'
         		}
		};
		const video = document.querySelector("video");
		
		function successCallback(stream) {
		  video.srcObject = stream;
		  video.play();
		}
		
		function errorCallback(error) {
		  console.log("navigator.getUserMedia error: ", error);
		}
		
		navigator.mediaDevices.getUserMedia(constraints)
		  .then(successCallback)
		  .catch(errorCallback);
		  
		  var elem = document.querySelector("video");
		if (elem.requestFullscreen) {
		  elem.requestFullscreen();
		} else if (elem.msRequestFullscreen) {
		  elem.msRequestFullscreen();
		} else if (elem.mozRequestFullScreen) {
		  elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
		  elem.webkitRequestFullscreen();
		}

	}

});
