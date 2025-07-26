/*Prevent Default*/
document.querySelectorAll('a[data-button-type="go-to"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("data-go-target");
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth"
            })
        }
    });
});

const episodeSelectorBtn = document.getElementById('episode_selector_btn');
const episodeSelectorBox = document.getElementById('episode_selector_box');
const episodeSelectorIcon = document.getElementById('selector_btn_icon');

episodeSelectorBtn.addEventListener("click", function (e) {
    if (episodeSelectorBox.classList.contains('open')) {
        episodeSelectorBox.classList.remove('open');
        episodeSelectorIcon.classList.remove('open');
    }
    else {
        episodeSelectorBox.classList.add('open');
        episodeSelectorIcon.classList.add('open');
    }
});