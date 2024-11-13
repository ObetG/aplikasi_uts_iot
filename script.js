// Fungsi untuk mengambil data dari server
function fetchData() {
    fetch('http://localhost:3000/data')
        .then(response => response.json())
        .then(data => {
            updateCurrentData(data);
            updateSuhuHumidityMax(data.nilai_suhu_max_humid_max);
            updateMonthYearData(data.month_year_max);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('currentData').innerHTML = '<p>Error loading data.</p>';
        });
}

// Fungsi untuk memperbarui data suhu dan kelembaban
function updateCurrentData(data) {
    const currentDataDiv = document.getElementById('currentData');
    currentDataDiv.innerHTML = `
        <h2>Suhu Max: ${data.suhumax}°C</h2>
        <h2>Suhu Min: ${data.suhumin}°C</h2>
        <h2>Suhu Rata-rata: ${data.suhurata}°C</h2>
    `;
}

// Fungsi untuk memperbarui detail suhu max & humidity max
function updateSuhuHumidityMax(data) {
    const suhuHumidityMaxDiv = document.getElementById('suhuHumidityMax');
    suhuHumidityMaxDiv.innerHTML = '';

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h4>IDX: ${item.idx}</h4>
            <p>Suhu: ${item.suhu}°C</p>
            <p>Kelembaban: ${item.humid}%</p>
            <p>Kecerahan: ${item.kecerahan}%</p>
            <p class="timestamp">Timestamp: ${item.timestamp}</p>
        `;
        suhuHumidityMaxDiv.appendChild(card);
    });
}

// Fungsi untuk memperbarui data bulan & tahun
function updateMonthYearData(data) {
    const monthYearDataDiv = document.getElementById('monthYearData');
    monthYearDataDiv.innerHTML = '';

    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h4>Bulan-Tahun: ${item.month_year}</h4>
        `;
        monthYearDataDiv.appendChild(card);
    });
}

// Update data setiap 2 detik
setInterval(fetchData, 2000);

// Ambil data pertama kali ketika halaman dimuat
window.onload = fetchData;
