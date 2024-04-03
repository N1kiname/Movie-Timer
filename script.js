let timerInterval;
let duration;
let originalProjectedEndTime;
let currentProjectedEndTime;

function updateProjectedEndTime() {
    const endTimeInput = document.getElementById("endTime").value;
    document.getElementById("projectedEndTimeDisplay").textContent = `Progn. Endzeit: ${endTimeInput}`;
    originalProjectedEndTime = new Date(`2022-01-01T${endTimeInput}:00`); // Verwendet ein statisches Datum (2022-01-01), da das Datum hier nicht relevant ist
    currentProjectedEndTime = new Date(originalProjectedEndTime); // Kopiere die ursprüngliche prognostizierte Endzeit
}

document.getElementById("startButton").addEventListener("click", function() {
    let durationInput = parseInt(document.getElementById("duration").value);
    const endTimeInput = document.getElementById("endTime").value;

    if (isNaN(durationInput) || !endTimeInput) {
        alert("Bitte gib eine gültige Abschnittsdauer und Endzeit ein.");
        return;
    }

    // Automatisch positive Eingaben negativ machen
    durationInput *= -1;

    duration = durationInput * 60; // Umrechnung von Minuten in Sekunden

    if (timerInterval) {
        clearInterval(timerInterval);
    }

    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
});

document.getElementById("stopButton").addEventListener("click", function() {
    clearInterval(timerInterval);

    // Fügt den Countdown-Wert zur prognostizierten Endzeit hinzu oder subtrahiert ihn
    if (currentProjectedEndTime) {
        const minutesToAdd = Math.abs(Math.floor(duration / 60));
        
        if (duration < 0) {
            currentProjectedEndTime.setMinutes(currentProjectedEndTime.getMinutes() - minutesToAdd);
        } else {
            currentProjectedEndTime.setMinutes(currentProjectedEndTime.getMinutes() + minutesToAdd);
        }

        // Anzeige der aktualisierten prognostizierten Endzeit
        const projectedHours = currentProjectedEndTime.getHours();
        const projectedMinutes = currentProjectedEndTime.getMinutes();
        document.getElementById("projectedEndTimeDisplay").textContent = `Progn. Endzeit: ${formatNumber(projectedHours)}:${formatNumber(projectedMinutes)}`;
    }

    // Aktualisiere die Differenzanzeige
    updateDifference();
});

document.getElementById("addButton").addEventListener("click", function() {
    const durationInput = parseInt(document.getElementById("duration").value);
    if (isNaN(durationInput)) {
        alert("Bitte gib eine gültige Abschnittsdauer ein.");
        return;
    }

    // Hinzufügen der Abschnittsdauer zur prognostizierten Endzeit
    if (currentProjectedEndTime) {
        const minutesToAdd = Math.abs(durationInput);
        currentProjectedEndTime.setMinutes(currentProjectedEndTime.getMinutes() + minutesToAdd);

        // Anzeige der aktualisierten prognostizierten Endzeit
        const projectedHours = currentProjectedEndTime.getHours();
        const projectedMinutes = currentProjectedEndTime.getMinutes();
        document.getElementById("projectedEndTimeDisplay").textContent = `Progn. Endzeit: ${formatNumber(projectedHours)}:${formatNumber(projectedMinutes)}`;
    }

    // Aktualisiere die Differenzanzeige
    updateDifference();
});

document.getElementById("subtractButton").addEventListener("click", function() {
    const durationInput = parseInt(document.getElementById("duration").value);
    if (isNaN(durationInput)) {
        alert("Bitte gib eine gültige Abschnittsdauer ein.");
        return;
    }

    // Subtrahieren der Abschnittsdauer von der prognostizierten Endzeit
    if (currentProjectedEndTime) {
        const minutesToSubtract = Math.abs(durationInput);
        currentProjectedEndTime.setMinutes(currentProjectedEndTime.getMinutes() - minutesToSubtract);

        // Anzeige der aktualisierten prognostizierten Endzeit
        const projectedHours = currentProjectedEndTime.getHours();
        const projectedMinutes = currentProjectedEndTime.getMinutes();
        document.getElementById("projectedEndTimeDisplay").textContent = `Progn. Endzeit: ${formatNumber(projectedHours)}:${formatNumber(projectedMinutes)}`;
    }

    // Aktualisiere die Differenzanzeige
    updateDifference();
});

function updateTimer() {
    const absDuration = Math.abs(duration); // Um negative Dauer zu behandeln
    const sign = duration < 0 ? "-" : ""; // Vorzeichen für Anzeige
    const minutes = Math.floor(absDuration / 60);
    const seconds = absDuration % 60;
    document.getElementById("timer").textContent = `${sign}${formatNumber(minutes)}:${formatNumber(seconds)}`;

    duration += 1; // Hochzählen der Dauer
}

function updateDifference() {
    // Berechne die Differenz zwischen prognostizierter Endzeit und eingegebener Endzeit
    const endTimeInput = document.getElementById("endTime").value;
    const endTime = new Date(`2022-01-01T${endTimeInput}:00`);
    const timeDifference = currentProjectedEndTime - endTime;
    const timeDifferenceInMinutes = Math.floor(timeDifference / (1000 * 60));

    // Anzeige der Differenz
    const timeDifferenceDisplay = document.getElementById("timeDifference");
    if (timeDifference < 0) {
        timeDifferenceDisplay.textContent = `Differenz: -${Math.abs(timeDifferenceInMinutes)} Minuten`;
        timeDifferenceDisplay.classList.remove("negative");
        timeDifferenceDisplay.classList.add("positive");
    } else if (timeDifference > 0) {
        timeDifferenceDisplay.textContent = `Differenz: +${Math.abs(timeDifferenceInMinutes)} Minuten`;
        timeDifferenceDisplay.classList.remove("positive");
        timeDifferenceDisplay.classList.add("negative");
    } else {
        timeDifferenceDisplay.textContent = `Differenz: ${Math.abs(timeDifferenceInMinutes)} Minuten`;
        timeDifferenceDisplay.classList.remove("negative", "positive");
    }
}



function formatNumber(number) {
    return number < 10 ? "0" + number : number;
}
