const BASE_URL = "http://localhost:5000";
const token = localStorage.getItem("token");

async function refreshBalance() {
    try {
        const res = await fetch(`${BASE_URL}/api/wallet/balance`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        });

        const data = await res.json();
        document.getElementById("balance").innerText = "₦" + data.balance;

    } catch (err) {
        console.log(err);
    }
}

async function withdraw() {
    const amount = document.getElementById("amount").value;
    const accountNumber = document.getElementById("accountNumber").value;
    const bankCode = document.getElementById("bankCode").value;

    const message = document.getElementById("message");
    message.innerText = "Processing...";

    try {
        const res = await fetch(`${BASE_URL}/api/wallet/withdraw`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
                amount,
                accountNumber,
                bankCode
            })
        });

        const data = await res.json();

        if (res.ok) {
            message.innerText = "Withdrawal Successful!";
            refreshBalance();
        } else {
            message.innerText = data.message || "Withdrawal Failed";
        }

    } catch (err) {
        message.innerText = "Server Error";
    }
}

function logout() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

refreshBalance();
