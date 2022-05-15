// Voice Input <----------------------------------------------------------------------------------------------------

const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = 'ja-JP';
recognition.interimResults = true;
recognition.continuous = true;

$("#voice-rec-btn").on("click", function() {

        let finalTranscript = ''; // 確定した(黒の)認識結果

        recognition.onresult = (event) => {
            let interimTranscript = ''; // 暫定(灰色)の認識結果
            for (let i = event.resultIndex; i < event.results.length; i++) {
                let transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                finalTranscript += transcript;
                } else {
                interimTranscript = transcript;
                }
                console.log("transcript"+transcript);
                console.log("event.results[i][0].transcript"+event.results[i][0].transcript);
            }
            // tinyMCE.get("text").setContent(finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</i>');
            tinyMCE.get("text").setContent(finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</i>');


            // for(let j = 0; j < event.results.length; j++) {
            //     event.results[j][0].transcript = '';
            // }
        }

        if ($("#voice-rec-btn").hasClass('RecActive')) {
            recognition.stop();
            $("#voice-rec-btn").css('background-color', 'gainsboro');
            $("#voice-rec-btn").toggleClass('RecActive');
        } else {
            $("#voice-rec-btn").toggleClass('RecActive');
            recognition.start();
            $("#voice-rec-btn").css('background-color', 'tomato');
        }

});

// ----------------------------------------------------------------------------------------------------> Voice Input
