/**
* Template Name: EstateAgency - v4.8.0
* Template URL: https://bootstrapmade.com/real-estate-agency-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Toggle .navbar-reduce
   */
  let selectHNavbar = select('.navbar-default')
  if (selectHNavbar) {
    onscroll(document, () => {
      if (window.scrollY > 100) {
        selectHNavbar.classList.add('navbar-reduce')
        selectHNavbar.classList.remove('navbar-trans')
      } else {
        selectHNavbar.classList.remove('navbar-reduce')
        selectHNavbar.classList.add('navbar-trans')
      }
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Search window open/close
   */
  let body = select('body');
  on('click', '.navbar-toggle-box', function (e) {
    e.preventDefault()
    body.classList.add('box-collapse-open')
    body.classList.remove('box-collapse-closed')
  })

  on('click', '.close-box-collapse', function (e) {
    e.preventDefault()
    body.classList.remove('box-collapse-open')
    body.classList.add('box-collapse-closed')
  })

  /**
   * Intro Carousel
   */
  new Swiper('.intro-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Property carousel
   */
  new Swiper('#property-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.propery-carousel-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * News carousel
   */
  new Swiper('#news-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.news-carousel-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Testimonial carousel
   */
  new Swiper('#testimonial-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.testimonial-carousel-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Property Single carousel
   */
  new Swiper('#property-single-carousel', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.property-single-carousel-pagination',
      type: 'bullets',
      clickable: true
    }
  });

})()

// Función para actualizar el plazo en años mostrado
function updateLoanTermDisplay() {
  const loanTerm = document.getElementById("loanTerm").value;
  document.getElementById("loanTermDisplay").innerText = loanTerm + ' años';
}

// Función para actualizar el monto máximo a solicitar (80% del valor de la vivienda)
function updateMaxLoan() {
  const homeValue = parseFloat(document.getElementById("homeValue").value);
  const maxLoan = homeValue * 0.8;
  const loanAmount = document.getElementById("loanAmount");
  loanAmount.max = maxLoan;
  if (loanAmount.value > maxLoan) {
    loanAmount.value = maxLoan; // Ajustar el valor si excede el máximo
  }
}

// Función para calcular los pagos mensuales y validaciones
function calculateLoan() {
  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  const dob = document.getElementById("dob").value;
  const salary = parseFloat(document.getElementById("salary").value);
  const interestRate = parseFloat(document.getElementById("interestRate").value);
  const loanTerm = parseInt(document.getElementById("loanTerm").value);
  const homeValue = parseFloat(document.getElementById("homeValue").value);
  const loanAmount = parseFloat(document.getElementById("loanAmount").value);

  // Verificar si los campos obligatorios están completos
  if (!email || !name || !dob || !salary || !homeValue || !loanAmount) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  // Calcular el pago mensual usando la fórmula de amortización
  const annualInterest = interestRate / 100;
  const months = loanTerm * 12;
  const monthlyInterestRate = annualInterest / 12;
  const principal = loanAmount;

  // Fórmula para calcular la cuota mensual de un préstamo
  const monthlyPayment = (principal * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -months));
  document.getElementById("monthlyPayment").value = monthlyPayment.toFixed(2);

  // Calcular el salario mínimo requerido
  const minSalary = monthlyPayment / 0.40;
  document.getElementById("minSalary").value = minSalary.toFixed(2);

  // Validar salario suficiente
  const salaryMessage = document.getElementById("salaryMessage");
  if (salary >= minSalary) {
    salaryMessage.innerText = "Monto de salario suficiente para el crédito";
    salaryMessage.style.color = "green";
  } else {
    salaryMessage.innerText = "Monto de salario insuficiente";
    salaryMessage.style.color = "red";
  }

  // Calcular la edad del cliente
  const age = new Date().getFullYear() - new Date(dob).getFullYear();
  const ageMessage = document.getElementById("ageMessage");
  if (age >= 22 && age < 55) {
    ageMessage.innerText = "Cliente con edad suficiente para crédito";
    ageMessage.style.color = "green";
  } else {
    ageMessage.innerText = "Cliente no califica para crédito por edad";
    ageMessage.style.color = "red";
  }

  // Calcular el porcentaje a financiar
  const financingPercentage = (loanAmount / homeValue) * 100;
  const financingMessage = document.getElementById("financingMessage");
  financingMessage.innerText = "Porcentaje a financiar: " + financingPercentage.toFixed(2) + "%";
  financingMessage.style.color = "blue";
}

// Guardar los datos en LocalStorage
function saveToLocalStorage() {
  const data = {
    email: document.getElementById("email").value,
    name: document.getElementById("name").value,
    dob: document.getElementById("dob").value,
    salary: document.getElementById("salary").value,
    homeValue: document.getElementById("homeValue").value,
    loanAmount: document.getElementById("loanAmount").value,
    loanTerm: document.getElementById("loanTerm").value
  };
  localStorage.setItem("loanData", JSON.stringify(data));
  alert("Datos guardados correctamente.");
}

// Cargar los datos guardados en LocalStorage
function loadFromLocalStorage() {
  const savedData = JSON.parse(localStorage.getItem("loanData"));
  if (savedData) {
    document.getElementById("email").value = savedData.email;
    document.getElementById("name").value = savedData.name;
    document.getElementById("dob").value = savedData.dob;
    document.getElementById("salary").value = savedData.salary;
    document.getElementById("homeValue").value = savedData.homeValue;
    document.getElementById("loanAmount").value = savedData.loanAmount;
    document.getElementById("loanTerm").value = savedData.loanTerm;
    updateMaxLoan();
  }
}

// Mostrar la proyección de pagos
function showProjection() {
  const loanAmount = parseFloat(document.getElementById("loanAmount").value);
  const monthlyPayment = parseFloat(document.getElementById("monthlyPayment").value);
  const interestRate = parseFloat(document.getElementById("interestRate").value) / 100;
  const loanTerm = parseInt(document.getElementById("loanTerm").value);
  const monthlyInterestRate = interestRate / 12;
  let remainingBalance = loanAmount;
  const totalMonths = loanTerm * 12; 
  const lastMonths = 6; 
  const monthsToShow = totalMonths - lastMonths; 

  let payments = []; 

  // Generar todos los pagos hasta el último mes
  for (let month = 1; month <= totalMonths; month++) {
      const interestPayment = remainingBalance * monthlyInterestRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;

      payments.push({
          month: month,
          interestPayment: interestPayment,
          principalPayment: principalPayment,
          remainingBalance: remainingBalance
      });
  }

 
  const lastPayments = payments.slice(monthsToShow);

 
  let tableHtml = `<table>
                      <thead>
                          <tr>
                              <th>Mes</th>
                              <th>Pago Mensual</th>
                              <th>Intereses</th>
                              <th>Amortización</th>
                              <th>Saldo</th>
                          </tr>
                      </thead>
                      <tbody>`;

  let monthCounter = 1; 
  
  lastPayments.forEach(payment => {
      tableHtml += `
          <tr>
              <td>${monthCounter}</td>
              <td>${monthlyPayment.toFixed(2)}</td>
              <td>${payment.interestPayment.toFixed(2)}</td>
              <td>${payment.principalPayment.toFixed(2)}</td>
              <td>${payment.remainingBalance.toFixed(2)}</td>
          </tr>`;
      monthCounter++; 
  });

  tableHtml += `</tbody></table>`;
  document.getElementById("projectionTableContainer").innerHTML = tableHtml;
}


// Cargar los datos desde LocalStorage cuando se carga la página
window.onload = loadFromLocalStorage;


