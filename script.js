const ProgressAPI = {
  element: null,
  circle: null,
  circumference: 0,
  state: "normal",
  value: 0,

  init(elementId) {
    this.element = document.getElementById(elementId);
    this.circle = this.element.querySelector(".progress-bar");

    const radius = this.circle.r.baseVal.value;
    this.circumference = 2 * Math.PI * radius;

    this.circle.style.strokeDasharray = this.circumference;
    this.circle.style.strokeDashoffset = this.circumference;

    return this;
  },

  setValue(newValue) {
    if (this.state === "animated") return;

    const normalizedValue = Math.max(0, Math.min(100, newValue));
    this.value = normalizedValue;
    const offset =
      this.circumference - (normalizedValue / 100) * this.circumference;

    this.circle.style.strokeDashoffset = offset;
  },

  setAnimated(isAnimated) {
    if (isAnimated) {
      this.state = "animated";
      this.element.classList.add("animated");
    } else {
      this.state = "normal";
      this.element.classList.remove("animated");
      this.setValue(this.value);
    }
  },

  setHidden(isHidden) {
    if (isHidden) {
      this.element.classList.add("hidden");
    } else {
      this.element.classList.remove("hidden");
    }
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const progress = ProgressAPI.init("progressBlock");

  const valueInput = document.getElementById("valueInput");
  const animateToggle = document.getElementById("animateToggle");
  const hideToggle = document.getElementById("hideToggle");

  valueInput.addEventListener("input", (e) => {
    let val = parseInt(e.target.value, 10);

    if (isNaN(val)) {
      val = 0;
    }

    if (val < 0) {
      val = 0;
    } else if (val > 100) {
      val = 100;
    }

    e.target.value = val;
    progress.setValue(val);
  });

  animateToggle.addEventListener("change", (e) => {
    progress.setAnimated(e.target.checked);
    if (e.target.checked) {
      valueInput.disabled = true;
    } else {
      valueInput.disabled = false;
    }
  });

  hideToggle.addEventListener("change", (e) => {
    progress.setHidden(e.target.checked);
  });

  progress.setValue(0);
});
