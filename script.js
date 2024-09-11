

document.addEventListener('DOMContentLoaded', () => {
    const entryButton = document.getElementById('entry-button');
    const exitButton = document.getElementById('exit-button');
    const usernameInput = document.getElementById('username');
    const statusMessage = document.getElementById('status-message');
    const logList = document.getElementById('log-list');

    const MAX_LOGS = 20; 

    const loadLogs = () => {
        const logs = JSON.parse(localStorage.getItem('logs')) || [];
        logList.innerHTML = logs.map((log, index) => `<li>${index + 1}. ${log}</li>`).join('');
    };

    const addLog = (entryType) => {
        const username = usernameInput.value.trim();
        if (username === '') {
            statusMessage.textContent = 'Por favor, introduce un nombre de usuario.';
            return;
        }

        const now = new Date();
        const timeString = now.toLocaleTimeString();
        const dateString = now.toLocaleDateString();
        const logMessage = `${username} ${entryType} el ${dateString} a las ${timeString}`;

        const logs = JSON.parse(localStorage.getItem('logs')) || [];

        if (logs.length >= MAX_LOGS) {
            logs.length = 0; 
            statusMessage.textContent = `Se ha alcanzado el máximo de ${MAX_LOGS} registros. Todos los registros anteriores han sido eliminados.`;
        } else {
            statusMessage.textContent = '';
        }

        logs.push(logMessage);
        localStorage.setItem('logs', JSON.stringify(logs));

        loadLogs();
    };

    entryButton.addEventListener('click', () => addLog('entró en la aplicación'));
    exitButton.addEventListener('click', () => addLog('salió de la aplicación'));


});
