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
			window.alert("Error: ", error);
		}

		navigator.mediaDevices.getUserMedia(constraints)
		  .then(successCallback)
		  .catch(errorCallback);

		if('enumerateDevices' in navigator) {
			if(navigator.mediaDevices.enumerateDevices) {
				navigator.mediaDevices.enumerateDevices().then(media_devices => {
					media_devices.forEach(media_device => {
				    if (media_device.kind === 'videoinput') {
					   	cameras = cameras.concat(media_device.deviceId);
						}
					})
		    })
		  }
		} else if('mediaDevices' in navigator && 'enumerateDevices' in navigator.mediaDevices) {
			navigator.mediaDevices.enumerateDevices().then(media_devices => {
				media_devices.forEach(media_device => {
					if (media_device.kind === 'videoinput') {
						cameras = cameras.concat(media_device.deviceId);
					}
     		})
		  })
		}

		video.addEventListener('click',event => {
			if((camId + 1) < cameras.length) {
				camId = camId +1;
			} else {
				camId = 0;
			}
			if(cameras.length > 1) {
				if(navigator.mediaDevices || navigator.mediaDevices.enumerateDevices) {
					currentStream.getTracks().forEach(track => {
						track.stop();
  				});
					video.srcObject = null;
					navigator.mediaDevices.getUserMedia({
						audio: false,
						video: {
								deviceId: {
									exact: cameras[camId]
								}
							}
					}).then(successCallback).catch(errorCallback);
				}
			}
		});

	}

});
