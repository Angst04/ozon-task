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
    const normalizedValue = Math.max(0, Math.min(100, newValue));
    this.value = normalizedValue;
    const offset =
      this.circumference - (normalizedValue / 100) * this.circumference;

    this.circle.style.strokeDashoffset = offset;
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const progress = ProgressAPI.init("progressBlock");

  const valueInput = document.getElementById("valueInput");

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

  progress.setValue(0);
});
