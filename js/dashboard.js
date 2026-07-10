import { auth, signOut } from "./firebase.js";
import { PortalConfig } from "./config.js";

document.addEventListener("DOMContentLoaded", () => {
    // Route validation guard protection
    auth.onAuthStateChanged((user) => {
        if (!user) {
            // Drop unauthenticated traffic straight out back to landing index
            window.location.href = "index.html";
        } else {
            initializeDashboard(user);
        }
    });

    function initializeDashboard(user) {
        // Setup Identity presentation parameters safely
        document.getElementById("welcome-title").innerText = `Welcome back, ${user.displayName || 'User'}!`;
        document.getElementById("user-email-subtitle").innerText = user.email;
        document.getElementById("nav-username").innerText = user.displayName || user.email;
        
        if (user.photoURL) {
            const avatar = document.getElementById("nav-avatar");
            avatar.src = user.photoURL;
            avatar.style.display = "block";
        }

        // Check if current user is listed as Administrator in config.js module mapping
        if (user.uid === PortalConfig.adminUid) {
            const adminBtn = document.getElementById("admin-panel-btn");
            if (adminBtn) {
                adminBtn.style.display = "inline-flex";
                adminBtn.addEventListener("click", () => window.location.href = "admin.html");
            }
        }

        // Render resource link cards dynamically from structured data source arrays
        const grid = document.getElementById("cards-grid");
        if (grid) {
            grid.innerHTML = ""; // Clear existing loading placeholders
            PortalConfig.dashboardLinks.forEach(link => {
                const cardHtml = `
                    <div class="portal-item-card">
                        <div class="card-meta">
                            <div class="card-icon"><i class="${link.icon}"></i></div>
                            <h3>${link.title}</h3>
                            <p>${link.description}</p>
                        </div>
                        <a href="${link.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="width:100%; text-align:center;">
                            Open Link <i class="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>
                `;
                grid.innerHTML += cardHtml;
            });
        }
    }

    // Attach Sign out handler functions securely
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            signOut(auth).then(() => {
                window.location.href = "index.html";
            });
        });
    }
});
