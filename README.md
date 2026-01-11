# 🎯 Sagar Upadhyaya - Portfolio Website

A modern, responsive portfolio website showcasing my work as a Data Analyst and Python Developer. Built with Flask, featuring a functional contact form with email notifications.

![Portfolio Preview](https://img.shields.io/badge/Status-Active-success)
![Flask](https://img.shields.io/badge/Flask-3.0.0-blue)
![Python](https://img.shields.io/badge/Python-3.7+-green)

## ✨ Features

- 🎨 **Modern Responsive Design** - Works seamlessly on all devices
- 📧 **Working Contact Form** - Email notifications sent to Gmail
- 🎭 **Smooth Animations** - ScrollReveal integration
- 📱 **Mobile Navigation** - Hamburger menu for mobile devices
- 💼 **Project Showcase** - Featured projects with descriptions
- 📄 **CV Download** - Direct download of resume
- 🔗 **Social Media Links** - Connected to all platforms
- ⚡ **Fast Loading** - Optimized assets and code

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3 (Custom + Responsive)
- JavaScript (Vanilla)
- ScrollReveal.js
- Font Awesome Icons
- Boxicons
- Google Fonts (Rubik)

### Backend
- Python 3.7+
- Flask 3.0.0
- Flask-CORS
- SMTP (Email handling)
- Python-dotenv

## 📁 Project Structure

```
portfolio/
│
├── app.py                      # Flask application
├── requirements.txt            # Python dependencies
├── .env                        # Environment variables (not in repo)
├── .gitignore
├── README.md
│
├── static/
│   ├── styles.css              # Main stylesheet
│   ├── script.js               # JavaScript functionality
│   ├── Sagar_Upadhyaya_CV.pdf  # Resume
│   └── images/
│       ├── sagar.png
│       ├── sagar2.JPG
│       ├── work1.jpg
│       ├── work2.jpg
│       ├── work3.jpg
│       └── work4.jpg
│
└── templates/
    └── index.html              # Main HTML template
```

## 🚀 Quick Start

### Prerequisites
- Python 3.7 or higher
- Gmail account with App Password enabled

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Sagarckr/portfolio.git
cd portfolio
```

2. **Create virtual environment** (optional but recommended)
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment variables**
Create a `.env` file in the root directory:
```env
SENDER_EMAIL=your-email@gmail.com
SENDER_PASSWORD=your-16-character-app-password
```

5. **Run the application**
```bash
python app.py
```

6. **Open browser**
Navigate to: `http://localhost:5000`

## 📧 Email Configuration

### Getting Gmail App Password

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Go to App Passwords
4. Select Mail → Other (Custom name)
5. Generate password
6. Copy and paste in `.env` file

## 🎨 Customization

### Update Personal Information
Edit `templates/index.html`:
- Name and title
- About section
- Skills and experience
- Contact information
- Social media links

### Change Color Scheme
Edit `static/styles.css`:
```css
:root {
    --bg-color: #1f1f21;
    --text-color: #fff;
    --main-color: #ffae00;  /* Primary color */
}
```

### Add New Projects
Add to the portfolio section in `templates/index.html`:
```html
<div class="work">
    <img src="{{ url_for('static', filename='images/project.jpg') }}">
    <div class="layer">
        <h3>Project Name</h3>
        <p>Description</p>
        <a href="link"><i class="fa-solid fa-up-right-from-square"></i></a>
    </div>
</div>
```

## 🌐 Deployment

### Deploy to PythonAnywhere (Free)
1. Upload files to PythonAnywhere
2. Set environment variables in Web tab
3. Configure WSGI file
4. Reload application

### Deploy to Render
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### Deploy to Heroku
```bash
heroku create portfolio-name
heroku config:set SENDER_EMAIL=your-email
heroku config:set SENDER_PASSWORD=your-password
git push heroku main
```

## 📊 Sections

1. **Home** - Introduction and profile
2. **About** - Background, skills, experience, education, awards
3. **Services** - What I offer (Data Analysis, ML, Web Dev, etc.)
4. **Portfolio** - Featured projects with links
5. **Contact** - Working contact form

## 🔒 Security

- Environment variables for sensitive data
- CORS configured for security
- Input validation on forms
- HTTPS ready for production
- `.env` file in `.gitignore`

## 🐛 Troubleshooting

### Email not sending?
- Check `.env` file configuration
- Verify Gmail App Password is correct
- Ensure 2-Step Verification is enabled
- Check Flask console for errors

### Images not loading?
- Verify images are in `static/images/`
- Check file names match exactly (case-sensitive)
- Clear browser cache

### CSS not applying?
- Hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Check console for 404 errors

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Sagar Upadhyaya**
- Email: sagarsharma9821315721@gmail.com
- Phone: +977 9849956588
- Location: Sitapaila, Kathmandu, Nepal
- LinkedIn: [sagarckr](https://linkedin.com/in/sagarckr)
- GitHub: [Sagarckr](https://github.com/Sagarckr)

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- ScrollReveal.js for animations
- Boxicons for social media icons

## 📈 Future Enhancements

- [ ] Add blog section
- [ ] Integrate Google Analytics
- [ ] Add project filtering
- [ ] Dark/Light mode toggle
- [ ] Multi-language support
- [ ] Admin dashboard for content management

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ by Sagar Upadhyaya