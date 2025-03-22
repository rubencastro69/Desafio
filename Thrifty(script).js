document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = "https://67de42b6471aaaa74283be2b.mockapi.io/Thrifty/v1/items";

    // Elementos del DOM
    const loginScreen = document.getElementById("loginScreen");
    const menuScreen = document.getElementById("menuScreen");
    const listScreen = document.getElementById("listScreen");
    const loginButton = document.getElementById("loginButton");

    const itemList = document.getElementById("itemList");
    const addButton = document.getElementById("addButton");
    const addItemForm = document.getElementById("addItemForm");

    // 🔹 Evento del botón de inicio de sesión
    if (loginButton) {
        loginButton.addEventListener("click", function () {
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            if (email.trim() && password.trim()) {
                console.log("Acceso exitoso");

                // Oculta pantalla de login y muestra menú + lista
                loginScreen.classList.add("d-none");
                menuScreen.classList.remove("d-none");
                listScreen.classList.remove("d-none");

                // Cargar elementos
                loadItems();
            } else {
                alert("Por favor, ingresa tus credenciales.");
            }
        });
    }

    // 🔹 Cargar elementos de la API
    function loadItems() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                itemList.innerHTML = "";
                data.forEach(item => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>$${item.price}</td>
                    `;
                    itemList.appendChild(row);
                });
            })
            .catch(error => console.error("Error cargando elementos:", error));
    }

    // 🔹 Redirigir a la página de agregar elemento
    if (addButton) {
        addButton.addEventListener("click", function () {
            window.location.href = "addItem.html";
        });
    }

    // 🔹 Agregar nuevo elemento
    if (addItemForm) {
        addItemForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("name").value;
            const price = document.getElementById("price").value;

            fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, price })
            })
            .then(() => {
                alert("Elemento agregado correctamente.");
                window.location.href = "index.html";
            })
            .catch(() => alert("Error al añadir el elemento."));
        });
    }
});
