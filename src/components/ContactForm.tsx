import React, { useState } from 'react';
import { Mail, User, MessageSquare, Send, Check, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const inputClasses = (fieldName: keyof FormData) => `
    w-full px-4 py-3 pl-12 rounded-xl border-2 transition-all duration-300 
    ${errors[fieldName] 
      ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
      : focusedField === fieldName
        ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
        : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800'
    }
    text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
    focus:outline-none focus:border-blue-500 dark:focus:border-blue-400
    hover:border-gray-300 dark:hover:border-gray-500
  `;

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center animate-scale-up">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Message Sent Successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Thank you for reaching out. We'll get back to you soon.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Have a question or want to work together? We'd love to hear from you.
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-6 animate-slide-in-up">
          {/* Name Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <User className={`w-5 h-5 transition-colors duration-300 ${
                errors.name 
                  ? 'text-red-500' 
                  : focusedField === 'name' 
                    ? 'text-blue-500' 
                    : 'text-gray-400'
              }`} />
            </div>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              placeholder="Your Name"
              className={inputClasses('name')}
            />
            {errors.name && (
              <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm animate-slide-in-up">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.name}
              </div>
            )}
          </div>

          {/* Email Field */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
              <Mail className={`w-5 h-5 transition-colors duration-300 ${
                errors.email 
                  ? 'text-red-500' 
                  : focusedField === 'email' 
                    ? 'text-blue-500' 
                    : 'text-gray-400'
              }`} />
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              placeholder="your.email@example.com"
              className={inputClasses('email')}
            />
            {errors.email && (
              <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm animate-slide-in-up">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.email}
              </div>
            )}
          </div>

          {/* Message Field */}
          <div className="relative">
            <div className="absolute left-4 top-4 z-10">
              <MessageSquare className={`w-5 h-5 transition-colors duration-300 ${
                errors.message 
                  ? 'text-red-500' 
                  : focusedField === 'message' 
                    ? 'text-blue-500' 
                    : 'text-gray-400'
              }`} />
            </div>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              placeholder="Tell us about your project..."
              rows={6}
              className={`${inputClasses('message')} resize-none`}
            />
            {errors.message && (
              <div className="flex items-center mt-2 text-red-600 dark:text-red-400 text-sm animate-slide-in-up">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.message}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-soft-lg hover:scale-105 hover:-translate-y-1'
            } text-white`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;