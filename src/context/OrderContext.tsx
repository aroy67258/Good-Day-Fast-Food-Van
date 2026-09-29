import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CustomerDetails, FulfillmentDetails, OrderStep, DeliveryMethod } from '../types';

interface OrderContextType {
  step: OrderStep;
  setStep: (step: OrderStep) => void;
  customer: CustomerDetails;
  fulfillment: FulfillmentDetails;
  updateCustomer: (fields: Partial<CustomerDetails>) => void;
  updateFulfillment: (fields: Partial<FulfillmentDetails>) => void;
  setDeliveryMethod: (method: DeliveryMethod) => void;
  errors: Record<string, string>;
  clearError: (field: string) => void;
  validateDetails: () => boolean;
  resetOrderForm: () => void;
  normalizedPhone: string;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const initialCustomer: CustomerDetails = {
  fullName: '',
  mobileNumber: '',
};

const initialFulfillment: FulfillmentDetails = {
  method: 'hostel',
  hostelName: '',
  roomBlock: '',
  deliveryAddress: '',
  deliveryInstructions: '',
  orderNote: '',
};

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<OrderStep>('cart');
  const [customer, setCustomer] = useState<CustomerDetails>(initialCustomer);
  const [fulfillment, setFulfillment] = useState<FulfillmentDetails>(initialFulfillment);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const updateCustomer = (fields: Partial<CustomerDetails>) => {
    setCustomer((prev) => ({ ...prev, ...fields }));
    // Clear error for edited field
    Object.keys(fields).forEach((key) => {
      if (errors[key]) {
        setErrors((prevErr) => {
          const next = { ...prevErr };
          delete next[key];
          return next;
        });
      }
    });
  };

  const updateFulfillment = (fields: Partial<FulfillmentDetails>) => {
    setFulfillment((prev) => ({ ...prev, ...fields }));
    Object.keys(fields).forEach((key) => {
      if (errors[key]) {
        setErrors((prevErr) => {
          const next = { ...prevErr };
          delete next[key];
          return next;
        });
      }
    });
  };

  const setDeliveryMethod = (method: DeliveryMethod) => {
    setFulfillment((prev) => ({ ...prev, method }));
    // Clear location-specific errors when switching method
    setErrors((prevErr) => {
      const next = { ...prevErr };
      delete next.hostelName;
      delete next.roomBlock;
      delete next.deliveryAddress;
      return next;
    });
  };

  const clearError = (field: string) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  // Normalize Indian mobile number
  const cleanPhone = customer.mobileNumber.replace(/\D/g, '');
  const normalizedPhone =
    cleanPhone.length === 10
      ? cleanPhone
      : cleanPhone.length === 12 && cleanPhone.startsWith('91')
      ? cleanPhone.slice(2)
      : cleanPhone.length === 11 && cleanPhone.startsWith('0')
      ? cleanPhone.slice(1)
      : cleanPhone;

  const validateDetails = (): boolean => {
    const newErrors: Record<string, string> = {};

    // 1. Full Name validation
    const trimmedName = customer.fullName.trim();
    if (!trimmedName) {
      newErrors.fullName = 'Please enter your full name';
    } else if (trimmedName.length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters';
    }

    // 2. Indian Mobile Number validation (10 digits)
    const phoneDigits = customer.mobileNumber.replace(/\D/g, '');
    let validDigits = phoneDigits;
    if (phoneDigits.length === 12 && phoneDigits.startsWith('91')) {
      validDigits = phoneDigits.slice(2);
    } else if (phoneDigits.length === 11 && phoneDigits.startsWith('0')) {
      validDigits = phoneDigits.slice(1);
    }

    if (!customer.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Please enter your mobile number';
    } else if (validDigits.length !== 10 || !/^[6-9]\d{9}$/.test(validDigits)) {
      newErrors.mobileNumber = 'Enter a valid 10-digit Indian mobile number (e.g. 9876543210)';
    }

    // 3. Delivery Method Specific Validations
    if (fulfillment.method === 'hostel') {
      if (!fulfillment.hostelName.trim()) {
        newErrors.hostelName = 'Please enter your hostel name';
      }
      if (!fulfillment.roomBlock.trim()) {
        newErrors.roomBlock = 'Please specify your room or block number';
      }
    } else if (fulfillment.method === 'nearby') {
      if (!fulfillment.deliveryAddress.trim()) {
        newErrors.deliveryAddress = 'Please enter your delivery address / landmark';
      }
    }
    // 'pickup' requires no address validation!

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetOrderForm = () => {
    setCustomer(initialCustomer);
    setFulfillment(initialFulfillment);
    setErrors({});
    setStep('cart');
  };

  return (
    <OrderContext.Provider
      value={{
        step,
        setStep,
        customer,
        fulfillment,
        updateCustomer,
        updateFulfillment,
        setDeliveryMethod,
        errors,
        clearError,
        validateDetails,
        resetOrderForm,
        normalizedPhone,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = (): OrderContextType => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
