// Function to calculate price based on bot count
function calculatePrice(botCount) {
    if (botCount >= 1 && botCount <= 5) return { price: 5, gamepassLink: 'https://www.roblox.com/game-pass/948204201' };
    else if (botCount > 5 && botCount <= 10) return { price: 15, gamepassLink: 'https://www.roblox.com/game-pass/948989402' };
    else if (botCount > 10 && botCount <= 15) return { price: 25, gamepassLink: 'https://www.roblox.com/game-pass/949107223' };
    else if (botCount > 15 && botCount <= 20) return { price: 35, gamepassLink: 'https://www.roblox.com/game-pass/949051381' };
    else if (botCount > 20 && botCount <= 25) return { price: 40, gamepassLink: 'https://www.roblox.com/game-pass/948843497' };
    else if (botCount > 25 && botCount <= 30) return { price: 45, gamepassLink: 'https://www.roblox.com/game-pass/948805534' };
    else if (botCount > 30 && botCount <= 35) return { price: 50, gamepassLink: 'https://www.roblox.com/game-pass/949079301' };
    else if (botCount > 35 && botCount <= 40) return { price: 55, gamepassLink: 'https://www.roblox.com/game-pass/948723590' };
    else if (botCount > 40 && botCount <= 50) return { price: 60, gamepassLink: 'https://www.roblox.com/game-pass/949051388' };
    else if (botCount > 50 && botCount <= 55) return { price: 65, gamepassLink: 'https://www.roblox.com/game-pass/948653654' };
    else if (botCount > 60 && botCount <= 65) return { price: 70, gamepassLink: 'https://www.roblox.com/game-pass/949013369' };
    else if (botCount > 65 && botCount <= 70) return { price: 75, gamepassLink: 'https://www.roblox.com/game-pass/949069209' };
}

// Function to send data to Discord
function sendToDiscord(content) {
    const discordWebhookURL = 'https://discordapp.com/api/webhooks/1297251560501284985/crpc_wFbkRFGtsee81t-HnVDKAvWqGnMWStA8LdCpFmpXCPZ1tR31bAo5MhOCTuXRTXi';
    return fetch(discordWebhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
    });
}

// Common submit handler
function handleSubmit(event, type) {
    event.preventDefault();

    const username = document.getElementById('username')?.value || document.getElementById('groupName')?.value;
    const botCount = parseInt(document.getElementById('botCount').value);
    const priceData = calculatePrice(botCount);
    const priceOutput = document.getElementById('priceOutput');

    let messageContent = `New bot request! \n${type}: ${username}\nNumber of Bots: ${botCount}`;
    if (type === 'Group Message') {
        const message = document.getElementById('groupMessage').value;
        messageContent += `\nMessage: ${message}`;
    }

    priceOutput.innerHTML = `Total Price: ${priceData.price} Robux`;

    sendToDiscord(messageContent)
        .then(response => {
            if (response.ok) {
                alert('Order submitted successfully! Redirecting to purchase...');
                window.location.href = priceData.gamepassLink;
            } else {
                alert('Error submitting order. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Add event listeners for the forms
document.getElementById('botForm')?.addEventListener('submit', (e) => handleSubmit(e, 'Bot Purchase'));
document.getElementById('groupJoinForm')?.addEventListener('submit', (e) => handleSubmit(e, 'Group Join'));
document.getElementById('groupMessageForm')?.addEventListener('submit', (e) => handleSubmit(e, 'Group Message'));
