# Mail App

A Django web application that mimics a lightweight email client. Users can create an account, sign in with their email address, compose messages, and manage mail across their inbox, sent mail, and archive.

This project is structured as a small full-stack web app with a custom user model, a message model, and an AJAX-driven front end for browsing mail without full-page reloads.

## Features

- User registration and login/logout flow
- Email-based authentication using the user’s email as the username
- Compose and send messages to existing users
- View inbox, sent mail, and archived mail
- Mark messages as read and archive/unarchive them
- SQLite-backed storage for local development
- Single-page mailbox UI built with HTML, CSS, and JavaScript

## Tech Stack

- Python
- Django
- SQLite
- HTML
- CSS
- JavaScript

## Project Structure

```text
mail/
    __init__.py
    admin.py
    apps.py
    migrations/
    models.py
    static/
        mail/
            inbox.js
            style.css
            images/
    templates/
        mail/
            inbox.html
            layout.html
            login.html
            register.html
    tests.py
    urls.py
    views.py
project3/
    __init__.py
    asgi.py
    settings.py
    urls.py
    wsgi.py
manage.py
db.sqlite3
README.md
requirements.txt
```

## Main App Behavior

### Authentication

- Users register using an email address and password.
- The app uses a custom `User` model that inherits from Django’s `AbstractUser`.
- Login works by authenticating with the email field and password.

### Email Model

The `Email` model stores:

- sender
- recipients
- subject
- body
- timestamp
- read status
- archive status

### Routes

The app exposes these URLs via the app-level routes:

- `/` → inbox landing page or redirect to login
- `/login` → sign in page
- `/logout` → sign out
- `/register` → registration page
- `/emails` → compose a new email
- `/emails/<int:email_id>` → fetch or update a single message
- `/emails/<mailbox>` → fetch mailbox content (`inbox`, `sent`, or `archive`)

## Local Setup

### Prerequisites

- Python 3.10+
- pip
- Django

### Installation

1. Open a terminal in the project root.
2. Create and activate a virtual environment:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

3. Install Django:

```bash
pip install django
```

4. Apply migrations:

```bash
python manage.py migrate
```

5. Start the development server:

```bash
python manage.py runserver 0.0.0.0:8000
```

6. Open the app in a browser:

```text
http://localhost:8000
```

## User Flow

1. Visit the home page.
2. Register a new account or sign in.
3. Once authenticated, the user is taken to the mailbox UI.
4. Use the Compose button to send a new email to another registered user.
5. Switch between Inbox, Sent, and Archived views to manage messages.
6. Click an email row to open its details and update the read/archive state.

## Notes

- The project is designed for local development and uses SQLite.
- Django settings include localhost and loopback origins in `CSRF_TRUSTED_ORIGINS` for browser requests during local testing.
- This app follows the structure of a simple CS50-style Mail assignment but is implemented as a real Django project.

## License

This project is intended for educational and demo use.
