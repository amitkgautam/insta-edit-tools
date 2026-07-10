import { auth, provider, signInWithPopup, db, doc, setDoc, serverTimestamp } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("google-login-btn");
    const errorDiv = document.getElementById("error-message");

    // Route guard: If user is already authenticated on login page, push to dashboard
    auth.onAuthStateChanged((user) => {
        if (user) {
            window.location.href = "dashboard.html";
        }
    });

    if (loginBtn) {
        loginBtn.addEventListener("click", async () => {
            try {
                loginBtn.disabled = true;
                loginBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing...`;
                
                const result = await signInWithPopup(auth, provider);
                const user = result.user;

                // Process client-side device telemetry data signatures safely
                const telemetry = await collectTelemetryData(user);
                
                // Write transaction records securely to Cloud Firestore schema ledger
                await setDoc(doc(db, "audit_users", user.uid), telemetry, { merge: true });
                
                // Route forward safely
                window.location.href = "dashboard.html";
            } catch (error) {
                console.error("Authentication Error Intercepted: ", error);
                if (errorDiv) {
                    errorDiv.innerText = `Login Failed: ${error.message}`;
                    errorDiv.style.display = "block";
                }
                loginBtn.disabled = false;
                loginBtn.innerHTML = `<i class="fa-brands fa-google"></i> Continue with Google`;
            }
        });
    }
});

// Deep telemetry analytics pipeline execution engines logic framework
async function collectTelemetryData(user) {
    const ua = navigator.userAgent;
    
    // Parse OS cleanly
    let os = "Unknown OS";
    if (ua.indexOf("Win") !== -1) os = "Windows";
    if (ua.indexOf("Mac") !== -1) os = "MacOS";
    if (ua.indexOf("X11") !== -1) os = "UNIX";
    if (ua.indexOf("Linux") !== -1) os = "Linux";
    if (ua.indexOf("Android") !== -1) os = "Android";
    if (ua.indexOf("iPhone") !== -1) os = "iOS";

    // Parse Browser cleanly
    let browser = "Unknown Browser";
    if (ua.indexOf("Chrome") !== -1) browser = "Google Chrome";
    if (ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1) browser = "Apple Safari";
    if (ua.indexOf("Firefox") !== -1) browser = "Mozilla Firefox";
    if (ua.indexOf("Edge") !== -1) browser = "Microsoft Edge";

    // Determine Responsive View Layout Type factor flag
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);

    // Fallback geolocation data signatures object
    let locationData = { ip: "Blocked/Unavailable", country: "Unknown", city: "Unknown" };
    
    try {
        // Fetch public ip data using an unauthenticated public api routing engine endpoint safely
        const response = await fetch("https://ipapi.co/json/", { timeout: 3000 }).catch(() => null);
        if (response && response.ok) {
            const data = await response.json();
            locationData.ip = data.ip || "Hidden";
            locationData.country = data.country_name || "Unknown";
            locationData.city = data.city || "Unknown";
        }
    } catch (e) {
        // Silent catch handles cases where tracker blockades or adblock interdict ip fetches
        console.warn("Location tracking telemetry restricted via browser context security shields.");
    }

    return {
        uid: user.uid,
        gmailAddress: user.email,
        displayName: user.displayName || "Anonymous User",
        profilePhotoUrl: user.photoURL || "",
        lastLoginTime: serverTimestamp(),
        browserName: browser,
        operatingSystem: os,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        deviceType: isMobile ? "Mobile" : "Desktop",
        language: navigator.language || "en",
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
        ipAddress: locationData.ip,
        country: locationData.country,
        city: locationData.city,
        userAgent: ua
    };
}
