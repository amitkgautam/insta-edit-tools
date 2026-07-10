import { auth, db, collection, getDocs, signOut } from "./firebase.js";
import { PortalConfig } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
    // Route validation guard protection
    auth.onAuthStateChanged(async (user) => {
        if (!user) {
            window.location.href = "index.html";
            return;
        }
        
        // Strict Client-Side validation gate confirmation mapping checks
        if (user.uid !== PortalConfig.adminUid) {
            alert("Security Alert: Access Forbidden. Account does not match admin guidelines.");
            window.location.href = "dashboard.html";
            return;
        }

        // Load Logs if check clears successfully
        await loadAuditTrailLogs();
    });

    async function loadAuditTrailLogs() {
        const tbody = document.getElementById("audit-logs-tbody");
        if (!tbody) return;

        try {
            const querySnapshot = await getDocs(collection(db, "audit_users"));
            tbody.innerHTML = ""; // Wipe Loading templates 

            if (querySnapshot.empty) {
                tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">No analytics connection logs recorded.</td></tr>`;
                return;
            }

            querySnapshot.forEach((docSnap) => {
                const data = docSnap.data();
                
                // Format date conversion cleanly
                let loginDate = "N/A";
                if (data.lastLoginTime) {
                    loginDate = data.lastLoginTime.toDate ? data.lastLoginTime.toDate().toLocaleString() : new Date(data.lastLoginTime).toLocaleString();
                }

                const rowHtml = `
                    <tr>
                        <td>
                            <div class="user-cell">
                                <img src="${data.profilePhotoUrl || 'https://via.placeholder.com/32'}" class="avatar-sm" alt="User User"/>
                                <span>${data.displayName}</span>
                            </div>
                        </td>
                        <td>
                            <div style="font-weight:600;">${data.gmailAddress}</div>
                            <div style="font-size:0.75rem; color:#888;">UID: ${data.uid}</div>
                        </td>
                        <td><i class="fa-regular fa-clock"></i> ${loginDate}</td>
                        <td>
                            <div><strong>OS:</strong> ${data.operatingSystem}</div>
                            <div><strong>Browser:</strong> ${data.browserName}</div>
                            <div style="font-size:0.8rem; color:var(--text-muted);">${data.screenResolution} (${data.deviceType})</div>
                        </td>
                        <td>
                            <div><strong>IP:</strong> ${data.ipAddress}</div>
                            <div><i class="fa-solid fa-location-dot"></i> ${data.city}, ${data.country}</div>
                            <div style="font-size:0.75rem; color:#888; max-width:200px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${data.userAgent}">${data.userAgent}</div>
                        </td>
                    </tr>
                `;
                tbody.innerHTML += rowHtml;
            });
        } catch (err) {
            console.error("Firestore retrieval error: ", err);
            tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--danger-text);">Error parsing security records schema from Cloud Firestore database instance.</td></tr>`;
        }
    }

    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            signOut(auth).then(() => window.location.href = "index.html");
        });
    }
});
