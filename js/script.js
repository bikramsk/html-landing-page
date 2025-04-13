document.addEventListener("DOMContentLoaded", function () {
 
  //consultation-btn 
  document.querySelectorAll(".consultation-btn").forEach(button => {
    button.addEventListener("click", function(e) {
      e.preventDefault(); 
      
      // Scroll to appointment section
      const appointmentSection = document.querySelector(".appointment-section");
      if (appointmentSection) {
        appointmentSection.scrollIntoView({ behavior: "smooth" });

        // Highlight the appointment section 
        appointmentSection.classList.add("highlight-section");
        setTimeout(() => {
          appointmentSection.classList.remove("highlight-section");
        }, 1500);
      }
    });
  });

  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleLocationSuccess, handleLocationError);
    } else {
      console.log("Geolocation is not supported by this browser.");
      showDefaultClinics();
    }
  }

  function handleLocationSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    // Use reverse geocoding to get city from coordinates
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`)
      .then(response => response.json())
      .then(data => {
        let userCity = "";
        if (data.address) {
          userCity = data.address.city || data.address.town || data.address.state || "";
        }
        
        if (userCity) {
          // Set search input to user's city
          const searchInput = document.querySelector(".search-location input");
          if (searchInput) {
            searchInput.value = userCity;
          }
          
          // Update header search if it exists
          const headerSearchInput = document.querySelector("header .search input");
          if (headerSearchInput) {
            headerSearchInput.value = userCity;
          }
          
          // Load clinics based on location
          loadClinicData();
        } else {
          showDefaultClinics();
        }
      })
      .catch(error => {
        console.error("Error getting location details:", error);
        showDefaultClinics();
      });
  }

  function handleLocationError() {
    console.log("User denied geolocation permission or error occurred");
    showDefaultClinics();
  }

  function showDefaultClinics() {
   
    const searchInput = document.querySelector(".search-location input");
    if (searchInput) {
      searchInput.value = "Mumbai";
    }
    
    // Update header search if it exists
    const headerSearchInput = document.querySelector("header .search input");
    if (headerSearchInput) {
      headerSearchInput.value = "Mumbai";
    }
    
    loadClinicData();
  }

  getUserLocation();


   // City dropdown 
   const cityDropdown = document.querySelector('.city-dropdown');
   const clinicDropdown = document.getElementById('clinic-dropdown');
   
   if (cityDropdown && clinicDropdown) {
     cityDropdown.addEventListener('change', function() {
       clinicDropdown.innerHTML = '<option value="" disabled selected>Select Clinic</option>';
           
       if (this.value === 'Delhi NCR') {
         const delhiClinics = ['Dwarka', 'East Delhi', 'Faridabad', 'Greater Noida'];
               
         delhiClinics.forEach(clinic => {
           const option = document.createElement('option');
           option.value = clinic;
           option.textContent = clinic;
           clinicDropdown.appendChild(option);
         });
       } else if (this.value === 'Mumbai') {
         const mumbaiClinics = ['Badlapur', 'Borivali'];
               
         mumbaiClinics.forEach(clinic => {
           const option = document.createElement('option');
           option.value = clinic;
           option.textContent = clinic;
           clinicDropdown.appendChild(option);
         });
       } else if (this.value === 'Bangalore') {
         const bangaloreClinics = ['Electronic City', 'HSR Layout', 'Indira Nagar'];
               
         bangaloreClinics.forEach(clinic => {
           const option = document.createElement('option');
           option.value = clinic;
           option.textContent = clinic;
           clinicDropdown.appendChild(option);
         });
       } else if (this.value === 'Pune') {
         const puneClinics = ['Aundh', 'Baner', 'Fatima Nagar', 'Pimpri', 'Kothrud'];
               
         puneClinics.forEach(clinic => {
           const option = document.createElement('option');
           option.value = clinic;
           option.textContent = clinic;
           clinicDropdown.appendChild(option);
         });
       } else if (this.value === 'Kolkata') {
         const kolkataClinics = ['Barasat', 'Behala', 'Howrah', 'Jadavpur'];
               
         kolkataClinics.forEach(clinic => {
           const option = document.createElement('option');
           option.value = clinic;
           option.textContent = clinic;
           clinicDropdown.appendChild(option);
         });
       }
     });
   }
 });


 

  function addSwipeDetection(element, onSwipeLeft, onSwipeRight) {
    if (!element) return;

    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50; 

    element.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    element.addEventListener(
      "touchend",
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      },
      { passive: true }
    );

    function handleSwipe() {
      const swipeDistance = touchEndX - touchStartX;

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance < 0) {
          // Swipe left (next)
          if (onSwipeLeft) onSwipeLeft();
        } else {
          // Swipe right (previous)
          if (onSwipeRight) onSwipeRight();
        }
      }
    }
  }

  // Testimonials pagination
  const testimonialDots = document.querySelectorAll(
    ".testimonials-section .pagination-dots .dot"
  );
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const testimonialContainer = document.querySelector(
    ".testimonials-container"
  );


  function setupTestimonials() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 992;
    const isDesktop = window.innerWidth > 992;

   
    const testimonialsContainer = document.querySelector(
      ".testimonials-container"
    );
    const testimonialHeading = document.querySelector(
      ".testimonials-section h2"
    );
    const testimonialSubtitle = document.querySelector(
      ".testimonials-section .subtitle"
    );
    const paginationDots = document.querySelector(
      ".testimonials-section .pagination-dots"
    );

    if (isMobile) {
      // Mobile behavior - show cards based on active slide with pagination
      const activeSlide = document
        .querySelector(".testimonials-section .pagination-dots .dot.active")
        .getAttribute("data-slide");
      testimonialCards.forEach((card) => {
        if (card.getAttribute("data-slide") === activeSlide) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

      // pagination dots on mobile
      if (paginationDots) paginationDots.style.display = "flex";
    } else if (isTablet) {
      // Tablet
      const activeSlide = document
        .querySelector(".testimonials-section .pagination-dots .dot.active")
        .getAttribute("data-slide");

      // cards that match the active slide
      testimonialCards.forEach((card) => {
        if (card.getAttribute("data-slide") === activeSlide) {
          card.style.display = "block";
          card.style.padding = "0 15px";
          card.style.width = "calc(50% - 30px)";
          card.style.boxSizing = "border-box";
          card.style.float = "left";
        } else {
          card.style.display = "none";
        }
      });

      // Add container padding on tablet
      if (testimonialsContainer) {
        testimonialsContainer.style.padding = "0 25px";
        testimonialsContainer.style.overflow = "hidden"; 
      }

      // Add padding to heading and subtitle
      if (testimonialHeading) testimonialHeading.style.paddingLeft = "15px";
      if (testimonialSubtitle) testimonialSubtitle.style.paddingLeft = "15px";

      // Show pagination dots on tablet
      if (paginationDots) paginationDots.style.display = "flex";
    } else {
      // Desktop show all cards
      testimonialCards.forEach((card) => {
        card.style.display = "block";
        card.style.padding = "0";
        card.style.width = ""; 
        card.style.float = "none";
      });

      // Reset container padding
      if (testimonialsContainer) {
        testimonialsContainer.style.padding = "0";
        testimonialsContainer.style.overflow = "";
      }

      // Reset heading padding
      if (testimonialHeading) testimonialHeading.style.paddingLeft = "0";
      if (testimonialSubtitle) testimonialSubtitle.style.paddingLeft = "0";

      // Hide pagination dots on desktop
      if (paginationDots) paginationDots.style.display = "none";
    }
  }

  // Function to handle testimonial pagination
  function moveTestimonialSlide(direction) {
    const dots = document.querySelectorAll(
      ".testimonials-section .pagination-dots .dot"
    );
    const activeDotIndex = Array.from(dots).findIndex((dot) =>
      dot.classList.contains("active")
    );

    let nextIndex;
    if (direction === "next") {
      nextIndex = (activeDotIndex + 1) % dots.length;
    } else {
      nextIndex = (activeDotIndex - 1 + dots.length) % dots.length;
    }

    // Trigger click on the next/prev dot
    dots[nextIndex].click();
  }

  // Handle testimonial dot clicks
  testimonialDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const slideNumber = dot.getAttribute("data-slide");

      
      testimonialDots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");

      setupTestimonials();
    });
  });

  // Add swipe detection for testimonials
  if (testimonialContainer) {
    addSwipeDetection(
      testimonialContainer,
      () => moveTestimonialSlide("next"),
      () => moveTestimonialSlide("prev")
    );
  }

  // Initialize testimonials
  setupTestimonials();

  // Handle window resize for testimonials
  window.addEventListener("resize", setupTestimonials);

  // Hair treatment items pagination
  const treatmentPaginationDots = document.querySelectorAll(
    ".hairtreatment-section .treatment-pagination-dots .dot"
  );
  const treatmentContainer = document.querySelector(".treatment-grid");

  function moveTreatmentPage(direction) {
    const dots = document.querySelectorAll(
      ".hairtreatment-section .treatment-pagination-dots .dot"
    );
    const activeDotIndex = Array.from(dots).findIndex((dot) =>
      dot.classList.contains("active")
    );

    let nextIndex;
    if (direction === "next") {
      nextIndex = (activeDotIndex + 1) % dots.length;
    } else {
      nextIndex = (activeDotIndex - 1 + dots.length) % dots.length;
    }

    // Trigger click on the next/prev dot
    dots[nextIndex].click();
  }

  treatmentPaginationDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const pageNumber = dot.getAttribute("data-page");

      // Update active dot
      treatmentPaginationDots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");

      // Show/hide treatment items
      const items = document.querySelectorAll(
        ".hairtreatment-section .treatment-item"
      );
      items.forEach((item) => {
        if (item.getAttribute("data-page") === pageNumber) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // Add swipe detection for treatments
  if (treatmentContainer) {
    addSwipeDetection(
      treatmentContainer,
      () => moveTreatmentPage("next"),
      () => moveTreatmentPage("prev")
    );
  }

  // Doctor speaks pagination
  const doctorDots = document.querySelectorAll(".doctor-pagination-dots .dot");
  const doctorContainer = document.querySelector(".doctor-speaks-container");

  function moveDoctorSlide(direction) {
    const dots = document.querySelectorAll(".doctor-pagination-dots .dot");
    const activeDotIndex = Array.from(dots).findIndex((dot) =>
      dot.classList.contains("active")
    );

    let nextIndex;
    if (direction === "next") {
      nextIndex = (activeDotIndex + 1) % dots.length;
    } else {
      nextIndex = (activeDotIndex - 1 + dots.length) % dots.length;
    }

    // Trigger click on the next/prev dot
    dots[nextIndex].click();
  }

  doctorDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const slideNumber = dot.getAttribute("data-slide");

      // Update active dot
      doctorDots.forEach((d) => d.classList.remove("active"));
      dot.classList.add("active");

      // Show/hide doctor cards
      const cards = document.querySelectorAll(".doctor-card");
      cards.forEach((card) => {
        if (card.getAttribute("data-slide") === slideNumber) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Add swipe detection for doctor speaks
  if (doctorContainer) {
    addSwipeDetection(
      doctorContainer,
      () => moveDoctorSlide("next"),
      () => moveDoctorSlide("prev")
    );
  }

  // Treatment approach cards pagination
  const treatmentApproachCards = document.querySelectorAll('.treatment-approach-card');
  const sciencePaginationDots = document.querySelectorAll('.science-pagination-dots .dot');
  const treatmentApproachContainer = document.querySelector('.treatment-approach-cards');
  
  let currentApproachCardIndex = 0;
  const approachItemsPerPage = 2; // Show exactly 2 cards on mobile
  
  function showApproachCard(index) {
    // Hide all cards first
    treatmentApproachCards.forEach(card => {
      card.style.display = 'none';
    });
    
    if (window.innerWidth <= 768) {
      // On mobile, show ONLY 2 items for the current slide
      const slideNumber = Math.floor(index / approachItemsPerPage);
      
      const startIndex = slideNumber * approachItemsPerPage;
      const endIndex = startIndex + approachItemsPerPage;
      
      // Show only 2 cards for the current page
      for (let i = startIndex; i < Math.min(endIndex, treatmentApproachCards.length); i++) {
        treatmentApproachCards[i].style.display = 'flex';
      }
      
      // Update active pagination dot
      sciencePaginationDots.forEach(dot => {
        dot.classList.remove('active');
      });
      
      const activeDotIndex = Math.floor(index / approachItemsPerPage);
      if (sciencePaginationDots[activeDotIndex]) {
        sciencePaginationDots[activeDotIndex].classList.add('active');
      }
    } else {
      // On desktop, show all items
      treatmentApproachCards.forEach(card => {
        card.style.display = 'flex';
      });
    }
  }
  
 
  function moveApproachCard(direction) {
    if (window.innerWidth <= 768) {
      const totalSlides = Math.ceil(treatmentApproachCards.length / approachItemsPerPage);
      const currentSlide = Math.floor(currentApproachCardIndex / approachItemsPerPage);
      
      if (direction === 'next') {
        if (currentSlide < totalSlides - 1) {
          currentApproachCardIndex = (currentSlide + 1) * approachItemsPerPage;
        } else {
          // Loop back to the first slide
          currentApproachCardIndex = 0;
        }
      } else {
        if (currentSlide > 0) {
          currentApproachCardIndex = (currentSlide - 1) * approachItemsPerPage;
        } else {
          // Loop to the last slide
          const lastSlide = totalSlides - 1;
          currentApproachCardIndex = lastSlide * approachItemsPerPage;
        }
      }
      
      showApproachCard(currentApproachCardIndex);
    }
  }
  
  // Add click event listeners to pagination dots
  sciencePaginationDots.forEach((dot, dotIndex) => {
    dot.addEventListener('click', function() {
  
      currentApproachCardIndex = dotIndex * approachItemsPerPage;
      showApproachCard(currentApproachCardIndex);
    });
  });
  
  // Add swipe detection for treatment approach cards
  if (treatmentApproachContainer) {
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;
    
    treatmentApproachContainer.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
      e.stopPropagation(); // Prevent event propagation to other sections
    }, { passive: true });
    
    treatmentApproachContainer.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;
      
      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance < 0) {
          moveApproachCard('next');
        } else {
          moveApproachCard('prev');
        }
      }
      e.stopPropagation(); // Prevent event propagation to other sections
    }, { passive: true });
  }
  
  // Initialize treatment approach cards immediately on page load
  if (treatmentApproachCards.length > 0) {
   
    if (window.innerWidth <= 768) {
     
      currentApproachCardIndex = 0;
      showApproachCard(0);
      
   
      if (sciencePaginationDots.length > 0) {
        sciencePaginationDots.forEach((dot, index) => {
         
          dot.classList.toggle('active', index === 0);
        });
      }
    } else {
      // On desktop, show all cards
      treatmentApproachCards.forEach(card => {
        card.style.display = 'flex';
      });
    }
  }
  
  // Handle window resize for approach cards
  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      // On mobile
      showApproachCard(currentApproachCardIndex);
    } else {
      // On desktop
      treatmentApproachCards.forEach(card => {
        card.style.display = 'flex';
      });
    }
  });

  // Google Reviews Navigation
  const reviewCards = document.querySelectorAll(".review-card");
  const reviewDots = document.querySelectorAll(".reviews-pagination-dots .dot");
  const reviewsContainer = document.querySelector(".reviews-container");
  const prevBtn = document.querySelector(".reviews-navigation .prev");
  const nextBtn = document.querySelector(".reviews-navigation .next");
  const cardsPerPage = window.innerWidth <= 992 ? 1 : 3;
  let currentIndex = 0;

  function showReviews(startIndex) {
    reviewCards.forEach((card, index) => {
      if (window.innerWidth <= 992) {
        // Mobile view 
        card.style.display = index === startIndex ? "block" : "none";
      } else {
        // Desktop view 
        if (index >= startIndex && index < startIndex + cardsPerPage) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      }
    });

    // Update dots on mobile
    if (window.innerWidth <= 992) {
      reviewDots.forEach((dot, index) => {
        dot.classList.toggle("active", index === startIndex);
      });
    }
  }

  function moveReviewSlide(direction) {
    if (direction === "next") {
      if (
        currentIndex <
        reviewCards.length - (window.innerWidth <= 992 ? 1 : cardsPerPage)
      ) {
        currentIndex++;
        showReviews(currentIndex);
      }
    } else {
      if (currentIndex > 0) {
        currentIndex--;
        showReviews(currentIndex);
      }
    }
  }

  // Handle dot clicks on mobile
  reviewDots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      showReviews(currentIndex);
    });
  });

  // Desktop navigation
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener("click", () => {
      moveReviewSlide("prev");
    });

    nextBtn.addEventListener("click", () => {
      moveReviewSlide("next");
    });
  }

  // Add swipe detection for reviews
  if (reviewsContainer) {
    addSwipeDetection(
      reviewsContainer,
      () => moveReviewSlide("next"),
      () => moveReviewSlide("prev")
    );
  }

  // Initialize reviews
  showReviews(0);

  // Handle window resize
  window.addEventListener("resize", () => {
    const newCardsPerPage = window.innerWidth <= 992 ? 1 : 3;
    if (newCardsPerPage !== cardsPerPage) {
      currentIndex = 0;
      showReviews(0);
    }
  });

  // Clinic data embedded directly in the JS file
  const clinicsData = [
    {
      name: "Dr Batra's Clinic",
      rating: 4.3,
      address:
        "Shop No.1 B, Umiya Paradise, A Wing, Ganapati Mandir Road Titwala",
      area: "East, Mumbai",
      city: "Mumbai, Maharashtra, India",
    },
    {
      name: "Dr Batra's Clinic",
      rating: 4.5,
      address: "Shop No.23, Sai Complex, Andheri West",
      area: "Andheri West, Mumbai",
      city: "Mumbai, Maharashtra, India",
    },
    {
      name: "Dr Batra's Clinic",
      rating: 4.7,
      address: "Shop No.108, Hill View Plaza, Linking Road",
      area: "Bandra West, Mumbai",
      city: "Mumbai, Maharashtra, India",
    },
    {
      name: "Dr Batra's Clinic",
      rating: 4.6,
      address: "Shop No.74 B, Plaza Complex, Connaught Place",
      area: "Central Delhi",
      city: "Delhi, NCR, India",
    },
    {
      name: "Dr Batra's Clinic",
      rating: 4.4,
      address: "Shop No.12, Amanora Mall, Hadapsar",
      area: "Hadapsar, Pune",
      city: "Pune, Maharashtra, India",
    },
    {
      name: "Dr Batra's Clinic ",
      rating: 4.2,
      address: "Shop No.7, Lake City Mall, Kapurbawdi",
      area: "Kapurbawdi, Thane",
      city: "Thane, Maharashtra, India",
    },
    {
      name: "Dr Batra's Clinic",
      rating: 4.8,
      address: "45A, Shakespeare Sarani Road, 2nd Floor",
      area: "Central Kolkata",
      city: "Kolkata, West Bengal, India",
    },
    {
      name: "Dr Batra's Clinic",
      rating: 4.5,
      address: "No.24, College Road, Nungambakkam",
      area: "Nungambakkam",
      city: "Chennai, Tamil Nadu, India",
    },
    {
      name: "Dr Batra's Clinic",
      rating: 4.6,
      address: "1st Floor, No. 38, Lavelle Road",
      area: "Central Bengaluru",
      city: "Bengaluru, Karnataka, India",
    },
    {
      name: "Dr Batra's Clinic",
      rating: 4.4,
      address: "Plot No. 4, Road No. 2, Banjara Hills",
      area: "Banjara Hills",
      city: "Hyderabad, Telangana, India",
    },
    {
      name: "Dr Batra's Clinic",
      rating: 4.3,
      address: "201, 2nd Floor, Saman Complex, Opposite Satyam Mall",
      area: "Satellite",
      city: "Ahmedabad, Gujarat, India",
    },
    {
      name: "Dr Batra's Clinic",
      rating: 4.5,
      address: "SCO 378-380, Sector 35-B",
      area: "Sector 35",
      city: "Chandigarh, India",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.1,
      address:
        "No. 61A, SS Plaza Kalepur, near Chatrasangh Chauraha, Paidleganj, Gorakhpur, Uttar Pradesh 273001",
      city: "Gorakhpur",
      area: "Paidleganj",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.5,
      address:
        "Ground Floor, John Tower (AIRTEL CELL TOWER), near College Chauraha, Narendra Nagar, Amaiya Colony, Rewa, Madhya Pradesh 486001",
      city: "Rewa",
      area: "Narendra Nagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.1,
      address:
        "No. 17-A, Stadium Rd, opposite Sant Hospital, Ekta Nagar, Bareilly, Uttar Pradesh 243112",
      city: "Bareilly",
      area: "Ekta Nagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.6,
      address:
        "1st Floor, Bhagat Singh Circle, Saroj Tower, above Nike showroom, Shivaji Park, Lajpat Nagar, Alwar, Rajasthan 301001",
      city: "Alwar",
      area: "Lajpat Nagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.3,
      address:
        "1st Floor, city Center Complex, SCO-23, 22 No. Phatak, opp. Sahni Sweets, Model Town, Patiala, Punjab 147001",
      city: "Patiala",
      area: "Model Town",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.5,
      address:
        "Shop No. 28, Ground floor, Pacific city center Mall, Delhi Bypass road, near Jat Bhawan, Tilak Nagar, Sector 3 (P), Rohtak, Haryana 124001",
      city: "Rohtak",
      area: "Tilak Nagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.1,
      address:
        "1st Floor, Krishna Bhawan, Club Rd, near New Biryani Darbar, Haji Nagar Colony, Mithanpura, Muzaffarpur, Bihar 842002",
      city: "Muzaffarpur",
      area: "Mithanpura",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.7,
      address:
        "Agrasen Chowk, Marwari Para, near Police Station, Marwari Para, Jharsuguda, Odisha 768201",
      city: "Jharsuguda",
      area: "Marwari Para",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.9,
      address:
        "Dev Bazar, Bazpur road, beside DTDC Courier, Kashipur, Uttarakhand 244713",
      city: "Kashipur",
      area: "Bazpur road",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.2,
      address:
        "No. 2 Ma 18, Sabji Mandi Rd, opposite Neelkanth IVF, Vigyan Nagar, Kota, Rajasthan 324005",
      city: "Kota",
      area: "Vigyan Nagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.5,
      address:
        "1st Flr, Nandanam Elite, 160/1/1, 160/2, Kamarajar Salai, near Reliance Trends, Alagar Nagar, Madurai, Tamil Nadu 625009",
      city: "Madurai",
      area: "Alagar Nagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.4,
      address:
        "1st Floor, SLT Water Front, Complex, Great Eastern Rd, Moulipara, Telibandha, Raipur, Chhattisgarh 492001",
      city: "Raipur",
      area: "Telibandha",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.6,
      address:
        "1st Flr, Cross Road Building, No. 102, CS No. 331, opp. Galaxy Apartment, New Shahupuri, Kolhapur, Maharashtra 416003",
      city: "Kolhapur",
      area: "New Shahupuri",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.5,
      address:
        "Nawahat Mode,Near Tvs Showroom, Adjacent To Sanjeevni Nursing Home, Burdwan, West Bengal 713101",
      city: "Burdwan",
      area: "Nawahat Mode",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.3,
      address:
        "1st Floor, Raghuwanshi Complex, Azad Garden, Bazar Ward, Chandrapur, Maharashtra 442401",
      city: "Chandrapur",
      area: "Azad Garden",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.9,
      address:
        "1st floor, Tiwari Arcade, opp. Chatrapati Shivaji Maharaj Road, Putla Chowk, Gawali Pura, Jalna, Maharashtra 431203",
      city: "Jalna",
      area: "Gawali Pura",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.4,
      address:
        "1st floor, Ranipur More, No. 486, Model Colony Rd, opp. Mahakali Mobile, Model Colony, Haridwar, Jwalapur, Uttarakhand 249401",
      city: "Haridwar",
      area: "Jwalapur",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.2,
      address:
        "Akbar Ka Kila, First Floor, Prabha Palace, Sonakpur, Stadium Rd, near Prem Sweets, Phase I, Ram Ganga Vihar, Moradabad, Uttar Pradesh 244001",
      city: "Moradabad",
      area: "Ram Ganga Vihar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.3,
      address:
        "A/B, GF, Buniyaad Complex, No. 106, Plot No. 9, near Water Tank, Nehru Nagar, Bhilai, Chhattisgarh 490020",
      city: "Bhilai",
      area: "Nehru Nagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.2,
      address:
        "3rd Floor, 373, South Kasaba, Main Rd, opp. Unique Hospital, above Birajdar Medical, Shinde Wada, Budhavar Peth, Solapur, Maharashtra 413001",
      city: "Solapur",
      area: "Budhavar Peth",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.5,
      address:
        "Manaswin Towers, No 97/3E, behind Elite Cinema, Civil Lines, Jhansi, Uttar Pradesh 284001",
      city: "Jhansi",
      area: "Civil Lines",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.6,
      address:
        "1st Floor, Chotti Line, above Women Hair Design Salon, Prem Colony, Yamuna Nagar, Jagadhri, Haryana 135003",
      city: "Yamuna Nagar",
      area: "Jagadhri",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.6,
      address:
        "2nd Floor, Mehta Tower, 51/S, Gurudwara Rd, above Headmasters Salon, Model Town, Hisar, Haryana 125005",
      city: "Hisar",
      area: "Model Town",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.5,
      address:
        "Maruti Business Park, Great Eastern Rd, near Rajkumar College, Mukut Nagar, Raipur, Chhattisgarh 492001",
      city: "Raipur",
      area: "Mukut Nagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.3,
      address:
        "No. 8 and 635- L, 1st floor Jattal Rd, Chowk, opposite Juneja Medical Hall, Marla Colony, Model Town, Panipat, Haryana 132103",
      city: "Panipat",
      area: "Model Town",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.5,
      address:
        "B-K, S 25/221, Panchkoshi Rd, next to Smartpoint, Near Mahaveer Mandir, Orderly Bazar, Varanasi, Uttar Pradesh 221002",
      city: "Varanasi",
      area: "Orderly Bazar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.8,
      address:
        "4th Ward, Sharada Complex, No. 489 & 498, 1st Flr, Rajkumar Circle, nr. Punith, Patel Nagar, Vijayanagara, Hospet Karnataka 583203",
      city: "Hospet",
      area: "Vijayanagara",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.4,
      address:
        "YES BANK, TI Mall, 2 nd Floor, 102, Building 9/1/2 Above Suzuki Showroom, Khandelwal Motors, Mahatma Gandhi Rd, Indore, Madhya Pradesh 452001",
      city: "Indore",
      area: "Mahatma Gandhi Rd",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.5,
      address:
        "No. 30, Old Delhi Road, opposite Manali House, Jain Nagar, Vijay Nagar, Ambala, Haryana 134003",
      city: "Ambala",
      area: "Vijay Nagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.1,
      address:
        "2nd Floor, Sanyukt Towers, Barwa Road, Bartand, Chandra Vihar Colony, Dhanbad, Jharkhand 826001",
      city: "Dhanbad",
      area: "Chandra Vihar Colony",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.5,
      address:
        "Opposite Reliance Smart, Mahaveer Colony, Chorda Chhak, Byasanagar, Jajpur, Odisha 755019",
      city: "Jajpur",
      area: "Byasanagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.1,
      address:
        "Premdan Chowk, No 2, Royal Heights, Savedi Rd, near Big Bazaar, Ahilya Nagar, Maharashtra 414003",
      city: "Ahmednagar",
      area: "Premdan Chowk",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.3,
      address:
        "2nd floor, Mukhtar Mansion, Straight Mile Road Near blood bank, Dhatkidih, Bistupur, Jamshedpur, Jharkhand 831001",
      city: "Jamshedpur",
      area: "Bistupur",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.3,
      address:
        "Axis Bank Building Ainthapali, near Reliance Trend, Budharaja, Sambalpur, Odisha 768004",
      city: "Sambalpur",
      area: "Budharaja",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 0,
      address:
        "First floor, Kim's Avenue, Pattambi Rd, Shanti Nagar, Perinthalmanna, Kerala 679322",
      city: "Perinthalmanna",
      area: "Shanti Nagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.4,
      address:
        "No. 155/1, Gorakhpur-Thane Road, near Bandariya Tiraha, Gorakhpur, Jabalpur, Madhya Pradesh 482001",
      city: "Jabalpur",
      area: "Gorakhpur-Thane Road",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.3,
      address:
        "1st floor, 59, Kshapnak Marg., opposite Madhav Nagar hospital, Freeganj, Madhav Nagar, Ujjain, Madhya Pradesh 456010",
      city: "Ujjain",
      area: "Madhav Nagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.9,
      address:
        "BSC Textile, 1st Railway gate, Shop No F03, 1st floor, Datta Krupa complex Shukrawar Peth, Mall Road, opposite Hotel Niyaaz, Tilakwadi, Belagavi, Karnataka 590006",
      city: "Belgaum2",
      area: "Tilakwadi",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.2,
      address:
        "Galaxy Auto Sales Building, Marris Rd, near HDFC Life, Begpur, Aligarh, Uttar Pradesh 202001",
      city: "Aligarh",
      area: "Begpur",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.1,
      address:
        "C/o Sanjay Achalia, Basant Vihar Complex, Don Bosco Road, Sevoke Rd, Siliguri, West Bengal 734001",
      city: "Siliguri",
      area: "Sevoke Rd",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.5,
      address:
        "T1, Siddhivinayak Forum, No 74, Mariaai Complex, Sangli - Miraj Rd, opp. Zilla Parishad School, Sangli, Maharashtra 416416",
      city: "Sangli",
      area: "Siddhivinayak Forum",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.9,
      address:
        "Ground Floor, Parasia Rd, opp. Gogia Hospital, Vishnu Nagar, Chhindwara, Madhya Pradesh 480001",
      city: "Chhindwara",
      area: "Vishnu Nagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.5,
      address:
        "1st Floor, E Town Shopping Complex, E Fort Jct, above Reliance supermarket, East Fort, Pallikkulam, Thrissur, Kerala 680005",
      city: "Thrissur",
      area: "Pallikkulam",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.2,
      address:
        "1st Flr, No. 12 & 13, opposite Dandiya Hanuman Temple, Park Colony, Jamnagar, Gujarat 361008",
      city: "Jamnagar",
      area: "Park Colony",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.3,
      address:
        "Ground Floor, GT Rd, near Sagar Hotel & Hanuman Chowk, Chandsar Basti, Bathinda, Punjab 151001",
      city: "Bathinda",
      area: "Chandsar Basti",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.2,
      address:
        "Urvashi Housing Complex, DC Cinema, 3/7, Durgapur, West Bengal 713216",
      city: "Durgapur",
      area: "Urvashi Housing Complex",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.3,
      address:
        "Ground Flr, Asha Singh Mod, Balajee Gharana Cplx, near Kaveri Sweets, A P Colony, Gaya, Bihar 823001",
      city: "Gaya",
      area: "A P Colony",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.1,
      address:
        "1st Floor, Guru Harkrishan Complex Nanital Road, Tikonia Rd, Haldwani, Uttarakhand 263139",
      city: "Haldwani",
      area: "Tikonia Rd",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.4,
      address:
        "2nd Floor, Vetteel estate Building, Kottayam - Kumily Rd, opp. to Bharat petroleum, above SBI, Kanjikuzhi, Kottayam, Kerala 686004",
      city: "Kottayam",
      area: "Kanjikuzhi",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.3,
      address:
        "SCO 14, Crystal Plaza, Garha Rd, near PIMS, Choti Baradari Part 1, Choti Baradari, Jalandhar, Punjab 144001",
      city: "Jalandhar",
      area: "Choti Baradari",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.8,
      address:
        "2nd Flr, Laxmi Pride Buliding, 2, Nehru Nagar, Belagavi, Karnataka 590010",
      city: "Belgaum1",
      area: "Nehru Nagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.3,
      address:
        "1st Flr, Gupta Heights, No. C2, near Urban Haat Bazar, Vaishali Nagar, Ajmer, Rajasthan 305004",
      city: "Ajmer",
      area: "Vaishali Nagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.9,
      address:
        "2nd floor, Shaakuntlam tower, Alwar bye pass road, near Harish bekari, above of AU financial bank, Bhagat Singh Colony, U.I.T., Bhiwadi, Rajasthan 301019",
      city: "Bhiwadi",
      area: "Bhagat Singh Colony",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.7,
      address:
        "2nd Floor, Shree Complex, Dalhousie Road, near Pantaloons, Pathankot, Punjab 145001",
      city: "Pathankot",
      area: "Dalhousie Road",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.3,
      address:
        "Model Town Rd, near Mittal Nursing Home, 8 Marla, Model Town, Sonipat, Haryana 131001",
      city: "Sonipat",
      area: "Model Town",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.2,
      address:
        "Shop No.125, V2 Signature, Daman Rd, above Domino's Pizza, Chala, Vapi, Gujarat 396191",
      city: "Vapi",
      area: "Chala",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.6,
      address:
        "Sangam Complex, No. 98C, opposite Jai Guru Dev Ashram, Radha Nagar, Krishna Nagar, Mathura, Uttar Pradesh 281004",
      city: "Mathura",
      area: "Krishna Nagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.1,
      address:
        "1st floor, Ekta Tower, Rewa Rd, above ICICI Bank, Shakti Vihar, Jeevan Jyoti Colony, Satna, Madhya Pradesh 485001",
      city: "Satna",
      area: "Jeevan Jyoti Colony",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.1,
      address:
        "second floor, Shrinivas Arcade, office n, o. 2, opposite UCO Bank, Savarkar Chowk, Samarth Nagar, Chhatrapati Sambhaji Nagar, Maharashtra 431001",
      city: "Aurangabad",
      area: "Chhatrapati Sambhaji Nagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.8,
      address:
        "1st Floor, Shree Jagannath Tower, No. 430-A, Piprali Rd, Jat Colony, Sikar, Rajasthan 332001",
      city: "Sikar",
      area: "Jat Colony",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.8,
      address:
        "1st flr, Main Rd, opposite Chandra Trends, Bihar Colony, Chas, Bokaro Steel city, Jharkhand 827013",
      city: "Bokaro",
      area: "Chas",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.3,
      address:
        "Ground Flr, Chowdhury Complex, Panposh Rd, near Shalimar Hotel, Raghunathpali, Sundergarh, Rourkela, Odisha 769004",
      city: "Rourkela,",
      area: "Sundergarh",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.7,
      address:
        "1st Flr, Adyawati Tower, Kachahri Chowk, No. 103, Police Line Rd, beside Hotel Nihar, Bhikhanpur, Bhagalpur, Bihar 812001",
      city: "Bhagalpur",
      area: "Bhikhanpur",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.5,
      address:
        "Shop No. 13/14, Urban Co-Operative Bank, Highway, opposite Classic Plaza, near Mehsana, Manglaytan Society, Mehsana, Gujarat 384002",
      city: "Mehsana",
      area: "Manglaytan Society",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.5,
      address:
        "1/4, 9th Division, No. 482, 4th Main Rd, near Ram & Co Circle, 5th Ward, Prince Jayachamaraja Wodeyar, Davanagere, Karnataka 577002",
      city: "Davanagere",
      area: "Prince Jayachamaraja Wodeyar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.5,
      address:
        "181/6, Ring Rd, near DTDC Courier, Awas Vikas, Rudrapur, Jagatpura, Uttarakhand 263153",
      city: "Rudrapur",
      area: "Jagatpura",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.5,
      address:
        "No 101, Shivani Heights, Police Headquarters Rd, near Raut Sweet Shop, Malhar Peth, Satara, Maharashtra 415001",
      city: "Satara",
      area: "Malhar Peth",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.2,
      address:
        "1st Floor CMD Chowk, Link Rd, opposite Jain Plaza, Bilaspur, Chhattisgarh 495001",
      city: "Bilaspur",
      area: "Link Rd",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.3,
      address:
        "Shop No 103, 1st Floor, Rishabh Corner, Plot No 93, Rabindranath Tagore Rd, Sector 8, Gandhidham, Gujarat 370201",
      city: "Gandhidham",
      area: "Rabindranath Tagore Rd",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.5,
      address:
        "301, Haridwar Rd, above Axis ATM, near Suresh chand Jain house, Civil Lines, Roorkee, Uttarakhand 247667",
      city: "Roorkee",
      area: "Civil Lines",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 5,
      address:
        "Gate no 3, Gorakhpur Road, near District Hospital, Murlijot, Manhandeeh, Basti, Uttar Pradesh 272002",
      city: "Basti",
      area: "Manhandeeh",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.5,
      address:
        "2nd Floor, AKS Towers Mini Bypass Road, Puthiyara Rd, opposite to TVS Showroom, Kozhikode, Kerala 673004",
      city: "Kozhikode",
      area: "Puthiyara Rd",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.6,
      address:
        "No. 319, Aitroma Centrum Building, Sakuntala Rd, Madhyapara, Dhaleswar, Agartala, Tripura 799001",
      city: "Agartala",
      area: "Dhaleswar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.7,
      address:
        "No. 106, Panaroma, Rameshwaram Building, Kali Mandir Marg, near Tanishq show room, Line Bazar, Purnia, Bihar 854301",
      city: "Purnia",
      area: "ff",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.8,
      address:
        "No 19, Basement, Panchsati Circle, Sardul Ganj, Bikaner, Rajasthan 334003",
      city: "Bikaner",
      area: "Sardul Ganj",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 5,
      address:
        "Third Floor, A.K Asian Grand, Station Rd, opp. KEB office, near V2 Prime mall, Shambhognlli, Kalaburagi, Karnataka 585102",
      city: "Kalaburagi",
      area: "Gulbarga",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.6,
      address:
        "ParvathiNagar Main Rd, opposite Durgamma Temple, KHB Colony, Bhagath Singh Nagar, Ballari, Karnataka 583103",
      city: "Ballari",
      area: "Bhagath Singh Nagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.6,
      address:
        "Shop No 89,90, NSCB arcade, Infront of Smart Bazar, Jail Rd, Telanga Bazar, Cuttack, Odisha 753001",
      city: "Cuttack",
      area: "Telanga Bazar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.7,
      address:
        "Above Firstcry.Com Near gate 2 Hanuman Temple, Wright Town, Circle, Ranital, Jabalpur, Madhya Pradesh 482002",
      city: "Jabalpur",
      area: "Wright Town",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.4,
      address:
        "1st Flr, Anand Plaza, Burnpur Rd, near Dolly Lodge, Rabindra Nagar, Asansol, West Bengal 713304",
      city: "Asansol",
      area: "Rabindra Nagar",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.3,
      address:
        "3rd A Rd, opposite Inder Mart, behind Inder Inn Hotel, Sardarpura, Jodhpur, Rajasthan 342003",
      city: "Jodhpur",
      area: "Sardarpura",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.8,
      address:
        "2nd Floor, opposite Koyili Hospital, Chettipedika, Kannur, Kerala 670002",
      city: "Kannur",
      area: "Chettipedika",
    },
    {
      name: "Dr Batra's Hair Clinic",
      rating: 4.3,
      address:
        "No 15, Dakshata Nagar Complex, Sindhi Camp Square, opp. Khadan Police Station, Sindhi Colony, Akola, Maharashtra 444001",
      city: "Akola",
      area: "Sindhi Colony",
    },
  ];

  // Load clinic data from embedded array
  function loadClinicData() {
    try {
      const searchInput = document.querySelector(".search-location input");
      const clinicsContainer = document.querySelector(".clinics-container");
      const paginationDots = document.querySelector(".clinics-pagination-dots");

      if (!clinicsContainer) return;

      // Clear any existing clinic cards and pagination dots
      clinicsContainer.innerHTML =
        '<div class="clinics-navigation"><button class="nav-btn prev"><i class="fas fa-chevron-left"></i></button><button class="nav-btn next"><i class="fas fa-chevron-right"></i></button></div>';
      if (paginationDots) paginationDots.innerHTML = "";

      // Use the embedded clinicsData array instead of fetching
      const clinics = clinicsData;

      if (!clinics || clinics.length === 0) {
        clinicsContainer.innerHTML +=
          '<div class="error-message">No clinic data available.</div>';
        return;
      }

      // Filter clinics based on search input
      const searchValue = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";
      const filteredClinics = searchValue
        ? clinics.filter((clinic) => {
            const nameMatch =
              clinic.name && clinic.name.toLowerCase().includes(searchValue);

            const cityMatch =
              clinic.city && clinic.city.toLowerCase().includes(searchValue);

            const areaMatch =
              clinic.area && clinic.area.toLowerCase().includes(searchValue);

            const addressMatch =
              clinic.address &&
              clinic.address.toLowerCase().includes(searchValue);
            return nameMatch || cityMatch || areaMatch || addressMatch;
          })
        : clinics;

      if (filteredClinics.length === 0) {
        clinicsContainer.innerHTML +=
          '<div class="error-message">No clinics found in this area. Please try another location.</div>';
        return;
      }

      // Create clinic cards
      filteredClinics.forEach((clinic, index) => {
        const card = document.createElement("div");
        card.className = "clinic-card";
        card.setAttribute("data-slide", Math.floor(index / 3) + 1);

        // Handle potential missing fields
        const area = clinic.area || "";

        card.innerHTML = `
                    <div class="clinic-header">
                        <h3>${clinic.name || "Dr Batra's Clinic"}</h3>
                        <div class="clinic-rating">
                            <i class="fas fa-star"></i>
                            <span>${clinic.rating || "4.5"}</span>
                        </div>
                    </div>
                    <p class="clinic-address">
                        <i class="fas fa-map-marker-alt"></i>
                        ${clinic.address || ""}${area ? ", " + area : ""}, ${
          clinic.city || ""
        }
                    </p>
                    <button class="book-consultation">Book Consultation</button>
                `;

        clinicsContainer.appendChild(card);
      });

      
      const bookButtons = document.querySelectorAll(".book-consultation");
      bookButtons.forEach((button) => {
        button.addEventListener("click", function () {
          // Scroll to appointment section
          const appointmentSection = document.querySelector(
            ".appointment-section"
          );
          if (appointmentSection) {
            appointmentSection.scrollIntoView({ behavior: "smooth" });

            // Optional: highlight the appointment section briefly
            appointmentSection.classList.add("highlight-section");
            setTimeout(() => {
              appointmentSection.classList.remove("highlight-section");
            }, 1500);
          }
        });
      });

      // Generate pagination dots for mobile view
      const totalSlides = Math.ceil(filteredClinics.length / 3);
      if (paginationDots) {
        for (let i = 1; i <= totalSlides; i++) {
          const dot = document.createElement("span");
          dot.className = "dot" + (i === 1 ? " active" : "");
          dot.setAttribute("data-slide", i);
          paginationDots.appendChild(dot);
        }
      }

      // Function to display clinics for the current slide
      function showClinics(index) {
        const clinicCards = document.querySelectorAll(".clinic-card");
        const dots = document.querySelectorAll(".clinics-pagination-dots .dot");

        // Check screen size
        const isMobileOrSmallTablet = window.innerWidth <= 768;
        const isLargeTablet =
          window.innerWidth > 768 && window.innerWidth <= 992;

        // Hide all clinic cards first
        clinicCards.forEach((card) => {
          card.style.display = "none";
        });

        if (isMobileOrSmallTablet) {
          
          const cardsPerSlide = 1;
          const startIndex = index;
          const cardToShow = clinicCards[startIndex];

          if (cardToShow) {
            cardToShow.style.display = "block";
          }

          // Update pagination dots based on individual cards
          if (dots.length > 0) {
            const totalPages = clinicCards.length;
         
            const dotsContainer = document.querySelector(
              ".clinics-pagination-dots"
            );
            if (dotsContainer) {
              dotsContainer.innerHTML = "";

              // Create new dots based on number of cards
              for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement("span");
                dot.className = "dot" + (i === index ? " active" : "");
                dot.setAttribute("data-index", i);
                dotsContainer.appendChild(dot);

                // Add click event to the new dot
                dot.addEventListener("click", () => {
                  currentClinicIndex = i;
                  showClinics(currentClinicIndex);
                });
              }
            }
          }
        } else if (isLargeTablet) {
         
          const cardsPerSlide = 2;
          const startIndex = index * cardsPerSlide;

          // Show the pair of cards for the current index
          for (let i = 0; i < cardsPerSlide; i++) {
            const cardIndex = startIndex + i;
            if (cardIndex < clinicCards.length) {
              clinicCards[cardIndex].style.display = "inline-flex";
            }
          }

          // Update pagination dots based on pairs of cards
          if (dots.length > 0) {
            const totalPages = Math.ceil(clinicCards.length / cardsPerSlide);
          
            const dotsContainer = document.querySelector(
              ".clinics-pagination-dots"
            );
            if (dotsContainer) {
              dotsContainer.innerHTML = "";

              // Create new dots based on number of pairs
              for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement("span");
                dot.className = "dot" + (i === index ? " active" : "");
                dot.setAttribute("data-index", i);
                dotsContainer.appendChild(dot);

               
                dot.addEventListener("click", () => {
                  currentClinicIndex = i;
                  showClinics(currentClinicIndex);
                });
              }
            }
          }
        } else {
          // On desktop, show three cards side by side
          const cardsPerSlide = 3;
          const startIndex = index * cardsPerSlide;

          // Calculate which slide to show
          for (let i = 0; i < cardsPerSlide; i++) {
            const cardIndex = startIndex + i;
            if (cardIndex < clinicCards.length) {
              clinicCards[cardIndex].style.display = "block";
            }
          }

          // Update pagination dots
          if (dots.length > 0) {
            const totalPages = Math.ceil(clinicCards.length / cardsPerSlide);
            // Remove existing dots
            const dotsContainer = document.querySelector(
              ".clinics-pagination-dots"
            );
            if (dotsContainer) {
              dotsContainer.innerHTML = "";

              // Create new dots
              for (let i = 0; i < totalPages; i++) {
                const dot = document.createElement("span");
                dot.className = "dot" + (i === index ? " active" : "");
                dot.setAttribute("data-index", i);
                dotsContainer.appendChild(dot);

                // Add click event
                dot.addEventListener("click", () => {
                  currentClinicIndex = i;
                  showClinics(currentClinicIndex);
                });
              }
            }
          }
        }
      }

      // Show the first slide by default
      let currentClinicIndex = 0;
      showClinics(currentClinicIndex);

      // Navigation function for clinic cards
      function moveClinicSlide(direction) {
        const dots = document.querySelectorAll(".clinics-pagination-dots .dot");
        const totalSlides = dots.length;

        if (direction === "next") {
          currentClinicIndex = (currentClinicIndex + 1) % totalSlides;
        } else {
          currentClinicIndex =
            (currentClinicIndex - 1 + totalSlides) % totalSlides;
        }

        showClinics(currentClinicIndex);
      }

      // Re-attach event listeners for the clinic navigation
      const clinicPrevBtn = document.querySelector(".clinics-navigation .prev");
      const clinicNextBtn = document.querySelector(".clinics-navigation .next");
      const clinicDots = document.querySelectorAll(
        ".clinics-pagination-dots .dot"
      );

      if (clinicPrevBtn && clinicNextBtn) {
        clinicPrevBtn.addEventListener("click", () => {
          moveClinicSlide("prev");
        });

        clinicNextBtn.addEventListener("click", () => {
          moveClinicSlide("next");
        });
      }

      // Handle dot clicks on mobile
      clinicDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          currentClinicIndex = index;
          showClinics(currentClinicIndex);

          // Update active dot
          clinicDots.forEach((d) => d.classList.remove("active"));
          dot.classList.add("active");
        });
      });

      // Add swipe detection for clinics
      if (clinicsContainer) {
        addSwipeDetection(
          clinicsContainer,
          () => moveClinicSlide("next"),
          () => moveClinicSlide("prev")
        );
      }
    } catch (error) {
      console.error("Error loading clinic data:", error);
      const clinicsContainer = document.querySelector(".clinics-container");
      if (clinicsContainer) {
        clinicsContainer.innerHTML +=
          '<div class="error-message">Unable to load clinic data. Please try again later.</div>';
      }
    }
  }

  // Load clinic data
  loadClinicData();

  // Add search functionality
  const searchInput = document.querySelector(".search-location input");
  const headerSearchInput = document.querySelector("header .search input");
  const headerSearchButton = document.querySelector("header .search button");

  if (searchInput) {
    searchInput.addEventListener("input", debounce(loadClinicData, 500));
  }

  // Connect header search to clinic search
  if (headerSearchInput && searchInput) {
    headerSearchInput.addEventListener("input", function () {
      
      searchInput.value = headerSearchInput.value;
     
      loadClinicData();
    });

    // Handle search button click
    if (headerSearchButton) {
      headerSearchButton.addEventListener("click", function (e) {
        e.preventDefault();
        
        searchInput.value = headerSearchInput.value;
     
        loadClinicData();

        
        const clinicSection = document.querySelector(".clinic-near-section");
        if (clinicSection) {
          clinicSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    }
  }

  
  function debounce(func, delay) {
    let timeout;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(context, args), delay);
    };
  }

  // Science Section Tabs
  const scienceTabs = document.querySelectorAll(".science-section .tab");
  const scienceContents = document.querySelectorAll(
    ".science-section .treatment-content"
  );
  const scienceContainer = document.querySelector(
    ".science-section .treatment-tabs"
  );

  function moveTab(direction) {
    const tabs = document.querySelectorAll(".science-section .tab");
    const activeTabIndex = Array.from(tabs).findIndex((tab) =>
      tab.classList.contains("active")
    );

    let nextIndex;
    if (direction === "next") {
      nextIndex = (activeTabIndex + 1) % tabs.length;
    } else {
      nextIndex = (activeTabIndex - 1 + tabs.length) % tabs.length;
    }

    // Trigger click on the next/prev tab
    tabs[nextIndex].click();
  }

  scienceTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetTab = tab.getAttribute("data-tab");

      // Update active tab
      scienceTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      // Show/hide content based on tab
      scienceContents.forEach((content) => {
        if (content.id === targetTab) {
          content.classList.add("active");
          content.style.display = "block"; // Ensure content is visible
          
          // If this is the works tab, handle approach cards
          if (targetTab === "works") {
            if (window.innerWidth <= 768) {
              // On mobile, show only first 2 cards
              const approachCards = content.querySelectorAll(".treatment-approach-card");
              approachCards.forEach((card, index) => {
                card.style.display = index < 2 ? "flex" : "none";
              });
              
              // Reset pagination to first page
              currentApproachCardIndex = 0;
              
              // Make first dot active
              const dots = document.querySelectorAll('.science-pagination-dots .dot');
              if (dots.length > 0) {
                dots.forEach((dot, index) => {
                  dot.classList.toggle('active', index === 0);
                });
              }
            } else {
              // On desktop, show all cards
              const approachCards = content.querySelectorAll(".treatment-approach-card");
              approachCards.forEach(card => {
                card.style.display = "flex";
              });
            }
          }
        } else {
          content.classList.remove("active");
          content.style.display = "none";
        }
      });
    });
  });

  // Add swipe detection for science tabs
  if (scienceContainer) {
    addSwipeDetection(
      scienceContainer,
      () => moveTab("next"),
      () => moveTab("prev")
    );
  }

  // Initialize the first tab content as visible
  if (scienceContents.length > 0 && scienceTabs.length > 0) {
    const initialTab = document
      .querySelector(".science-section .tab.active")
      .getAttribute("data-tab");
    const initialContent = document.getElementById(initialTab);
    if (initialContent) {
      initialContent.classList.add("active");
      initialContent.style.display = "block";
      
      // Handle approach cards in the initial tab
      if (initialTab === "works") {
        if (window.innerWidth <= 768) {
          // On mobile, show only first 2 cards
          const approachCards = initialContent.querySelectorAll(".treatment-approach-card");
          approachCards.forEach((card, index) => {
            card.style.display = index < 2 ? "flex" : "none";
          });
          
          // Make first dot active
          const dots = document.querySelectorAll('.science-pagination-dots .dot');
          if (dots.length > 0) {
            dots.forEach((dot, index) => {
              dot.classList.toggle('active', index === 0);
            });
          }
        } else {
          // On desktop, show all cards
          const approachCards = initialContent.querySelectorAll(".treatment-approach-card");
          approachCards.forEach(card => {
            card.style.display = "flex";
          });
        }
      }
    }
  }

  function handleSwipe() {
      if (window.innerWidth <= 768) {
          const items = document.querySelectorAll(`.treatment-item[data-page="${activeTab}"]`);
          const totalPages = Math.ceil(items.length / itemsPerPage);
          
          if (touchEndX < touchStartX - 50) {
              if (currentPage < totalPages) {
                  currentPage++;
                  showItemsForPage(activeTab, currentPage);
                  
                  document.querySelectorAll('.treatment-pagination-dots .dot').forEach(dot => {
                      dot.classList.remove('active');
                  });
                  document.querySelector(`.treatment-pagination-dots .dot[data-index="${currentPage}"]`).classList.add('active');
              }
          }
          
          if (touchEndX > touchStartX + 50) {
              if (currentPage > 1) {
                  currentPage--;
                  showItemsForPage(activeTab, currentPage);
                  
                  document.querySelectorAll('.treatment-pagination-dots .dot').forEach(dot => {
                      dot.classList.remove('active');
                  });
                  document.querySelector(`.treatment-pagination-dots .dot[data-index="${currentPage}"]`).classList.add('active');
              }
          }
      }
  }

  window.addEventListener('resize', function() {
      if (window.innerWidth <= 768) {
          showItemsForPage(activeTab, currentPage);
          createPaginationDots();
      } else {
          showItemsForPage(activeTab, currentPage);
      }
  });

  // Video handlers for testimonial and doctor cards
  (function() {
    window.addEventListener('load', function() {
      const modal = document.getElementById("videoModal");
      const iframe = document.getElementById("videoFrame");
      const closeBtn = document.querySelector(".close-modal");
      const overlay = document.querySelector(".modal-overlay");
      let originalScrollPosition = 0;
      
      const videoSources = {
        "Dr. Akshay": "https://www.youtube.com/embed/qeHgy0DDo54?list=PLscnnGA-0R1FbPLXUGc5HZNF3gUDBwqx_",
        "Joncy Mehak": "https://www.youtube.com/embed/DYJ3guK-Exo",
        "Nikita Chhatriya": "https://www.youtube.com/embed/yP2EFXaP0mw",
        "Shailesh Kumar": "https://www.youtube.com/embed/I4OMw8kgPhs",
        "Tanisha Dhamala": "https://www.youtube.com/embed/kxgI8JQGNro"
      };
      
      function showVideoAndSaveScroll(videoSrc) {
        originalScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        iframe.src = videoSrc;
        
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingRight = scrollbarWidth + "px";
        document.body.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${originalScrollPosition}px`;
        document.body.style.width = "100%";
        
        modal.style.display = "block";
      }
      
      function hideVideoAndRestoreScroll() {
        const scrollY = parseInt(document.body.style.top || '0') * -1;
        modal.style.display = "none";
        iframe.src = "";
        
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.paddingRight = "";
        document.body.style.width = "";
        
        setTimeout(function() {
          window.scrollTo({
            top: scrollY,
            behavior: "auto"
          });
        }, 10);
      }
      
      if (closeBtn) {
        closeBtn.addEventListener("click", function(e) {
          e.stopPropagation();
          hideVideoAndRestoreScroll();
        });
      }
      
      if (overlay) {
        overlay.addEventListener("click", function(e) {
          e.stopPropagation();
          hideVideoAndRestoreScroll();
        });
      }
      
      document.addEventListener("keydown", function(e) {
        if (e.key === "Escape" && modal.style.display === "block") {
          hideVideoAndRestoreScroll();
        }
      });
      
      document.querySelectorAll(".testimonial-card, .doctor-card").forEach(function(card) {
        const name = card.querySelector("h3")?.textContent.trim();
        const videoSrc = videoSources[name];
        
        if (videoSrc) {
          card.style.cursor = "pointer";
          card.addEventListener("click", function(e) {
            e.preventDefault();
            showVideoAndSaveScroll(videoSrc);
          });
        }
      });
      
      const dots = document.querySelectorAll(".testimonials-section .pagination-dots .dot");
      const cards = document.querySelectorAll(".testimonial-card");
      
      function showSlide(slideNumber) {
        dots.forEach(dot => {
          dot.classList.toggle("active", dot.getAttribute("data-slide") === slideNumber);
        });
        
        cards.forEach(card => {
          card.style.display = card.getAttribute("data-slide") === slideNumber ? "block" : "none";
        });
      }
      
      dots.forEach(dot => {
        const slideNumber = dot.getAttribute("data-slide");
        dot.addEventListener("click", () => showSlide(slideNumber));
      });
    });
  })();

  function showItemsForPage(tabNumber, pageNumber) {
    document.querySelectorAll('.treatment-item').forEach(item => {
      item.style.display = 'none';
    });
    
    // Show all items for the selected tab regardless of page number
    document.querySelectorAll(`.treatment-item[data-page="${tabNumber}"]`).forEach(item => {
      item.style.display = 'flex';
    });
  }


  if (toggleBtns && toggleBtns.length > 0) {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        toggleBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        
        const isHairTypes = this.textContent.trim().includes('hair fall');
        const activeTab = isHairTypes ? 1 : 2;
        
      
        showItemsForPage(activeTab, 1);
      });
    });
  }

  // Initialize treatment items display
  document.addEventListener("DOMContentLoaded", function() {
    // Show all treatment items for the initial active tab (data-page="1")
    document.querySelectorAll('.treatment-item[data-page="1"]').forEach(item => {
      item.style.display = 'flex';
    });
    
    // Hide treatment items for other tabs
    document.querySelectorAll('.treatment-item:not([data-page="1"])').forEach(item => {
      item.style.display = 'none';
    });
    
    // For treatment approach cards, show only 2 on mobile and all on desktop
    if (window.innerWidth <= 768) {
      // On mobile, show only the first 2 cards
      document.querySelectorAll('.treatment-approach-card').forEach((card, index) => {
        if (index < 2) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    } else {
      // On desktop, show all cards
      document.querySelectorAll('.treatment-approach-card').forEach(card => {
        card.style.display = 'flex';
      });
    }
  });


//Hamburger Menu toggle
  function toggleMobileNav() {
    var nav = document.getElementById('mobileNav');
    if (nav.classList.contains('show')) {
        nav.classList.remove('show');
    } else {
        nav.classList.add('show');
    }
}

// Close 
document.addEventListener('DOMContentLoaded', function() {
    var links = document.querySelectorAll('#mobileNav a');
    links.forEach(function(link) {
        link.addEventListener('click', function() {
            document.getElementById('mobileNav').classList.remove('show');
        });
    });
});