(function () {
  function handleSubscribeForm(form) {
    var emailInput = form.querySelector('input[type="email"]');
    var button = form.querySelector('button');
    var formBlock = form.closest('.blog-subscribe_form-block');
    var noteEl = formBlock && formBlock.querySelector('.blog-subscribe_note');

    if (!emailInput || !button) return;

    function setNote(text, color) {
      if (!noteEl) return;
      noteEl.textContent = text;
      noteEl.style.color = color || '';
    }

    async function submit() {
      var email = emailInput.value.trim();
      if (!email) { emailInput.focus(); return; }

      button.disabled = true;
      button.textContent = 'Subscribing…';

      try {
        var res = await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email }),
        });

        var data = await res.json();

        if (res.ok && data.success) {
          button.textContent = 'Subscribed ✓';
          emailInput.value = '';
          setNote("You're on the list. We'll be in touch.", '#22c55e');
        } else {
          throw new Error(data.error || 'Unknown error');
        }
      } catch (err) {
        button.disabled = false;
        button.textContent = 'Subscribe';
        setNote('Something went wrong — try again.', '#ef4444');
        setTimeout(function () {
          setNote('No spam. Just new posts, launches, and the occasional sharp ENS update.');
        }, 4000);
      }
    }

    button.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      submit();
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      submit();
    });
  }

  document.querySelectorAll('[data-resend-form="newsletter"]').forEach(handleSubscribeForm);
})();
