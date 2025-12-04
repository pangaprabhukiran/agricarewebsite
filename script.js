// ------------------------
// CAMERA ACCESS
// ------------------------
async function predict() {
    let imageElement;

    // If user uploaded an image
    if (document.getElementById("imageInput").files.length > 0) {
        imageElement = document.getElementById("preview");
    } 
    // If using camera
    else {
        imageElement = document.getElementById("cameraView");
    }

    const prediction = await model.predict(imageElement);

    let best = prediction[0];
    prediction.forEach(p => {
        if (p.probability > best.probability)
            best = p;
    });

    document.getElementById("predictionResult").innerText =
        "Detected: " + best.className + " (" + (best.probability * 100).toFixed(2) + "%)";

    loadDiseaseData(best.className);
}
----
// LOAD AI MODEL
// ------------------------
let model;

async function loadModel() {
    model = await tmImage.load("model/model.json", "model/metadata.json");
    console.log("AI Model Loaded");
}
loadModel();

// ------------------------
// AI PREDICTION
// ------------------------
async function predict() {
    const video = document.getElementById("cameraView");
    const prediction = await model.predict(video);

    let best = prediction[0];
    prediction.forEach(p => {
        if (p.probability > best.probability) best = p;
    });

    document.getElementById("predictionResult").innerText =
        "Detected: " + best.className + " (" + (best.probability * 100).toFixed(2) + "%)";

    loadDiseaseData(best.className);
}

// ------------------------
// LOAD DISEASE DATA
// ------------------------
let diseaseData = {};

function loadDiseaseData(diseaseKey) {
    fetch("diseases.json")
        .then(res => res.json())
        .then(data => {
            let d = data[diseaseKey];
            if (!d) {
                document.getElementById("remedyBox").innerHTML =
                    "<p>No data found for this disease.</p>";
                return;
            }

            document.getElementById("remedyBox").innerHTML = `
                <h3>🌿 Disease Details</h3>
                <p><b>Symptoms:</b> ${d.symptoms}</p>
                <p><b>Cause:</b> ${d.cause}</p>
                <p><b>Remedy:</b> ${d.remedy}</p>
            `;
        });
}

// ------------------------
// TEXT INPUT SUPPORT
// ------------------------
function submitText() {
    let text = document.getElementById("textInput").value;
    document.getElementById("textOutput").innerText = "You typed: " + text;
}

// ------------------------
// VOICE INPUT SUPPORT
// ------------------------
function startVoice() {
    let rec = new webkitSpeechRecognition();
    rec.lang = "en-US";

    rec.onresult = e => {
        let transcript = e.results[0][0].transcript;
        document.getElementById("voiceOutput").innerText =
            "You said: " + transcript;
    };

    rec.start();
}
