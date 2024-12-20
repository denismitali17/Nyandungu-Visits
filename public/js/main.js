(function ($) {
  "use strict";

  // Dropdown on mouse hover
  $(document).ready(function () {
    function toggleNavbarMethod() {
      if ($(window).width() > 992) {
        $(".navbar .dropdown")
          .on("mouseover", function () {
            $(".dropdown-toggle", this).trigger("click");
          })
          .on("mouseout", function () {
            $(".dropdown-toggle", this).trigger("click").blur();
          });
      } else {
        $(".navbar .dropdown").off("mouseover").off("mouseout");
      }
    }
    toggleNavbarMethod();
    $(window).resize(toggleNavbarMethod);
  });

  
  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Date and time picker
  $(".date").datetimepicker({
    format: "L",
  });
  $(".time").datetimepicker({
    format: "LT",
  });

  // Testimonials carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    margin: 30,
    dots: true,
    loop: true,
    center: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 2,
      },
      992: {
        items: 3,
      },
    },
  });
})(jQuery);

// public/js/main.js
$(document).ready(function () {
  $(".booking-form").on("submit", function (e) {
    e.preventDefault();

    // Gather form data
    const bookingData = {
      name: $("#name").val(),
      email: $("#email").val(),
      visitDate: $("#visit-date").val(),
      ticketType: $("#ticket-type").val(),
      timeSlot: $("#time-slot").val(),
    };

    // Send data to server via AJAX
    $.ajax({
      url: "/booking/submit",
      type: "POST",
      data: bookingData,
      success: function (response) {
        // Set the response message in the modal
        $("#responseModal .modal-body").text(response);

        // Show the modal
        $("#responseModal").modal("show");

        // Clear the form fields after a short delay
        $("#responseModal").on("hidden.bs.modal", function () {
          $(".booking-form")[0].reset(); // Resets the form fields
        });
      },
      error: function (error) {
        // Set the error message in the modal
        $("#responseModal .modal-body").text("There was an error with your booking. Please try again.");

        // Show the modal
        $("#responseModal").modal("show");
      },
    });
  });

  // Initialize date picker
  $("#visit-date").datepicker({
    dateFormat: "yy-mm-dd",
  });
});
