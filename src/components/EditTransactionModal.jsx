import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import '../styles/components.css';

const EditTransactionModal = ({ isOpen, onClose, transaction }) => {
  const { editTransaction, getCategories } = useAppContext();
  const categories = getCategories().filter((cat) => cat !== 'All');

  const [formData, setFormData] = useState({
    date: '',
    description: '',
    category: '',
    amount: '',
    type: 'expense',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form with transaction data
  useEffect(() => {
    if (transaction && isOpen) {
      setFormData({
        date: transaction.date,
        description: transaction.description,
        category: transaction.category,
        amount: transaction.amount.toString(),
        type: transaction.type,
      });
      setErrors({});
    }
  }, [transaction, isOpen]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.amount) newErrors.amount = 'Amount is required';
    if (formData.amount && isNaN(parseFloat(formData.amount)))
      newErrors.amount = 'Amount must be a number';
    if (formData.amount && parseFloat(formData.amount) <= 0)
      newErrors.amount = 'Amount must be greater than 0';

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      editTransaction(transaction.id, {
        date: formData.date,
        description: formData.description.trim(),
        category: formData.category,
        amount: parseFloat(formData.amount),
        type: formData.type,
      });

      setErrors({});
      onClose();
    } catch (error) {
      setErrors({ submit: 'Failed to update transaction. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle modal close
  const handleClose = () => {
    setFormData({
      date: '',
      description: '',
      category: '',
      amount: '',
      type: 'expense',
    });
    setErrors({});
    onClose();
  };

  if (!isOpen || !transaction) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content edit-transaction-modal">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">Edit Transaction</h2>
          <button
            className="modal-close-button"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="transaction-form">
          {/* Error Message */}
          {errors.submit && (
            <div className="form-error-banner">{errors.submit}</div>
          )}

          {/* Date Field */}
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Date <span className="required">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={`form-input ${errors.date ? 'error' : ''}`}
              aria-label="Transaction date"
            />
            {errors.date && <span className="form-error">{errors.date}</span>}
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder="e.g., Grocery shopping"
              value={formData.description}
              onChange={handleInputChange}
              className={`form-input ${errors.description ? 'error' : ''}`}
              aria-label="Transaction description"
            />
            {errors.description && (
              <span className="form-error">{errors.description}</span>
            )}
          </div>

          {/* Category Field */}
          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category <span className="required">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`form-select ${errors.category ? 'error' : ''}`}
              aria-label="Transaction category"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <span className="form-error">{errors.category}</span>
            )}
          </div>

          {/* Amount Field */}
          <div className="form-group">
            <label htmlFor="amount" className="form-label">
              Amount <span className="required">*</span>
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="0.00"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={handleInputChange}
              className={`form-input ${errors.amount ? 'error' : ''}`}
              aria-label="Transaction amount"
            />
            {errors.amount && <span className="form-error">{errors.amount}</span>}
          </div>

          {/* Type Field */}
          <div className="form-group">
            <label className="form-label">
              Type <span className="required">*</span>
            </label>
            <div className="form-radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={formData.type === 'expense'}
                  onChange={handleInputChange}
                  aria-label="Expense transaction"
                />
                <span className="radio-text">Expense</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={formData.type === 'income'}
                  onChange={handleInputChange}
                  aria-label="Income transaction"
                />
                <span className="radio-text">Income</span>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;
