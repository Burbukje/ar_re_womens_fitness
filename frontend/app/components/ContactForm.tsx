"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactForm() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const t = useTranslations("contact-form");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

      const response = await fetch(`${apiUrl}/api/contact/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(
          t("success_message") ||
            "Thank you! Your message has been sent successfully."
        );
        setFormData(initialState);
      } else {
        setStatus(
          data.error ||
            t("error_message") ||
            "There was a problem sending your message."
        );
      }
    } catch (error) {
      setStatus(
        t("error_message") ||
          "There was a problem sending your message. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <label className="field-label">
        {t("name_label")}
        <input
          type="text"
          placeholder={t("name_placeholder")}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </label>

      <label className="field-label">
        {t("email_label")}
        <input
          type="email"
          placeholder={t("email_placeholder")}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </label>

      <label className="field-label">
        {t("subject_label")}
        <input
          type="text"
          placeholder={t("subject_placeholder")}
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          required
        />
      </label>

      <label className="field-label">
        {t("message_label")}
        <textarea
          placeholder={t("message_placeholder")}
          rows={6}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          required
        />
      </label>

      <button className="button" type="submit" disabled={loading}>
        {loading ? t("sending") : t("send_button")}
      </button>

      {status && (
        <p
          className={`status ${
            status.includes("Thank you") ? "success" : "error"
          }`}
        >
          {status}
        </p>
      )}
    </form>
  );
}
