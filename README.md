# Mail App

A simple Django web application inspired by a basic email client. Users can register, log in, compose messages, view their inbox, sent mail, and archived mail.

## Features

- User registration and authentication
- Login/logout flow
- Compose and send emails
- View inbox, sent mail, and archive
- Mark messages as read or archived
- SQLite database backend

## Tech Stack

- Python
- Django
- SQLite
- HTML/CSS/JavaScript

## Project Structure

```text
mail/
    __init__.py
    admin.py
    apps.py
    models.py
    tests.py
    urls.py
    views.py
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
project3/
    __init__.py
    asgi.py
    settings.py
    urls.py
    wsgi.py
manage.py
db.sqlite3
README.md
```

## Prerequisites

- Python 3.10+
- pip

## Setup

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

4. Apply database migrations:

```bash
python manage.py migrate
```

5. Run the development server:

```bash
python manage.py runserver 0.0.0.0:8000
```

6. Open the app in a browser:

```text
http://localhost:8000
```

## Default Admin / App Flow

- New users can register from the registration page.
- Logged-in users are redirected to the inbox.
- Messages can be sent to existing users by email address.
- The app uses a custom user model based on Django's `AbstractUser`.

## Notes

- The project is configured for local development and uses SQLite.
- CSRF trusted origins are included for localhost development in [project3/settings.py](project3/settings.py).

## License

This project is intended for educational/demo use.
