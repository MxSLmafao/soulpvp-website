function copyIP() {
    const serverIP = document.getElementById('server-ip');
    const textArea = document.createElement('textarea');
    textArea.value = serverIP.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    // Visual feedback
    const button = document.querySelector('.ip-box button');
    const originalText = button.innerHTML;
    button.innerHTML = '<i class="fas fa-check"></i> Copied!';
    setTimeout(() => {
        button.innerHTML = originalText;
    }, 2000);
}
