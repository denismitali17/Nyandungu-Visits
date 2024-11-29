# Nyandungu Visits

Nyandungu Visits is the official website for Nyandungu Eco-Park, Rwanda’s first restored wetland park. This project is designed to provide an engaging and user-friendly platform for visitors to explore the park's features, book visits, and learn about its conservation mission. The website is responsive, secure, and packed with modern features to ensure a seamless user experience.

---

## **Project Overview**
- **Purpose**: To promote eco-tourism and conservation efforts by providing a digital platform for Nyandungu Eco-Park.
- **Target Audience**: Local and international visitors, students, conservationists, and eco-tourism enthusiasts.
- **Goals**:
  1. Increase online bookings and visitor engagement.
  2. Educate visitors about the park’s mission and environmental impact.
  3. Provide an administrative portal for park management.

---

## **Features and Functionalities**

### **1. Homepage**
- **Welcome Section**: A visually engaging hero banner with an introduction to the park.
- **Call-to-Action Buttons**: Easy navigation to important sections like bookings and events.
- **Responsive Design**: Adapts seamlessly to mobile, tablet, and desktop screens.

### **2. Booking System**
- **Booking Form**: Allows visitors to book tickets by entering their name, email, visit date, ticket type, and time slot.
- **Date Picker**: Integrated calendar for selecting visit dates.
- **Time Slot Selection**: Dropdown for choosing available time slots.
- **Confirmation Popup**: Displays a "Booking Successful!" message with a tick and an OK button upon successful submission.

### **3. Admin Dashboard**
- **Login Portal**: Secure admin login for managing bookings.
- **Bookings Table**: Displays a list of all bookings with details like name, email, visit date, ticket type, and time slot.
- **Search and Filter**: Helps administrators sort and find specific bookings.

### **4. Newsletter Subscription**
- Visitors can subscribe to receive updates and news about events and conservation efforts.
- Automated welcome emails sent upon subscription.

### **5. Educational Content**
- Information about the park’s history, mission, and environmental impact.
- Interactive content for users to learn about local biodiversity and sustainability.

### **6. Payment Integration (Future Feature)**
- Plan to integrate a payment system (e.g., Stripe or PayPal) for ticket purchases.

### **7. Security Features**
- **Multi-Factor Authentication (MFA)**: Adds an extra layer of protection to admin login.
- **Middleware Security**: Protection against common vulnerabilities like XSS, CSRF, and brute-force attacks.
- **Rate Limiting**: Restricts excessive requests to safeguard against potential DDoS attacks.

---

## **Technologies Used**
### **Frontend**
- **HTML5, CSS3, JavaScript**: For responsive and interactive user interfaces.
- **Bootstrap 4**: To leverage the grid system and styling utilities.
- **EJS (Embedded JavaScript)**: For dynamic content rendering.

### **Backend**
- **Node.js with Express.js**: Handles server-side logic and API development.
- **SQLite**: Lightweight database for storing user and booking information.

### **Libraries and Tools**
- **SweetAlert2**: For elegant popup messages and alerts.
- **Moment.js**: For date manipulation and formatting.
- **Tempus Dominus**: For integrating date and time pickers.
- **Helmet.js**: Enhances app security by setting HTTP headers.
- **Nodemailer**: Sends automated booking and subscription confirmation emails.

### **Development Tools**
- **Visual Studio Code**: Code editor.
- **Postman**: For API testing.
- **Jira**: For task management and progress tracking.
- **Heroku**: For hosting the site

---

## **How to Run the Project**
### **Prerequisites**
- Install [Node.js](https://nodejs.org/).
- Install npm packages:
  ```bash
  npm install

## **Run Locally**

1. **Clone the repository**:
    ```bash
    git clone https://github.com/username/nyandungu-visits.git
    ```

2. **Navigate to the project directory**:
    ```bash
    cd nyandungu-Visits
    ```

3. **Start the server**:
    ```bash
    npm start
    ```

4. **Open the application in your browser** at:
    ```
    https://nyandungu-visits-7e004931aa57.herokuapp.com/
    ```

---

## **Challenges and Solutions**

### **1. Responsive Design**
- **Challenge**: Aligning elements across various screen sizes.
- **Solution**: Used Bootstrap’s grid system and media queries to ensure a seamless design.

### **2. Security Concerns**
- **Challenge**: Protecting sensitive user data and admin access.
- **Solution**: Implemented multi-factor authentication, rate limiting, and middleware for security.

### **3. Integration of Date Picker**
- **Challenge**: Ensuring compatibility with the booking form.
- **Solution**: Integrated Tempus Dominus with jQuery for consistent performance.

---

## **Impact on Client’s Business**
- **Increased Visitor Engagement**: Streamlined booking system encourages more visits.
- **Operational Efficiency**: Admin dashboard simplifies booking management.
- **Enhanced Awareness**: The website promotes Nyandungu Eco-Park’s mission and environmental efforts effectively.

---


| **Contributor**                | **Role**                   | **Contribution**                                                        |
|--------------------------------|----------------------------|--------------------------------------------------------------------------|
| Denis Mitali | Project Manager & Frontend Developer | Managed the overall project and created the website's UI using Bootstrap and custom CSS. |
|      David James Arua   | Backend Developer       | Developed server-side logic using Node.js, handled API routes, and integrated SQLite for data storage. |
| Reine Mizero | UI/UX Designer                 | Designed intuitive layouts, wireframes, and user flows for a seamless user experience. |
| Fidele Ndihokubwayo        | Frontend Developer | Optimized the website for various devices and added JavaScript functionality for user engagement. |
| Nsenga Cosmas Nigel          | Backend Developer  | Set up a secure database like the Admin Dashboard for storing user information and booking details. |
| Nyabon Deng Adut            | QA Tester | Conducted manual and automated testing, reported bugs, and verified fixes to ensure the application works as intended. |


---

## **Future Improvements**
- Implement a payment gateway for online ticket purchases.
- Add multilingual support to cater to a global audience.
- Enhance educational content with videos and interactive graphics.

---

## **Contact**
For inquiries or feedback, reach out to us at **d.mitali1@alustudent.com**.



