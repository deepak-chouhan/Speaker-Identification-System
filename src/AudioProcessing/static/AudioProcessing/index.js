$(document).ready(() => {

    async function doSomethingWithAudioBuffer(blob) {
        var arrayBuffer = await blob.arrayBuffer();
        // Do something with arrayBuffer;
        console.log("doSomethingWithAudioBuffer()->")
        console.log(arrayBuffer);
      }

    var device = navigator.mediaDevices.getUserMedia({
        audio: true
    });
    var items = [];
    device.then(stream => {
        var recorder = new MediaRecorder(stream);
        recorder.ondataavailable = e => {
            items.push(e.data);
            // console.log(e.data);
            if (recorder.state == "inactive") {
                var blob = new Blob(items, {
                    type: "audio/webm"
                });
                var audio = document.getElementById("audio");
                var mainaudio = document.createElement("audio");
                mainaudio.setAttribute("controls", "controls");
                audio.appendChild(mainaudio);
                mainaudio.innerHTML = '<source src="' + URL.createObjectURL(blob) + '" type="video/webm"/>';

                const audioContext = new AudioContext();
                const fileReader = new FileReader();

                fileReader.onloadend = () => {
                    let myArrayBuffer = fileReader.result;
                    audioContext.decodeAudioData(myArrayBuffer, (audioBuffer) => {
                        console.log(audioBuffer)
                    });
                };

                doSomethingWithAudioBuffer(blob);

            }
        }


        const btn = document.getElementById("record")

        function record() {
            recorder.start();
            $(btn).addClass("clicked");
            setTimeout(() => {
                recorder.stop();
                $(btn).removeClass("clicked");
            }, 2000);
        }

        $(btn).click(function (e) {
            e.preventDefault();
            record();
        });
    })

})