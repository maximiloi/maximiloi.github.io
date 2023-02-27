function initBatery() {
    const batteryLiquid = document.querySelector('.battery__liquid');
    const batteryStatus = document.querySelector('.battery__status');
    const batteryPercentage = document.querySelector('.battery__percentage');

    navigator.getBattery().then((battery) => {
        updateBattery = () => {
            let level = Math.floor(battery.level * 100);
            batteryPercentage.innerHTML = `${level}%`;
            batteryLiquid.style.height = `${parseInt(battery.level * 100)}%`;

            if (level === 100) {
                batteryStatus.innerHTML = `Battery Full <i class="ri-battery-2-fill green-color"></i>`;
                batteryLiquid.style.height = `103%`;
            } else if ((level <= 20) & !battery.charging) {
                batteryStatus.innerHTML = `Low Charge <i class="ri-plug-fill animated-red"></i>`;
            } else if (battery.charging) {
                batteryStatus.innerHTML = `Charging ... <i class="ri-flashlight-fill animated-green"></i>`;
            } else {
                batteryStatus.innerHTML = ``;
            }

            if (level <= 20) {
                batteryLiquid.classList.add('gradient-color-red');
                batteryLiquid.classList.remove(
                    'gradient-color-green',
                    'gradient-color-orange',
                    'gradient-color-yellow'
                );
            } else if (level <= 48) {
                batteryLiquid.classList.add('gradient-color-orange');
                batteryLiquid.classList.remove('gradient-color-green', 'gradient-color-red', 'gradient-color-yellow');
            } else if (level <= 80) {
                batteryLiquid.classList.add('gradient-color-yellow');
                batteryLiquid.classList.remove('gradient-color-green', 'gradient-color-red', 'gradient-color-orange');
            } else {
                batteryLiquid.classList.add('gradient-color-green');
                batteryLiquid.classList.remove('gradient-color-yellow', 'gradient-color-red', 'gradient-color-orange');
            }
        };

        updateBattery();

        battery.addEventListener('chargingchange', () => {
            updateBattery();
        });

        battery.addEventListener('levelchange', () => {
            updateBattery();
        });

        battery.addEventListener('chargingtimechange', () => {
            updateChargingInfo();
        });
        function updateChargingInfo() {
            console.log(`Battery charging time: ${battery.chargingTime} seconds`);
        }

        battery.addEventListener('dischargingtimechange', () => {
            updateDischargingInfo();
        });
        function updateDischargingInfo() {
            console.log(`Battery discharging time: ${battery.dischargingTime} seconds`);
        }
    });
}

initBatery();
