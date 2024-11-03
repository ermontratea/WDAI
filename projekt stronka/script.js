document.addEventListener("DOMContentLoaded", () => {
  const targetDate = new Date("November 29, 2024 18:00:00").getTime();

  const countdownTimer = setInterval(() => {
    const now = new Date().getTime();
    const timeRemaining = targetDate - now;

    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    document.getElementById(
      "countdown"
    ).innerHTML = `${days} dni ${hours} godz. ${minutes} min. ${seconds} sek.`;

    if (timeRemaining < 0) {
      clearInterval(countdownTimer);
      document.getElementById("countdown").innerHTML = "Czas minął!";
    }
  }, 1000);

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

      if (!emailPattern.test(email)) {
        alert("Podaj prawidłowy adres e-mail.");
        return;
      }

      alert("Formularz został pomyślnie wysłany!");
      contactForm.reset();
    });
  }
});
