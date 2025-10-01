// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle")
  const navMenu = document.querySelector(".nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")

      // Update ARIA attributes
      const isExpanded = navMenu.classList.contains("active")
      navToggle.setAttribute("aria-expanded", isExpanded)
    })

    // Close menu when clicking on links
    const navLinks = document.querySelectorAll(".nav-menu a")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
        navToggle.setAttribute("aria-expanded", "false")
      })
    })
  }

  // Smooth scrolling for navigation links
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // Form Validation and Submission
  const contactForm = document.querySelector(".contact-form")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Clear previous errors
      clearErrors()

      // Validate form
      const name = document.getElementById("name")
      const phone = document.getElementById("phone")
      const message = document.getElementById("message")

      let isValid = true

      // Name validation
      if (!name.value.trim()) {
        showError("name", "الاسم مطلوب")
        isValid = false
      } else if (name.value.trim().length < 2) {
        showError("name", "الاسم يجب أن يكون أكثر من حرفين")
        isValid = false
      }

      // Phone validation
      const phoneRegex = /^[+]?[0-9\s\-$$$$]{8,}$/
      if (!phone.value.trim()) {
        showError("phone", "رقم الهاتف مطلوب")
        isValid = false
      } else if (!phoneRegex.test(phone.value.trim())) {
        showError("phone", "رقم الهاتف غير صحيح")
        isValid = false
      }

      // Message validation
      if (!message.value.trim()) {
        showError("message", "الرسالة مطلوبة")
        isValid = false
      } else if (message.value.trim().length < 10) {
        showError("message", "الرسالة يجب أن تكون أكثر من 10 أحرف")
        isValid = false
      }

      if (isValid) {
        // Show loading state
        const submitButton = contactForm.querySelector(".submit-button")
        const originalText = submitButton.textContent
        submitButton.textContent = "جاري الإرسال..."
        submitButton.disabled = true

        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
          // Show success message
          const successMessage = document.getElementById("success-message")
          successMessage.classList.add("show")

          // Reset form
          contactForm.reset()

          // Reset button
          submitButton.textContent = originalText
          submitButton.disabled = false

          // Hide success message after 5 seconds
          setTimeout(() => {
            successMessage.classList.remove("show")
          }, 5000)
        }, 1000)
      }
    })
  }

  // Click-to-call tracking (optional analytics)
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]')
  phoneLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Track phone clicks (replace with your analytics code)
      console.log("Phone call initiated:", this.href)
    })
  })

  // WhatsApp link tracking (optional analytics)
  const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]')
  whatsappLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Track WhatsApp clicks (replace with your analytics code)
      console.log("WhatsApp message initiated:", this.href)
    })
  })

  // Intersection Observer for animations (optional)
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    }, observerOptions)

    // Observe service cards and features
    const animatedElements = document.querySelectorAll(".service-card, .feature")
    animatedElements.forEach((el) => {
      el.style.opacity = "0"
      el.style.transform = "translateY(20px)"
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
      observer.observe(el)
    })
  }
})

// Helper functions
function showError(fieldName, message) {
  const field = document.getElementById(fieldName)
  const errorElement = document.getElementById(fieldName + "-error")

  if (field && errorElement) {
    field.classList.add("error")
    errorElement.textContent = message
    field.setAttribute("aria-invalid", "true")
  }
}

function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message")
  const errorFields = document.querySelectorAll(".error")

  errorMessages.forEach((error) => {
    error.textContent = ""
  })

  errorFields.forEach((field) => {
    field.classList.remove("error")
    field.setAttribute("aria-invalid", "false")
  })
}

// Performance: Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.remove("lazy")
        observer.unobserve(img)
      }
    })
  })

  const lazyImages = document.querySelectorAll('img[loading="lazy"]')
  lazyImages.forEach((img) => {
    imageObserver.observe(img)
  })
}
