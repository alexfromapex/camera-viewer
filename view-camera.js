document.addEventListener('readystatechange', (event) => {

	if(document.readyState === 'complete') {
		let cameras = [];
		let camId = 0;
		let currentStream = null;
		let faceMode = 'user';
		let constraints = {
			audio: false,
			video: {
             			deviceId: {
					exact: cameras[camId]	
				}
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
			if(navigator.mediaDevices || navigator.mediaDevices.enumerateDevices) {
				video.pause();
				video.srcObject = null;
				currentStream.getTracks().forEach(track => {
					track.stop();
				});
				currentStream = navigator.mediaDevices.getUserMedia({
					audio: false,
					video: {
        	     				deviceId: {
							exact: cameras[camId]
						}
        	 			}
				});
				video.srcObject = currentStream;
				video.play();
			}
		});

	}

});
