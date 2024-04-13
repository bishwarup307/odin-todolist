import styles from "./toast.module.css";

export default function Toast() {
    const container = document.createElement("div");
    container.classList.add(styles.toast);

    const toastContent = document.createElement("div");
    toastContent.classList.add(styles.toastContent);

    const icon = document.createElement("icon");
    icon.className = "uil uil-check";
    icon.classList.add(styles.toastCheck);
    toastContent.appendChild(icon);

    const messageDiv = document.createElement("div");
    messageDiv.classList.add(styles.message);

    const span1 = document.createElement("span");
    span1.textContent = "Success";
    span1.classList.add(styles.messageText);
    span1.classList.add(styles.text1);
    messageDiv.appendChild(span1);

    const span2 = document.createElement("span");
    span2.textContent = "A task is created successfully";
    span2.classList.add(styles.messageText);
    span2.classList.add(styles.text2);
    messageDiv.appendChild(span2);

    toastContent.appendChild(messageDiv);
    container.appendChild(toastContent);

    const closeIcon = document.createElement("icon");
    closeIcon.className = "uil uil-multiply";
    closeIcon.classList.add(styles.toastClose);
    container.appendChild(closeIcon);

    const progressBar = document.createElement("div");
    progressBar.classList.add(styles.progress);
    container.appendChild(progressBar);

    function getToast() {
        return container;
    }

    function showToast() {
        container.classList.add(styles.active);
        progressBar.classList.add(styles.active);

        setTimeout(() => {
            container.classList.remove(styles.active);
        }, 5000);

        setTimeout(() => {
            progressBar.classList.remove(styles.active);
        }, 5300);
    }

    closeIcon.addEventListener("click", () => {
        container.classList.remove(styles.active);

        setTimeout(() => {
            progressBar.classList.remove(styles.active);
        }, 300);
    });

    return { getToast, showToast };
}
