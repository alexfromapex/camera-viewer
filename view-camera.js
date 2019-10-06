document.addEventListener('readystatechange', (event) => {

	if(document.readyState === 'complete') {
		let currentStream = null;
		let faceMode = 'user';
		let constraints = {
			audio: false,
			video: {
             			facingMode: faceMode
         		}
		};
		const video = document.querySelector("video");
		
		function successCallback(stream) {
		  currentStream = stream;
		  video.srcObject = stream;
		  video.play();
		}
		
		function errorCallback(error) {
		  console.log("navigator.getUserMedia error: ", error);
		}
		
		navigator.mediaDevices.getUserMedia(constraints)
		  .then(successCallback)
		  .catch(errorCallback);

		video.addEventListener('click',event => {
			currentStream.getTracks().forEach(track => {
				track.stop();
			});
			faceMode = faceMode === 'user' ? 'environment' : 'user';
			video.applyConstraints({
				audio: false,
				video: {
        	     			facingMode: {
						exact: faceMode
					}
        	 		}
			});
			video.play();
		});

	}

});
