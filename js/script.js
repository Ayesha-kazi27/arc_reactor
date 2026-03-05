const TOTAL_ENERGY = 100;
let subsystems = {
    propulsion: 0,
    defense: 0,
    navigation: 0,
    communication: 0
};

function getUsedEnergy() {
    return Object.values(subsystems).reduce((sum, value) => sum + value, 0);
}

function getRemainingEnergy() {
    return TOTAL_ENERGY - getUsedEnergy();
}

function adjust(system, amount) {

    let newValue = subsystems[system] + amount;
    if (newValue < 0) {
        newValue = 0;
    }
    let tempUsed = getUsedEnergy() - subsystems[system] + newValue;
    if (tempUsed > TOTAL_ENERGY) {
        showError("⚠ Reactor energy limit exceeded");
        return;
    }
    subsystems[system] = newValue;
    render();
}

function showError(message) {
    const errorBox = document.getElementById("error");
    errorBox.innerText = message;
    setTimeout(() => {
        errorBox.innerText = "";
    }, 2000);
}

function render() {
    document.getElementById("remainingEnergy").innerText = getRemainingEnergy();
    for (let key in subsystems) {
        let power = subsystems[key];
        document.getElementById(key + "Input").value = power;
        let efficiency = Math.min(power, 100);
        document.getElementById(key + "Eff").innerText = efficiency + "%";
        document.getElementById(key + "Bar").style.width = efficiency + "%";
    }
}

document.querySelectorAll("input").forEach(input => {
    input.addEventListener("change", function () {
        let system = this.id.replace("Input", "");
        let value = parseInt(this.value) || 0;
        if (value < 0) {
            value = 0;
        }
        let tempUsed = getUsedEnergy() - subsystems[system] + value;
        if (tempUsed > TOTAL_ENERGY) {
            showError(" Not enough reactor energy available");
            this.value = subsystems[system];
            return;
        }
        subsystems[system] = value;
        render();
    });
});
render();