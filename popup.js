document.getElementById("scan").addEventListener("click", async () => {
  document.getElementById("results").innerText = "Scanning inbox...";

  chrome.identity.getAuthToken({ interactive: true }, function(token) {
    fetch('https://www.googleapis.com/gmail/v1/users/me/messages?q=category:promotions', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    .then(res => res.json())
    .then(data => {
      const messages = data.messages || [];
      document.getElementById("results").innerText =
        `Found ${messages.length} promotional emails.`;
    });
  });
});
