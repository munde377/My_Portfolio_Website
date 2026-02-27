from flask import (
    Flask,
    render_template,
    request,
    redirect,
    send_from_directory,
    url_for,
)
import sqlite3
import os

app = Flask(__name__)

# ================= CONFIG =================
DATABASE = "database.db"


# ================= DOWNLOAD RESUME =================
@app.route("/download-resume")
def download_resume():
    return send_from_directory(
        directory="static", path="resume.pdf", as_attachment=True
    )


# ================= DATABASE FUNCTION =================
def save_message(name, email, message):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()

    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS contacts(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL
        )
    """
    )

    cursor.execute(
        "INSERT INTO contacts(name, email, message) VALUES (?, ?, ?)",
        (name, email, message),
    )

    conn.commit()
    conn.close()


# ================= HOME =================
@app.route("/")
def home():
    return render_template("index.html")


# ================= CONTACT FORM =================
@app.route("/contact", methods=["POST"])
def contact():
    name = request.form.get("name")
    email = request.form.get("email")
    message = request.form.get("message")

    if name and email and message:
        save_message(name, email, message)

    return redirect(url_for("home"))


# ================= RUN APP =================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)
