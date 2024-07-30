(function() {
    function keepSessionAlive() {
        fetch(window.location.href, {
            credentials: 'include'
        }).then(response => {
            if (!response.ok) {
                console.error('Session refresh failed:', response.statusText);
            }
        }).catch(error => console.error('Session refresh error:', error));
    }

    function storeSession() {
        localStorage.setItem('session', document.cookie);
    }

    function restoreSession() {
        const session = localStorage.getItem('session');
        if (session) {
            document.cookie = session;
        }
    }

    // Set interval to refresh the session every 5 minutes (300000 milliseconds)
    setInterval(keepSessionAlive, 300000);

    // Store session data periodically
    setInterval(storeSession, 60000);

    // Restore session data on page load
    window.onload = restoreSession;
})();